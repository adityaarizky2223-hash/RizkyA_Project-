import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Database, Plus, Edit3, Trash2, X, Check } from 'lucide-react';

interface QuestionPackage {
  id: number;
  mataPelajaran: string;
  tipe: string;
  jumlah: number;
  createdAt: string;
}

export default function BankSoal() {
  const { profile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [soals, setSoals] = useState<QuestionPackage[]>([
    { id: 1, mataPelajaran: 'Kejuruan TKJ', tipe: 'Pilihan Ganda', jumlah: 30, createdAt: '2026-04-20' },
    { id: 2, mataPelajaran: 'Dasar Animasi DKV', tipe: 'Pilihan Ganda', jumlah: 40, createdAt: '2026-04-18' },
    { id: 3, mataPelajaran: 'Akuntansi Keuangan', tipe: 'Pilihan Ganda', jumlah: 30, createdAt: '2026-04-10' },
  ]);

  // Form states
  const [newMapel, setNewMapel] = useState('');
  const [newJumlah, setNewJumlah] = useState(30);

  if (profile?.role === 'siswa') {
    return <div className="p-8 text-center text-red-500">Akses Ditolak.</div>;
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMapel) return;

    const newPackage: QuestionPackage = {
      id: Date.now(),
      mataPelajaran: newMapel,
      tipe: 'Pilihan Ganda',
      jumlah: newJumlah,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSoals([newPackage, ...soals]);
    setNewMapel('');
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm('Hapus paket soal ini?')) {
      setSoals(soals.filter(s => s.id !== id));
    }
  };

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
              <tr key={soal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{soal.mataPelajaran}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{soal.tipe}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {soal.jumlah} Soal
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{soal.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                  <button 
                    onClick={() => alert(`Edit Paket: ${soal.mataPelajaran}`)}
                    className="text-primary-600 hover:text-primary-900 p-2 hover:bg-primary-50 rounded-full transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(soal.id)}
                    className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-full transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {soals.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
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

