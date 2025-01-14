import { extendConfig } from 'dill-pixel/config/vite';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default extendConfig({
  resolve: {
    alias: {
      'dill-pixel': path.resolve(__dirname, '../framework/src'),
      '@dill-pixel/plugin-snap-physics': path.resolve(__dirname, '../plugins/physics-snap/src'),
      '@dill-pixel/plugin-arcade-physics': path.resolve(__dirname, '../plugins/physics-arcade/src'),
      '@dill-pixel/plugin-matter-physics': path.resolve(__dirname, '../plugins/physics-matter/src'),
      '@dill-pixel/plugin-springroll': path.resolve(__dirname, '../plugins/springroll/src'),
      '@dill-pixel/plugin-google-analytics': path.resolve(__dirname, '../plugins/google-analytics/src'),
      '@dill-pixel/plugin-rive': path.resolve(__dirname, '../plugins/rive/src'),
      '@dill-pixel/plugin-rollbar': path.resolve(__dirname, '../plugins/rollbar/src'),
      '@dill-pixel/storage-adapter-firebase': path.resolve(__dirname, '../storage-adapters/firebase/src'),
      '@dill-pixel/storage-adapter-supabase': path.resolve(__dirname, '../storage-adapters/supabase/src'),
    },
  },
});
