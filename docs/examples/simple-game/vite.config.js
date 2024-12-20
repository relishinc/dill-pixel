import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('vite').UserConfig} */
export default defineConfig((config) => ({
  ...config,
  target: 'esnext',
  logLevel: 'info',
  plugins: [
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
          src: normalizePath(path.resolve(__dirname, './src/assets/spine/*')),
          dest: './assets/spine',
        },
        {
          src: normalizePath(path.resolve(__dirname, './src/assets/fonts/*')),
          dest: './assets/fonts',
        },
        {
          src: normalizePath(path.resolve(__dirname, './src/assets/audio/output/*')),
          dest: './assets/audio',
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
