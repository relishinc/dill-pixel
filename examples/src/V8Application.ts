import EN from '@/locales/en';
import { scenes } from '@/scenes';
import { AppConfig, Application, create, LoadSceneMethod, LocalStorageAdapter } from '@relish-studios/dill-pixel';

import { Assets } from 'pixi.js';
import manifest from './assets.json';
import { ExampleOutliner } from './ui/ExampleOutliner';

export class V8Application extends Application {
  setup() {
    return Assets.loadBundle(['required', 'game']);
  }
}

const appConfig: AppConfig = {
  id: 'V8Application',
  manifest: manifest,
  plugins: [
    {
      id: 'physics',
      namedExport: 'TowerFallPhysicsPlugin',
      module: () => import('../../src/plugins/physics/towerfall'),
      options: {
        gridCellSize: 100,
        fps: 60,
      },
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
  showSceneDebugMenu: true,
  focusOptions: {
    outliner: ExampleOutliner,
  },
};

void create(V8Application, appConfig);
