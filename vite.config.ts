import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/LIRGE-CLAUDIO/', // ✅ caminho correto para GitHub Pages
  plugins: [react()],
});