import { Application, LocalStorageAdapter, create } from 'dill-pixel';

import EN from '@/locales/en';
import { ExampleOutliner } from './ui/ExampleOutliner';
import manifest from './assets.json';
import type { FirebaseAdapter } from '@dill-pixel/storage-adapter-firebase';

class V8Application extends Application {
  get firebase(): FirebaseAdapter {
    return this.store.getAdapter('firebase') as FirebaseAdapter;
  }
}

create(
  {
    id: 'V8Application',
    antialias: true,
    resizer: {
      minSize: { width: 500, height: 800 },
    },
    defaultSceneLoadMethod: 'exitEnter',
    useSpine: true,
    showStats: true,
    showSceneDebugMenu: true,
    focusOptions: {
      outliner: ExampleOutliner,
    },
    assets: {
      manifest: manifest,
      preload: {
        bundles: ['required', 'game'],
      },
      background: {
        bundles: ['audio', 'spine'],
      },
    },
    plugins: [
      {
        id: 'physics',
        module: () => import('@dill-pixel/plugin-snap-physics'),
        options: {
          useSpatialHashGrid: false,
          gridCellSize: 300,
        },
        autoLoad: false,
      },
      {
        id: 'arcade',
        module: () => import('@dill-pixel/plugin-arcade-physics'),
        options: {
          debug: true,
          useTree: true,
        },
        autoLoad: false,
      },
      {
        id: 'matter',
        module: () => import('@dill-pixel/plugin-matter-physics'),
        options: {
          debug: true,
        },
        autoLoad: false,
      },
    ],
    storageAdapters: [
      { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
      {
        id: 'firebase',
        namedExport: 'FirebaseAdapter',
        module: () => import('@dill-pixel/storage-adapter-firebase'),
      },
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
        assets: {
          preload: {
            bundles: ['spine'],
          },
        },
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
        id: 'runner',
        debugLabel: 'Endless Runner',
        namedExport: 'EndlessRunnerScene',
        module: () => import('@/scenes/EndlessRunnerScene'),
        plugins: ['physics'],
        assets: {
          preload: {
            bundles: ['spine'],
          },
        },
      },
      {
        id: 'physics',
        debugLabel: 'Snap Physics',
        namedExport: 'SnapPhysicsScene',
        module: () => import('@/scenes/SnapPhysicsScene'),
        plugins: ['physics'],
        assets: {
          preload: {
            bundles: ['spine'],
          },
        },
      },
      {
        id: 'arcade',
        debugLabel: 'Arcade Physics',
        namedExport: 'ArcadePhysicsScene',
        module: () => import('@/scenes/ArcadePhysicsScene'),
        plugins: ['arcade'],
        assets: {
          preload: {
            bundles: ['spine', 'game'],
          },
        },
      },
      {
        id: 'matter',
        debugLabel: 'Matter Physics',
        namedExport: 'MatterPhysicsScene',
        module: () => import('@/scenes/MatterPhysicsScene'),
        plugins: ['matter'],
        assets: {
          preload: {
            bundles: ['spine', 'game'],
          },
        },
      },
      {
        id: 'firebase',
        debugLabel: 'Firebase Storage Adapter',
        namedExport: 'FirebaseAdapterScene',
        module: () => import('@/scenes/FirebaseAdapterScene'),
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
  },
  V8Application,
);
