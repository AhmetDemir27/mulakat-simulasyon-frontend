import axios from 'axios';

// Backend API'nizin çalıştığı adresi buraya yazın
const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mülakat başlatma isteği
export const startInterview = (data: { userId: number; technology: string; difficulty: string; totalCountOfQuestion: number; }) => {
  return apiClient.post('/mulakatlar', data);
};

// Cevap gönderme isteği
export const submitAnswer = (sessionId: number, data: { questionId: number; answerText: string; }) => {
  return apiClient.post(`/mulakatlar/${sessionId}/answer`, data);
};