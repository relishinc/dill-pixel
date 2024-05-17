import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';
export interface IAssetManager extends IPlugin {
}
export declare class AssetManager extends Plugin implements IAssetManager {
    destroy(): void;
}
