import { Application as PIXIPApplication, ApplicationOptions, DestroyOptions, Renderer, RendererDestroyOptions } from 'pixi.js';
import { IModule } from '../modules';
import { IAssetManager, IStateManager, IWebEventsManager } from '../modules/default';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store';
import { IStore } from '../store/Store';
import { WithRequiredProps } from '../utils';
export interface IApplicationOptions extends ApplicationOptions {
    id: string;
    useStore: boolean;
    useDefaults: boolean;
    useSpine: false;
    storageAdapters: ((new () => IStorageAdapter) | IStorageAdapter)[];
    customModules: ((new () => IModule) | IModule)[];
}
export type RequiredApplicationConfig = WithRequiredProps<IApplicationOptions, 'id'>;
export interface IApplication extends PIXIPApplication {
    asset: IAssetManager;
    state: IStateManager;
    initialize(config: RequiredApplicationConfig): Promise<IApplication>;
    getModule<T extends IModule>(name: string): T;
}
export declare class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
    protected static instance: Application;
    static containerId: string;
    onResize: Signal<(size: {
        width: number;
        height: number;
    }) => void>;
    protected config: Partial<RequiredApplicationConfig>;
    protected _modules: Map<string, IModule>;
    protected _assetManager: IAssetManager;
    protected _stateManager: IStateManager;
    protected _webEventsManager: IWebEventsManager;
    protected _store: IStore;
    static getInstance(): Application;
    static createContainer(pId: string): HTMLDivElement;
    constructor();
    get state(): IStateManager;
    get asset(): IAssetManager;
    get webEvents(): IWebEventsManager;
    get store(): IStore;
    /**
     * Destroy the application
     * This will destroy all modules and the store
     * @param {RendererDestroyOptions} rendererDestroyOptions
     * @param {DestroyOptions} options
     */
    destroy(rendererDestroyOptions?: RendererDestroyOptions, options?: DestroyOptions): void;
    initialize(config: RequiredApplicationConfig): Promise<IApplication>;
    getModule<T extends IModule>(moduleName: string): T;
    getStorageAdapter(adapterId: string): IStorageAdapter;
    protected preInitialize(): Promise<void>;
    protected postInitialize(): Promise<void>;
    protected registerModule(module: IModule): Promise<void>;
    protected registerDefaultModules(): Promise<void>;
    protected registerCustomModules(): Promise<void>;
    protected registerStorageAdapters(): Promise<void>;
    protected registerStorageAdapter(adapter: IStorageAdapter): Promise<any>;
    /**
     * Set up the application
     * This is called after the application is initialized
     * all modules are registered
     * and the store is created, with storage adapters registered
     * @protected
     */
    protected setup(): Promise<void> | void;
    private _onResize;
    /**
     * Called after the application is initialized
     * Here we add application specific signal listeners, etc
     * @returns {Promise<void>}
     * @private
     */
    private _setup;
}
//# sourceMappingURL=Application.d.ts.map