import { extendConfig } from 'dill-pixel/vite';
import path from 'node:path';

export default extendConfig({
  build: {
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['@pixi/spine-pixi'],
  },
  resolve: {
    alias: {
      'dill-pixel': path.resolve(__dirname, '../src'),
    },
  },
});
