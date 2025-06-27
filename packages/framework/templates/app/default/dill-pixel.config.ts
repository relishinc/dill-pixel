import { __APPLICATION_NAME__ } from '@/__APPLICATION_NAME__';
import { defineActions, defineButtons, defineConfig, defineContexts, defineControls, defineData } from 'dill-pixel';
/** Default template */
// uncomment this to use the splash screen
// import { Splash } from '@/scenes/Splash';

// TODO: Add custom contexts here if desired
// by default, we use the default contexts
export const contexts = defineContexts(); // e.g.

// TODO: Add actions here
export const actions = defineActions(contexts, {});

// TODO: Add buttons here
const buttons = defineButtons();

// TODO: Add controls here
export const controls = defineControls(actions, buttons);
/** End of Default Template */

// TODO: Define your data schema here
export const initialData = defineData({
  tangy: 'dill',
});

export default defineConfig({
  id: '__APPLICATION_NAME__',
  application: __APPLICATION_NAME__,
  // uncomment this to use the splash screen
  // splash: {
  //   view: Splash,
  // },
  defaultSceneLoadMethod: 'immediate',
  defaultScene: 'start',
  useLayout: true,
  data: {
    initial: initialData,
    backupKeys: [],
    backupAll: false,
  },
  actions,
  input: {
    controls,
  },
  assets: {
    preload: {
      bundles: ['required'],
    },
    background: {
      bundles: ['audio'],
    },
  },
  plugins: [],
  storageAdapters: [],
  resizer: {
    minWidth: 500,
    minHeight: 768,
  },
});
/** End of User config */
