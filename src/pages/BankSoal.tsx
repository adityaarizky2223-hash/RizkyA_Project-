import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Database, Plus, Edit3, Trash2, X, Check, ChevronLeft, FileText } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: string;
}

interface QuestionPackage {
  id: number;
  mataPelajaran: string;
  tipe: string;
  jumlah: number;
  createdAt: string;
  questions?: Question[];
}

export default function BankSoal() {
  const { profile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<QuestionPackage | null>(null);
  
  const [soals, setSoals] = useState<QuestionPackage[]>([
    { 
      id: 1, 
      mataPelajaran: 'Kejuruan TKJ', 
      tipe: 'Pilihan Ganda', 
      jumlah: 30, 
      createdAt: '2026-04-20',
      questions: Array.from({ length: 30 }, (_, i) => ({ id: i + 1, text: `Pertanyaan ke-${i + 1} tentang Jaringan Komputer...`, type: 'Pilihan Ganda' }))
    },
    { 
      id: 2, 
      mataPelajaran: 'Dasar Animasi DKV', 
      tipe: 'Pilihan Ganda', 
      jumlah: 40, 
      createdAt: '2026-04-18',
      questions: Array.from({ length: 40 }, (_, i) => ({ id: i + 1, text: `Pertanyaan ke-${i + 1} tentang Prinsip Dasar Animasi...`, type: 'Pilihan Ganda' }))
    },
    { 
      id: 3, 
      mataPelajaran: 'Akuntansi Keuangan', 
      tipe: 'Pilihan Ganda', 
      jumlah: 30, 
      createdAt: '2026-04-10',
      questions: Array.from({ length: 30 }, (_, i) => ({ id: i + 1, text: `Pertanyaan ke-${i + 1} tentang Siklus Akuntansi...`, type: 'Pilihan Ganda' }))
    },
  ]);

  // Form states
  const [newMapel, setNewMapel] = useState('');
  const [newJumlah, setNewJumlah] = useState(30);

  if (profile?.role === 'siswa') {
    return <div className="p-8 text-center text-red-500 font-bold">Akses Ditolak. Halaman ini hanya untuk Guru dan Admin.</div>;
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMapel) return;

    const newPackage: QuestionPackage = {
      id: Date.now(),
      mataPelajaran: newMapel,
      tipe: 'Pilihan Ganda',
      jumlah: newJumlah,
      createdAt: new Date().toISOString().split('T')[0],
      questions: Array.from({ length: newJumlah }, (_, i) => ({ id: i + 1, text: `Pertanyaan baru ke-${i + 1}...`, type: 'Pilihan Ganda' }))
    };

    setSoals([newPackage, ...soals]);
    setNewMapel('');
    setShowForm(false);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Hapus paket soal ini beserta seluruh isinya?')) {
      setSoals(soals.filter(s => s.id !== id));
      if (selectedPackage?.id === id) setSelectedPackage(null);
    }
  };

  if (selectedPackage) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 flex justify-between items-center text-white">
          <div className="flex items-center">
            <button 
              onClick={() => setSelectedPackage(null)}
              className="mr-4 p-2 hover:bg-slate-700 rounded-full transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <FileText className="w-6 h-6 mr-2 text-primary-500" />
                {selectedPackage.mataPelajaran}
              </h2>
              <p className="mt-1 text-sm text-slate-400">Total: {selectedPackage.jumlah} Butir Pertanyaan</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition shadow-sm flex items-center">
            <Plus className="w-4 h-4 mr-2" /> Tambah Soal
          </button>
        </div>

        <div className="space-y-4">
          {selectedPackage.questions?.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex justify-between items-center hover:border-primary-300 transition-colors">
              <div className="flex items-start">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold flex items-center justify-center mr-4 shrink-0">
                  {q.id}
                </span>
                <div>
                  <p className="text-gray-900 font-medium">{q.text}</p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-bold">{q.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"><Edit3 className="w-4 h-4" /></button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 p-6 flex justify-between items-center text-white">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Database className="w-6 h-6 mr-2 text-primary-500" />
            Bank Soal Ujian
          </h2>
          <p className="mt-1 text-sm text-slate-400">Manajemen daftar pertanyaan berdasarkan mata pelajaran.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-slate-900 bg-white hover:bg-gray-100 transition shadow-sm"
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? 'Batal' : 'Buat Paket Soal'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tambah Paket Soal Baru</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
              <input 
                required 
                type="text" 
                value={newMapel}
                onChange={e => setNewMapel(e.target.value)}
                placeholder="Contoh: Matematika Dasar"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Soal</label>
              <input 
                required 
                type="number" 
                value={newJumlah}
                onChange={e => setNewJumlah(parseInt(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <button 
              type="submit" 
              className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              <Check className="w-4 h-4 mr-2" /> Simpan Paket
            </button>
          </form>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Pelajaran</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe Ujian</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Soal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dibuat Pada</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {soals.map((soal) => (
              <tr 
                key={soal.id} 
                className="hover:bg-primary-50 cursor-pointer transition-colors group"
                onClick={() => setSelectedPackage(soal)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <div className="bg-slate-100 p-2 rounded-lg mr-3 group-hover:bg-primary-100 transition-colors">
                      <FileText className="w-4 h-4 text-slate-500 group-hover:text-primary-600" />
                    </div>
                    <span className="font-bold text-gray-900 group-hover:text-primary-700">{soal.mataPelajaran}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{soal.tipe}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {soal.jumlah} Soal
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{soal.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedPackage(soal); }}
                    className="text-primary-600 hover:text-primary-900 p-2 hover:bg-white rounded-full transition"
                    title="Buka Soal"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(soal.id, e)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-white rounded-full transition"
                    title="Hapus Paket"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {soals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 uppercase tracking-widest text-xs font-bold">
                  Belum ada paket soal. Klik tombol "Buat Paket Soal" untuk memulai.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


