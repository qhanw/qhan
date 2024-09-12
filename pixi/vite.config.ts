import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/p
export default defineConfig({
  plugins: [react(), UnoCSS()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },

  server: {
    proxy: {
      '^/api': {
        // 开发环境地址
        target: 'http://10.80.10.241:8083',
        changeOrigin: true,
      },
      '^/wss': {
        // 开发环境地址
        target: 'ws://10.80.10.241:8083',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/wss/, ''),
      },
    },
  },

  // build: { sourcemap: true },
});
