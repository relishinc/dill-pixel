import EN from '@/locales/en';
import { Transition } from '@/Transition';
import { ExampleOutliner } from '@/ui/ExampleOutliner';
import { defineActions, defineButtons, defineConfig, defineContexts, defineControls } from 'dill-pixel';

/** Default template */
export const contexts = defineContexts(['default', 'game', 'menu', 'popup']);

export const actions = defineActions(contexts, {
  // keyboard down actions
  move_left: { context: ['game'] },
  move_right: { context: ['game'] },
  move_down: { context: ['game'] },
  warp: { context: ['game'] },
  jump: { context: ['game'] },
  combo: { context: '*' },
  // keyboard up actions
  toggle_pause: { context: '*' },
  close: { context: ['menu', 'popup'] },
  back: { context: ['menu'] },
  next: { context: ['menu'] },
  select: { context: ['menu', 'default'] },
  show_popup: { context: '*' },
  // firebase
  save_to_firebase: { context: '*' },
  load_from_firebase: { context: '*' },
  clear_firebase: { context: '*' },
  delete_from_firebase: { context: '*' },
  // physics
  drop: { context: ['game'] },
  // audio
  music: { context: '*' },
  sfx: { context: '*' },
  // voiceover
  vo: { context: '*' },
  pause_vo: { context: '*' },
  stop_vo: { context: '*' },
  caption_theme: { context: '*' },
});

/** Don't touch */
export type Contexts = (typeof contexts)[number];
export type ActionTypes = keyof typeof actions;
/** Don't touch */

const buttons = defineButtons(['A', 'B']);

export const controls = defineControls(actions, buttons, {
  keyboard: {
    down: {
      move_left: ['ArrowLeft', 'A'],
      move_right: ['ArrowRight', 'D'],
      move_down: ['ArrowDown', 'S'],
      jump: ['ArrowUp', 'Space'],
      warp: 'Q',
      combo: 'Shift+L',
    },
    up: {
      toggle_pause: 'P',
      close: 'Escape',
      back: 'ArrowLeft',
      next: 'ArrowRight',
      select: ['Enter', 'Space'],
    },
  },
  touch: {
    down: {
      jump: 'A',
      warp: 'B',
    },
    joystick: {
      move_left: ['left', 'bottom_left', 'top_left'],
      move_right: ['right', 'bottom_right', 'top_right'],
    },
  },
});
/** End of Default Template */

type Foo = {
  bar: string;
  baz: number;
};

/** User config */
export type Data = {
  foo: string;
  bar: number;
  num: number;
  saved: string;
  list: string[];
  list2: number[];
  list3: Foo[];
  baz: {
    qux: boolean;
    quux: string[];
  };
};

export type AnalyticsEvents = {
  foo: { bar: string; baz: number; qux: boolean };
};

export const config = defineConfig<Data>({
  id: 'V8Application',
  sceneTransition: Transition,
  defaultSceneLoadMethod: 'transitionExitEnter',
  useSpine: true,
  showSceneDebugMenu: true,
  useVoiceover: true,
  defaultScene: 'assets',
  sceneGroupOrder: ['Framework', 'Display', 'Audio', 'UI', 'Accessibility', 'Physics', 'Rive', 'Storage Adapters'],
  data: {
    initial: {
      bar: 5,
      saved: 'QUX',
      list: ['hello', 'world'],
      list2: [0, 1],
      list3: [{ bar: 'bar', baz: 0 }],
    },
    backupKeys: [],
  },
  focus: {
    outliner: ExampleOutliner,
  },
  actions,
  input: {
    controls,
  },
  assets: {
    preload: {
      bundles: ['required', 'game'],
    },
    background: {
      bundles: ['audio', 'spine'],
    },
  },
  plugins: [
    'test',
    'google-analytics',
    'springroll',
    [
      'snap-physics',
      {
        autoLoad: false,
        options: {
          debug: true,
          useSpatialHashGrid: false,
          gridCellSize: 300,
        },
      },
    ],
    [
      'arcade-physics',
      {
        autoLoad: false,
        options: {
          debug: true,
          useTree: true,
        },
      },
    ],
    [
      'matter-physics',
      {
        autoLoad: false,
        options: {
          debug: true,
        },
      },
    ],
    [
      'rive',
      {
        autoLoad: false,
      },
    ],
    [
      'rollbar',
      {
        options: {
          isDev: import.meta.env.MODE === 'development',
          environment: import.meta.env.MODE,
        },
      },
    ],
  ],
  storageAdapters: ['firebase'],
  i18n: {
    loadAll: true,
    locales: ['en', 'fr', 'fr-json'],
    files: [
      { id: 'en', module: EN },
      { id: 'fr', module: () => import('@/locales/fr') },
      { id: 'fr-json', json: 'locales/fr.json' },
    ],
  },
  captions: {
    files: [
      { id: 'en', json: './audio/vo/en/cc.json' },
      { id: 'fr', json: './audio/vo/fr/cc.json' },
    ],
    backgroundAlpha: 0.5,
    backgroundColor: 0x0,
    textColor: 0xffffff,
    maxWidth: 0.4,
  },
  autoDensity: false,
  resizeToContainer: true,
  resizer: {
    minWidth: 500,
    minHeight: 768,
    letterbox: false,
    center: false,
  },
  resolution: 2,
});
/** End of User config */
