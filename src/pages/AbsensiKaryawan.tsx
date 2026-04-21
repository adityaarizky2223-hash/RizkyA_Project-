import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function AbsensiKaryawan() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [todayStatus, setTodayStatus] = useState<string | null>(null);
  
  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    if (!profile) return;

    async function checkAttendance() {
      try {
        const { data, error } = await supabase
          .from('attendance_karyawan')
          .select('status')
          .eq('user_id', profile!.id)
          .eq('date', today)
          .single();
          
        if (data) setTodayStatus(data.status);
      } catch (err) {
        // Not found is fine
      } finally {
        setLoading(false);
      }
    }
    checkAttendance();
  }, [profile, today]);

  const handleAbsen = async (status: 'hadir' | 'izin' | 'sakit') => {
    if (!profile) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('attendance_karyawan')
        .insert({
          user_id: profile.id,
          date: today,
          status
        });
      
      if (error) {
        if(error.code === '23505') alert('Anda sudah absen hari ini.');
        else alert('Error: ' + error.message);
      } else {
        setTodayStatus(status);
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !todayStatus) {
    return <div className="p-8 text-center"><Clock className="animate-spin h-8 w-8 mx-auto text-gray-400" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Absensi Mandiri Karyawan</h2>
        <p className="mt-2 text-gray-500">Tanggal: {format(new Date(), 'dd MMMM yyyy')}</p>
        
        {todayStatus ? (
          <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-green-900">Asik! Anda sudah absen hari ini</h3>
            <p className="mt-1 text-green-700 capitalize">Status: {todayStatus}</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <button
              onClick={() => handleAbsen('hadir')}
              disabled={loading}
              className="flex flex-col items-center justify-center p-6 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
            >
              <CheckCircle2 className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-semibold text-blue-900">Hadir</span>
            </button>
            <button
              onClick={() => handleAbsen('izin')}
              disabled={loading}
              className="flex flex-col items-center justify-center p-6 bg-yellow-50 hover:bg-yellow-100 rounded-xl border border-yellow-200 transition-colors"
            >
              <Clock className="h-8 w-8 text-yellow-600 mb-2" />
              <span className="font-semibold text-yellow-900">Izin</span>
            </button>
            <button
              onClick={() => handleAbsen('sakit')}
              disabled={loading}
              className="flex flex-col items-center justify-center p-6 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors"
            >
              <XCircle className="h-8 w-8 text-red-600 mb-2" />
              <span className="font-semibold text-red-900">Sakit</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
