import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { startInterview } from '@/services/apiService';
interface HomePageProps {
  onInterviewStart: (sessionData: any) => void;
}

const HomePage = ({ onInterviewStart }: HomePageProps) => {
  const [technology, setTechnology] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const DUMMY_USER_ID = 152; 

  const handleStart = async () => {
    if (!technology || !difficulty) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await startInterview({
        userId: DUMMY_USER_ID,
        technology,
        difficulty,
        soruSayisi: 5
      });
      onInterviewStart(response.data);
    } catch (err) {
      setError('Mülakat başlatılırken bir hata oluştu. Lütfen backend API\'nizin çalıştığından emin olun.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Yeni Mülakat Başlat</CardTitle>
        <CardDescription className="text-slate-400">Teknoloji ve zorluk seviyesi seçerek kendinizi test edin.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="technology" className="text-slate-300">Teknoloji</Label>
          <Input 
            id="technology" 
            placeholder="Örn: Java, Python, SQL..." 
            value={technology} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTechnology(e.target.value)} 
            className="bg-slate-800 border-slate-600 text-white" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="difficulty" className="text-slate-300">Zorluk Seviyesi</Label>
          <Select onValueChange={setDifficulty}>
            <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Seviye seçin" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-white">
              <SelectItem value="Easy">Kolay</SelectItem>
              <SelectItem value="Medium">Orta</SelectItem>
              <SelectItem value="Hard">Zor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={handleStart} disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-700">
          {isLoading ? 'Başlatılıyor...' : 'Mülakatı Başlat'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HomePage;