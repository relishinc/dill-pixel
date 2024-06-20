import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  define: {
    'process.env': 'import.meta.env',
  },
  build: {
    outDir: './lib',
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: () => `dill-pixel-storage-adapter-test.mjs`,
    },
    rollupOptions: {
      external: ['dill-pixel', 'pixi.js'], // External dependencies
    },
  },
  plugins: [dts()],
});
