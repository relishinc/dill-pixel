import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: './lib',
    sourcemap: true,
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'dill-pixel-plugin-snap-physics',
      fileName: (format) => `dill-pixel-plugin-snap-physics.${format}.js`,
    },
    rollupOptions: {
      external: ['pixi.js', 'gsap'], // External dependencies
      input: {
        'dill-pixel-plugin-snap-physics': path.resolve(__dirname, 'src/index.ts'),
      },
      output: {
        format: 'es',
        dir: 'lib',
        inlineDynamicImports: false,
        entryFileNames: '[name].mjs',
        globals: {
          'pixi.js': 'pixi.js',
          gsap: 'gsap',
        },
      },
    },
  },
});
