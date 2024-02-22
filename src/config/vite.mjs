import path from 'node:path';
import process from 'node:process';
import { mergeConfig, normalizePath } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteStaticCopy } from 'vite-plugin-static-copy';
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
    viteStaticCopy({
      watch: { reloadPageOnChange: true },
      targets: [
        {
          src: normalizePath(path.resolve(cwd, './src/assets/images/spritesheets/_output/*')),
          dest: './assets/images/spritesheets',
        },
        {
          src: normalizePath(path.resolve(cwd, './src/assets/images/static/**/*')),
          dest: './assets/images/static',
        },
        {
          src: normalizePath(path.resolve(cwd, './src/assets/json/*')),
          dest: './assets/json',
        },
        {
          src: normalizePath(path.resolve(cwd, './src/assets/spine/*')),
          dest: './assets/spine',
        },
        {
          src: normalizePath(path.resolve(cwd, './src/assets/fonts/*')),
          dest: './assets/fonts',
        },
        {
          src: normalizePath(path.resolve(cwd, './src/assets/audio/output/*')),
          dest: './assets/audio',
        },
      ],
    }),
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
