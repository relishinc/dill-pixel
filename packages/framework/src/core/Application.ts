import { gsap } from 'gsap';
import type { AppConfig, IApplication, IApplicationOptions, ICoreFunctions, ICoreSignals, PauseConfig } from '.';
import { coreFunctionRegistry, coreSignalRegistry, generateAdapterList, generatePluginList } from '.';
import type {
  Action,
  ActionContext,
  ActionSignal,
  IAssetsPlugin,
  IAudioManagerPlugin,
  IControls,
  IFocusManagerPlugin,
  Ii18nPlugin,
  IInputPlugin,
  IKeyboardPlugin,
  IPlugin,
  IPopupManagerPlugin,
  IResizerPlugin,
  ISceneManagerPlugin,
  IWebEventsPlugin,
} from '../plugins';

import type { AssetInitOptions, AssetsManifest, DestroyOptions, Renderer, RendererDestroyOptions } from 'pixi.js';
import { Assets, isMobile, Application as PIXIPApplication, Point, TextStyle } from 'pixi.js';
import type { DataSchema, IDataAdapter, IStorageAdapter, IStore } from '../store';
import { DataAdapter, Store } from '../store';
import type { ImportList, ImportListItem, Size } from '../utils';
import { bindAllMethods, getDynamicModuleFromImportListItem, isDev, isPromise, Logger } from '../utils';

import { createFactoryMethods, defaultFactoryMethods } from '../mixins';
import type { IActionsPlugin } from '../plugins/actions';
import type { IVoiceOverPlugin } from '../plugins/audio/VoiceOverPlugin';
import type { ICaptionsPlugin } from '../plugins/captions';
import { defaultPlugins } from '../plugins/defaults';
import { IFullScreenPlugin } from '../plugins/FullScreenPlugin';
import { ITimerPlugin } from '../plugins/TimerPlugin';
import { Signal } from '../signals';

function getDefaultResolution() {
  return typeof window !== 'undefined' ? (window.devicePixelRatio > 1 ? 2 : 1) : 2;
}

const defaultApplicationOptions: Partial<IApplicationOptions> = {
  antialias: false,
  autoStart: true,
  resizeToContainer: true,
  backgroundColor: 0x0,
  backgroundAlpha: 1,
  clearBeforeRender: false,
  context: null,
  eventFeatures: undefined,
  eventMode: undefined,
  hello: false,
  powerPreference: 'high-performance',
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  resizeTo: undefined,
  sharedTicker: true,
  view: undefined,
  autoDensity: false,
  defaultTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'normal',
    fontStyle: 'normal',
    align: 'left',
    breakWords: false,
    fill: 0,
    fontVariant: 'normal',
    leading: 0,
    letterSpacing: 0,
    lineHeight: 0,
    padding: 0,
    stroke: undefined,
    textBaseline: 'alphabetic',
    trim: false,
    whiteSpace: 'pre',
    wordWrap: false,
    wordWrapWidth: 100,
  },
  resolution: getDefaultResolution(), // must be 1 or 2
  // dill pixel options
  useHash: isDev,
  showSceneDebugMenu: isDev,
  showStats: isDev,
  useStore: true,
  useSpine: false,
  useVoiceover: false,
  storageAdapters: [],
  plugins: [],
  scenes: [],
  defaultSceneLoadMethod: 'immediate',
  assets: {
    manifest: './assets.json',
  },
};

const defaultPauseConfig: PauseConfig = {
  pauseAudio: false,
  pauseAnimations: false,
  pauseTicker: false,
  pauseTimers: false,
};

export class Application<
    D extends DataSchema = DataSchema,
    C extends ActionContext = ActionContext,
    A extends Action = Action,
    R extends Renderer = Renderer,
  >
  extends PIXIPApplication<R>
  implements IApplication<D, C, A>
{
  public static containerElement: HTMLElement;
  protected static instance: IApplication<DataSchema, ActionContext, Action>;
  public __dill_pixel_method_binding_root = true;
  // config
  public config: Partial<IApplicationOptions<D>>;
  public plugins: ImportList<IPlugin>;
  public storageAdapters: ImportList<IStorageAdapter>;
  public manifest: string | AssetsManifest | undefined;
  public onPause = new Signal<(config: PauseConfig) => void>();
  public onResume = new Signal<(config: PauseConfig) => void>();
  // signals
  public onResize = new Signal<(size: Size) => void>();
  // plugins
  protected _plugins: Map<string, IPlugin> = new Map();
  // default plugins
  protected _assetManager: IAssetsPlugin;
  protected _sceneManager: ISceneManagerPlugin;
  protected _webEventsManager: IWebEventsPlugin;
  protected _fullScreenPlugin: IFullScreenPlugin;
  protected _keyboardManager: IKeyboardPlugin;
  protected _focusManager: IFocusManagerPlugin;
  protected _popupManager: IPopupManagerPlugin;
  protected _timerPlugin: ITimerPlugin;
  protected _audioManager: IAudioManagerPlugin;
  protected _voiceoverPlugin: IVoiceOverPlugin;
  protected _captionsPlugin: ICaptionsPlugin;
  protected _actions: ActionSignal;
  protected _isBooting: boolean = true;

  protected _env: Record<string, string> = (import.meta as any).env || {};
  protected _makeFactory: typeof defaultFactoryMethods;

  protected _isFullScreen: boolean = false;
  protected _fullScreenElement: HTMLElement | Window | null = null;

  get make(): typeof defaultFactoryMethods {
    if (!this._makeFactory) {
      this._makeFactory = createFactoryMethods(defaultFactoryMethods, this, false);
    }
    return this._makeFactory;
  }

  get env() {
    return this._env;
  }

  protected _paused: boolean = false;
  protected _pauseConfig: Partial<PauseConfig> = {};

  public get paused(): boolean {
    return this._paused;
  }

  public pause(config?: Partial<PauseConfig>) {
    this._paused = true;
    this._pauseConfig = { ...defaultPauseConfig, ...config };
    if (config?.pauseAudio) {
      this.audio.pause();
    }
    if (config?.pauseAnimations) {
      gsap?.globalTimeline?.pause();
    }
    if (config?.pauseTicker) {
      this.ticker.stop();
    }
    if (config?.pauseTimers) {
      this.timers.pauseAllTimers();
    }
    if (config?.pauseOther) {
      config.pauseOther.forEach((thing) => {
        if (typeof thing?.pause === 'function') {
          thing.pause();
        }
      });
    }
    this.onPause.emit(this._pauseConfig);
  }

  public resume() {
    this._paused = false;
    if (this._pauseConfig.pauseAudio) {
      if (this.audio.paused) {
        this.audio.resume();
      }
    }
    if (this._pauseConfig.pauseAnimations) {
      if (gsap?.globalTimeline?.paused()) {
        gsap?.globalTimeline?.resume();
      }
    }
    if (this._pauseConfig.pauseTicker) {
      if (!this.ticker.started) {
        this.ticker.start();
      }
    }
    if (this._pauseConfig.pauseTimers) {
      this.timers.resumeAllTimers();
    }
    if (this._pauseConfig.pauseOther) {
      this._pauseConfig.pauseOther.forEach((thing) => {
        if (typeof thing?.resume === 'function') {
          thing.resume();
        }
      });
    }
    if (this._pauseConfig.clearOnResume) {
      this._pauseConfig = {};
    }
    this.onResume.emit(this._pauseConfig);
  }

  public togglePause(config?: Partial<PauseConfig>) {
    this._paused = !this._paused;
    if (this._paused) {
      this.pause(config);
    } else {
      this.resume();
    }
  }

  constructor() {
    super();
    bindAllMethods(this);
  }

  protected _appVersion: string | number;

  public get appVersion() {
    try {
      this._appVersion = __DILL_PIXEL_APP_VERSION;
    } catch (e) {
      this._appVersion = -1;
    }

    return this._appVersion;
  }

  protected _appName: string;

  public get appName(): string {
    if (!this._appName) {
      try {
        this._appName = __DILL_PIXEL_APP_NAME;
      } catch (e) {
        this._appName = 'n/a';
      }
    }
    return this._appName;
  }

  protected _i18n: Ii18nPlugin;

  public get i18n(): Ii18nPlugin {
    if (!this._i18n) {
      this._i18n = this.getPlugin<Ii18nPlugin>('i18n');
    }
    return this._i18n;
  }

  protected _resizer: IResizerPlugin;

  public get resizer(): IResizerPlugin {
    if (!this._resizer) {
      this._resizer = this.getPlugin<IResizerPlugin>('resizer');
    }
    return this._resizer;
  }

  // actions
  protected _actionsPlugin: IActionsPlugin<C>;

  public get actionsPlugin(): IActionsPlugin<C> {
    if (!this._actionsPlugin) {
      this._actionsPlugin = this.getPlugin<IActionsPlugin<C>>('actions');
    }
    return this._actionsPlugin;
  }

  // input
  protected _input: IInputPlugin;

  public get input(): IInputPlugin {
    if (!this._input) {
      this._input = this.getPlugin<IInputPlugin>('input');
    }
    return this._input;
  }

  // controls
  public get controls(): IControls {
    if (!this._input) {
      this._input = this.getPlugin<IInputPlugin>('input');
    }
    return this._input.controls;
  }

  // store
  protected _store: IStore;

  public get store(): IStore {
    return this._store;
  }

  // size
  protected _center = new Point(0, 0);

  public get center(): Point {
    return this._center;
  }

  public get assets(): IAssetsPlugin {
    if (!this._assetManager) {
      this._assetManager = this.getPlugin<IAssetsPlugin>('assets');
    }
    return this._assetManager;
  }

  public get scenes(): ISceneManagerPlugin {
    if (!this._sceneManager) {
      this._sceneManager = this.getPlugin<ISceneManagerPlugin>('scenes');
    }
    return this._sceneManager;
  }

  public get webEvents(): IWebEventsPlugin {
    if (!this._webEventsManager) {
      this._webEventsManager = this.getPlugin<IWebEventsPlugin>('webEvents');
    }
    return this._webEventsManager;
  }

  public get keyboard(): IKeyboardPlugin {
    if (!this._keyboardManager) {
      this._keyboardManager = this.getPlugin<IKeyboardPlugin>('keyboard');
    }
    return this._keyboardManager;
  }

  public get focus(): IFocusManagerPlugin {
    if (!this._focusManager) {
      this._focusManager = this.getPlugin<IFocusManagerPlugin>('focus');
    }
    return this._focusManager;
  }

  get size() {
    return this.resizer.size;
  }

  public get popups(): IPopupManagerPlugin {
    if (!this._popupManager) {
      this._popupManager = this.getPlugin<IPopupManagerPlugin>('popups');
    }
    return this._popupManager;
  }

  public get timers(): ITimerPlugin {
    if (!this._timerPlugin) {
      this._timerPlugin = this.getPlugin<ITimerPlugin>('timers');
    }
    return this._timerPlugin;
  }

  public get audio(): IAudioManagerPlugin {
    if (!this._audioManager) {
      this._audioManager = this.getPlugin<IAudioManagerPlugin>('audio');
    }
    return this._audioManager;
  }

  public get actionContext(): C {
    return this.actionsPlugin.context;
  }

  public set actionContext(context: C) {
    this.actionsPlugin.context = context;
  }

  public get voiceover(): IVoiceOverPlugin {
    if (!this._voiceoverPlugin) {
      this._voiceoverPlugin = this.getPlugin<IVoiceOverPlugin>('voiceover', this.config.useVoiceover);
    }
    return this._voiceoverPlugin;
  }

  public get captions(): ICaptionsPlugin {
    if (!this._captionsPlugin) {
      this._captionsPlugin = this.getPlugin<ICaptionsPlugin>('captions', this.config.useVoiceover);
    }
    return this._captionsPlugin;
  }
  /** Fullscreen plugin */
  public get fullScreen(): IFullScreenPlugin {
    if (!this._fullScreenPlugin) {
      this._fullScreenPlugin = this.getPlugin<IFullScreenPlugin>('fullscreen');
    }
    return this._fullScreenPlugin;
  }

  get fullScreenElement(): HTMLElement | Window | null {
    return this.fullScreen.fullScreenElement;
  }

  get isFullScreen(): boolean {
    return this.fullScreen.isFullScreen;
  }

  get canFullscreen(): boolean {
    return this.fullScreen.canFullscreen;
  }

  public setFullScreenElement(value: HTMLElement | Window | null) {
    this.fullScreen.setFullScreenElement(value);
  }

  public setFullScreen(value: boolean) {
    this.fullScreen.setFullScreen(value);
  }

  public toggleFullScreen() {
    this.fullScreen.toggleFullScreen();
  }
  /** End Fullscreen plugin */

  get isMobile() {
    return isMobile.any;
  }

  get isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  get signal(): ICoreSignals {
    return coreSignalRegistry;
  }

  get signals(): ICoreSignals {
    return this.signal;
  }

  get func(): ICoreFunctions {
    return coreFunctionRegistry;
  }

  get exec(): ICoreFunctions {
    return coreFunctionRegistry;
  }

  // views
  protected _views: any[];

  private get views(): any[] {
    if (!this._views) {
      this._views = [this.scenes.view, this.popups.view];
      if (this.scenes.splash.view) {
        this._views.push(this.scenes.splash.view);
      }
      if (this.scenes.transition) {
        this._views.push(this.scenes.transition);
      }
      if (this.captions?.view) {
        this._views.push(this.captions.view);
      }
    }
    return this._views;
  }

  public static getInstance<T extends Application = Application>(): T {
    return Application.instance as T;
  }

  /**
   * Destroy the application
   * This will destroy all plugins and the store
   * @param {RendererDestroyOptions} rendererDestroyOptions
   * @param {DestroyOptions} options
   */
  public destroy(rendererDestroyOptions?: RendererDestroyOptions, options?: DestroyOptions) {
    this._plugins.forEach((plugin) => {
      plugin.destroy();
    });
    this.store.destroy();
    super.destroy(rendererDestroyOptions, options);
  }

  public setContainer(container: HTMLElement) {
    if (!Application.containerElement) {
      Application.containerElement = container;
    }
  }

  public async initialize(config: AppConfig<D>, el?: HTMLElement): Promise<IApplication<D, C, A>> {
    if (Application.instance) {
      throw new Error('Application is already initialized');
    }
    Application.instance = this as unknown as IApplication<DataSchema, ActionContext, Action>;
    this.config = Object.assign({ ...defaultApplicationOptions }, config as Partial<IApplicationOptions<D>>);

    this.signals.onResize = this.onResize;

    if (config.container) {
      Application.containerElement = config.container;
    }
    // initialize the logger
    Logger.initialize(this.config.logger);

    // ensure the resolution is 1 or 2
    if (this.config.resolution !== 1 && this.config.resolution !== 2) {
      const userResolution = this.config.resolution;
      this.config.resolution = getDefaultResolution();
      Logger.warn(
        `App resolution must be 1 or 2, setting to ${this.config.resolution} instead of ${userResolution}. Modify your app config to set the resolution to 1 or 2.`,
      );
    }

    await this.boot(this.config);
    await this.preInitialize(this.config);
    await this.initAssets();

    // initialize the pixi application
    await this.init(this.config);

    if (this.config.defaultTextStyle) {
      const style = { ...defaultApplicationOptions.defaultTextStyle, ...this.config.defaultTextStyle };
      TextStyle.defaultTextStyle = style;
    }
    if (this.config.defaultDropShadow) {
      TextStyle.defaultDropShadow = this.config.defaultDropShadow;
    }
    if (el) {
      el.appendChild(this.canvas as HTMLCanvasElement);
      this.setContainer(el);
    } else {
      throw new Error('No element found to append the view to.');
    }

    // register the default plugins
    await this.registerDefaultPlugins();

    this.signals.onLoadRequiredComplete.connectOnce(this.requiredAssetsLoaded);

    // internal setup
    await this._setup();
    this.plugins = await generatePluginList<IPlugin>(this.config.plugins || []);

    for (let i = 0; i < this.plugins.length; i++) {
      const listItem = this.plugins[i];
      if (listItem && listItem?.autoLoad !== false) {
        await this.loadPlugin(listItem);
      }
    }

    // register the applications custom plugins
    await this.registerPlugins();

    // add the store if it's enabled
    if (this.config.useStore) {
      // register any storage adapters passed through the config
      this.storageAdapters = await generateAdapterList(this.config.storageAdapters || []);
      for (let i = 0; i < this.storageAdapters.length; i++) {
        const listItem = this.storageAdapters[i];
        if (this.store.hasAdapter(listItem.id)) {
          Logger.error(`Storage Adapter with id "${listItem.id}" already registered. Not registering.`);
          continue;
        }
        const storageAdapter = await getDynamicModuleFromImportListItem(listItem);
        await this.registerStorageAdapter(new storageAdapter(listItem.id), listItem.options);
      }
      // also call the registerStorageAdapters method to allow for custom storage adapters to be registered
      await this.registerStorageAdapters();
    }

    await this.setup();
    await this.loadDefaultScene();

    // focus the canvas
    this.renderer.canvas.focus();

    if (this.config.container) {
      this.config.container.classList.add('loaded');
    }

    this._isBooting = false;
    // return the Application instance to the create method, if needed
    return Application.instance as unknown as IApplication<D, C, A>;
  }

  public getPlugin<T extends IPlugin>(pluginName: string, debug: boolean = false): T {
    const plugin = this._plugins.get(pluginName) as T;
    if (!plugin && debug) {
      Logger.error(`Plugin with name "${pluginName}" not found.`);
    }
    return plugin;
  }

  async postInitialize(): Promise<void> {
    (globalThis as any).__PIXI_APP__ = this;
    await this._resize();

    this._plugins.forEach((plugin) => {
      plugin.postInitialize(this as unknown as IApplication<DataSchema>);
    });

    this.webEvents.onVisibilityChanged.connect((visible) => {
      Logger.log('onVisibilityChanged', visible);
      if (visible) {
        this.audio.restore();
        this.timers.resumeAllTimers();
      } else {
        this.audio.suspend();
        this.timers.pauseAllTimers();
      }
    });
  }

  public getUnloadedPlugin(id: string): ImportListItem<IPlugin> | undefined {
    return this.plugins?.find((plugin) => plugin.id === id);
  }

  async loadPlugin(listItem: ImportListItem, isDefault: boolean = false) {
    if (this._plugins.has(listItem.id)) {
      return await this.registerPlugin(this._plugins.get(listItem.id)!, listItem.options);
    }
    const plugin = await getDynamicModuleFromImportListItem(listItem);
    const pluginInstance = new plugin(listItem.id);
    if (pluginInstance.id !== listItem.id) {
      pluginInstance.id = listItem.id;
    }
    let opts = listItem.options;
    if (isDefault && !opts) {
      opts = this.config[pluginInstance.id as keyof IApplicationOptions];
    }
    return await this.registerPlugin(pluginInstance, opts);
  }

  /**
   * Gets an ActionSignal for the specified action type
   * @template TActionData - The type of data associated with the action
   * @param {A} action - The action to get the signal for
   * @returns {ActionSignal<TActionData>} A signal that can be used to listen for the action
   * @example
   * // Listen for a 'jump' action
   * app.actions('jump').connect((data) => {
   *   player.jump(data.power);
   * });
   */
  public actions<TActionData = any>(action: A): ActionSignal<TActionData> {
    return this.actionsPlugin.getAction<TActionData>(action as Action);
  }

  /**
   * Dispatches an action with optional data
   * @template TActionData - The type of data to send with the action
   * @param {A} action - The action to dispatch
   * @param {TActionData} [data] - Optional data to send with the action
   * @example
   * // Send a 'jump' action with power data
   * app.sendAction('jump', { power: 100 });
   */
  public sendAction<TActionData = any>(action: A, data?: TActionData) {
    this.actionsPlugin.sendAction<TActionData>(action as Action, data);
  }

  /**
   * Dispatches an action with optional data
   * alias for sendAction
   * @template TActionData - The type of data to send with the action
   * @param {A} action - The action to dispatch
   * @param {TActionData} [data] - Optional data to send with the action
   * @example
   * // Send a 'jump' action with power data
   * app.action('jump', { power: 100 });
   */
  public action<TActionData = any>(action: A, data?: TActionData) {
    this.actionsPlugin.sendAction<TActionData>(action as Action, data);
  }

  /**
   * Checks if an action is currently active
   * @param {A} action - The action to check
   * @returns {boolean} True if the action is active, false otherwise
   * @example
   * // Check if the 'run' action is active
   * if (app.isActionActive('run')) {
   *   player.updateSpeed(runningSpeed);
   * }
   */
  public isActionActive(action: A): boolean {
    return this.input.controls.isActionActive(action);
  }

  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  public getStorageAdapter(adapterId: string): IStorageAdapter {
    return this.store.getAdapter(adapterId);
  }

  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IDataAdapter}
   */
  public get data(): IDataAdapter<D> {
    return this.store.getAdapter('data') as unknown as IDataAdapter<D>;
  }
  /**
   * app hasn't been initialized yet
   * @protected
   * @example boot(){
   *     console.log(this.appVersion);
   * }
   * returns {Promise<void> | void}
   */
  protected boot(config?: Partial<IApplicationOptions<D>>): Promise<void> | void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected async boot(config?: Partial<IApplicationOptions<D>>): Promise<void> {
    console.log(
      `%c App info - %c${this.appName} | %cv${this.appVersion} `,
      `background: rgba(31, 41, 55, 1); color: #74b64c`,
      `background: rgba(31, 41, 55, 1); color: #74b64c; font-weight:bold`,
      `background: rgba(31, 41, 55, 1); color: #74b64c; font-weight:bold`,
    );
  }

  /**
   * Pre-initialize the application
   * This is called before the application is initialized
   * should register any pixi extensions, etc
   * @param {Partial<IApplicationOptions>} config
   * @returns {Promise<void>}
   * @protected
   */
  protected async preInitialize(config: Partial<IApplicationOptions<D>>): Promise<void> {
    if (config.useSpine) {
      await this.loadPlugin({
        id: 'SpinePlugin',
        module: () => import('../plugins/spine/SpinePlugin'),
        namedExport: 'SpinePlugin',
      });
    }
    if (this.config.useStore) {
      this._store = new Store();
      this._store.initialize(this as unknown as IApplication<DataSchema>);
      this.registerDefaultStorageAdapters();
    }
  }

  // plugins
  protected async registerPlugin(plugin: IPlugin, options?: any) {
    if (this._plugins.has(plugin.id)) {
      Logger.error(`Plugin with id "${plugin.id}" already registered. Not registering.`);
      return plugin.initialize(options, this as unknown as IApplication<DataSchema>);
    }
    plugin.registerCoreFunctions();
    plugin.registerCoreSignals();
    this._plugins.set(plugin.id, plugin);
    return plugin.initialize(options, this as unknown as IApplication<DataSchema>);
  }

  protected async registerDefaultPlugins() {
    for (let i = 0; i < defaultPlugins.length; i++) {
      const listItem = defaultPlugins[i];
      await this.loadPlugin(listItem, true);
    }
    const showStats = this.config.showStats === true || (isDev && this.config.showStats !== false);
    if (showStats) {
      await this.loadPlugin({
        id: 'stats',
        module: () => import('../plugins/StatsPlugin'),
        namedExport: 'StatsPlugin',
      });
    }
    if (this.config.useVoiceover) {
      await this.loadPlugin({
        id: 'voiceover',
        module: () => import('../plugins/audio/VoiceOverPlugin'),
        namedExport: 'VoiceOverPlugin',
        options: this.config['voiceover' as keyof IApplicationOptions] || undefined,
      });
      await this.loadPlugin({
        id: 'captions',
        module: () => import('../plugins/captions/CaptionsPlugin'),
        namedExport: 'CaptionsPlugin',
        options: this.config['captions' as keyof IApplicationOptions] || undefined,
      });
    }
  }

  protected async registerDefaultStorageAdapters() {
    const dataAdapter = new DataAdapter();
    await this.registerStorageAdapter(dataAdapter, this.config.data);
  }

  protected async registerPlugins() {
    // override this method to register custom plugins,
    // or do it in the app config during bootstrap
    return Promise.resolve();
  }

  // storage
  protected async registerStorageAdapters() {
    // override this method to register custom storage adapters,
    // or do it in the app config during bootstrap
    return Promise.resolve();
  }

  protected async registerStorageAdapter(adapter: IStorageAdapter, adapterOptions: any): Promise<any> {
    return this.store.registerAdapter(adapter, adapterOptions);
  }

  /**
   * This is called after the required assets are loaded
   * You can be sure that all the assets on the assets.preload from dill-pixel.config are loaded
   * @protected
   */
  protected requiredAssetsLoaded(): Promise<void> | void;

  protected async requiredAssetsLoaded(): Promise<void> {
    // override me
  }
  /**
   * This is called after the application is initialized
   * You can be sure that
   * - all plugins are registered
   * - the store is created, with all storage adapters registered
   * @protected
   */
  protected setup(): Promise<void> | void;

  protected async setup(): Promise<void> {
    // override me to set up application specific stuff
  }

  protected async initAssets(): Promise<void> {
    const opts: Partial<AssetInitOptions> = this.config.assets?.initOptions || {};
    if (this.config.assets?.manifest) {
      let manifest = this.config.assets.manifest || opts.manifest;
      if (isPromise(manifest)) {
        manifest = await manifest;
      }
      opts.manifest = manifest as AssetsManifest;
    }
    opts.basePath = opts.basePath || './assets';
    await Assets.init(opts);
    /** @ts-expect-error manifest is not a public property */
    this.manifest = Assets.resolver._manifest;
  }

  protected async loadDefaultScene(): Promise<void> {
    return this.scenes.loadDefaultScene();
  }

  private async _resize(): Promise<Size> {
    // Wait for DOM content to be loaded
    if (document.readyState !== 'complete') {
      await new Promise<void>((resolve) => {
        window.addEventListener('load', () => resolve(), { once: true });
      });
    }

    // Add a small delay to ensure canvas dimensions are set
    await new Promise((resolve) => setTimeout(resolve, 50));

    return new Promise((resolve) => {
      this.resizer.resize().then((size) => {
        this._center.set(size.width * 0.5, size.height * 0.5);
        this.views.forEach((view) => {
          if (!view || !view.position) {
            return;
          }
          view.position.set(this._center.x, this._center.y);
        });
        this.onResize.emit(this.size);
        resolve(size);
      });
    });
  }
  /**
   * Called after the application is initialized
   * Here we add application specific signal listeners, etc
   * @returns {Promise<void>}
   * @private
   */
  private async _setup(): Promise<void> {
    // register for PIXI DevTools extension
    if (isDev) {
      (globalThis as any).__PIXI_APP__ = this;
    }
    // connect onResize signal
    this.webEvents.onResize.connect(this._resize, -1);

    await this._resize();

    if (this.scenes.splash?.view && this.scenes.splash.zOrder === 'bottom') {
      this._addSplash();
    }
    // scene manager
    this.scenes.view.label = 'SceneManager';
    this.stage.addChild(this.scenes.view);

    if (this.scenes.splash?.view && this.scenes.splash.zOrder === 'top') {
      this._addSplash();
    }
    if (this.scenes.transition) {
      this.scenes.transition.label = 'SceneManager:: Transition';
      this.stage.addChild(this.scenes.transition);
    }

    // popup manager
    this.stage.addChild(this.popups.view);

    // focus manager
    this.focus.view.label = 'FocusManager';
    this.stage.addChild(this.focus.view);

    // is touch device
    return Promise.resolve();
  }

  private _addSplash() {
    if (this.scenes.splash.view) {
      this.scenes.splash.view.label = 'SceneManager:: Splash';
      this.stage.addChild(this.scenes.splash.view);
    }
  }
}
