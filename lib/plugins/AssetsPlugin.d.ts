import { IPlugin, Plugin } from './Plugin';
import { IScene } from '../display';
import { Signal } from '../signals';
import { IApplication } from '../core';
import { SceneImportListItem } from '../utils';

export interface IAssetsPlugin extends IPlugin {
    onLoadStart: Signal<() => void>;
    onLoadProgress: Signal<(progress: number) => void>;
    onLoadComplete: Signal<() => void>;
    loadAssets(assets: string | string[]): Promise<void>;
    loadBundles(bundle: string | string[]): Promise<void>;
    loadSceneAssets(scene: IScene | SceneImportListItem<any>, background?: boolean): Promise<void>;
    unloadSceneAssets(scene: IScene | SceneImportListItem<any>): Promise<void>;
    loadRequired(): Promise<void>;
    loadBackground(): void;
}
export interface IAssetsPluginOptions {
    required?: {
        assets?: string | string[];
        bundles?: string | string[];
    };
    background?: {
        assets?: string | string[];
        bundles?: string | string[];
    };
}
export declare class AssetsPlugin extends Plugin implements IAssetsPlugin {
    readonly id: string;
    onLoadStart: Signal<() => void>;
    onLoadProgress: Signal<(progress: number) => void>;
    onLoadComplete: Signal<() => void>;
    private _required;
    private _background;
    initialize(_app: IApplication, options?: Partial<IAssetsPluginOptions>): Promise<void> | void;
    loadRequired(): Promise<void>;
    loadBackground(): void;
    loadAssets(assets: string | string[]): Promise<any>;
    loadBundles(bundle: string | string[]): Promise<any>;
    unloadSceneAssets(scene: IScene | SceneImportListItem<any>): Promise<void>;
    loadSceneAssets(scene: IScene | SceneImportListItem<any>, background?: boolean): Promise<void>;
    protected getCoreFunctions(): string[];
    protected getCoreSignals(): string[];
    private _handleLoadStart;
    private _handleLoadProgress;
    private _handleLoadComplete;
}
//# sourceMappingURL=AssetsPlugin.d.ts.map