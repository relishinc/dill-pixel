import {
  Application as PIXIPApplication,
  ApplicationOptions,
  AssetInitOptions,
  Assets,
  AssetsManifest,
  DestroyOptions,
  Renderer,
  RendererDestroyOptions,
} from 'pixi.js';
import { IScene } from '../display/Scene';
import { IAssetManager } from '../modules/default/AssetManager';
import { IAudioManager } from '../modules/default/audio/AudioManager';

import defaultModules from '../modules/default/defaultModules';
import { FocusManagerOptions, IFocusManager } from '../modules/default/focus/FocusManager';
import { IKeyboardManager } from '../modules/default/KeyboardManager';
import { ISceneManager, LoadSceneMethod } from '../modules/default/SceneManager';
import { IWebEventsManager } from '../modules/default/WebEventsManager';
import { IModule } from '../modules/Module';
import { Signal } from '../signals';
import { IStorageAdapter } from '../store/adapters/StorageAdapter';
import { IStore, Store } from '../store/Store';
import { isPromise } from '../utils/async';
import { Logger } from '../utils/console/Logger';
import { isDev } from '../utils/env';
import { getDynamicModuleFromImportListItem } from '../utils/framework';
import { bindAllMethods } from '../utils/methodBinding';
import { isMobile, isRetina } from '../utils/platform';
import { ImportList, WithRequiredProps } from '../utils/types';
import { coreFunctionRegistry } from './coreFunctionRegistry';
import { coreSignalRegistry } from './coreSignalRegistry';
import { MethodBindingRoot } from './decorators';

// for now, to detect multiple spritesheet sizes
// import '../assets/resolveParser';

export interface IApplicationOptions extends ApplicationOptions {
  id: string;
  useStore: boolean;
  useDefaults: boolean;
  useSpine: false;
  storageAdapters: ImportList<IStorageAdapter>;
  modules: ImportList<IModule>;
  scenes: ImportList<IScene>;
  focusOptions: FocusManagerOptions;
  defaultScene: string;
  defaultSceneLoadMethod: LoadSceneMethod;
  showSceneDebugMenu: boolean;
  manifest: AssetsManifest | Promise<AssetsManifest> | string;
  showStats: boolean;
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
  modules: [],
  scenes: [],
  defaultSceneLoadMethod: 'immediate',
  manifest: './assets.json',
};

export type RequiredApplicationConfig = WithRequiredProps<IApplicationOptions, 'id'>;

export interface IApplication extends PIXIPApplication {
  config: Partial<IApplicationOptions>;
  manifest: AssetsManifest | string | undefined;
  assets: IAssetManager;
  scenes: ISceneManager;
  webEvents: IWebEventsManager;
  keyboard: IKeyboardManager;
  focus: IFocusManager;

  initialize(config: RequiredApplicationConfig): Promise<IApplication>;

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
  public onResize = new Signal<(size: { width: number; height: number }) => void>();
  // modules
  protected _modules: Map<string, IModule> = new Map();

  // default modules
  protected _assetManager: IAssetManager;
  protected _sceneManager: ISceneManager;
  protected _webEventsManager: IWebEventsManager;
  protected _keyboardManager: IKeyboardManager;
  protected _focusManager: IFocusManager;
  protected _audioManager: IAudioManager;

  // store
  protected _store: IStore;

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

  public get audio(): IAudioManager {
    if (!this._audioManager) {
      this._audioManager = this.getModule<IAudioManager>('AudioManager');
    }
    return this._audioManager;
  }

  public get store(): IStore {
    return this._store;
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
    await this.initAssets();

    // initialize the pixi application
    await Application.instance.init(Application.instance.config);

    // initialize the logger
    Logger.initialize(config.id);

    // register the default modules
    if (this.config.useDefaults) {
      await this.registerDefaultModules();
    }

    if (this.config.modules && this.config.modules.length > 0) {
      for (let i = 0; i < this.config.modules.length; i++) {
        const listItem = this.config.modules[i];
        if (this._modules.has(listItem.id)) {
          Logger.error(`Module with id "${listItem.id}" already registered. Not registering.`);
          continue;
        }
        const module = await getDynamicModuleFromImportListItem(listItem);
        await this.registerModule(new module(listItem.id), listItem.options);
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
    await this.postInitialize();

    // return the Application instance to the create method, if needed
    return Application.instance;
  }

  public getModule<T extends IModule>(moduleName: string): T {
    return this._modules.get(moduleName) as T;
  }

  /**
   * Connect to a global signal
   * signals registered in core modules are added to the global signal registry
   * and can be connected to from anywhere in the application
   * syntactically, we remove the "on" from the signal name, and lowercase the first letter
   * e.g. "onSceneChangeComplete" becomes "sceneChangeComplete"
   * @example app.on('sceneChangeComplete').connect(() => {...}) is the same as app.scene.onSceneChangeComplete.connect(() => {...})
   * unfortunately, the signal's type is lost, so you will have to cast it to the correct type when using the global signal registry
   * @param {string} signalName
   * @returns {Signal<any>}
   */
  public on(signalName: string): Signal<any> {
    if (!coreSignalRegistry[signalName]) {
      throw new Error(`Signal with name ${signalName} does not exist in the global signal registry`);
    }
    return coreSignalRegistry[signalName];
  }

  /**
   * Call a global function
   * functions registered in core modules are added to the global function registry
   * and can be called from anywhere in the application
   * @example app.func('onKeyDown', 'enter').connect(() => {...})
   * @param {string} functionName
   * @param args
   * @returns {any}
   */
  public func(functionName: string, ...args: any[]): any {
    if (!coreFunctionRegistry[functionName]) {
      throw new Error(`Function with name ${functionName} does not exist in the global function registry`);
    }
    return coreFunctionRegistry[functionName](...args);
  }

  /**
   * Get a storage adapter by id
   * @param {string} adapterId
   * @returns {IStorageAdapter}
   */
  public getStorageAdapter(adapterId: string): IStorageAdapter {
    return this.store.getAdapter(adapterId);
  }

  protected async preInitialize(): Promise<void> {}

  protected async postInitialize(): Promise<void> {
    (globalThis as any).__PIXI_APP__ = this;
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
    console.log(defaultModules);
    for (let i = 0; i < defaultModules.length; i++) {
      const module = new defaultModules[i]();
      await this.registerModule(module);
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
    console.log('MANIFEST', opts.manifest);
    this.manifest = opts.manifest;
    await Assets.init(opts);
  }

  protected async loadDefaultScene(): Promise<void> {
    return this.scenes.loadDefaultScene();
  }

  private async _resize() {
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
    this.webEvents.onResize.connect(this._resize);

    // scene manager
    this.stage.addChild(this.scenes.view);
    this.stage.addChild(this.focus.view);

    return Promise.resolve();
  }
}
