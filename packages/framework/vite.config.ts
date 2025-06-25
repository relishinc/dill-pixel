import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: './lib',
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        runtime: path.resolve(__dirname, 'src/runtime.ts'),
      },
      fileName: (format, entryName) => (entryName === 'index' ? `dill-pixel.mjs` : `${entryName}.mjs`),
    },
    rollupOptions: {
      external: ['pixi.js', 'gsap', 'dill-pixel-globals'],
    },
  },
  plugins: [dts({ copyDtsFiles: true })],
});
