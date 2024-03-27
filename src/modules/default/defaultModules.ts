import type { IModule } from '../Module';
import { AssetManager } from './AssetManager';
import { AudioManager } from './audio/AudioManager';
import { FocusManager } from './focus/FocusManager';
import { i18nModule } from './i18nModule';
import { KeyboardManager } from './KeyboardManager';
import { PopupManager } from './popups/PopupManager';
import { SceneManager } from './SceneManager';
import { StatsModule } from './StatsModule';
import { WebEventsManager } from './WebEventsManager';

// define a set of default modules that all apps will probably want to use
const defaultModules: (new () => IModule)[] = [
  AssetManager,
  SceneManager,
  WebEventsManager,
  KeyboardManager,
  FocusManager,
  PopupManager,
  AudioManager,
  StatsModule,
  i18nModule,
];

export default defaultModules;
