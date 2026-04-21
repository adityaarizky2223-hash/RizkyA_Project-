import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';

export default function UjianSiswa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  
  // Create 30 Questions (mix of easy and hard)
  const totalQuestions = 30;
  const questions = Array.from({ length: totalQuestions }, (_, i) => ({
    id: i + 1,
    difficulty: i % 5 === 0 ? 'Sulit' : 'Gampang', // Every 5th question is hard
    text: `Contoh soal nomor ${i + 1} untuk simulasi CBT. Manakah jawaban yang paling tepat?`,
    options: ['Jawaban A', 'Jawaban B', 'Jawaban C', 'Jawaban D', 'Jawaban E']
  }));

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (qId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const currentQ = questions[currentQuestion - 1];

  const handleSubmit = () => {
    if (confirm("Apakah Anda yakin ingin menyelesaikan ujian ini? Sisa waktu masih ada.")) {
      alert("Ujian berhasil diselesaikan!");
      navigate('/app/hasil');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      {/* Main Question Area */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
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

      {/* Sidebar: Question Nav (30 numbers) */}
      <div className="w-full lg:w-80 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-slate-900 text-white">
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
