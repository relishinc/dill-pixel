import { IModule } from '../IModule';
import { AssetManager } from './asset';
import { StateManager } from './state';
import { WebEventsManager } from './web';
declare const defaultModules: (new () => IModule)[];
export { defaultModules };
export { AssetManager, StateManager, WebEventsManager };
export type { IAssetManager } from './asset';
export type { IStateManager } from './state';
export type { IWebEventsManager } from './web';
//# sourceMappingURL=index.d.ts.map