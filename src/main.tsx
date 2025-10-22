import React from 'react'
import ReactDOM from 'react-dom/client'
// --- YENİ IMPORT ---
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* --- GÜNCELLEME: App bileşenini BrowserRouter ile sarmaladık --- */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)