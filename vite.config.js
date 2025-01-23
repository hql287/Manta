import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    plugins: [
      react(),
      tsconfigPaths(),
      electron({
        main: {
          entry: 'electron/app.js',
        },
        preload: {
          input: 'electron/preloads.mjs',
        },
        renderer: {},
      }),
    ],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/windows/main/index.html'),
          tour: resolve(__dirname, 'src/windows/tour/index.html'),
          dialog: resolve(__dirname, 'src/windows/dialog/index.html'),
        },
      },
    },
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@eMain': resolve(__dirname, 'electron/main'),
        '@eWindows': resolve(__dirname, 'electron/windows'),
        '@eUtils': resolve(__dirname, 'electron/utils'),
        '@uiChakra': resolve(__dirname, 'src/chakra'),
        '@uiConstants': resolve(__dirname, 'src/constants'),
        '@uiHelpers': resolve(__dirname, 'src/helpers'),
        '@uiLibs': resolve(__dirname, 'src/libs'),
        '@uiTypes': resolve(__dirname, 'src/types'),
        '@uiStatic': resolve(__dirname, 'src/static'),
        '@uiWindows': resolve(__dirname, 'src/windows'),
        '@uiSharedComponents': resolve(
          __dirname,
          'src/windows/main/components/shared'
        ),
        '@uiMainStore': resolve(__dirname, 'src/windows/main/store'),
        '@uiMainComponents': resolve(__dirname, 'src/windows/main/components'),
        '@uiMainPages': resolve(__dirname, 'src/windows/main/pages'),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  }
})
