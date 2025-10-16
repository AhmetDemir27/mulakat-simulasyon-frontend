import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { submitAnswer } from '../services/apiService';

interface InterviewPageProps {
  initialSessionData: any;
}

const InterviewPage = ({ initialSessionData }: InterviewPageProps) => {
  const [session] = useState(initialSessionData.sessionDetails);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: initialSessionData.firstQuestionText,
    id: initialSessionData.firstQuestionId,
  });
  const [answer, setAnswer] = useState('');
  const [lastFeedback, setLastFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = async () => {
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
      console.error("Cevap gönderilirken hata:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
            className="bg-slate-800 border-slate-600 text-white"
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