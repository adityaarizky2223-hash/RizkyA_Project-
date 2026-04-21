import React, { useState, useEffect } from 'react';
import { supabase, Student } from '../lib/supabase';
import { Trash2, Plus, Users } from 'lucide-react';

export default function DataSiswa() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  
  // new student form state
  const [nis, setNis] = useState('');
  const [name, setName] = useState('');
  const [kelas, setKelas] = useState('TKJ-1');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const { data } = await supabase.from('students').select('*').order('kelas').order('name');
    if (data) setStudents(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('students').insert([{ nis, name, kelas }]);
    if (error) {
      alert("Error: " + error.message);
    } else {
      setNis(''); setName('');
      fetchStudents();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus data siswa ini?")) return;
    await supabase.from('students').delete().eq('id', id);
    fetchStudents();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Users className="w-6 h-6 mr-2 text-primary-600" />
          Master Data Siswa
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tambah Siswa Baru</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">NIS</label>
            <input required type="text" value={nis} onChange={e=>setNis(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input required type="text" value={name} onChange={e=>setName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kelas</label>
            <select required value={kelas} onChange={e=>setKelas(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
              <optgroup label="Teknik Komputer Jaringan">
                <option value="TKJ-1">TKJ-1</option>
                <option value="TKJ-2">TKJ-2</option>
              </optgroup>
              <optgroup label="Desain Komunikasi Visual">
                <option value="DKV-1">DKV-1</option>
                <option value="DKV-2">DKV-2</option>
              </optgroup>
              <optgroup label="Akuntansi">
                <option value="AK-1">AK-1</option>
              </optgroup>
              <optgroup label="Lainnya">
                <option value="BC-1">BC-1</option>
                <option value="MPLB-1">MPLB-1</option>
                <option value="BD-1">BD-1</option>
              </optgroup>
            </select>
          </div>
          <div className="md:col-span-4 flex justify-end mt-2">
            <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm font-medium text-white bg-primary-600 hover:bg-primary-700">
              <Plus className="w-5 h-5 mr-2" />
              Tambah Data
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIS</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Siswa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kelas</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.nis}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.kelas}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && !loading && (
              <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Belum ada data siswa.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
