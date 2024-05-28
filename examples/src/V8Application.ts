import EN from '@/locales/en';
import { create, LocalStorageAdapter } from 'dill-pixel';
import manifest from './assets.json';
import { ExampleOutliner } from './ui/ExampleOutliner';

create({
  id: 'V8Application',
  antialias: true,
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
        fps: 60,
      },
      autoLoad: false,
    },
  ],
  storageAdapters: [{ id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } }],
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
    minSize: { width: 500, height: 700 },
  },
  defaultSceneLoadMethod: 'exitEnter',
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
});
