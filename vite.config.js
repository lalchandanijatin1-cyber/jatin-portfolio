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

        // Home
        home: resolve(__dirname, 'home.html'),

        // Explore
        explore: resolve(__dirname, 'explore.html'),

        // Empty stub pages, one per Home menu item
        projects: resolve(__dirname, 'projects.html'),
        skills: resolve(__dirname, 'skills.html'),
        experience: resolve(__dirname, 'experience.html'),
        hobbies: resolve(__dirname, 'hobbies.html'),
        others: resolve(__dirname, 'others.html'),
        world: resolve(__dirname, 'world.html')
      }
    }
  }
});