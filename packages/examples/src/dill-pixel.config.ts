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
  // voiceover
  vo: { context: ['game'] },
  pause_vo: { context: ['game'] },
  stop_vo: { context: ['game'] },
  caption_theme: { context: ['game'] },
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

/** User config */
export type Data = {
  foo: string;
  bar: number;
  saved: string;
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
  showStats: true,
  showSceneDebugMenu: true,
  useHash: true,
  useVoiceover: true,
  data: {
    initial: {
      saved: 'QUX',
    },
    backupKeys: ['saved'],
  },
  focus: {
    outliner: ExampleOutliner,
  },
  actions,
  input: {
    controls,
  },
  assets: {
    manifest: 'assets.json',
    preload: {
      bundles: ['required', 'game'],
    },
    background: {
      bundles: ['audio', 'spine'],
    },
  },
  plugins: [
    'analytics',
    'springroll',
    [
      'snap-physics',
      {
        autoLoad: false,
        options: {
          useSpatialHashGrid: false,
          gridCellSize: 300,
        },
      },
    ],
    [
      'arcade',
      {
        autoLoad: false,
        options: {
          debug: true,
          useTree: true,
        },
      },
    ],
    [
      'matter',
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
});
/** End of User config */
