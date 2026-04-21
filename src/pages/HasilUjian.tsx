import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileSpreadsheet, Download, Search } from 'lucide-react';

export default function HasilUjian() {
  const { profile } = useAuth();
  const [search, setSearch] = useState('');

  const results = [
    { id: 1, nama: 'Budi Santoso', nis: '1001', kelas: 'TKJ-1', mapel: 'Simulasi Kejuruan TKJ', nilai: 85, status: 'Lulus' },
    { id: 2, nama: 'Siti Aminah', nis: '1002', kelas: 'TKJ-1', mapel: 'Simulasi Kejuruan TKJ', nilai: 60, status: 'Remedial' },
    { id: 3, nama: 'Ahmad Fauzi', nis: '1003', kelas: 'DKV-1', mapel: 'Ujian Tengah Semester - DKV', nilai: 92, status: 'Lulus' },
    { id: 4, nama: 'Dewi Lestari', nis: '1004', kelas: 'AK-1', mapel: 'Ulangan Harian Akuntansi', nilai: 78, status: 'Lulus' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 flex justify-between items-center text-white">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <FileSpreadsheet className="w-6 h-6 mr-2 text-primary-500" />
            Rekap Hasil Ujian
          </h2>
          <p className="mt-1 text-sm text-slate-400">Laporan real-time nilai CBT siswa.</p>
        </div>
        <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-slate-900 bg-white hover:bg-gray-100 transition shadow-sm">
          <Download className="w-4 h-4 mr-2" /> Unduh PDF
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari siswa atau NIS..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Siswa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mata Pelajaran</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Nilai Akhir</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Keterangan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.filter(r => r.nama.toLowerCase().includes(search.toLowerCase()) || r.nis.includes(search)).map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{row.nama}</div>
                    <div className="text-xs text-gray-500">NIS: {row.nis}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.kelas}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{row.mapel}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-xl font-extrabold text-slate-800">{row.nilai}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      row.status === 'Lulus' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
