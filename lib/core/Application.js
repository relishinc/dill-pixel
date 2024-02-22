import { Application as PIXIPApplication, } from 'pixi.js';
import { defaultModules } from '../modules/default';
import { Signal } from '../signals';
import { Store } from '../store/Store';
import { bindAllMethods, isDev, isMobile, isRetina, Logger } from '../utils';
const defaultApplicationOptions = {
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
export class Application extends PIXIPApplication {
    static { this.containerId = 'dill-pixel-game-container'; }
    static getInstance() {
        return Application.instance;
    }
    static createContainer(pId) {
        const container = document.createElement('div');
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
        bindAllMethods(this);
    }
    get state() {
        if (!this._stateManager) {
            this._stateManager = this.getModule('stateManager');
        }
        return this._stateManager;
    }
    get asset() {
        if (!this._assetManager) {
            this._assetManager = this.getModule('assetManager');
        }
        return this._assetManager;
    }
    get webEvents() {
        if (!this._webEventsManager) {
            this._webEventsManager = this.getModule('webEventsManager');
        }
        return this._webEventsManager;
    }
    get store() {
        return this._store;
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
                }
                else {
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
                    }
                    else {
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
    getModule(moduleName) {
        return this._modules.get(moduleName);
    }
    getStorageAdapter(adapterId) {
        return this.store.getAdapter(adapterId);
    }
    async preInitialize() { }
    async postInitialize() {
        globalThis.__PIXI_APP__ = this;
    }
    // modules
    async registerModule(module) {
        this._modules.set(module.id, module);
        return module.initialize();
    }
    async registerDefaultModules() {
        for (let i = 0; i < defaultModules.length; i++) {
            const module = new defaultModules[i]();
            await this.registerModule(module);
        }
    }
    async registerCustomModules() {
        if (isDev) {
            Logger.log('No custom modules registered using "registerCustomModules". Register them by overriding the "registerCustomModules" method in your' +
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
    async registerStorageAdapter(adapter) {
        return this.store.registerAdapter(adapter);
    }
    async setup() {
        // override me to set up application specific stuff
    }
    async _onResize() {
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
    async _setup() {
        // register for PIXI DevTools extension
        if (isDev) {
            globalThis.__PIXI_APP__ = this;
        }
        // connect onResize signal
        this.webEvents.onResize.connect(this._onResize);
        return Promise.resolve();
    }
}
//# sourceMappingURL=Application.js.map