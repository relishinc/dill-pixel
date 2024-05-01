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
import { IScene } from '../display/Scene';
import { IAssetManager } from '../plugins/AssetManager';
import { IAudioManager } from '../plugins/audio/AudioManager';
import defaultPlugins from '../plugins/defaultPlugins';
import { FocusManagerOptions, IFocusManager } from '../plugins/focus/FocusManager';
import { i18nOptions, Ii18nPlugin } from '../plugins/i18nPlugin';
import { ActionContext, ActionSignal, IInputManager } from '../plugins/InputManager';
import { IKeyboardManager } from '../plugins/KeyboardManager';
import { IPlugin } from '../plugins/Plugin';
import { IPopupManager } from '../plugins/popups/PopupManager';
import { IResizer, ResizerOptions } from '../plugins/Resizer';
import { ISceneManager, LoadSceneMethod } from '../plugins/SceneManager';
import { SpinePlugin } from '../plugins/spine/SpinePlugin';
import { IWebEventsManager } from '../plugins/WebEventsManager';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store/adapters/StorageAdapter';
import { IStore, Store } from '../store/Store';
import { isPromise } from '../utils/async';
import { Logger } from '../utils/console/Logger';
import { isDev } from '../utils/env';
import { getDynamicModuleFromImportListItem } from '../utils/framework';
import { bindAllMethods } from '../utils/methodBinding';
import { ImportList, ImportListItem, SceneImportList, Size, WithRequiredProps } from '../utils/types';
import { coreFunctionRegistry } from './coreFunctionRegistry';
import { ICoreFunctions } from './CoreFunctions';
import { coreSignalRegistry } from './coreSignalRegistry';
import { ICoreSignals } from './CoreSignals';
import { MethodBindingRoot } from './decorators';

// for now, to detect multiple spritesheet sizes
// import '../assets/resolveParser';

export interface IApplicationOptions extends ApplicationOptions {
  id: string;
  resizeToContainer: boolean;
  useStore: boolean;
  useDefaults: boolean;
  useSpine: boolean;
  storageAdapters: ImportList<IStorageAdapter>;
  plugins: ImportList<IPlugin>;
  scenes: SceneImportList<IScene>;
  focusOptions: FocusManagerOptions;
  defaultScene: string;
  defaultSceneLoadMethod: LoadSceneMethod;
  showSceneDebugMenu: boolean;
  manifest: AssetsManifest | Promise<AssetsManifest> | string;
  i18n: Partial<i18nOptions>;
  resizer: Partial<ResizerOptions>;
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
  height: 0,
  hello: false,
  powerPreference: 'high-performance',
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  resizeTo: undefined,
  sharedTicker: true,
  view: undefined,
  width: 0,
  autoDensity: false,
  resolution: Math.max(window.devicePixelRatio, 2),
  // dill pixel options
  useStore: true,
  useDefaults: true,
  useSpine: false,
  storageAdapters: [],
  plugins: [],
  scenes: [],
  defaultSceneLoadMethod: 'immediate',
  manifest: './assets.json',
};

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
  popups: IPopupManager;
  audio: IAudioManager;
  i18n: Ii18nPlugin;
  resizer: IResizer;
  input: IInputManager;
  store: IStore;

  actionContext: string | ActionContext;

  actions(action: string): ActionSignal;

  initialize(config: RequiredApplicationConfig): Promise<IApplication>;

  postInitialize(): Promise<void>;

  getPlugin<T extends IPlugin>(name: string): T;
}

@MethodBindingRoot
export class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
  // config
  public config: Partial<IApplicationOptions>;
  public manifest: string | AssetsManifest | undefined;
  // plugins
  protected _plugins: Map<string, IPlugin> = new Map();
  protected static instance: Application;
  //
  public static containerId = 'dill-pixel-game-container';
  public static containerElement: HTMLElement;
  // signals
  public onResize = new Signal<(size: Size) => void>();
  // default plugins
  protected _assetManager: IAssetManager;
  protected _sceneManager: ISceneManager;
  protected _webEventsManager: IWebEventsManager;
  protected _keyboardManager: IKeyboardManager;
  protected _focusManager: IFocusManager;
  protected _popupManager: IPopupManager;
  protected _audioManager: IAudioManager;
  protected _i18n: Ii18nPlugin;
  protected _resizer: IResizer;

  // input
  protected _input: IInputManager;
  protected _actions: ActionSignal;
  // store
  protected _store: IStore;
  // size
  protected _center = new Point(0, 0);

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

  constructor() {
    super();
    bindAllMethods(this);
  }

  public get assets(): IAssetManager {
    if (!this._assetManager) {
      this._assetManager = this.getPlugin<IAssetManager>('AssetManager');
    }
    return this._assetManager;
  }

  public get scenes(): ISceneManager {
    if (!this._sceneManager) {
      this._sceneManager = this.getPlugin<ISceneManager>('SceneManager');
    }
    return this._sceneManager;
  }

  public get webEvents(): IWebEventsManager {
    if (!this._webEventsManager) {
      this._webEventsManager = this.getPlugin<IWebEventsManager>('WebEventsManager');
    }
    return this._webEventsManager;
  }

  public get keyboard(): IKeyboardManager {
    if (!this._keyboardManager) {
      this._keyboardManager = this.getPlugin<IKeyboardManager>('KeyboardManager');
    }
    return this._keyboardManager;
  }

  public get focus(): IFocusManager {
    if (!this._focusManager) {
      this._focusManager = this.getPlugin<IFocusManager>('FocusManager');
    }
    return this._focusManager;
  }

  public get center(): Point {
    return this._center;
  }

  get size() {
    return this.resizer.size;
  }

  public get i18n(): Ii18nPlugin {
    if (!this._i18n) {
      this._i18n = this.getPlugin<Ii18nPlugin>('i18n');
    }
    return this._i18n;
  }

  public get popups(): IPopupManager {
    if (!this._popupManager) {
      this._popupManager = this.getPlugin<IPopupManager>('PopupManager');
    }
    return this._popupManager;
  }

  public get audio(): IAudioManager {
    if (!this._audioManager) {
      this._audioManager = this.getPlugin<IAudioManager>('AudioManager');
    }
    return this._audioManager;
  }

  public get resizer(): IResizer {
    if (!this._resizer) {
      this._resizer = this.getPlugin<IResizer>('resizer');
    }
    return this._resizer;
  }

  public get input(): IInputManager {
    if (!this._input) {
      this._input = this.getPlugin<IInputManager>('InputManager');
    }
    return this._input;
  }

  public get store(): IStore {
    return this._store;
  }

  public get actionContext(): string | ActionContext {
    return this.input.context;
  }

  public set actionContext(context: string | ActionContext) {
    this.input.context = context;
  }

  /**
   * Returns the global signals
   */
  public get globalSignals(): string[] {
    return Object.keys(coreSignalRegistry);
  }

  /**
   * Returns the global functions
   * @returns {{[functionName: string]: any}}
   */
  public get globalFunctions(): string[] {
    return Object.keys(coreFunctionRegistry);
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
    return [this.scenes.view, this.popups.view];
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

  public async initialize(config: RequiredApplicationConfig): Promise<IApplication> {
    if (Application.instance) {
      throw new Error('Application is already initialized');
    }

    Application.instance = this;
    this.config = Object.assign({ ...defaultApplicationOptions }, config);

    await this.preInitialize(this.config);
    console.log('Application preInitialize complete. Initializing assets...');
    await this.initAssets();
    // initialize the pixi application
    console.log('Application initilization started.', this.config);
    await this.init(this.config);
    console.log('Application initilization complete.');
    // initialize the logger
    Logger.initialize(config.id);

    // register the default plugins
    if (this.config.useDefaults) {
      await this.registerDefaultPlugins();
    }

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

  public actions<T = any>(action: string): ActionSignal<T> {
    return this.input.actions(action);
  }

  public getUnloadedPlugin(id: string): ImportListItem<IPlugin> | undefined {
    return this.config.plugins?.find((plugin) => plugin.id === id);
  }

  async loadPlugin(listItem: ImportListItem) {
    if (this._plugins.has(listItem.id)) {
      Logger.error(`Plugin with id "${listItem.id}" already registered. Not registering.`);
      return Promise.resolve(false);
    }
    const plugin = await getDynamicModuleFromImportListItem(listItem);
    const pluginInstance = new plugin(listItem.id);
    if (pluginInstance.id !== listItem.id) {
      pluginInstance.id = listItem.id;
    }
    await this.registerPlugin(pluginInstance, listItem.options);
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
      await this.registerPlugin(new SpinePlugin());
    }
  }

  // plugins
  protected async registerPlugin(plugin: IPlugin, options?: any) {
    if (this._plugins.has(plugin.id)) {
      Logger.error(`Plugin with id "${plugin.id}" already registered. Not registering.`);
      return Promise.resolve();
    }
    Logger.log(`Registering plugin: ${plugin.id}`);
    this._plugins.set(plugin.id, plugin);
    return plugin.initialize(this, options);
  }

  protected async registerDefaultPlugins() {
    for (let i = 0; i < defaultPlugins.length; i++) {
      const plugin = new defaultPlugins[i]();
      await this.registerPlugin(plugin, this.config[plugin.id as keyof IApplicationOptions] || undefined);
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
    console.log('Initializing assets with manifest:', this.manifest);
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
