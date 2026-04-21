import { useAuth } from '../contexts/AuthContext';
import { Users, FileQuestion, GraduationCap } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();
  
  if (!profile) return null;

  const stats = [
    { name: 'Total Siswa Peserta', stat: '1,024', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', roles: ['admin', 'guru'] },
    { name: 'Bank Soal CBT', stat: '450', icon: FileQuestion, color: 'text-green-600', bg: 'bg-green-100', roles: ['admin', 'guru'] },
    { name: 'Ujian Berlangsung', stat: '2', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100', roles: ['admin', 'guru', 'tenaga_kependidikan'] },
  ];

  const visibleStats = stats.filter(s => s.roles.includes(profile.role));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Sistem Ujian Online SMK Prima Unggul
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Selamat datang, <span className="font-semibold text-primary-600">{profile.name}</span>. Anda mengakses sistem sebagai <span className="capitalize font-semibold text-gray-900">{profile.role.replace('_', ' ')}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleStats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-2xl p-6 flex items-center">
            <div className={`p-4 rounded-xl ${item.bg}`}>
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">{item.name}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{item.stat}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Action Hints */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-white">
        <h3 className="font-semibold text-primary-400 mb-2">Informasi & Petunjuk Penggunaan</h3>
        <ul className="list-disc list-inside text-slate-300 space-y-1 text-sm">
          <li>Simulasi CBT Ujian Nasional dapat diakses melalui menu <b>Daftar Ujian</b>.</li>
          {profile.role === 'admin' && <li>Kelola master kelas dan hak akses melalui menu Admin.</li>}
          {profile.role === 'guru' && <li>Input paket pertanyaaan Pilihan Ganda ada di menu <b>Bank Soal</b>.</li>}
          <li>Menu <b>Hasil & Nilai</b> akan merekap perhitungan jawaban secara otomatis setelah siswa menekan Selesai.</li>
        </ul>
      </div>
    </div>
  );
}
