import { Application as PIXIPApplication, ApplicationOptions, AssetsManifest, DestroyOptions, Point, Renderer, RendererDestroyOptions } from 'pixi.js';
import { IScene } from '../display/Scene';
import { IAssetManager } from '../modules/AssetManager';
import { IAudioManager } from '../modules/audio/AudioManager';
import { FocusManagerOptions, IFocusManager } from '../modules/focus/FocusManager';
import { i18nOptions, Ii18nModule } from '../modules/i18nModule';
import { IKeyboardManager } from '../modules/KeyboardManager';
import { IModule } from '../modules/Module';
import { IPopupManager } from '../modules/popups/PopupManager';
import { IResizer, ResizerOptions } from '../modules/Resizer';
import { ISceneManager, LoadSceneMethod } from '../modules/SceneManager';
import { IWebEventsManager } from '../modules/WebEventsManager';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store/adapters/StorageAdapter';
import { IStore } from '../store/Store';
import { AppSize, ImportList, Size, WithRequiredProps } from '../utils/types';
export interface IApplicationOptions extends ApplicationOptions {
    id: string;
    resizeToContainer: boolean;
    useStore: boolean;
    useDefaults: boolean;
    useSpine: boolean;
    storageAdapters: ImportList<IStorageAdapter>;
    modules: ImportList<IModule>;
    scenes: ImportList<IScene>;
    focusOptions: FocusManagerOptions;
    defaultScene: string;
    defaultSceneLoadMethod: LoadSceneMethod;
    showSceneDebugMenu: boolean;
    manifest: AssetsManifest | Promise<AssetsManifest> | string;
    i18n: Partial<i18nOptions>;
    resizer: Partial<ResizerOptions>;
    showStats: boolean;
}
export type RequiredApplicationConfig = WithRequiredProps<IApplicationOptions, 'id'>;
export interface IApplication extends PIXIPApplication {
    config: Partial<IApplicationOptions>;
    readonly size: Size;
    readonly center: Point;
    manifest: AssetsManifest | string | undefined;
    assets: IAssetManager;
    scenes: ISceneManager;
    webEvents: IWebEventsManager;
    keyboard: IKeyboardManager;
    focus: IFocusManager;
    initialize(config: RequiredApplicationConfig): Promise<IApplication>;
    postInitialize(): Promise<void>;
    getModule<T extends IModule>(name: string): T;
}
export declare class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
    config: Partial<IApplicationOptions>;
    manifest: string | AssetsManifest | undefined;
    protected static instance: Application;
    static containerId: string;
    static containerElement: HTMLElement;
    onResize: Signal<(size: AppSize) => void>;
    protected _modules: Map<string, IModule>;
    protected _assetManager: IAssetManager;
    protected _sceneManager: ISceneManager;
    protected _webEventsManager: IWebEventsManager;
    protected _keyboardManager: IKeyboardManager;
    protected _focusManager: IFocusManager;
    protected _popupManager: IPopupManager;
    protected _audioManager: IAudioManager;
    protected _i18n: Ii18nModule;
    protected _resizer: IResizer;
    protected _store: IStore;
    protected _center: Point;
    static getInstance<T extends Application = Application>(): T;
    static createContainer(pId: string): HTMLDivElement;
    constructor();
    get assets(): IAssetManager;
    get scenes(): ISceneManager;
    get webEvents(): IWebEventsManager;
    get keyboard(): IKeyboardManager;
    get focus(): IFocusManager;
    get center(): Point;
    get size(): AppSize;
    get i18n(): Ii18nModule;
    get popups(): IPopupManager;
    get audio(): IAudioManager;
    get resizer(): IResizer;
    get store(): IStore;
    /**
     * Returns the global signals
     */
    get globalSignals(): string[];
    /**
     * Returns the global functions
     * @returns {{[functionName: string]: any}}
     */
    get globalFunctions(): string[];
    private get views();
    /**
     * Destroy the application
     * This will destroy all modules and the store
     * @param {RendererDestroyOptions} rendererDestroyOptions
     * @param {DestroyOptions} options
     */
    destroy(rendererDestroyOptions?: RendererDestroyOptions, options?: DestroyOptions): void;
    initialize(config: RequiredApplicationConfig): Promise<IApplication>;
    getModule<T extends IModule>(moduleName: string): T;
    postInitialize(): Promise<void>;
    /**
     * Connect to a global signal
     * signals registered in core modules are added to the global signal registry
     * and can be connected to from anywhere in the application
     * syntactically, we remove the "on" from the signal name, and lowercase the first letter
     * e.g. "onSceneChangeComplete" becomes "sceneChangeComplete"
     * @example app.on('sceneChangeComplete').connect(() => {...}) is the same as app.scene.onSceneChangeComplete.connect(() => {...})
     * unfortunately, the signal's type is lost, so you will have to cast it to the correct type when using the global signal registry
     * @param {string} signalName
     * @returns {Signal<any>}
     */
    on(signalName: string): Signal<any>;
    /**
     * Call a global function
     * functions registered in core modules are added to the global function registry
     * and can be called from anywhere in the application
     * @example app.func('onKeyDown', 'enter').connect(() => {...})
     * @param {string} functionName
     * @param args
     * @returns {any}
     */
    func(functionName: string, ...args: any[]): any;
    /**
     * Get a storage adapter by id
     * @param {string} adapterId
     * @returns {IStorageAdapter}
     */
    getStorageAdapter(adapterId: string): IStorageAdapter;
    /**
     * Pre-initialize the application
     * This is called before the application is initialized
     * should register any pixi extensions, etc
     * @param {Partial<IApplicationOptions>} config
     * @returns {Promise<void>}
     * @protected
     */
    protected preInitialize(config: Partial<IApplicationOptions>): Promise<void>;
    protected registerModule(module: IModule, options?: any): Promise<void>;
    protected registerDefaultModules(): Promise<void>;
    protected registerModules(): Promise<void>;
    protected registerStorageAdapters(): Promise<void>;
    protected registerStorageAdapter(adapter: IStorageAdapter, adapterOptions: any): Promise<any>;
    /**
     * This is called after the application is initialized
     * You can be sure that
     * - all modules are registered
     * - the store is created, with all storage adapters registered
     * @protected
     */
    protected setup(): Promise<void> | void;
    protected initAssets(): Promise<void>;
    protected loadDefaultScene(): Promise<void>;
    private _resize;
    /**
     * Called after the application is initialized
     * Here we add application specific signal listeners, etc
     * @returns {Promise<void>}
     * @private
     */
    private _setup;
}
//# sourceMappingURL=Application.d.ts.map