import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    root: isDev ? resolve(__dirname, 'src') : __dirname, // Set root to 'src' in development
    plugins: [react()],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/app/index.html'), // Main window entry
          tour: resolve(__dirname, 'src/windows/tour/index.html'), // Tour window entry
        },
      },
    },
    resolve: {
      alias: {
        '@app': resolve(__dirname, 'src/app'),
        '@windows': resolve(__dirname, 'src/windows'),
        '@mainUtils': resolve(__dirname, 'electron/utils'),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  }
})
