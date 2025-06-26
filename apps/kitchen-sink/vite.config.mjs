// import { withPWA } from 'dill-pixel/config/vite';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      'dill-pixel': path.resolve(__dirname, '../../packages/framework/src'),
      '@dill-pixel/plugin-snap-physics': path.resolve(__dirname, '../../packages/plugins/physics-snap/src'),
      '@dill-pixel/plugin-matter-physics': path.resolve(__dirname, '../../packages/plugins/physics-matter/src'),
      '@dill-pixel/plugin-crunch-physics': path.resolve(__dirname, '../../packages/plugins/physics-crunch/src'),
      '@dill-pixel/plugin-springroll': path.resolve(__dirname, '../../packages/plugins/springroll/src'),
      '@dill-pixel/plugin-google-analytics': path.resolve(__dirname, '../../packages/plugins/google-analytics/src'),
      '@dill-pixel/plugin-rive': path.resolve(__dirname, '../../packages/plugins/rive/src'),
      '@dill-pixel/plugin-rollbar': path.resolve(__dirname, '../../packages/plugins/rollbar/src'),
      '@dill-pixel/storage-adapter-firebase': path.resolve(__dirname, '../../packages/storage-adapters/firebase/src'),
      '@dill-pixel/storage-adapter-supabase': path.resolve(__dirname, '../../packages/storage-adapters/supabase/src'),
    },
  },
});
