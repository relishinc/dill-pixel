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
import { IAssetManager } from '../modules/AssetManager';
import { IAudioManager } from '../modules/audio/AudioManager';
import defaultModules from '../modules/defaultModules';
import { FocusManagerOptions, IFocusManager } from '../modules/focus/FocusManager';
import { i18nOptions, Ii18nModule } from '../modules/i18nModule';
import { ActionContext, ActionSignal, IInputManager } from '../modules/InputManager';
import { IKeyboardManager } from '../modules/KeyboardManager';
import { IModule } from '../modules/Module';
import { IPopupManager } from '../modules/popups/PopupManager';
import { IResizer, ResizerOptions } from '../modules/Resizer';
import { ISceneManager, LoadSceneMethod } from '../modules/SceneManager';
import { SpineModule } from '../modules/SpineModule';
import { IWebEventsManager } from '../modules/WebEventsManager';
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
  modules: ImportList<IModule>;
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
  background: undefined,
  backgroundAlpha: 0,
  backgroundColor: 'transparent',
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
  modules: [],
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
  i18n: Ii18nModule;
  resizer: IResizer;
  input: IInputManager;
  store: IStore;

  actionContext: string | ActionContext;

  actions(action: string): ActionSignal;

  initialize(config: RequiredApplicationConfig): Promise<IApplication>;

  postInitialize(): Promise<void>;

  getModule<T extends IModule>(name: string): T;
}

@MethodBindingRoot
export class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
  // config
  public config: Partial<IApplicationOptions>;
  public manifest: string | AssetsManifest | undefined;
  protected static instance: Application;
  //
  public static containerId = 'dill-pixel-game-container';
  public static containerElement: HTMLElement;
  // signals
  public onResize = new Signal<(size: Size) => void>();
  // modules
  protected _modules: Map<string, IModule> = new Map();

  // default modules
  protected _assetManager: IAssetManager;
  protected _sceneManager: ISceneManager;
  protected _webEventsManager: IWebEventsManager;
  protected _keyboardManager: IKeyboardManager;
  protected _focusManager: IFocusManager;
  protected _popupManager: IPopupManager;
  protected _audioManager: IAudioManager;
  protected _i18n: Ii18nModule;
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
      this._assetManager = this.getModule<IAssetManager>('AssetManager');
    }
    return this._assetManager;
  }

  public get scenes(): ISceneManager {
    if (!this._sceneManager) {
      this._sceneManager = this.getModule<ISceneManager>('SceneManager');
    }
    return this._sceneManager;
  }

  public get webEvents(): IWebEventsManager {
    if (!this._webEventsManager) {
      this._webEventsManager = this.getModule<IWebEventsManager>('WebEventsManager');
    }
    return this._webEventsManager;
  }

  public get keyboard(): IKeyboardManager {
    if (!this._keyboardManager) {
      this._keyboardManager = this.getModule<IKeyboardManager>('KeyboardManager');
    }
    return this._keyboardManager;
  }

  public get focus(): IFocusManager {
    if (!this._focusManager) {
      this._focusManager = this.getModule<IFocusManager>('FocusManager');
    }
    return this._focusManager;
  }

  public get center(): Point {
    return this._center;
  }

  get size() {
    return this.resizer.size;
  }

  public get i18n(): Ii18nModule {
    if (!this._i18n) {
      this._i18n = this.getModule<Ii18nModule>('i18n');
    }
    return this._i18n;
  }

  public get popups(): IPopupManager {
    if (!this._popupManager) {
      this._popupManager = this.getModule<IPopupManager>('PopupManager');
    }
    return this._popupManager;
  }

  public get audio(): IAudioManager {
    if (!this._audioManager) {
      this._audioManager = this.getModule<IAudioManager>('AudioManager');
    }
    return this._audioManager;
  }

  public get resizer(): IResizer {
    if (!this._resizer) {
      this._resizer = this.getModule<IResizer>('resizer');
    }
    return this._resizer;
  }

  public get input(): IInputManager {
    if (!this._input) {
      this._input = this.getModule<IInputManager>('InputManager');
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
   * This will destroy all modules and the store
   * @param {RendererDestroyOptions} rendererDestroyOptions
   * @param {DestroyOptions} options
   */
  public destroy(rendererDestroyOptions?: RendererDestroyOptions, options?: DestroyOptions) {
    this._modules.forEach((module) => {
      module.destroy();
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
    await this.initAssets();

    // initialize the pixi application
    await this.init(this.config);

    // initialize the logger
    Logger.initialize(config.id);

    // register the default modules
    if (this.config.useDefaults) {
      await this.registerDefaultModules();
    }

    if (this.config.modules && this.config.modules.length > 0) {
      for (let i = 0; i < this.config.modules.length; i++) {
        const listItem = this.config.modules[i];
        if (listItem && listItem?.autoLoad !== false) {
          await this.loadModule(listItem);
        }
      }
    }

    // register the applications custom modules
    await this.registerModules();

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

    // return the Application instance to the create method, if needed
    return Application.instance;
  }

  public getModule<T extends IModule>(moduleName: string): T {
    return this._modules.get(moduleName) as T;
  }

  async postInitialize(): Promise<void> {
    (globalThis as any).__PIXI_APP__ = this;
    this._modules.forEach((module) => {
      module.postInitialize(this);
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

  public getUnloadedModule(id: string): ImportListItem<IModule> | undefined {
    return this.config.modules?.find((module) => module.id === id);
  }

  async loadModule(listItem: ImportListItem) {
    if (this._modules.has(listItem.id)) {
      Logger.error(`Module with id "${listItem.id}" already registered. Not registering.`);
      return Promise.resolve(false);
    }
    const module = await getDynamicModuleFromImportListItem(listItem);
    await this.registerModule(new module(listItem.id), listItem.options);
  }

  public sendAction(action: string, data?: any) {
    this.input.sendAction(action, data);
  }

  // /**
  //  * Connect to a global signal
  //  * signals registered in core modules are added to the global signal registry
  //  * and can be connected to from anywhere in the application
  //  * syntactically, we remove the "on" from the signal name, and lowercase the first letter
  //  * e.g. "onSceneChangeComplete" becomes "sceneChangeComplete"
  //  * @param {string} signalName
  //  * @returns {Signal<any>}
  //  */
  // on<K extends keyof ICoreSignals>(signalName: K): ICoreSignals[K] {
  //   const signal = coreSignalRegistry[signalName];
  //   if (!signal) {
  //     throw new Error('Signal not found in registry');
  //   }
  //   return signal;
  // }
  //
  // /**
  //  * Call a global function
  //  * functions registered in core modules are added to the global function registry
  //  * and can be called from anywhere in the application
  //  * @param {string} functionName
  //  * @param args
  //  * @returns {any}
  //  */
  // call<K extends keyof ICoreFunctions>(
  //   functionName: K,
  //   ...args: Parameters<ICoreFunctions[K]>
  // ): ReturnType<ICoreFunctions[K]> {
  //   const func = coreFunctionRegistry[functionName];
  //   if (!func) {
  //     throw new Error('Function not found in registry');
  //   }
  //   // @ts-ignore
  //   return func(...args) as ReturnType<ICoreFunctions[K]>;
  // }

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
      await this.registerModule(new SpineModule());
    }
  }

  // modules
  protected async registerModule(module: IModule, options?: any) {
    if (this._modules.has(module.id)) {
      Logger.error(`Module with id "${module.id}" already registered. Not registering.`);
      return Promise.resolve();
    }
    this._modules.set(module.id, module);
    return module.initialize(this, options);
  }

  protected async registerDefaultModules() {
    for (let i = 0; i < defaultModules.length; i++) {
      const module = new defaultModules[i]();
      await this.registerModule(module, this.config[module.id as keyof IApplicationOptions] || undefined);
    }
  }

  protected async registerModules() {
    if (isDev) {
      Logger.log(
        'No custom modules registered using "registerModules". Register them by overriding the "registerModules" method in your' +
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
   * - all modules are registered
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
