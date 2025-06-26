import { CustomEases } from '@/utils/Easing';
import { defineActions, defineButtons, defineConfig, defineContexts, defineControls, defineData } from 'dill-pixel';
import EN from './src/locales/en';
import { Transition } from './src/scenes/Transition';
import { ExampleOutliner } from './src/ui/ExampleOutliner';
import { V8Application } from './src/V8Application';

/** Default template */
export const contexts = defineContexts(['default', 'game', 'menu', 'popup']);

export const actions = defineActions(contexts, {
  // keyboard down actions
  stop_move_left: { context: ['game'] },
  stop_move_right: { context: ['game'] },
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
/** Don't touch */

const buttons = defineButtons(['A', 'B']);

export const controls = defineControls(actions, buttons, {
  keyboard: {
    down: {
      move_left: ['ArrowLeft', 'A'],
      move_right: ['ArrowRight', 'D'],
      move_down: ['ArrowDown', 'S'],
      jump: ['ArrowUp', 'Space', 'W'],
      warp: 'Q',
      combo: 'Shift+L',
    },
    up: {
      toggle_pause: 'P',
      close: 'Escape',
      stop_move_left: ['ArrowLeft', 'A'],
      stop_move_right: ['ArrowRight', 'D'],
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

export type AnalyticsEvents = {
  foo: { bar: string; baz: number; qux: boolean };
};

export const dataSchema = defineData({
  foo: '' satisfies string,
  bar: 0 satisfies number,
  num: 0 satisfies number,
  saved: '' satisfies string,
  list: [] as string[],
  list2: [] as number[],
  baz: {
    qux: false satisfies boolean,
    quux: [] as string[],
  },
});

export default defineConfig({
  id: 'V8Application',
  application: V8Application,
  sceneTransition: Transition,
  defaultSceneLoadMethod: 'transitionExitEnter',
  useSpine: true,
  useLayout: true,
  showSceneDebugMenu: true,
  useVoiceover: true,
  defaultScene: 'assets',
  defaultTextStyle: {
    fontFamily: 'KumbhSans',
    fontSize: 24,
    fill: 0xffffff,
  },
  sceneGroupOrder: [
    'Start',
    'Framework',
    'Display',
    'Audio',
    'UI',
    'Accessibility',
    'Snap Physics',
    'Crunch Physics',
    'Matter Physics',
    'Rive',
    'Storage Adapters',
  ],
  gsap: {
    eases: CustomEases,
  },
  data: {
    initial: {
      bar: 5,
      saved: 'QUX',
      list: ['hello', 'world'],
      list2: [0, 1],
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
      bundles: ['splash', 'required', 'game'],
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
      'crunch-physics',
      {
        autoLoad: false,
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
      { id: 'fr', module: () => import('./src/locales/fr') },
      { id: 'fr-json', json: 'locales/fr.json' },
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
