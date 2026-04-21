import { useAuth } from '../contexts/AuthContext';
import { Users, UserSquare2, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();
  
  if (!profile) return null;

  const stats = [
    { name: 'Total Siswa', stat: '1,024', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', roles: ['admin', 'guru'] },
    { name: 'Karyawan Hadir', stat: '42', icon: UserSquare2, color: 'text-green-600', bg: 'bg-green-100', roles: ['admin'] },
    { name: 'Kelas Diampu', stat: '4', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100', roles: ['guru'] },
  ];

  const visibleStats = stats.filter(s => s.roles.includes(profile.role));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Selamat datang, {profile.name}!
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Anda login sebagai <span className="font-semibold text-primary-600 capitalize">{profile.role.replace('_', ' ')}</span>
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

        {visibleStats.length === 0 && (
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 col-span-full">
            <p className="text-gray-500">Gunakan menu di samping untuk mengakses fitur aplikasi.</p>
          </div>
        )}
      </div>
      
      {/* Quick Action Hints */}
      <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
        <h3 className="font-semibold text-primary-900 mb-2">Informasi Penting</h3>
        <ul className="list-disc list-inside text-primary-800 space-y-1 text-sm">
          <li>Pastikan Anda selalu mengisi <b>Absensi Karyawan</b> setiap hari kerja.</li>
          {profile.role === 'admin' && <li>Gunakan menu User Management untuk kelola akun guru dan admin.</li>}
          {profile.role === 'guru' && <li>Absensi Siswa hari ini ditutup otomatis pukul 15:00 WIB.</li>}
        </ul>
      </div>
    </div>
  );
}
