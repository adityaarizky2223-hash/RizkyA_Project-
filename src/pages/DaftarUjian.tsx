import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, PlayCircle, Clock } from 'lucide-react';

export default function DaftarUjian() {
  const { profile } = useAuth();

  const exams = [
    { id: 1, title: 'Simulasi Kejuruan TKJ', type: 'Campuran (Mudah & Sulit)', duration: '60 Menit', status: 'Aktif' },
    { id: 2, title: 'Ujian Tengah Semester - DKV', type: 'Teori Dasar', duration: '90 Menit', status: 'Aktif' },
    { id: 3, title: 'Ulangan Harian Akuntansi', type: 'Level Sulit', duration: '45 Menit', status: 'Ditutup' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 flex justify-between items-center text-white">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <FileText className="w-6 h-6 mr-2 text-primary-500" />
            Daftar Ujian Online (CBT)
          </h2>
          <p className="mt-1 text-sm text-slate-400">Pilih ujian yang tersedia untuk mulai mengerjakan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  exam.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {exam.status}
                </span>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{exam.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Tipe: {exam.type}</p>
              <p className="text-sm text-gray-500">Waktu: {exam.duration}</p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100">
              {exam.status === 'Aktif' ? (
                <Link
                  to={`/app/ujian/${exam.id}`}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Mulai Ujian
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-gray-400 bg-gray-200 cursor-not-allowed"
                >
                  Ujian Ditutup
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
