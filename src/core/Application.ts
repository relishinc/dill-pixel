import { Application as PIXIPApplication, ApplicationOptions, autoDetectRenderer, Renderer } from 'pixi.js';
import { IModule } from '../modules';
import { defaultModules, IAssetManager, IStateManager, IWebEventsManager } from '../modules/default';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store';
import { IStore, Store } from '../store/Store';
import { delay, isDev, isMobile, isRetina, Logger, WithRequiredProps } from '../utils';
import { bindAllMethods } from '../utils/methodBinding';
import { Size } from '../utils/types';

export interface IApplicationOptions extends ApplicationOptions {
  id: string;
  useStore: boolean;
  useDefaults: boolean;
  useSpine: false;
  storageAdapters: ((new () => IStorageAdapter) | IStorageAdapter)[];
  customModules: ((new () => IModule) | IModule)[];
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
  sharedTicker: false,
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
};

export type RequiredApplicationConfig = WithRequiredProps<IApplicationOptions, 'id'>;

export interface IApplication extends PIXIPApplication {
  asset: IAssetManager;
  state: IStateManager;

  initialize(config: RequiredApplicationConfig): Promise<IApplication>;

  getModule<T extends IModule>(name: string): T;
}

export class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
  protected static instance: Application;
  public static containerId = 'dill-pixel-game-container';

  // signals
  public onResize = new Signal<(size: { width: number; height: number }) => void>();

  // config
  protected config: Partial<RequiredApplicationConfig>;

  // modules
  protected _modules: Map<string, IModule> = new Map();

  // default modules
  protected _assetManager: IAssetManager;
  protected _stateManager: IStateManager;
  protected _webEventsManager: IWebEventsManager;

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

  public get state(): IStateManager {
    if (!this._stateManager) {
      this._stateManager = this.getModule<IStateManager>('stateManager');
    }
    return this._stateManager;
  }

  public get asset(): IAssetManager {
    if (!this._assetManager) {
      this._assetManager = this.getModule<IAssetManager>('assetManager');
    }
    return this._assetManager;
  }

  public get webEvents(): IWebEventsManager {
    if (!this._webEventsManager) {
      this._webEventsManager = this.getModule<IWebEventsManager>('webEventsManager');
    }
    return this._webEventsManager;
  }

  public get store(): IStore {
    return this._store;
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

    // get the renderer type (webgl or webgpu now)
    const renderer = await autoDetectRenderer({});

    // initialize the logger
    Logger.initialize(config.id || this.constructor.name);

    // log the renderer for now
    Logger.log(renderer);

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
    return module.initialize();
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
   * Set up the application
   * This is called after the application is initialized
   * all modules are registered
   * and the store is created, with storage adapters registered
   * @protected
   */
  protected setup(): Promise<void> | void;

  protected async setup(): Promise<void> {
    // override me to set up application specific stuff
  }

  private async _onResize(size: Size) {
    await delay(0.1);
    this.onResize.emit(this.renderer.screen);
  }

  /**
   * Called after the application is initialized
   * Here we add application specific signal listeners, etc
   * @returns {Promise<void>}
   * @private
   */
  private async _setup(): Promise<void> {
    if (isDev) {
      (globalThis as any).__PIXI_APP__ = this;
    }
    this.webEvents.onResize.connect(this._onResize);
  }
}
