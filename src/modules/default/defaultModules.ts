import type { IModule } from '../Module';
import { AssetManager } from './AssetManager';
import { AudioManager } from './audio/AudioManager';
import { FocusManager } from './focus/FocusManager';
import { KeyboardManager } from './KeyboardManager';
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
  AudioManager,
  StatsModule,
];

export default defaultModules;
