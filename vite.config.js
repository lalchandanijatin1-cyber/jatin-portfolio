import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    host: true
  },
  build: {
    target: 'es2019',
    sourcemap: false,
    rollupOptions: {
      input: {
        // Opening (existing entry — unchanged)
        main: resolve(__dirname, 'index.html'),

        // Home (new entry)
        home: resolve(__dirname, 'home.html')
      }
    }
  }
});