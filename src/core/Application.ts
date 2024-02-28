import {
  Application as PIXIPApplication,
  ApplicationOptions,
  DestroyOptions,
  Renderer,
  RendererDestroyOptions,
} from 'pixi.js';
import { IModule } from '../modules';
import type {
  FocusManagerOptions,
  IAssetManager,
  IFocusManager,
  IKeyboardManager,
  ISceneManager,
  IWebEventsManager,
  LoadSceneMethod,
} from '../modules/default';
import { defaultModules } from '../modules/default';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store';
import { IStore, Store } from '../store/Store';
import { bindAllMethods, isDev, isMobile, isRetina, Logger, SceneList, WithRequiredProps } from '../utils';

export interface IApplicationOptions extends ApplicationOptions {
  id: string;
  useStore: boolean;
  useDefaults: boolean;
  useSpine: false;
  storageAdapters: ((new () => IStorageAdapter) | IStorageAdapter)[];
  customModules: ((new () => IModule) | IModule)[];
  scenes: SceneList;
  focusOptions: FocusManagerOptions;
  defaultScene: string;
  defaultSceneLoadMethod: LoadSceneMethod;
}

const defaultApplicationOptions: Partial<IApplicationOptions> = {
  antialias: false,
  autoStart: true,
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
  autoDensity: true,
  resolution: isMobile ? (isRetina ? 2 : 1) : 2,
  // dill pixel options
  useStore: true,
  useDefaults: true,
  useSpine: false,
  storageAdapters: [],
  customModules: [],
  scenes: [],
  defaultSceneLoadMethod: 'immediate',
};

export type RequiredApplicationConfig = WithRequiredProps<IApplicationOptions, 'id'>;

export interface IApplication extends PIXIPApplication {
  config: Partial<IApplicationOptions>;
  assets: IAssetManager;
  scenes: ISceneManager;
  webEvents: IWebEventsManager;
  keyboard: IKeyboardManager;
  focus: IFocusManager;

  initialize(config: RequiredApplicationConfig): Promise<IApplication>;

  getModule<T extends IModule>(name: string): T;
}

export class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
  // config
  public config: Partial<IApplicationOptions>;
  protected static instance: Application;
  public static containerId = 'dill-pixel-game-container';
  // signals
  public onResize = new Signal<(size: { width: number; height: number }) => void>();
  // modules
  protected _modules: Map<string, IModule> = new Map();

  // default modules
  protected _assetManager: IAssetManager;
  protected _sceneManager: ISceneManager;
  protected _webEventsManager: IWebEventsManager;
  protected _keyboardManager: IKeyboardManager;
  protected _focusManager: IFocusManager;

  // store
  protected _store: IStore;

  public static getInstance(): Application {
    return Application.instance;
  }

  public static createContainer(pId: string) {
    const container = document.createElement('div');
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

  public get store(): IStore {
    return this._store;
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

    await this.preInitialize();

    // initialize the pixi application
    await Application.instance.init(Application.instance.config);

    // initialize the logger
    Logger.initialize(config.id);

    // register the default modules
    if (this.config.useDefaults) {
      await this.registerDefaultModules();
    }

    if (this.config.customModules && this.config.customModules.length > 0) {
      for (let i = 0; i < this.config.customModules.length; i++) {
        const module = this.config.customModules[i];
        if (typeof module === 'function') {
          await this.registerModule(new module());
        } else {
          await this.registerModule(module);
        }
      }
    }

    // register the applications custom modules
    await this.registerCustomModules();

    // add the store if it's enabled
    if (this.config.useStore) {
      this._store = new Store();
      // register any storage adapters passed through the config
      if (this.config.storageAdapters && this.config.storageAdapters.length > 0) {
        for (let i = 0; i < this.config.storageAdapters.length; i++) {
          const storageAdapter = this.config.storageAdapters[i];
          if (typeof storageAdapter === 'function') {
            await this.registerStorageAdapter(new storageAdapter());
          } else {
            await this.registerStorageAdapter(storageAdapter);
          }
        }
      }
      // also call the registerStorageAdapters method to allow for custom storage adapters to be registered
      await this.registerStorageAdapters();
    }

    await this._setup(); // internal
    await this.setup();

    await this.postInitialize();

    // return the Application instance to the create method, if needed
    return Application.instance;
  }

  public getModule<T extends IModule>(moduleName: string): T {
    return this._modules.get(moduleName) as T;
  }

  public getStorageAdapter(adapterId: string): IStorageAdapter {
    return this.store.getAdapter(adapterId);
  }

  protected async preInitialize(): Promise<void> {}

  protected async postInitialize(): Promise<void> {
    (globalThis as any).__PIXI_APP__ = this;
  }

  // modules
  protected async registerModule(module: IModule) {
    this._modules.set(module.id, module);
    return module.initialize(this);
  }

  protected async registerDefaultModules() {
    for (let i = 0; i < defaultModules.length; i++) {
      const module = new defaultModules[i]();
      await this.registerModule(module);
    }
  }

  protected async registerCustomModules() {
    if (isDev) {
      Logger.log(
        'No custom modules registered using "registerCustomModules". Register them by overriding the "registerCustomModules" method in your' +
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

  protected async registerStorageAdapter(adapter: IStorageAdapter): Promise<any> {
    return this.store.registerAdapter(adapter);
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

  private async _onResize() {
    this.ticker.addOnce(() => {
      this.onResize.emit(this.renderer.screen);
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
    this.webEvents.onResize.connect(this._onResize);

    // scene manager
    this.stage.addChild(this.scenes.view);
    this.stage.addChild(this.focus.view);
    const firstScene = this.config.defaultScene || this.config.scenes?.[0]?.id;

    if (firstScene) {
      void this.scenes.loadScene(firstScene);
    } else {
      Logger.error('No default scene set');
    }

    return Promise.resolve();
  }
}
