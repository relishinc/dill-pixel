import { IModule } from '../IModule';
import { AssetManager } from './assets';
import { SceneManager } from './scenes';
import { WebEventsManager } from './web';

const defaultModules: (new () => IModule)[] = [AssetManager, SceneManager, WebEventsManager];
export { defaultModules };

export { AssetManager, SceneManager, WebEventsManager };

export type { IAssetManager } from './assets';
export type { ISceneManager } from './scenes';
export type { IWebEventsManager } from './web';
