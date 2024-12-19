import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { pluginListPlugin, sceneListPlugin, storageAdapterListPlugin } from './config/vite/vite-dill-pixel-plugins.mjs';
export default defineConfig({
  build: {
    outDir: './lib',
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: () => `dill-pixel.mjs`,
    },
    rollupOptions: {
      external: ['pixi.js', 'gsap'],
    },
  },
  plugins: [storageAdapterListPlugin(false),pluginListPlugin(false),sceneListPlugin(false), dts()],
});
