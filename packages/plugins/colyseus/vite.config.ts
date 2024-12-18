import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: './lib',
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: () => `dill-pixel-plugin-colyseus.mjs`,
    },
    rollupOptions: {
      external: ['dill-pixel', 'pixi.js'], // External dependencies
    },
  },
  plugins: [dts()],
});
