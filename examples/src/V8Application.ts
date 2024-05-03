import EN from '@/locales/en';
import { scenes } from '@/scenes';
import { Application, create, LoadSceneMethod, LocalStorageAdapter } from '@relish-studios/dill-pixel';

import { Assets } from 'pixi.js';
import manifest from './assets.json';

export class V8Application extends Application {
  setup() {
    return Assets.loadBundle(['required', 'game']);
  }
}

const appConfig = {
  id: 'V8Application',
  manifest: manifest,
  plugins: [
    {
      id: 'physics',
      namedExport: 'TowerFallPhysicsPlugin',
      module: () => import('../../src/plugins/physics/towerfall'),
      autoLoad: false,
    },
  ],
  storageAdapters: [
    { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
    { id: 'test', module: () => import('@/adapters/TestAdapter'), options: { foo: 'bar' } },
  ],
  scenes: scenes,
  i18n: {
    loadAll: true,
    locales: ['en', 'fr', 'fr-json'],
    files: [
      { id: 'en', module: EN },
      { id: 'fr', module: () => import('@/locales/fr') },
      { id: 'fr-json', json: '/locales/fr.json' },
    ],
  },
  resizer: {
    minSize: { width: 960, height: 600 },
  },
  defaultSceneLoadMethod: 'exitEnter' as LoadSceneMethod,
  useSpine: true,
  showStats: true,
  preference: 'webgl' as 'webgl' | 'webgpu' | 'canvas',
  showSceneDebugMenu: true,
};

export function bootstrap() {
  return create(V8Application, appConfig);
}

bootstrap();
