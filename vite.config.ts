import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
    react(),
    VitePWA({ manifest:{
      display: 'standalone',
      display_override: ['window-controls-overlay'],
      lang: 'es-ES',
      name: "Burger Queen",
      description: "La app sirve para ayudar a los trabajadores de un local de hamburguesas a tomar y ordenar pedidos",
      theme_color: "#F5F5F5",
      background_color: "#FEAE0D",
      icons: [
        {
          "src": "/public/half-logo.png",
          "sizes": "120x120",
          "type": "image/png"
        },
        {
          "src": "public/burger-queen-logo-background.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    } }) as unknown as import('vite').Plugin,
  ],
});
