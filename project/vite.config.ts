import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/LIRGE-CLAUDIO/', // adicione esta linha
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
