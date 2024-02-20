import { Application as PIXIPApplication, ApplicationOptions, autoDetectRenderer, Renderer } from 'pixi.js';
import { IModule } from '../modules';
import { defaultModules } from '../modules/default';
import { IAssetManager } from '../modules/default/asset/AssetManager';
import { IStateManager } from '../modules/default/state/StateManager';
import { IStore, Store } from '../store/Store';
import { isMobile, isRetina, Logger, WithRequiredProps } from '../utils';

export interface IApplicationOptions extends ApplicationOptions {
  id: string;
  useStore: boolean;
  useDefaults: boolean;
  useSpine: false;
}

const defaultApplicationOptions: Partial<ApplicationOptions> = {
  antialias: false,
  autoStart: false,
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
};

export type RequiredApplicationConfig = WithRequiredProps<IApplicationOptions, 'id'>;

export interface IApplication {
  asset: IAssetManager;
  state: IStateManager;

  initialize<R extends Renderer = Renderer>(config: RequiredApplicationConfig): Promise<IApplication>;

  getModule<T extends IModule>(name: string): T;
}

export class Application<R extends Renderer = Renderer> extends PIXIPApplication<R> implements IApplication {
  protected static instance: Application;
  protected config: Partial<IApplicationOptions>;

  // modules
  protected _modules: Map<string, IModule> = new Map();
  // default modules
  protected _assetManager: IAssetManager;
  protected _stateManager: IStateManager;

  // store
  protected _store: IStore;

  public static getInstance(): Application {
    return Application.instance;
  }

  private constructor() {
    super();
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

  public get store(): IStore {
    return this._store;
  }

  public async initialize<R extends Renderer = Renderer>(config: RequiredApplicationConfig): Promise<IApplication> {
    if (Application.instance) {
      throw new Error('Application is already initialized');
    }

    Application.instance = new Application<R>();
    Application.instance.config = Object.assign({ ...defaultApplicationOptions }, config);

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
      this.registerDefaultModules();
    }

    // register the applications custom modules
    await this.registerCustomModules();

    // add the store if it's enabled
    if (this.config.useStore) {
      this._store = new Store();
      await this.registerStorageAdapters();
    }

    // return the Application instance to the create method, if needed
    return Application.instance;
  }

  public getModule<T extends IModule>(moduleName: string): T {
    return this._modules.get(moduleName) as T;
  }

  protected registerDefaultModules() {
    for (let i = 0; i < defaultModules.length; i++) {
      const module = defaultModules[i];
      this._modules.set(module.constructor.name, new module());
    }
  }

  protected async registerCustomModules() {
    Logger.log(
      'No custom modules registered. Register them by overriding the "registerCustomModules" method in your' +
        ' Application class.',
    );
    return Promise.resolve();
  }

  protected async registerStorageAdapters() {
    Logger.log(
      'No storage adapters registered. Register them by overriding the "registerStorageAdapters" method in your' +
        ' Application class.',
    );
    return Promise.resolve();
  }
}
