import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
  // react-router-dom'dan gelen yardımcı kancalar (hooks)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // URL'deki 'token' parametresini al
    const token = searchParams.get('token');

    if (token) {
      // Eğer bir token varsa, onu tarayıcının yerel deposuna kaydet
      localStorage.setItem('accessToken', token);
      console.log("Token başarıyla kaydedildi.");
      
      // Kullanıcıyı ana sayfaya yönlendir ('/' adresine)
      navigate('/');
    } else {
      // Eğer bir token yoksa, bir sorun var demektir. Giriş sayfasına yönlendir.
      console.error("OAuth2 yönlendirmesinde token bulunamadı.");
      navigate('/login');
    }
    // Bu effect sadece bir kez, bileşen yüklendiğinde çalışmalıdır.
  }, [navigate, searchParams]);

  // Bu bileşen ekranda hiçbir şey göstermez, sadece bir "yükleniyor" mesajı gösterir.
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-white">Giriş yapılıyor, lütfen bekleyin...</p>
    </div>
  );
};

export default OAuth2RedirectHandler;
