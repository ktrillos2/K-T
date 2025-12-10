import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          spline: ['@splinetool/runtime', '@splinetool/react-spline'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
