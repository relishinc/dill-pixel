import { Application as PIXIPApplication, ApplicationOptions, AssetsManifest, DestroyOptions, Point, Renderer, RendererDestroyOptions } from 'pixi.js';
import { IScene } from '../display/Scene';
import { IAssetManager } from '../plugins/AssetManager';
import { IAudioManager } from '../plugins/audio/AudioManager';
import { IVoiceOverPlugin } from '../plugins/audio/VoiceOverPlugin';
import { CaptionsOptions, ICaptionsPlugin } from '../plugins/captions/CaptionsPlugin';
import { FocusManagerOptions, IFocusManager } from '../plugins/focus/FocusManager';
import { i18nOptions, Ii18nPlugin } from '../plugins/i18nPlugin';
import { Action, ActionContext, ActionSignal, IInputManager } from '../plugins/InputManager';
import { IKeyboardManager } from '../plugins/KeyboardManager';
import { IPlugin } from '../plugins/Plugin';
import { IPopupManager } from '../plugins/popups/PopupManager';
import { IResizer, ResizerOptions } from '../plugins/Resizer';
import { ISceneManager, LoadSceneMethod } from '../plugins/SceneManager';
import { IWebEventsManager } from '../plugins/WebEventsManager';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store/adapters/StorageAdapter';
import { IStore } from '../store/Store';
import { ImportList, ImportListItem, SceneImportList, Size, WithRequiredProps } from '../utils/types';
import { ICoreFunctions } from './CoreFunctions';
import { ICoreSignals } from './CoreSignals';
export interface IApplicationOptions extends ApplicationOptions {
    id: string;
    resizeToContainer: boolean;
    useStore: boolean;
    useDefaults: boolean;
    useSpine: boolean;
    useVoiceover: boolean;
    storageAdapters: ImportList<IStorageAdapter>;
    plugins: ImportList<IPlugin>;
    scenes: SceneImportList<IScene>;
    focusOptions: Partial<FocusManagerOptions>;
    defaultScene: string;
    defaultSceneLoadMethod: LoadSceneMethod;
    showSceneDebugMenu: boolean;
    manifest: AssetsManifest | Promise<AssetsManifest> | string;
    i18n: Partial<i18nOptions>;
    resizer: Partial<ResizerOptions>;
    captions: Partial<CaptionsOptions>;
    showStats: boolean;
}
export type AppConfig = WithRequiredProps<IApplicationOptions, 'id'>;
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
    popups: IPopupManager;
    audio: IAudioManager;
    i18n: Ii18nPlugin;
    resizer: IResizer;
    input: IInputManager;
    store: IStore;
    actionContext: string | ActionContext;
    onPause: Signal<() => void>;
    onResume: Signal<() => void>;
    actions(action: string): ActionSignal;
    initialize(config: AppConfig): Promise<IApplication>;
    postInitialize(): Promise<void>;
    getPlugin<T extends IPlugin>(name: string): T;
}
export declare class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
    static containerId: string;
    static containerElement: HTMLElement;
    protected static instance: Application;
    config: Partial<IApplicationOptions>;
    manifest: string | AssetsManifest | undefined;
    onPause: Signal<() => void>;
    onResume: Signal<() => void>;
    onResize: Signal<(size: Size) => void>;
    protected _plugins: Map<string, IPlugin>;
    protected _assetManager: IAssetManager;
    protected _sceneManager: ISceneManager;
    protected _webEventsManager: IWebEventsManager;
    protected _keyboardManager: IKeyboardManager;
    protected _focusManager: IFocusManager;
    protected _popupManager: IPopupManager;
    protected _audioManager: IAudioManager;
    protected _voiceoverPlugin: IVoiceOverPlugin;
    protected _captionsPlugin: ICaptionsPlugin;
    protected _actions: ActionSignal;
    constructor();
    protected _i18n: Ii18nPlugin;
    get i18n(): Ii18nPlugin;
    protected _resizer: IResizer;
    get resizer(): IResizer;
    protected _input: IInputManager;
    get input(): IInputManager;
    protected _store: IStore;
    get store(): IStore;
    protected _center: Point;
    get center(): Point;
    get assets(): IAssetManager;
    get scenes(): ISceneManager;
    get webEvents(): IWebEventsManager;
    get keyboard(): IKeyboardManager;
    get focus(): IFocusManager;
    get size(): Size;
    get popups(): IPopupManager;
    get audio(): IAudioManager;
    get actionContext(): string | ActionContext;
    set actionContext(context: string | ActionContext);
    get voiceover(): IVoiceOverPlugin;
    get captions(): ICaptionsPlugin;
    /**
     * Returns the global signals
     */
    get globalSignals(): string[];
    /**
     * Returns the global functions
     * @returns {{[functionName: string]: any}}
     */
    get globalFunctions(): string[];
    get isMobile(): boolean;
    get isTouch(): boolean;
    get signal(): ICoreSignals;
    get func(): ICoreFunctions;
    get exec(): ICoreFunctions;
    private get views();
    static getInstance<T extends Application = Application>(): T;
    static createContainer(pId: string): HTMLDivElement;
    /**
     * Destroy the application
     * This will destroy all plugins and the store
     * @param {RendererDestroyOptions} rendererDestroyOptions
     * @param {DestroyOptions} options
     */
    destroy(rendererDestroyOptions?: RendererDestroyOptions, options?: DestroyOptions): void;
    initialize(config: AppConfig): Promise<IApplication>;
    getPlugin<T extends IPlugin>(pluginName: string): T;
    postInitialize(): Promise<void>;
    actions<T = any>(action: Action | string): ActionSignal<T>;
    getUnloadedPlugin(id: string): ImportListItem<IPlugin> | undefined;
    loadPlugin(listItem: ImportListItem): Promise<boolean | void>;
    sendAction(action: string, data?: any): void;
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
    protected registerPlugin(plugin: IPlugin, options?: any): Promise<void>;
    protected registerDefaultPlugins(): Promise<void>;
    protected registerPlugins(): Promise<void>;
    protected registerStorageAdapters(): Promise<void>;
    protected registerStorageAdapter(adapter: IStorageAdapter, adapterOptions: any): Promise<any>;
    /**
     * This is called after the application is initialized
     * You can be sure that
     * - all plugins are registered
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
