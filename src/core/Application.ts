import {
  Application as PIXIPApplication,
  ApplicationOptions,
  AssetInitOptions,
  Assets,
  AssetsManifest,
  DestroyOptions,
  isMobile,
  Point,
  Renderer,
  RendererDestroyOptions,
} from 'pixi.js';
import type { IScene } from '../display/Scene';
import { IAssetsPlugin } from '../plugins/AssetsPlugin';
import { IAudioManagerPlugin } from '../plugins/audio/AudioManagerPlugin';
import type { IVoiceOverPlugin } from '../plugins/audio/VoiceOverPlugin';
import type { CaptionsOptions, ICaptionsPlugin } from '../plugins/captions/CaptionsPlugin';
import { FocusManagerPluginOptions, IFocusManagerPlugin } from '../plugins/focus/FocusManagerPlugin';
import { i18nOptions, Ii18nPlugin } from '../plugins/i18nPlugin';
import { Action, ActionContext, ActionSignal, IInputPlugin } from '../plugins/InputPlugin';
import { IKeyboardPlugin } from '../plugins/KeyboardPlugin';
import { IPlugin } from '../plugins/Plugin';
import { IPopupManagerPlugin } from '../plugins/popups/PopupManagerPlugin';
import { IResizerPlugin, ResizerPluginOptions } from '../plugins/ResizerPlugin';
import { ISceneManagerPlugin, LoadSceneMethod } from '../plugins/SceneManagerPlugin';
import { IWebEventsPlugin } from '../plugins/WebEventsPlugin';
import { Signal } from '../signals';
import type { IStorageAdapter } from '../store/adapters/StorageAdapter';
import { IStore, Store } from '../store/Store';
import { isPromise } from '../utils/async';
import { Logger } from '../utils/console/Logger';
import { isDev } from '../utils/env';
import { getDynamicModuleFromImportListItem } from '../utils/framework';
import { bindAllMethods } from '../utils/methodBinding';
import type { ImportList, ImportListItem, SceneImportList, Size, WithRequiredProps } from '../utils/types';
import { coreFunctionRegistry } from './coreFunctionRegistry';
import type { ICoreFunctions } from './ICoreFunctions';
import { coreSignalRegistry } from './coreSignalRegistry';
import type { ICoreSignals } from './ICoreSignals';
import { allDefaults, DefaultPluginIds, defaultPlugins } from '../plugins/defaults';

export interface IApplicationOptions extends ApplicationOptions {
  id: string;
  resizeToContainer: boolean;
  useStore: boolean;
  defaultPlugins?: DefaultPluginIds[];
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

const defaultApplicationOptions: Partial<IApplicationOptions> = {
  antialias: false,
  autoStart: true,
  resizeToContainer: false,
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
  resolution: window.devicePixelRatio > 1.5 ? 2 : 1,
  // dill pixel options
  useStore: true,
  useSpine: false,
  useVoiceover: true,
  storageAdapters: [],
  plugins: [],
  scenes: [],
  defaultSceneLoadMethod: 'immediate',
  manifest: './assets.json',
};

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

  actions(action: string): ActionSignal;

  initialize(config: AppConfig): Promise<IApplication>;

  postInitialize(): Promise<void>;

  getPlugin<T extends IPlugin>(name: string): T;
}

export class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
  public static containerId = 'dill-pixel-game-container';
  public static containerElement: HTMLElement;
  protected static instance: IApplication;
  __dill_pixel_method_binding_root = true;
  // config
  public config: Partial<IApplicationOptions>;
  public manifest: string | AssetsManifest | undefined;
  public onPause = new Signal<() => void>();
  public onResume = new Signal<() => void>();
  // signals
  public onResize = new Signal<(size: Size) => void>();
  // plugins
  protected _plugins: Map<string, IPlugin> = new Map();
  // default plugins
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

  constructor() {
    super();
    bindAllMethods(this);
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

  // input
  protected _input: IInputPlugin;

  public get input(): IInputPlugin {
    if (!this._input) {
      this._input = this.getPlugin<IInputPlugin>('input');
    }
    return this._input;
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

  public get audio(): IAudioManagerPlugin {
    if (!this._audioManager) {
      this._audioManager = this.getPlugin<IAudioManagerPlugin>('audio');
    }
    return this._audioManager;
  }

  public get actionContext(): string | ActionContext {
    return this.input.context;
  }

  public set actionContext(context: string | ActionContext) {
    this.input.context = context;
  }

  public get voiceover(): IVoiceOverPlugin {
    if (!this._voiceoverPlugin) {
      this._voiceoverPlugin = this.getPlugin<IVoiceOverPlugin>('voiceover');
    }
    return this._voiceoverPlugin;
  }

  public get captions(): ICaptionsPlugin {
    if (!this._captionsPlugin) {
      this._captionsPlugin = this.getPlugin<ICaptionsPlugin>('captions');
    }
    return this._captionsPlugin;
  }

  get isMobile() {
    return isMobile.any;
  }

  get isTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  get signal(): ICoreSignals {
    return coreSignalRegistry;
  }

  get func(): ICoreFunctions {
    return coreFunctionRegistry;
  }

  get exec(): ICoreFunctions {
    return coreFunctionRegistry;
  }

  private get views(): any[] {
    return [this.scenes.view, this.popups.view, this.captions.view];
  }

  public static getInstance<T extends Application = Application>(): T {
    return Application.instance as T;
  }

  public static createContainer(pId: string) {
    const container = document.createElement('div');
    Application.containerElement = container;
    container.setAttribute('id', pId);
    document.body.appendChild(container);
    return container;
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

  public async initialize(config: AppConfig): Promise<IApplication> {
    if (Application.instance) {
      throw new Error('Application is already initialized');
    }
    Application.instance = this;
    this.config = Object.assign({ ...defaultApplicationOptions }, config);

    await this.preInitialize(this.config);
    await this.initAssets();
    // initialize the pixi application
    await this.init(this.config);
    // initialize the logger
    Logger.initialize(config.id);

    // register the default plugins
    await this.registerDefaultPlugins();

    if (this.config.plugins && this.config.plugins.length > 0) {
      for (let i = 0; i < this.config.plugins.length; i++) {
        const listItem = this.config.plugins[i];
        if (listItem && listItem?.autoLoad !== false) {
          await this.loadPlugin(listItem);
        }
      }
    }

    // register the applications custom plugins
    await this.registerPlugins();

    // add the store if it's enabled
    if (this.config.useStore) {
      this._store = new Store();
      this._store.initialize(this);

      // register any storage adapters passed through the config
      if (this.config.storageAdapters && this.config.storageAdapters.length > 0) {
        for (let i = 0; i < this.config.storageAdapters.length; i++) {
          const listItem = this.config.storageAdapters[i];
          if (this.store.hasAdapter(listItem.id)) {
            Logger.error(`Storage Adapter with id "${listItem.id}" already registered. Not registering.`);
            continue;
          }
          const storageAdapter = await getDynamicModuleFromImportListItem(listItem);
          await this.registerStorageAdapter(new storageAdapter(listItem.id), listItem.options);
        }
      }
      // also call the registerStorageAdapters method to allow for custom storage adapters to be registered
      await this.registerStorageAdapters();
    }

    await this._setup(); // internal
    await this.setup();
    await this.loadDefaultScene();

    // focus the canvas
    this.renderer.canvas.focus();

    Application.containerElement.classList.add('loaded');

    // return the Application instance to the create method, if needed
    return Application.instance;
  }

  public getPlugin<T extends IPlugin>(pluginName: string): T {
    const plugin = this._plugins.get(pluginName) as T;
    if (!plugin) {
      Logger.error(`Plugin with name "${pluginName}" not found.`);
    }
    return plugin;
  }

  async postInitialize(): Promise<void> {
    (globalThis as any).__PIXI_APP__ = this;
    this._plugins.forEach((plugin) => {
      plugin.postInitialize(this);
    });

    this.webEvents.onVisibilityChanged.connect((visible) => {
      if (visible) {
        this.audio.restore();
      } else {
        this.audio.suspend();
      }
    });

    void this._resize();
  }

  public actions<T = any>(action: Action | string): ActionSignal<T> {
    return this.input.actions(action);
  }

  public getUnloadedPlugin(id: string): ImportListItem<IPlugin> | undefined {
    return this.config.plugins?.find((plugin) => plugin.id === id);
  }

  async loadPlugin(listItem: ImportListItem) {
    if (this._plugins.has(listItem.id)) {
      return await this.registerPlugin(this._plugins.get(listItem.id)!, listItem.options);
    }
    const plugin = await getDynamicModuleFromImportListItem(listItem);
    const pluginInstance = new plugin(listItem.id);
    if (pluginInstance.id !== listItem.id) {
      pluginInstance.id = listItem.id;
    }
    return await this.registerPlugin(pluginInstance, listItem.options);
  }

  public sendAction(action: string, data?: any) {
    this.input.sendAction(action, data);
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
   * Pre-initialize the application
   * This is called before the application is initialized
   * should register any pixi extensions, etc
   * @param {Partial<IApplicationOptions>} config
   * @returns {Promise<void>}
   * @protected
   */
  protected async preInitialize(config: Partial<IApplicationOptions>): Promise<void> {
    if (config.useSpine) {
      await this.loadPlugin({
        id: 'SpinePlugin',
        module: () => import('../plugins/spine/SpinePlugin'),
        namedExport: 'SpinePlugin',
      });
    }
  }

  // plugins
  protected async registerPlugin(plugin: IPlugin, options?: any) {
    if (this._plugins.has(plugin.id)) {
      Logger.error(`Plugin with id "${plugin.id}" already registered. Not registering.`);
      return plugin.initialize(this, options);
    }
    Logger.log(`Registering plugin: ${plugin.id}`);
    plugin.registerCoreFunctions();
    plugin.registerCoreSignals();
    this._plugins.set(plugin.id, plugin);
    return plugin.initialize(this, options);
  }

  protected async registerDefaultPlugins() {
    const defaultIds = this.config.defaultPlugins || allDefaults;
    for (let i = 0; i < defaultIds.length; i++) {
      const id = defaultIds[i];
      const listItem = defaultPlugins.find((p) => p.id === id);
      if (!listItem) {
        Logger.error(`Default plugin with id "${id}" not found.`);
        continue;
      }
      await this.loadPlugin(listItem);
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

  protected async registerPlugins() {
    if (isDev) {
      Logger.log(
        'No custom plugins registered using "registerPlugins". Register them by overriding the "registerPlugins"' +
          ' method in your' +
          ' Application class.',
      );
    }
    return Promise.resolve();
  }

  // storage
  protected async registerStorageAdapters() {
    if (isDev) {
      Logger.log(
        'No storage adapters registered using "registerStorageAdapters". Register them by overriding the' +
          ' "registerStorageAdapters" method in your' +
          ' Application class.',
      );
    }
    return Promise.resolve();
  }

  protected async registerStorageAdapter(adapter: IStorageAdapter, adapterOptions: any): Promise<any> {
    return this.store.registerAdapter(adapter, adapterOptions);
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
    const opts: Partial<AssetInitOptions> = {
      texturePreference: { resolution: this.config.resolution! >= 1.5 ? 1 : 0.5 },
    };
    if (this.config.manifest) {
      let manifest = this.config.manifest;
      if (isPromise(manifest)) {
        manifest = await manifest;
      }
      opts.manifest = manifest;
    }
    this.manifest = opts.manifest;
    await Assets.init(opts);
  }

  protected async loadDefaultScene(): Promise<void> {
    return this.scenes.loadDefaultScene();
  }

  private async _resize() {
    this.resizer.resize();
    this._center.set(this.size.width * 0.5, this.size.height * 0.5);
    this.ticker.addOnce(() => {
      this.views.forEach((view) => {
        view.position.set(this._center.x, this._center.y);
      });
      this.onResize.emit(this.size);
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

    // scene manager
    this.scenes.view.label = 'SceneManager';
    this.stage.addChild(this.scenes.view);

    // popup manager
    this.stage.addChild(this.popups.view);

    // focus manager
    this.focus.view.label = 'FocusManager';
    this.stage.addChild(this.focus.view);

    void this._resize();
    // is touch device
    return Promise.resolve();
  }
}
