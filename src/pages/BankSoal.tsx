import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Database, Plus, Edit3, Trash2, X, Check, ChevronLeft, FileText } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: string;
  options: string[];
  correctAnswer: string;
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
  
  // Question form states
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQText, setNewQText] = useState('');
  const [newQOptions, setNewQOptions] = useState(['', '', '', '', '']);
  const [newQCorrect, setNewQCorrect] = useState('');

  const tkjQuestionsRaw = [
    { text: "Topologi jaringan dimana setiap komputer terhubung ke satu titik pusat (hub/switch) disebut topologi...", options: ["Bus", "Ring", "Star", "Mesh", "Tree"], correctAnswer: "Star" },
    { text: "Perintah pada Command Prompt (Windows) untuk mengecek konektivitas IP Address adalah...", options: ["ipconfig", "ping", "tracert", "netstat", "ifconfig"], correctAnswer: "ping" },
    { text: "Alamat IP versi 4 (IPv4) terdiri dari berapa bit?", options: ["16 bit", "32 bit", "64 bit", "128 bit", "256 bit"], correctAnswer: "32 bit" },
    { text: "Protokol yang umum digunakan untuk mengunduh email dari server adalah...", options: ["SMTP", "POP3", "FTP", "HTTP", "SNMP"], correctAnswer: "POP3" },
    { text: "Berapakah bit yang digunakan untuk IPv6?", options: ["32 bit", "64 bit", "128 bit", "256 bit", "512 bit"], correctAnswer: "128 bit" },
    { text: "Lapis OSI yang berfungsi mengontrol aliran data dan error recovery adalah...", options: ["Physical", "Data Link", "Network", "Transport", "Session"], correctAnswer: "Transport" },
    { text: "Perangkat yang digunakan untuk menghubungkan dua jaringan yang berbeda protokol adalah...", options: ["Hub", "Switch", "Router", "Bridge", "Repeater"], correctAnswer: "Router" },
    { text: "Kabel UTP kategori 5 (Cat5) memiliki kecepatan transfer data maksimal sebesar...", options: ["10 Mbps", "100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps"], correctAnswer: "100 Mbps" },
    { text: "Alat yang berfungsi untuk menyambung serat optik (fiber optik) adalah...", options: ["Crimping Tool", "Fusion Splicer", "OTDR", "Stripper", "Cleaver"], correctAnswer: "Fusion Splicer" },
    { text: "Apa kepanjangan dari DNS?", options: ["Data Name Service", "Domain Name System", "Dynamic Network Server", "Direct Name System", "Digital Network Security"], correctAnswer: "Domain Name System" },
    { text: "Urutan warna kabel Straight T568B pada pin 1 sampai 8 adalah...", options: ["Putih Oranye - Oranye - Putih Hijau - Biru - Putih Biru - Hijau - Putih Cokelat - Cokelat", "Putih Hijau - Hijau - Putih Oranye - Biru - Putih Biru - Oranye - Putih Cokelat - Cokelat", "Putih Oranye - Hijau - Putih Hijau - Biru - Putih Biru - Oranye - Putih Cokelat - Cokelat", "Putih Cokelat - Cokelat - Putih Hijau - Biru - Putih Biru - Hijau - Putih Oranye - Oranye", "Oranye - Putih Oranye - Hijau - Putih Hijau - Biru - Putih Biru - Cokelat - Putih Cokelat"], correctAnswer: "Putih Oranye - Oranye - Putih Hijau - Biru - Putih Biru - Hijau - Putih Cokelat - Cokelat" },
    { text: "Port default untuk layanan HTTP adalah...", options: ["21", "22", "25", "80", "443"], correctAnswer: "80" },
    { text: "Perintah linux untuk melihat manual dari sebuah perintah adalah...", options: ["ls", "cat", "man", "help", "pwd"], correctAnswer: "man" },
    { text: "Alamat MAC (Media Access Control) terdiri dari berapa digit heksadesimal?", options: ["8", "12", "16", "32", "48"], correctAnswer: "12" },
    { text: "Subnet mask default untuk IP Class C adalah...", options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255", "10.0.0.0"], correctAnswer: "255.255.255.0" },
    { text: "Teknologi nirkabel yang bekerja pada frekuensi 2.4 GHz atau 5 GHz adalah...", options: ["Bluetooth", "WLAN / Wi-Fi", "Infra Red", "Microwave", "Radio FM"], correctAnswer: "WLAN / Wi-Fi" },
    { text: "Apa fungsi perintah 'tracert' pada Windows?", options: ["Mengecek status RAM", "Melihat jalur rute paket data", "Menghapus file temporary", "Mengatur jam sistem", "Membuat partisi baru"], correctAnswer: "Melihat jalur rute paket data" },
    { text: "Sistem operasi yang bersifat Open Source dan turunan UNIX adalah...", options: ["Windows", "MacOS", "Linux", "iOS", "Android"], correctAnswer: "Linux" },
    { text: "Hardware yang berfungsi sebagai otak dari komputer adalah...", options: ["RAM", "VGA", "Processor", "Power Supply", "Motherboard"], correctAnswer: "Processor" },
    { text: "Jenis memori yang bersifat volatile (data hilang saat mati listrik) adalah...", options: ["ROM", "Harddisk", "Flasdisk", "RAM", "SSD"], correctAnswer: "RAM" },
    { text: "Perangkat keras yang merubah sinyal digital menjadi analog dan sebaliknya adalah...", options: ["Switch", "Modem", "Access Point", "Network Card", "UPS"], correctAnswer: "Modem" },
    { text: "Apa itu DHCP (Dynamic Host Configuration Protocol)?", options: ["Sistem pengalamatan IP otomatis", "Sistem keamanan firewall", "Sistem routing statis", "Sistem backup data", "Sistem enkripsi jaringan"], correctAnswer: "Sistem pengalamatan IP otomatis" },
    { text: "Karakteristik utama dari Topologi Bus adalah...", options: ["Menggunakan Switch", "Memiliki Terminator di ujung kabel", "Setiap pc terhubung ke 2 pc lain", "Berbentuk seperti bintang", "Sangat handal jika kabel putus"], correctAnswer: "Memiliki Terminator di ujung kabel" },
    { text: "Layanan yang memungkinkan user mengakses file secara remote adalah...", options: ["HTTP", "SSH / FTP", "DHCP", "DNS", "SMTP"], correctAnswer: "SSH / FTP" },
    { text: "Apa fungsi dari FireWall?", options: ["Mempercepat internet", "Melindungi jaringan dari akses ilegal", "Menambah kapasitas RAM", "Membersihkan virus lokal", "Menghemat listrik pc"], correctAnswer: "Melindungi jaringan dari akses ilegal" },
    { text: "Ping adalah singkatan dari...", options: ["Packet Internet Gopher", "Packet Internal Gateway", "Private Internet Group", "Port Internet Grid", "Point Infinite Game"], correctAnswer: "Packet Internet Gopher" },
    { text: "Lapis OSI yang bersinggungan langsung dengan user adalah...", options: ["Application", "Presentation", "Session", "Transport", "Physical"], correctAnswer: "Application" },
    { text: "Berikut merupakan IP Private, kecuali...", options: ["10.0.0.1", "172.16.0.1", "192.168.1.1", "202.155.10.1", "127.0.0.1"], correctAnswer: "202.155.10.1" },
    { text: "Apa kepanjangan dari LAN?", options: ["Large Area Network", "Local Area Network", "Long Access Node", "Light Area Network", "Level Access Network"], correctAnswer: "Local Area Network" },
    { text: "Jenis kabel yang menggunakan cahaya untuk transmisi data adalah...", options: ["UTP", "STP", "Coaxial", "Fiber Optic", "Cross Over"], correctAnswer: "Fiber Optic" },
  ];

  const [soals, setSoals] = useState<QuestionPackage[]>([
    { 
      id: 1, 
      mataPelajaran: 'Kejuruan TKJ', 
      tipe: 'Pilihan Ganda', 
      jumlah: 30, 
      createdAt: '2026-04-20',
      questions: tkjQuestionsRaw.map((q, i) => ({ id: i + 1, text: q.text, options: q.options, correctAnswer: q.correctAnswer, type: 'Pilihan Ganda' }))
    },
    { 
      id: 2, 
      mataPelajaran: 'Dasar Animasi DKV', 
      tipe: 'Pilihan Ganda', 
      jumlah: 40, 
      createdAt: '2026-04-18',
      questions: Array.from({ length: 40 }, (_, i) => ({ 
        id: i + 1, 
        text: `Pertanyaan ke-${i + 1} tentang Prinsip Dasar Animasi...`, 
        type: 'Pilihan Ganda', 
        options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D', 'Opsi E'], 
        correctAnswer: 'Opsi A' 
      }))
    },
    { 
      id: 3, 
      mataPelajaran: 'Akuntansi Keuangan', 
      tipe: 'Pilihan Ganda', 
      jumlah: 30, 
      createdAt: '2026-04-10',
      questions: Array.from({ length: 30 }, (_, i) => ({ 
        id: i + 1, 
        text: `Pertanyaan ke-${i + 1} tentang Siklus Akuntansi...`, 
        type: 'Pilihan Ganda', 
        options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D', 'Opsi E'], 
        correctAnswer: 'Opsi A' 
      }))
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
      questions: Array.from({ length: newJumlah }, (_, i) => ({ 
        id: i + 1, 
        text: `Pertanyaan baru ke-${i + 1}...`, 
        type: 'Pilihan Ganda',
        options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D', 'Opsi E'],
        correctAnswer: 'Opsi A'
      }))
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

  const handleSetCorrectAnswer = (packageId: number, questionId: number, newAnswer: string) => {
    setSoals(prev => prev.map(pkg => {
      if (pkg.id === packageId) {
        return {
          ...pkg,
          questions: pkg.questions?.map(q => {
            if (q.id === questionId) {
              return { ...q, correctAnswer: newAnswer };
            }
            return q;
          })
        };
      }
      return pkg;
    }));
    
    if (selectedPackage && selectedPackage.id === packageId) {
      setSelectedPackage(prev => {
        if (!prev) return null;
        return {
          ...prev,
          questions: prev.questions?.map(q => {
            if (q.id === questionId) {
              return { ...q, correctAnswer: newAnswer };
            }
            return q;
          })
        };
      });
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !newQText || !newQCorrect) return;

    const newQuestion: Question = {
      id: (selectedPackage.questions?.length || 0) + 1,
      text: newQText,
      type: 'Pilihan Ganda',
      options: newQOptions,
      correctAnswer: newQCorrect
    };

    const updatedSoals = soals.map(pkg => {
      if (pkg.id === selectedPackage.id) {
        const updatedQuestions = [...(pkg.questions || []), newQuestion];
        return { ...pkg, questions: updatedQuestions, jumlah: updatedQuestions.length };
      }
      return pkg;
    });

    setSoals(updatedSoals);
    setSelectedPackage(updatedSoals.find(p => p.id === selectedPackage.id) || null);
    
    // Reset form
    setNewQText('');
    setNewQOptions(['', '', '', '', '']);
    setNewQCorrect('');
    setShowQuestionForm(false);
  };

  const handleDeleteQuestion = (questionId: number) => {
    if (!selectedPackage || !confirm('Hapus pertanyaan ini?')) return;

    const updatedSoals = soals.map(pkg => {
      if (pkg.id === selectedPackage.id) {
        const updatedQuestions = (pkg.questions || []).filter(q => q.id !== questionId).map((q, i) => ({ ...q, id: i + 1 }));
        return { ...pkg, questions: updatedQuestions, jumlah: updatedQuestions.length };
      }
      return pkg;
    });

    setSoals(updatedSoals);
    setSelectedPackage(updatedSoals.find(p => p.id === selectedPackage.id) || null);
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
          <button 
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            className="px-4 py-2 bg-white text-slate-900 rounded-lg font-medium hover:bg-gray-100 transition shadow-sm flex items-center"
          >
            {showQuestionForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {showQuestionForm ? 'Batal' : 'Tambah Soal'}
          </button>
        </div>

        {showQuestionForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Input Pertanyaan Baru</h3>
            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teks Pertanyaan</label>
                <textarea 
                  required
                  rows={3}
                  value={newQText}
                  onChange={e => setNewQText(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ketik pertanyaan di sini..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newQOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-bold text-gray-400">{['A', 'B', 'C', 'D', 'E'][i]}</span>
                    <input 
                      required
                      type="text"
                      value={opt}
                      onChange={e => {
                        const next = [...newQOptions];
                        next[i] = e.target.value;
                        setNewQOptions(next);
                      }}
                      className="flex-1 rounded-lg border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 text-sm"
                      placeholder={`Opsi ${['A', 'B', 'C', 'D', 'E'][i]}`}
                    />
                    <input 
                      type="radio" 
                      name="correct-option"
                      required
                      checked={newQCorrect === opt && opt !== ''}
                      onChange={() => setNewQCorrect(opt)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-bold shadow-md flex items-center"
                >
                  <Check className="w-5 h-5 mr-2" /> Simpan Pertanyaan
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {selectedPackage.questions?.map((q) => (
            <div key={q.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex justify-between items-center hover:border-primary-300 transition-colors">
              <div className="flex items-start">
                <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold flex items-center justify-center mr-4 shrink-0">
                  {q.id}
                </span>
                <div>
                  <p className="text-gray-900 font-bold text-lg mb-4">{q.text}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, idx) => (
                      <button 
                        key={idx} 
                        type="button"
                        onClick={() => handleSetCorrectAnswer(selectedPackage.id, q.id, opt)}
                        className={`p-3 rounded-xl border text-sm flex items-center cursor-pointer transition-all hover:bg-opacity-80 active:scale-[0.98] text-left ${
                          opt === q.correctAnswer 
                            ? 'bg-green-50 border-green-200 text-green-700 font-bold' 
                            : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs shrink-0 ${
                          opt === q.correctAnswer ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                        }`}>
                          {['A', 'B', 'C', 'D', 'E'][idx]}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {opt === q.correctAnswer && <Check className="w-4 h-4 ml-auto shrink-0" />}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-extrabold">{q.type}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">Kunci: {q.correctAnswer}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition"><Edit3 className="w-4 h-4" /></button>
                <button 
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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


