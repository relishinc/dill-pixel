import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, normalizePath } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import("vite").UserConfig} */
export default defineConfig((config) => ({
  ...config,
  target: 'esnext',
  cacheDir: '.cache',
  logLevel: 'info',
  base: process.env.NODE_ENV === 'development' ? '/' : './',
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  preview: {
    host: true,
    port: 8080,
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    createHtmlPlugin(),
    viteStaticCopy({
      watch: { reloadPageOnChange: true },
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, './src/assets/images/spritesheets/_output/*')),
          dest: './assets/images/spritesheets',
        },
        {
          src: normalizePath(path.resolve(__dirname, './src/assets/images/static/**/*')),
          dest: './assets/images/static',
        },
        {
          src: normalizePath(path.resolve(__dirname, './src/assets/json/*')),
          dest: './assets/json',
        },
        {
          src: normalizePath(path.resolve(__dirname, './src/assets/fonts/*')),
          dest: './assets/fonts',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'dill-pixel': path.resolve(__dirname, '../src'),
    },
  },
}));
