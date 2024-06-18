import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: './lib',
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: () => `dill-pixel-plugin-snap-physics.mjs`,
    },
    rollupOptions: {
      external: ['pixi.js', 'gsap', 'dill-pixel'], // External dependencies
    },
  },
  plugins: [dts()],
});
