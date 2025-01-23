import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './app', // Root directory for Vite (where index.html lives)
  build: {
    outDir: '../dist', // Output directory for build
    rollupOptions: {
      input: {
        main: './app/index.html', // Entry HTML file
      },
    },
  },
  resolve: {
    alias: {
      '@': '/app', // Shortcut for imports (e.g., '@/components')
    },
  },
});
