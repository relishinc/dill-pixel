var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Application_1;
import { Application as PIXIPApplication, Assets, Point, } from 'pixi.js';
import defaultModules from '../modules/defaultModules';
import { SpineModule } from '../modules/SpineModule';
import { Signal } from '../signals';
import { Store } from '../store/Store';
import { isPromise } from '../utils/async';
import { Logger } from '../utils/console/Logger';
import { isDev } from '../utils/env';
import { getDynamicModuleFromImportListItem } from '../utils/framework';
import { bindAllMethods } from '../utils/methodBinding';
import { coreFunctionRegistry } from './coreFunctionRegistry';
import { coreSignalRegistry } from './coreSignalRegistry';
import { MethodBindingRoot } from './decorators';
const defaultApplicationOptions = {
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
let Application = class Application extends PIXIPApplication {
    static { Application_1 = this; }
    //
    static { this.containerId = 'dill-pixel-game-container'; }
    static getInstance() {
        return Application_1.instance;
    }
    static createContainer(pId) {
        const container = document.createElement('div');
        Application_1.containerElement = container;
        container.setAttribute('id', pId);
        document.body.appendChild(container);
        return container;
    }
    constructor() {
        super();
        // signals
        this.onResize = new Signal();
        // modules
        this._modules = new Map();
        // size
        this._center = new Point(0, 0);
        bindAllMethods(this);
    }
    get assets() {
        if (!this._assetManager) {
            this._assetManager = this.getModule('AssetManager');
        }
        return this._assetManager;
    }
    get scenes() {
        if (!this._sceneManager) {
            this._sceneManager = this.getModule('SceneManager');
        }
        return this._sceneManager;
    }
    get webEvents() {
        if (!this._webEventsManager) {
            this._webEventsManager = this.getModule('WebEventsManager');
        }
        return this._webEventsManager;
    }
    get keyboard() {
        if (!this._keyboardManager) {
            this._keyboardManager = this.getModule('KeyboardManager');
        }
        return this._keyboardManager;
    }
    get focus() {
        if (!this._focusManager) {
            this._focusManager = this.getModule('FocusManager');
        }
        return this._focusManager;
    }
    get center() {
        return this._center;
    }
    get size() {
        return this.resizer.size;
    }
    get i18n() {
        if (!this._i18n) {
            this._i18n = this.getModule('i18n');
        }
        return this._i18n;
    }
    get popups() {
        if (!this._popupManager) {
            this._popupManager = this.getModule('PopupManager');
        }
        return this._popupManager;
    }
    get audio() {
        if (!this._audioManager) {
            this._audioManager = this.getModule('AudioManager');
        }
        return this._audioManager;
    }
    get resizer() {
        if (!this._resizer) {
            this._resizer = this.getModule('resizer');
        }
        return this._resizer;
    }
    get store() {
        return this._store;
    }
    /**
     * Returns the global signals
     */
    get globalSignals() {
        return Object.keys(coreSignalRegistry);
    }
    /**
     * Returns the global functions
     * @returns {{[functionName: string]: any}}
     */
    get globalFunctions() {
        return Object.keys(coreFunctionRegistry);
    }
    get views() {
        return [this.scenes.view, this.popups.view];
    }
    /**
     * Destroy the application
     * This will destroy all modules and the store
     * @param {RendererDestroyOptions} rendererDestroyOptions
     * @param {DestroyOptions} options
     */
    destroy(rendererDestroyOptions, options) {
        this._modules.forEach((module) => {
            module.destroy();
        });
        this.store.destroy();
        super.destroy(rendererDestroyOptions, options);
    }
    async initialize(config) {
        if (Application_1.instance) {
            throw new Error('Application is already initialized');
        }
        Application_1.instance = this;
        this.config = Object.assign({ ...defaultApplicationOptions }, config);
        await this.preInitialize(this.config);
        await this.initAssets();
        // initialize the pixi application
        await Application_1.instance.init(Application_1.instance.config);
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
        // return the Application instance to the create method, if needed
        return Application_1.instance;
    }
    getModule(moduleName) {
        return this._modules.get(moduleName);
    }
    async postInitialize() {
        globalThis.__PIXI_APP__ = this;
        this._modules.forEach((module) => {
            module.postInitialize(this);
        });
        void this._resize();
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
    on(signalName) {
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
    func(functionName, ...args) {
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
    getStorageAdapter(adapterId) {
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
    async preInitialize(config) {
        if (config.useSpine) {
            await this.registerModule(new SpineModule());
        }
    }
    // modules
    async registerModule(module, options) {
        if (this._modules.has(module.id)) {
            Logger.error(`Module with id "${module.id}" already registered. Not registering.`);
            return Promise.resolve();
        }
        this._modules.set(module.id, module);
        return module.initialize(this, options);
    }
    async registerDefaultModules() {
        for (let i = 0; i < defaultModules.length; i++) {
            const module = new defaultModules[i]();
            await this.registerModule(module, this.config[module.id] || undefined);
        }
    }
    async registerModules() {
        if (isDev) {
            Logger.log('No custom modules registered using "registerModules". Register them by overriding the "registerModules" method in your' +
                ' Application class.');
        }
        return Promise.resolve();
    }
    // storage
    async registerStorageAdapters() {
        if (isDev) {
            Logger.log('No storage adapters registered using "registerStorageAdapters". Register them by overriding the' +
                ' "registerStorageAdapters" method in your' +
                ' Application class.');
        }
        return Promise.resolve();
    }
    async registerStorageAdapter(adapter, adapterOptions) {
        return this.store.registerAdapter(adapter, adapterOptions);
    }
    async setup() {
        // override me to set up application specific stuff
    }
    async initAssets() {
        const opts = {
            texturePreference: { resolution: this.config.resolution >= 1.5 ? 1 : 0.5 },
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
    async loadDefaultScene() {
        return this.scenes.loadDefaultScene();
    }
    async _resize() {
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
    async _setup() {
        // register for PIXI DevTools extension
        if (isDev) {
            globalThis.__PIXI_APP__ = this;
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
        return Promise.resolve();
    }
};
Application = Application_1 = __decorate([
    MethodBindingRoot,
    __metadata("design:paramtypes", [])
], Application);
export { Application };
//# sourceMappingURL=Application.js.map