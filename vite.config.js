import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  optimizeDeps: {
    exclude: ['mysql2', 'aws-ssl-profiles', 'iconv-lite'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  resolve: {
    alias: {
      // Add any path aliases if needed
    },
  },
  server: {
    proxy: {
      // Configure API proxies if needed
      'https://www.thinkprint.shop/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})