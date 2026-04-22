import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

export default function UjianSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [result, setResult] = useState<{ score: number, correct: number, wrong: number } | null>(null);
  
  // Bank of 30 distinct questions covering general knowledge, IT, math, etc.
  const rawQuestions = [
    { text: "Topologi jaringan dimana setiap komputer terhubung ke satu titik pusat (hub/switch) disebut topologi...", options: ["Bus", "Ring", "Star", "Mesh", "Tree"], correctAnswer: "Star" },
    { text: "Perintah pada Command Prompt (Windows) untuk mengecek konektivitas IP Address adalah...", options: ["ipconfig", "ping", "tracert", "netstat", "ifconfig"], correctAnswer: "ping" },
    { text: "Alamat IP versi 4 (IPv4) terdiri dari berapa bit?", options: ["16 bit", "32 bit", "64 bit", "128 bit", "256 bit"], correctAnswer: "32 bit" },
    { text: "Protokol yang umum digunakan untuk mengunduh email dari server adalah...", options: ["SMTP", "POP3", "FTP", "HTTP", "SNMP"], correctAnswer: "POP3" },
    { text: "Aplikasi Adobe yang paling sering digunakan untuk mendesain grafis berbasis vektor adalah...", options: ["Photoshop", "Premiere", "After Effects", "Illustrator", "Lightroom"], correctAnswer: "Illustrator" },
    { text: "Warna primer dalam sistem warna cahaya (RGB) adalah...", options: ["Merah, Kuning, Biru", "Merah, Hijau, Biru", "Cyan, Magenta, Yellow", "Hitam, Putih, Abu-abu", "Ungu, Orange, Hijau"], correctAnswer: "Merah, Hijau, Biru" },
    { text: "Teknik penempatan tata letak huruf dan teks dalam desain grafis dikenal dengan istilah...", options: ["Tipografi", "Fotografi", "Nirmana", "Render", "Tracing"], correctAnswer: "Tipografi" },
    { text: "Persamaan dasar akuntansi yang paling tepat adalah...", options: ["Harta = Modal - Utang", "Modal = Harta + Utang", "Harta = Utang + Modal", "Utang = Harta + Modal", "Harta + Utang = Modal"], correctAnswer: "Harta = Utang + Modal" },
    { text: "Buku catatan harian tempat mencatat transaksi keuangan secara kronologis disebut...", options: ["Buku Besar", "Neraca Saldo", "Laporan Laba Rugi", "Jurnal Umum", "Jurnal Penutup"], correctAnswer: "Jurnal Umum" },
    { text: "Apa nama lapisan terluar dari pelindung bumi yang memantulkan sinar ultraviolet?", options: ["Troposfer", "Thermosfer", "Ozon", "Eksosfer", "Litosfer"], correctAnswer: "Ozon" },
    { text: "Ibu kota provinsi Jawa Tengah adalah...", options: ["Surabaya", "Semarang", "Yogyakarta", "Bandung", "Surakarta"], correctAnswer: "Semarang" },
    { text: "Berapakah hasil dari 12 x 15?", options: ["160", "170", "180", "190", "200"], correctAnswer: "180" },
    { text: "Dalam bahasa Inggris, tense yang digunakan untuk menyatakan kebiasaan sehari-hari adalah...", options: ["Past Tense", "Present Continuous", "Future Tense", "Simple Present Tense", "Past Perfect Tense"], correctAnswer: "Simple Present Tense" },
    { text: "Lambang unsur kimia untuk Emas adalah...", options: ["Ag", "Au", "Fe", "Cu", "Zn"], correctAnswer: "Au" },
    { text: "Berapakah hasil 25% dari 200?", options: ["25", "40", "50", "75", "100"], correctAnswer: "50" },
    { text: "Rumus untuk menghitung luas lingkaran adalah...", options: ["2 x pi x r", "pi x r x r", "1/2 x alas x tinggi", "panjang x lebar", "sisi x sisi"], correctAnswer: "pi x r x r" },
    { text: "Siapakah penemu mesin uap pertama yang memicu revolusi industri?", options: ["Thomas Edison", "Isaac Newton", "James Watt", "Albert Einstein", "Nikola Tesla"], correctAnswer: "James Watt" },
    { text: "Gunung tertinggi di Indonesia adalah...", options: ["Gunung Rinjani", "Gunung Semeru", "Gunung Kerinci", "Puncak Jaya Wijaya", "Gunung Bromo"], correctAnswer: "Puncak Jaya Wijaya" },
    { text: "Peristiwa pergerakan air tanah menuju ke permukaan dan menguap dari tumbuhan disebut...", options: ["Kondensasi", "Evaporasi", "Transpirasi", "Presipitasi", "Infiltrasi"], correctAnswer: "Transpirasi" },
    { text: "Alat ukur yang digunakan untuk mengetahui kuat arus listrik adalah...", options: ["Voltmeter", "Amperemeter", "Ohmmeter", "Barometer", "Termometer"], correctAnswer: "Amperemeter" },
    { text: "Siapakah wakil presiden pertama Republik Indonesia?", options: ["Ir. Soekarno", "Ki Hajar Dewantara", "Mohammad Hatta", "Jenderal Sudirman", "Sutan Sjahrir"], correctAnswer: "Mohammad Hatta" },
    { text: "Apakah nama gas yang dibutuhkan tumbuhan untuk proses fotosintesis?", options: ["Oksigen", "Nitrogen", "Hidrogen", "Karbon Dioksida", "Helium"], correctAnswer: "Karbon Dioksida" },
    { text: "Komponen utama yang memproses segala data dan instruksi dalam komputer adalah...", options: ["RAM", "Harddisk", "VGA Card", "Power Supply", "Processor (CPU)"], correctAnswer: "Processor (CPU)" },
    { text: "Seni melipat kertas yang berasal dari Jepang disebut...", options: ["Ikebana", "Judo", "Origami", "Haiku", "Bonsai"], correctAnswer: "Origami" },
    { text: "Tari Kecak berasal dari daerah...", options: ["Jawa Barat", "Sumatera Barat", "Bali", "Kalimantan Timur", "Papua"], correctAnswer: "Bali" },
    { text: "Sebutkan antonim dari kata 'Proaktif'.", options: ["Reaktif", "Pasif", "Dinamis", "Agresif", "Inovatif"], correctAnswer: "Reaktif" },
    { text: "Akar kuadrat dari 144 adalah...", options: ["10", "12", "14", "16", "18"], correctAnswer: "12" },
    { text: "Dalam rantai makanan, tumbuhan secara umum berperan sebagai...", options: ["Konsumen Tingkat 1", "Produsen", "Pengurai", "Konsumen Puncak", "Karnivora"], correctAnswer: "Produsen" },
    { text: "Senjata tradisional khas dari daerah Jawa Barat adalah... ", options: ["Keris", "Mandau", "Kujang", "Rencong", "Celurit"], correctAnswer: "Kujang" },
    { text: "Lagu kebangsaan Indonesia Raya diciptakan oleh...", options: ["Ibu Sud", "Ismail Marzuki", "W.R. Supratman", "C. Simanjuntak", "Kusbini"], correctAnswer: "W.R. Supratman" }
  ];

  const totalQuestions = rawQuestions.length;
  const questions = rawQuestions.map((q, i) => ({
    id: i + 1,
    difficulty: i % 5 === 0 ? 'Sulit' : 'Gampang',
    text: q.text,
    options: q.options,
    correctAnswer: q.correctAnswer
  }));

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (qId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const currentQ = questions[currentQuestion - 1];

  const handleSubmit = () => {
    if (confirm("Apakah Anda yakin ingin menyelesaikan ujian ini? Sisa waktu masih ada.")) {
      let correctCount = 0;
      
      questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
      
      const wrongCount = totalQuestions - correctCount;
      const score = Math.round((correctCount / totalQuestions) * 100);
      
      setResult({ score, correct: correctCount, wrong: wrongCount });
    }
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="w-full absolute top-0 inset-x-0 h-2 bg-green-500"></div>
          <CheckCircle2 className="mx-auto w-20 h-20 text-green-500 mb-6" />
          <h2 className="text-4xl font-black text-gray-900 mb-2">Selesai Ujian!</h2>
          <p className="text-lg text-gray-500 mb-10">Anda telah berhasil menyelesaikan simulasi ujian CBT ini.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
              <p className="text-sm uppercase tracking-widest text-slate-500 font-bold mb-2">Nilai Ujian</p>
              <p className={`text-6xl font-black ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>{result.score}</p>
            </div>
            <div className="p-8 bg-green-50 rounded-2xl border border-green-200 flex flex-col items-center">
              <p className="text-sm uppercase tracking-widest text-green-700 font-bold mb-2">Total Benar</p>
              <p className="text-4xl font-bold text-green-600">{result.correct}</p>
            </div>
            <div className="p-8 bg-red-50 rounded-2xl border border-red-200 flex flex-col items-center">
              <p className="text-sm uppercase tracking-widest text-red-700 font-bold mb-2">Total Salah</p>
              <p className="text-4xl font-bold text-red-600">{result.wrong}</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/app/ujian')}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl shadow-md hover:bg-slate-800 hover:-translate-y-0.5 transition-all font-semibold"
            >
              Kembali ke Daftar Ujian
            </button>
            <button
              onClick={() => navigate('/app/hasil')}
              className="px-8 py-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-all font-semibold"
            >
              Lihat Rekap Hasil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto min-h-[calc(100vh-8rem)] xl:h-[calc(100vh-8rem)] p-4">
      {/* Main Question Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Soal No. {currentQuestion}</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            currentQ.difficulty === 'Sulit' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            Level: {currentQ.difficulty}
          </span>
        </div>
        
        <div className="p-8 flex-1 overflow-y-auto">
          <p className="text-lg text-gray-800 mb-8 leading-relaxed">
            {currentQ.text}
          </p>
          
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === opt;
              const labels = ['A', 'B', 'C', 'D', 'E'];
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(currentQ.id, opt)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center ${
                    isSelected 
                      ? 'border-primary-500 bg-primary-50 text-primary-900' 
                      : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${
                    isSelected ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {labels[idx]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
          <button
            disabled={currentQuestion === 1}
            onClick={() => setCurrentQuestion(q => q - 1)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Sebelumnya
          </button>
          
          {currentQuestion === totalQuestions ? (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 border border-transparent rounded-lg text-white bg-green-600 hover:bg-green-700 font-semibold shadow-md"
            >
              Selesai Ujian <CheckCircle2 className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(q => q + 1)}
              className="flex items-center px-4 py-2 border border-transparent rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-sm"
            >
              Selanjutnya <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>
      </div>

      <div className="w-full xl:w-80 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-72 xl:h-full shrink-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-slate-900 text-white shrink-0">
          <span className="font-semibold">Navigasi Soal</span>
          <span className="text-sm font-mono bg-slate-800 px-2 py-1 rounded">01:45:30</span>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="grid grid-cols-5 gap-2">
            {questions.map(q => {
              const isAnswered = !!answers[q.id];
              const isCurrent = currentQuestion === q.id;
              
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(q.id)}
                  className={`h-10 rounded-lg font-semibold text-sm border-2 transition-all flex flex-col items-center justify-center relative ${
                    isCurrent ? 'border-primary-600 ring-2 ring-primary-200' : 'border-transparent'
                  } ${
                    isAnswered 
                      ? 'bg-green-500 text-white border-green-600' 
                      : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {q.id}
                  {q.difficulty === 'Sulit' && !isAnswered && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 space-y-2 text-sm text-gray-600 border-t pt-4">
            <div className="flex items-center"><div className="w-3 h-3 rounded-sm bg-green-500 mr-2"></div> Sudah Dijawab</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-sm bg-gray-200 mr-2 border border-gray-300"></div> Belum Dijawab</div>
            <div className="flex items-center"><div className="w-3 h-3 rounded-sm bg-red-500 mr-2 rounded-full"></div> Indikator Soal Sulit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
