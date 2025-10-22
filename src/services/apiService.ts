import axios from 'axios';

// Backend API'nizin çalıştığı adresi buraya yazın
const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(
  (config) => {
    // Tarayıcının hafızasından 'accessToken' adıyla kaydettiğimiz JWT'yi al
    const token = localStorage.getItem('accessToken');
    
    // Eğer token varsa...
    if (token) {
      // İsteğin başlıklarına (headers) 'Authorization' başlığını ekle.
      // Değeri "Bearer [token]" formatında olmalıdır. Bu bir standarttır.
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Değiştirilmiş isteği yoluna devam etmesi için geri döndür.
    return config;
  },
  (error) => {
    // İstek yapılandırılırken bir hata olursa, hatayı reddet.
    return Promise.reject(error);
  }
);

// Mülakat başlatma isteği
export const startInterview = (data: { technology: string; difficulty: string; totalCountOfQuestion: number; }) => {
  return apiClient.post('/mulakatlar', data);
};

// Cevap gönderme isteği
export const submitAnswer = (sessionId: number, data: { questionId: number; answerText: string; }) => {
  return apiClient.post(`/mulakatlar/${sessionId}/answer`, data);
};

// YENİ EKLENEN FONKSİYON: Mülakatı bitirme isteği
export const finishInterview = (sessionId: number) => {
  // Backend'deki endpoint'in sonundaki slash'e dikkat edelim.
  // Controller'da "/{sessionId}/finish/" şeklinde olduğu için buraya da ekliyoruz.
  return apiClient.post(`/mulakatlar/${sessionId}/finish/`);
};

