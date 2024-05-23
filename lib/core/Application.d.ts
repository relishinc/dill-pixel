import { Application as PIXIPApplication, ApplicationOptions, AssetsManifest, DestroyOptions, Point, Renderer, RendererDestroyOptions } from 'pixi.js';
import { IScene } from '../display/Scene';
import { IAssetsPlugin } from '../plugins/AssetsPlugin';
import { IAudioManagerPlugin } from '../plugins/audio/AudioManagerPlugin';
import { IVoiceOverPlugin } from '../plugins/audio/VoiceOverPlugin';
import { CaptionsOptions, ICaptionsPlugin } from '../plugins/captions/CaptionsPlugin';
import { FocusManagerPluginOptions, IFocusManagerPlugin } from '../plugins/focus/FocusManagerPlugin';
import { i18nOptions, Ii18nPlugin } from '../plugins/i18nPlugin';
import { IInputPlugin } from '../plugins/input/InputPlugin';
import { Action, ActionContext } from '../plugins/input/actions';
import { IKeyboardPlugin } from '../plugins/KeyboardPlugin';
import { IPlugin } from '../plugins/Plugin';
import { IPopupManagerPlugin } from '../plugins/popups/PopupManagerPlugin';
import { IResizerPlugin, ResizerPluginOptions } from '../plugins/ResizerPlugin';
import { ISceneManagerPlugin, LoadSceneMethod } from '../plugins/SceneManagerPlugin';
import { IWebEventsPlugin } from '../plugins/WebEventsPlugin';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store/adapters/StorageAdapter';
import { IStore } from '../store/Store';
import { ImportList, ImportListItem, SceneImportList, Size, WithRequiredProps } from '../utils/types';
import { ICoreFunctions } from './ICoreFunctions';
import { ICoreSignals } from './ICoreSignals';
import { ActionSignal } from '../plugins/input/types';

export interface IApplicationOptions extends ApplicationOptions {
    id: string;
    resizeToContainer: boolean;
    useStore: boolean;
    useSpine: boolean;
    useVoiceover: boolean;
    storageAdapters: ImportList<IStorageAdapter>;
    plugins: ImportList<IPlugin>;
    scenes: SceneImportList<IScene>;
    focusOptions: Partial<FocusManagerPluginOptions>;
    defaultScene: string;
    defaultSceneLoadMethod: LoadSceneMethod;
    showSceneDebugMenu: boolean;
    manifest: AssetsManifest | Promise<AssetsManifest> | string;
    i18n: Partial<i18nOptions>;
    resizer: Partial<ResizerPluginOptions>;
    captions: Partial<CaptionsOptions>;
    showStats: boolean;
}
export type AppConfig = WithRequiredProps<IApplicationOptions, 'id'>;
export interface IApplication extends PIXIPApplication {
    config: Partial<IApplicationOptions>;
    readonly size: Size;
    readonly center: Point;
    manifest: AssetsManifest | string | undefined;
    assets: IAssetsPlugin;
    scenes: ISceneManagerPlugin;
    webEvents: IWebEventsPlugin;
    keyboard: IKeyboardPlugin;
    focus: IFocusManagerPlugin;
    popups: IPopupManagerPlugin;
    audio: IAudioManagerPlugin;
    i18n: Ii18nPlugin;
    resizer: IResizerPlugin;
    input: IInputPlugin;
    store: IStore;
    actionContext: string | ActionContext;
    onPause: Signal<() => void>;
    onResume: Signal<() => void>;
    readonly appName: string;
    readonly appVersion: string | number;
    actions(action: string): ActionSignal;
    initialize(config: AppConfig): Promise<IApplication>;
    postInitialize(): Promise<void>;
    getPlugin<T extends IPlugin>(name: string): T;
}
export declare class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
    static containerId: string;
    static containerElement: HTMLElement;
    protected static instance: IApplication;
    __dill_pixel_method_binding_root: boolean;
    config: Partial<IApplicationOptions>;
    manifest: string | AssetsManifest | undefined;
    onPause: Signal<() => void>;
    onResume: Signal<() => void>;
    onResize: Signal<(size: Size) => void>;
    protected _plugins: Map<string, IPlugin>;
    protected _assetManager: IAssetsPlugin;
    protected _sceneManager: ISceneManagerPlugin;
    protected _webEventsManager: IWebEventsPlugin;
    protected _keyboardManager: IKeyboardPlugin;
    protected _focusManager: IFocusManagerPlugin;
    protected _popupManager: IPopupManagerPlugin;
    protected _audioManager: IAudioManagerPlugin;
    protected _voiceoverPlugin: IVoiceOverPlugin;
    protected _captionsPlugin: ICaptionsPlugin;
    protected _actions: ActionSignal;
    constructor();
    protected _appVersion: string | number;
    get appVersion(): string | number;
    protected _appName: string;
    get appName(): string;
    protected _i18n: Ii18nPlugin;
    get i18n(): Ii18nPlugin;
    protected _resizer: IResizerPlugin;
    get resizer(): IResizerPlugin;
    protected _input: IInputPlugin;
    get input(): IInputPlugin;
    protected _store: IStore;
    get store(): IStore;
    protected _center: Point;
    get center(): Point;
    get assets(): IAssetsPlugin;
    get scenes(): ISceneManagerPlugin;
    get webEvents(): IWebEventsPlugin;
    get keyboard(): IKeyboardPlugin;
    get focus(): IFocusManagerPlugin;
    get size(): Size;
    get popups(): IPopupManagerPlugin;
    get audio(): IAudioManagerPlugin;
    get actionContext(): string | ActionContext;
    set actionContext(context: string | ActionContext);
    get voiceover(): IVoiceOverPlugin;
    get captions(): ICaptionsPlugin;
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
    loadPlugin(listItem: ImportListItem): Promise<void>;
    sendAction(action: string, data?: any): void;
    /**
     * Get a storage adapter by id
     * @param {string} adapterId
     * @returns {IStorageAdapter}
     */
    getStorageAdapter(adapterId: string): IStorageAdapter;
    /**
     * app hasn't been initialized yet
     * @protected
     * @example boot(){
     *     console.log(this.appVersion);
     * }
     * returns {Promise<void> | void}
     */
    protected boot(config?: Partial<IApplicationOptions>): Promise<void> | void;
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
//# sourceMappingURL=Application.d.ts.map