import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // dev server on 5173
    cors: true,
    proxy: {
        "/api/": {
            target: "https://e-shop-3vmo.onrender.com",
            changeOrigin: true,
            ws: true,
        },
        "/socket.io/": {
            target: "https://e-shop-3vmo.onrender.com",
            changeOrigin: true,
            ws: true,
        },
    },
},
})
