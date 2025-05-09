import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  build: {
    outDir: './lib',
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: () => `dill-pixel-plugin-rive.mjs`,
    },
    rollupOptions: {
      external: ['dill-pixel', 'pixi.js', '@rive-app/canvas-advanced-lite'], // External dependencies
    },
  },
  plugins: [dts()],
});
