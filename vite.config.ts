import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // path modülünü import et

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@" sembolünün "./src" klasörüne karşılık geldiğini belirtiyoruz.
      "@": path.resolve(__dirname, "./src"),
    },
  },
})