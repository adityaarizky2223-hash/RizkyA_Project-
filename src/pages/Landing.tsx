import { Link } from 'react-router-dom';
import { School, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  const majors = [
    { id: 'tkj', name: 'Teknik Komputer dan Jaringan', desc: 'Mempelajari perakitan komputer, jaringan dasar hingga tingkat lanjut.' },
    { id: 'dkv', name: 'Desain Komunikasi Visual', desc: 'Seni digital, desain grafis, animasi, dan produksi media kreatif.' },
    { id: 'ak', name: 'Akuntansi', desc: 'Pengelolaan keuangan, pembukuan, dan administrasi bisnis.' },
    { id: 'bc', name: 'Broadcasting', desc: 'Penyiaran radio, televisi, dan produksi film dokumenter.' },
    { id: 'mplb', name: 'Manajemen Perkantoran dan Layanan Bisnis', desc: 'Administrasi perkantoran modern dan public relations.' },
    { id: 'bd', name: 'Bisnis Digital', desc: 'Pemasaran online, e-commerce, dan strategi bisnis digital.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <School className="h-8 w-8 text-primary-600" />
              <span className="ml-3 text-xl font-bold text-gray-900 tracking-tight">SMK Prima Unggul</span>
            </div>
            <div>
              <Link 
                to="/login"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm"
              >
                Login Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-primary-600">Sistem Absensi Digital</span>
              <span className="block mt-2 text-3xl sm:text-4xl">SMK Prima Unggul</span>
            </h1>
            <p className="mt-6 text-lg tracking-tight text-gray-500 sm:text-xl">
              Portal terpadu untuk absensi siswa dan karyawan SMK Prima Unggul. Memudahkan pendataan, rekapitulasi, dan monitoring kedisiplinan secara real-time.
            </p>
            <div className="mt-10 max-w-sm mx-auto flex justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-md transition hover:-translate-y-0.5"
              >
                Masuk Sistem
                <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Majors Section */}
        <div className="bg-white py-16 sm:py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pilihan Jurusan Kompetensi</h2>
              <p className="mt-4 text-lg text-gray-500">SMK Prima Unggul memiliki 6 program keahlian unggulan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {majors.map((major) => (
                <div key={major.id} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{major.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{major.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <School className="h-8 w-8 text-primary-500 mx-auto mb-4" />
          <p>&copy; {new Date().getFullYear()} SMK Prima Unggul. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
