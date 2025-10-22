import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import InterviewPage from './components/InterviewPage';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';
import { useState } from 'react';

// Bu bileşen, bir rotanın korunup korunmayacağını kontrol eder.
const PrivateRoute = () => {
  // Tarayıcının hafızasında 'accessToken' adında bir kimlik kartı var mı?
  const isAuthenticated = localStorage.getItem('accessToken') != null;
  
  // Eğer kimlik kartı varsa, altındaki sayfaların (HomePage, InterviewPage) gösterilmesine izin ver.
  // Eğer yoksa, kullanıcıyı zorunlu olarak /login sayfasına yönlendir.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};


function App() {
  const [session, setSession] = useState<any>(null);

  const handleInterviewStart = (startedSession: any) => {
    setSession(startedSession);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    // Sayfanın yeniden yüklenmesini sağlayarak PrivateRoute'un tekrar kontrol yapmasını tetikleriz.
    window.location.href = '/login';
  };

  // Uygulamanın ana yapısı
  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans">
       <header className="w-full max-w-5xl mb-8 flex justify-between items-center">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 text-transparent bg-clip-text">
          Akıllı Mülakat Simülatörü
        </h1>
        {localStorage.getItem('accessToken') && (
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Çıkış Yap
          </button>
        )}
      </header>
      
      <main className="w-full max-w-3xl">
        <Routes>
          {/* Herkesin erişebileceği, korunmayan rotalar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

          {/* Sadece giriş yapmış kullanıcıların erişebileceği, korunan rotalar */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={
              !session ? (
                <HomePage onInterviewStart={handleInterviewStart} />
              ) : (
                <InterviewPage initialSessionData={session} />
              )
            }/>
          </Route>

          {/* Eğer hiçbir rota eşleşmezse, kullanıcıyı ana sayfaya yönlendir */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;