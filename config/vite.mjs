import path from 'node:path';
import process from 'node:process';
import { mergeConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import topLevelAwait from 'vite-plugin-top-level-await';
import wasm from 'vite-plugin-wasm';

const env = process.env.NODE_ENV;
const cwd = process.cwd();

const defaultConfig = {
  target: 'esnext',
  cacheDir: '.cache',
  logLevel: 'info',
  base: env === 'development' ? '/' : './',
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
  ],
  resolve: {
    alias: {
      '@': path.resolve(cwd, './src'),
    },
  },
};

function extendConfig(userConfig = {}) {
  return mergeConfig(defaultConfig, userConfig);
}

export { defaultConfig, extendConfig };
