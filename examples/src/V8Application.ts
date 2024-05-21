import EN from '@/locales/en';
import { AppConfig, Application, create, LoadSceneMethod, LocalStorageAdapter } from 'dill-pixel';

import { Assets } from 'pixi.js';
import manifest from './assets.json';
import { ExampleOutliner } from './ui/ExampleOutliner';
import TestAdapter from '@/adapters/TestAdapter';
import SnapPhysicsPlugin from '@dill-pixel/plugin-snap-physics';

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
      module: SnapPhysicsPlugin,
      // module: () => import('@dill-pixel/plugin-snap-physics'),
      options: {
        useSpatialHashGrid: false,
        gridCellSize: 300,
        fps: 60,
      },
    },
  ],
  storageAdapters: [
    { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
    { id: 'test', module: TestAdapter, options: { foo: 'bar' } },
  ],
  scenes: [
    {
      id: 'audio',
      debugLabel: 'Audio',
      namedExport: 'AudioScene',
      module: () => import('@/scenes/AudioScene'),
    },
    {
      id: 'voiceover',
      debugLabel: 'Voiceover / Captions',
      namedExport: 'VoiceoverScene',
      module: () => import('@/scenes/VoiceoverScene'),
    },
    {
      id: 'focus',
      debugLabel: 'Focus Management',
      namedExport: 'FocusScene',
      module: () => import('@/scenes/FocusScene'),
    },
    {
      id: 'popups',
      debugLabel: 'Popup Management',
      namedExport: 'PopupScene',
      module: () => import('@/scenes/PopupScene'),
    },
    {
      id: 'spine',
      debugLabel: 'Spine Testing',
      namedExport: 'SpineScene',
      module: () => import('@/scenes/SpineScene'),
    },
    {
      id: 'flexContainer',
      debugLabel: 'Flex Container',
      namedExport: 'FlexContainerScene',
      module: () => import('@/scenes/FlexContainerScene'),
    },
    {
      id: 'uiCanvas',
      debugLabel: 'UICanvas',
      namedExport: 'UICanvasScene',
      module: () => import('@/scenes/UICanvasScene'),
    },
    {
      id: 'physics',
      debugLabel: 'Snap Physics',
      namedExport: 'SnapPhysicsScene',
      module: () => import('@/scenes/SnapPhysicsScene'),
      plugins: ['physics'],
    },
    {
      id: 'runner',
      debugLabel: 'Endless Runner',
      namedExport: 'EndlessRunnerScene',
      module: () => import('@/scenes/EndlessRunnerScene'),
      plugins: ['physics'],
    },
  ],
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
