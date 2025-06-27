import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: 'https://front-mission.bigs.or.kr',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/auth/, '/auth'),
      },
      '/boards': {
        target: 'https://front-mission.bigs.or.kr',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/boards/, '/boards'),
      },
    },
  },
})