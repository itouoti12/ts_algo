import { defineConfig } from 'vitest/config';
/// <reference types="vitest" />
// import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
        '@': __dirname + '/src',
    },
  },
  test: {
    globals: true,
    //導入できるならhappy-domを入れたい
    // environment: 'happy-dom',
    environment: 'jsdom',
    setupFiles: ['./setup.ts'],
    // deps: { inline: ['jquery'] },
  },
});
