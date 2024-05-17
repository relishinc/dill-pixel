import EN from '@/locales/en';
import { scenes } from '@/scenes';
import { AppConfig, Application, create, LoadSceneMethod, LocalStorageAdapter } from 'dill-pixel';

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
  antialias: true,
  plugins: [
    {
      id: 'physics',
      namedExport: 'SnapPhysicsPlugin',
      module: () => import('../../src/plugins/physics/snap'),
      options: {
        useSpatialHashGrid: false,
        gridCellSize: 300,
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
  captions: {
    files: [
      { id: 'en', json: 'audio/vo/en/cc.json' },
      { id: 'fr', json: 'audio/vo/fr/cc.json' },
    ],
    backgroundAlpha: 0.5,
    backgroundColor: 0x0,
    textColor: 0xffffff,
    maxWidth: 0.4,
  },
};

void create(V8Application, appConfig);
