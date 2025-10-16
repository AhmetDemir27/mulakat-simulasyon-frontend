import { useState } from 'react';
import HomePage from './components/HomePage';
import InterviewPage from './components/InterviewPage';

function App() {
  const [session, setSession] = useState<any>(null);

  const handleInterviewStart = (startedSession: any) => {
    setSession(startedSession);
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans">
      <header className="w-full max-w-5xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 text-transparent bg-clip-text">
          Akıllı Mülakat Simülatörü
        </h1>
        <p className="text-slate-400 mt-2">Yapay zeka destekli mülakatlarla kendinizi geliştirin.</p>
      </header>
      
      <main className="w-full max-w-3xl">
        {!session ? (
          <HomePage onInterviewStart={handleInterviewStart} />
        ) : (
          <InterviewPage initialSessionData={session} />
        )}
      </main>
    </div>
  );
}

export default App;