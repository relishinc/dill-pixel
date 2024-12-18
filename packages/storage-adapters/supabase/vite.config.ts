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
      fileName: () => `dill-pixel-storage-adapter-supabase.mjs`,
    },
    rollupOptions: {
      external: ['pixi.js', 'dill-pixel', '@supabase/supabase-js'], // External dependencies
    },
  },
  plugins: [dts()],
});
