import { useState, useEffect } from 'react';
import { supabase, Student } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import { Users, Save, Loader2 } from 'lucide-react';

export default function AbsensiSiswa() {
  const { profile } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceCache, setAttendanceCache] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('');
  
  const today = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    fetchClassesAndStudents();
  }, []);

  const fetchClassesAndStudents = async () => {
    try {
      const { data, error } = await supabase.from('students').select('*').order('name');
      if (data) {
        setStudents(data);
        if (data.length > 0) {
          // unique classes
          const classes = Array.from(new Set(data.map(s => s.kelas)));
          setSelectedClass(classes[0] || '');
        }
      }
      
      // Fetch today's attendance for cache
      const { data: attData } = await supabase
        .from('attendance_siswa')
        .select('student_id, status')
        .eq('date', today);
        
      if (attData) {
        const cache: Record<string, string> = {};
        attData.forEach(a => { cache[a.student_id] = a.status; });
        setAttendanceCache(cache);
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceCache(prev => ({ ...prev, [studentId]: status }));
  };

  const saveAttendance = async () => {
    if (!profile) return;
    setSaving(true);
    
    // Convert cache to array of upsert objects
    const upserts = Object.keys(attendanceCache).map(studentId => ({
      student_id: studentId,
      date: today,
      status: attendanceCache[studentId],
      recorded_by: profile.id
    }));

    try {
      const { error } = await supabase.from('attendance_siswa').upsert(upserts, { onConflict: 'student_id, date' });
      if (error) throw error;
      alert("Absensi berhasil disimpan!");
    } catch (e: any) {
      alert("Error saving: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data siswa...</div>;

  const filteredStudents = students.filter(s => s.kelas === selectedClass);
  const classes = Array.from(new Set(students.map(s => s.kelas)));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary-600" />
            Input Absensi Siswa
          </h2>
          <p className="mt-1 text-sm text-gray-500">Tanggal: {format(new Date(), 'dd MMMM yyyy')}</p>
        </div>
        
        <select 
          value={selectedClass} 
          onChange={(e) => setSelectedClass(e.target.value)}
          className="block w-full sm:w-64 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {classes.map(c => <option key={c} value={c}>Kelas {c}</option>)}
        </select>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredStudents.map(student => (
            <li key={student.id} className="p-4 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-500">NIS: {student.nis}</p>
              </div>
              <div className="flex gap-2">
                {['hadir', 'izin', 'sakit', 'alpa'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(student.id, status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      attendanceCache[student.id] === status
                        ? status === 'hadir' ? 'bg-green-100 border-green-200 text-green-800' :
                          status === 'izin' ? 'bg-yellow-100 border-yellow-200 text-yellow-800' :
                          status === 'sakit' ? 'bg-orange-100 border-orange-200 text-orange-800' :
                          'bg-red-100 border-red-200 text-red-800'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </li>
          ))}
          {filteredStudents.length === 0 && (
            <li className="p-8 text-center text-gray-500">Tidak ada siswa di kelas ini.</li>
          )}
        </ul>
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button 
            onClick={saveAttendance}
            disabled={saving || filteredStudents.length === 0}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Simpan Absensi Kelas
          </button>
        </div>
      </div>
    </div>
  );
}
