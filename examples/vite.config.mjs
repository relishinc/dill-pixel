import { extendConfig } from 'dill-pixel/config/vite';
import path from 'node:path';

export default extendConfig({
  resolve: {
    alias: {
      'dill-pixel': path.resolve(__dirname, '../src'),
      '@dill-pixel/plugin-snap-physics': path.resolve(__dirname, '../packages/plugins/physics/snap/src'),
      '@dill-pixel/storage-adapter-supabase': path.resolve(__dirname, '../packages/storage-adapters/supabase/src'),
    },
  },
});
