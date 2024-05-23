import { IPlugin, Plugin } from './Plugin';

export interface IAssetsPlugin extends IPlugin {
}
export declare class AssetsPlugin extends Plugin implements IAssetsPlugin {
    readonly id: string;
    destroy(): void;
}
//# sourceMappingURL=AssetsPlugin.d.ts.map