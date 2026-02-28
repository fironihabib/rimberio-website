import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'pages/menu.html'),
        product: resolve(__dirname, 'pages/product.html'),
        checkout: resolve(__dirname, 'pages/checkout.html'),
        reservation: resolve(__dirname, 'pages/reservation.html')
      }
    }
  }
});