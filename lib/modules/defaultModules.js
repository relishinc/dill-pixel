import { AssetManager } from './AssetManager';
import { AudioManager } from './audio/AudioManager';
import { FocusManager } from './focus/FocusManager';
import { i18nModule } from './i18nModule';
import { KeyboardManager } from './KeyboardManager';
import { PopupManager } from './popups/PopupManager';
import { Resizer } from './Resizer';
import { SceneManager } from './SceneManager';
import { StatsModule } from './StatsModule';
import { WebEventsManager } from './WebEventsManager';
// define a set of default modules that all apps will probably want to use
const defaultModules = [
    AssetManager,
    SceneManager,
    WebEventsManager,
    KeyboardManager,
    FocusManager,
    PopupManager,
    AudioManager,
    StatsModule,
    // PixiStatsModule, doesn't work for pixi v8
    i18nModule,
    Resizer,
];
export default defaultModules;
//# sourceMappingURL=defaultModules.js.map