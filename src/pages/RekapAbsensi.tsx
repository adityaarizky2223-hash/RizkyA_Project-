import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

export default function RekapAbsensi() {
  const { profile } = useAuth();
  const [tab, setTab] = useState<'siswa' | 'karyawan'>('siswa');
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    fetchData();
  }, [tab, date]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === 'siswa') {
        const { data } = await supabase
          .from('attendance_siswa')
          .select(`
            id, date, status,
            students(name, nis, kelas),
            profiles:recorded_by(name)
          `)
          .eq('date', date);
        setRecords(data || []);
      } else {
        const { data } = await supabase
          .from('attendance_karyawan')
          .select(`
            id, date, status,
            profiles(name, role)
          `)
          .eq('date', date);
        setRecords(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Rekap Absensi Harian</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 p-2 rounded-xl border border-gray-100">
          <div className="flex space-x-2">
            <button
              onClick={() => setTab('siswa')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === 'siswa' ? 'bg-white shadow-sm border border-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Absensi Siswa
            </button>
            {profile?.role === 'admin' && (
              <button
                onClick={() => setTab('karyawan')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${tab === 'karyawan' ? 'bg-white shadow-sm border border-gray-200 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Absensi Karyawan
              </button>
            )}
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{tab === 'siswa' ? 'Kelas' : 'Role'}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                {tab === 'siswa' && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pencatat</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Memuat data...</td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Tidak ada absensi untuk tanggal ini.</td></tr>
              ) : records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {tab === 'siswa' ? record.students?.name : record.profiles?.name}
                    {tab === 'siswa' && <div className="text-xs text-gray-500 font-normal">{record.students?.nis}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                    {tab === 'siswa' ? record.students?.kelas : record.profiles?.role?.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      record.status === 'hadir' ? 'bg-green-100 text-green-800' :
                      record.status === 'izin' ? 'bg-yellow-100 text-yellow-800' :
                      record.status === 'sakit' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  {tab === 'siswa' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.profiles?.name || '-'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
