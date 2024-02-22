import { IModule } from '../../IModule';
export interface IAssetManager extends IModule {
}
export declare class AssetManager implements IModule {
    readonly id: string;
    constructor();
    destroy(): void;
    initialize(): Promise<void>;
}
//# sourceMappingURL=AssetManager.d.ts.map