import { AssetManager } from './AssetManager';
import { AudioManager } from './audio/AudioManager';
import { FocusManager } from './focus/FocusManager';
import { i18nPlugin } from './i18nPlugin';
import { InputManager } from './InputManager';
import { KeyboardManager } from './KeyboardManager';
import type { IPlugin } from './Plugin';
import { PopupManager } from './popups/PopupManager';
import { Resizer } from './Resizer';
import { SceneManager } from './SceneManager';
import { WebEventsManager } from './WebEventsManager';

// define a set of default modules that all apps will probably want to use
const defaultPlugins: (new () => IPlugin)[] = [
  AssetManager,
  InputManager,
  SceneManager,
  WebEventsManager,
  KeyboardManager,
  FocusManager,
  PopupManager,
  AudioManager,

  i18nPlugin,
  Resizer,
];

export default defaultPlugins;
