import { extendConfig } from 'dill-pixel/config/vite';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default extendConfig({
  resolve: {
    alias: {
      'dill-pixel': path.resolve(__dirname, '../../../packages/framework/src'),
    },
  },
});
