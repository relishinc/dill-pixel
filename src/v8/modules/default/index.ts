import { IModule } from '../IModule';
import { AssetManager } from './asset';
import { StateManager } from './state';

const defaultModules: (new () => IModule)[] = [AssetManager, StateManager];
export { defaultModules };
