import type { IModule } from '../Module';
import AssetManager from './assets';
import AudioManager from './audio';
import FocusManager from './focus';
import KeyboardManager from './keyboard';
import SceneManager from './scenes';
import WebEventsManager from './web';

// define a set of default modules that all apps will probably want to use
const defaultModules: (new () => IModule)[] = [
  AssetManager,
  SceneManager,
  WebEventsManager,
  KeyboardManager,
  FocusManager,
  AudioManager,
];

export { defaultModules };

export { AssetManager, SceneManager, WebEventsManager, KeyboardManager, FocusManager, AudioManager };

export type { IAssetManager } from './assets';
export type { ISceneManager, LoadSceneMethod } from './scenes';
export type { IWebEventsManager } from './web';
export type { IKeyboardManager, KeyboardEventDetail } from './keyboard';
export type { IFocusable, IFocusManager, FocusManagerOptions } from './focus';
export type { IAudioManager } from './audio';
