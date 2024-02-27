import type { IModule } from '../Module';
import { AssetManager } from './assets';
import { FocusManager } from './focus';
import { KeyboardManager } from './keyboard';
import { SceneManager } from './scenes';
import { WebEventsManager } from './web';

// define a set of default modules that all apps will probably want to use
const defaultModules: (new () => IModule)[] = [
  AssetManager,
  SceneManager,
  WebEventsManager,
  KeyboardManager,
  FocusManager,
];

export { defaultModules };

export { AssetManager, SceneManager, WebEventsManager, KeyboardManager, FocusManager };

export type { IAssetManager } from './assets';
export type { ISceneManager } from './scenes';
export type { IWebEventsManager } from './web';
export type { IKeyboardManager } from './keyboard';
export type { IFocusable, IFocusManager, FocusManagerOptions } from './focus';
