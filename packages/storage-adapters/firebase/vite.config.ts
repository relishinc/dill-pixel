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
      fileName: () => `dill-pixel-storage-adapter-firebase.mjs`,
    },
    rollupOptions: {
      external: ['pixi.js', 'dill-pixel', 'firebase/app', 'firebase/firestore'], // External dependencies
    },
  },
  plugins: [dts()],
});
