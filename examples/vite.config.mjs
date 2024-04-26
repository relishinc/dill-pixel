import path from 'node:path';
import { extendConfig } from '../config/vite.mjs';

export default extendConfig({
  resolve: {
    alias: {
      'dill-pixel': path.resolve(__dirname, '../src'),
    },
  },
});
