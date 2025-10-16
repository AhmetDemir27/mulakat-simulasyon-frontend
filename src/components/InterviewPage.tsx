import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { submitAnswer } from '@/services/apiService'; // finishInterview'ü şimdilik kaldırdık

interface InterviewPageProps {
  initialSessionData: any;
}

const InterviewPage = ({ initialSessionData }: InterviewPageProps) => {
  // --- DÜZELTME: initialSessionData'dan verileri güvenli bir şekilde ayıklayalım ---
  const [session] = useState(initialSessionData?.sessionDetails);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: initialSessionData?.firstQuestionText,
    id: initialSessionData?.firstQuestionId,
  });

  const [answer, setAnswer] = useState('');
  const [lastFeedback, setLastFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = async () => {
    // Güvenlik kontrolü: Session veya soru ID'si yoksa devam etme
    if (!session?.id || !currentQuestion?.id) {
      console.error("HATA: Session ID veya Soru ID tanımsız! İstek gönderilemiyor.");
      alert("Kritik bir hata oluştu: Oturum bilgileri eksik. Lütfen sayfayı yenileyin.");
      return;
    }
    if (!answer) return;

    setIsLoading(true);

    try {
      const response = await submitAnswer(session.id, {
        questionId: currentQuestion.id,
        answerText: answer,
      });

      const { answerEvaluation, nextQuestionText, nextQuestionId } = response.data;

      setLastFeedback(answerEvaluation);
      setAnswer('');

      if (nextQuestionId) {
        setCurrentQuestion({ text: nextQuestionText, id: nextQuestionId });
      } else {
        setIsFinished(true);
      }
    } catch (error) {
      console.error("Cevap gönderilirken API hatası:", error);
      alert("Sunucuya bağlanırken bir hata oluştu. Lütfen konsolu kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mülakat daha başlamadan bir sorun varsa
  if (!session || !currentQuestion) {
    return (
        <Card className="w-full max-w-lg bg-red-900 border-red-700 text-center">
            <CardHeader><CardTitle className="text-2xl text-white">Hata!</CardTitle></CardHeader>
            <CardContent>
                <p>Mülakat verileri yüklenemedi. Lütfen ana sayfaya dönüp tekrar deneyin.</p>
            </CardContent>
        </Card>
    );
  }

  // --- Geri kalan render kısmı aynı ---
  if (isFinished) {
    return (
      <Card className="w-full max-w-3xl bg-slate-900 border-slate-700 text-center">
        <CardHeader>
          <CardTitle className="text-3xl text-green-400">Mülakat Tamamlandı!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300">Tebrikler, mülakatı başarıyla tamamladınız.</p>
          {lastFeedback && (
             <Card className="mt-4 text-left bg-slate-800 border-slate-600">
                <CardHeader><CardTitle className="text-lg">Son Cevabınızın Değerlendirmesi</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-slate-300 mb-2"><strong className="text-white">Puan:</strong> {lastFeedback.puan}</p>
                    <p className="text-slate-300"><strong className="text-white">Geri Bildirim:</strong> {lastFeedback.callback}</p>
                </CardContent>
             </Card>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-3xl space-y-6">
      {lastFeedback && (
        <Card className="bg-slate-800 border-slate-600 animate-in fade-in-50">
          <CardHeader><CardTitle className="text-lg text-amber-400">Önceki Cevabın Değerlendirmesi</CardTitle></CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-2"><strong className="text-white">Puan:</strong> {lastFeedback.puan}</p>
            <p className="text-slate-300"><strong className="text-white">Geri Bildirim:</strong> {lastFeedback.callback}</p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Soru:</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-slate-300 whitespace-pre-wrap font-sans">{currentQuestion.text}</pre>
        </CardContent>
      </Card>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader><CardTitle className="text-xl text-white">Cevabınız:</CardTitle></CardHeader>
        <CardContent>
          <Textarea
            value={answer}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswer(e.target.value)}
            placeholder="Cevabınızı buraya yazın..."
            rows={10}
            className="bg-slate-800 border-slate-600 text-white focus-visible:ring-indigo-500"
          />
        </CardContent>
      </Card>
      
      <Button onClick={handleSubmit} disabled={isLoading} size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700">
        {isLoading ? 'Değerlendiriliyor...' : 'Cevabı Gönder ve Sonraki Soruya Geç'}
      </Button>
    </div>
  );
};

export default InterviewPage;

