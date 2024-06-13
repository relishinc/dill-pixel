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
      fileName: () => `dill-pixel-plugin-rollbar.mjs`,
    },
    rollupOptions: {
      external: ['pixi.js', 'gsap', 'dill-pixel'], // External dependencies
    },
  },
  plugins: [dts()],
});
