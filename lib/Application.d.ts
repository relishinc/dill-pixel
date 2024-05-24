import { AssetsManifest, DestroyOptions, Renderer, RendererDestroyOptions, Application as PIXIPApplication, Point } from 'pixi.js';
import { IFocusManagerPlugin, Ii18nPlugin, IInputPlugin, IKeyboardPlugin, IPlugin, IPopupManagerPlugin, Action, ActionContext, ActionSignal, IAssetsPlugin, IAudioManagerPlugin, IResizerPlugin, ISceneManagerPlugin, IWebEventsPlugin } from './plugins';
import { Signal } from './signals';
import { IStorageAdapter, IStore } from './store';
import { ImportListItem, Size } from './utils';
import { AppConfig, IApplication, IApplicationOptions, ICoreFunctions, ICoreSignals } from './core';
import { IVoiceOverPlugin } from './plugins/audio/VoiceOverPlugin';
import { ICaptionsPlugin } from './plugins/captions';

export declare class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
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
    /**
     * Destroy the application
     * This will destroy all plugins and the store
     * @param {RendererDestroyOptions} rendererDestroyOptions
     * @param {DestroyOptions} options
     */
    destroy(rendererDestroyOptions?: RendererDestroyOptions, options?: DestroyOptions): void;
    setContainer(container: HTMLElement): void;
    initialize(config: AppConfig): Promise<IApplication>;
    getPlugin<T extends IPlugin>(pluginName: string): T;
    postInitialize(): Promise<void>;
    actions<T = any>(action: Action | string): ActionSignal<T>;
    getUnloadedPlugin(id: string): ImportListItem<IPlugin> | undefined;
    loadPlugin(listItem: ImportListItem, isDefault?: boolean): Promise<void>;
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