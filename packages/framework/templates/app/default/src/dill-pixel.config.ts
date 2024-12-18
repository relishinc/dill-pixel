import BaseScene from '@/scenes/BaseScene';
import { defineActions, defineButtons, defineConfig, defineContexts, defineControls } from 'dill-pixel';

/** Default template */
export const contexts = defineContexts([]); // e.g.

export const actions = defineActions(contexts, {});

/** Don't touch */
export type Contexts = (typeof contexts)[number];
export type ActionTypes = keyof typeof actions;
/** Don't touch */

const buttons = defineButtons();
export const controls = defineControls(actions, buttons);
/** End of Default Template */

/** User config */
export type Data = {
  dill: string;
  pixel: number;
};

export const config = defineConfig<Data>({
  id: '__APPLICATION_NAME__',
  defaultSceneLoadMethod: 'immediate',
  useSpine: true,
  showStats: true,
  showSceneDebugMenu: true,
  useHash: true,
  useVoiceover: false,
  data: {
    initial: {
      dill: 'pixel',
    },
    backupKeys: [],
    backupAll: false,
  },
  actions,
  input: {
    controls,
  },
  assets: {
    manifest: './assets.json',
    preload: {
      bundles: ['required'],
    },
    background: {
      bundles: ['audio'],
    },
  },
  plugins: [],
  scenes: [
    { id: 'base', active: false, module: BaseScene },
    {
      id: 'assets',
      debugLabel: 'Start',
      namedExport: 'StartScene',
      module: () => import('@/scenes/StartScene'),
    },
  ],
});
/** End of User config */
