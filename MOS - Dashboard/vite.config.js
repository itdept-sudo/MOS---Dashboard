import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://mosdatabase-backend.k9pirj.easypanel.host',
        changeOrigin: true,
        secure: false,
        headers: {
          'X-API-Key': 'MOS_API_83d2f91a6c5b0b4e2d8e4f5a1c2d3e4f'
        }
      }
    }
  }
})
