import EN from '@/locales/en';
import { AppConfig, Application, create, LoadSceneMethod, LocalStorageAdapter } from 'dill-pixel';

import { Assets } from 'pixi.js';
import manifest from './assets.json';
import { ExampleOutliner } from './ui/ExampleOutliner';
import TestAdapter from '@/adapters/TestAdapter';

import { SupabaseAdapter } from '@dill-pixel/storage-adapter-supabase';
import type { Database } from './supabase';

export class V8Application extends Application {
  setup() {
    return Assets.loadBundle(['required', 'game']);
  }

  get supabase(): SupabaseAdapter<Database> {
    return this.store.getAdapter('supabase') as SupabaseAdapter<Database>;
  }
}

const appConfig: AppConfig = {
  id: 'V8Application',
  manifest: manifest,
  antialias: true,
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
  storageAdapters: [
    { id: 'local', module: LocalStorageAdapter, options: { namespace: 'v8app' } },
    {
      id: 'supabase',
      namedExport: 'SupabaseAdapter',
      module: () => import('@dill-pixel/storage-adapter-supabase'),
      options: {
        supabaseUrl: `https://kymsclfscdpzyguuioxy.supabase.co`,
        anonKey: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bXNjbGZzY2RwenlndXVpb3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxOTAzNjAsImV4cCI6MjAzMDc2NjM2MH0.QomlbjsmzucuX2RIJMsUxD12gMazY3e4-G4laYhr1PM`,
      },
    },
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
    {
      id: 'supabase',
      debugLabel: 'Supabase Storage Adapter',
      namedExport: 'SupabaseAdapterScene',
      module: () => import('@/scenes/SupabaseAdapterScene'),
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
