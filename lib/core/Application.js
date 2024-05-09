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
import { Application as PIXIPApplication, Assets, isMobile, Point, } from 'pixi.js';
import defaultPlugins from '../plugins/defaultPlugins';
import { SpinePlugin } from '../plugins/spine/SpinePlugin';
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
    useDefaults: true,
    useSpine: false,
    useVoiceover: true,
    storageAdapters: [],
    plugins: [],
    scenes: [],
    defaultSceneLoadMethod: 'immediate',
    manifest: './assets.json',
};
let Application = class Application extends PIXIPApplication {
    static { Application_1 = this; }
    //
    static containerId = 'dill-pixel-game-container';
    static containerElement;
    static instance;
    // config
    config;
    manifest;
    onPause = new Signal();
    onResume = new Signal();
    // signals
    onResize = new Signal();
    // plugins
    _plugins = new Map();
    // default plugins
    _assetManager;
    _sceneManager;
    _webEventsManager;
    _keyboardManager;
    _focusManager;
    _popupManager;
    _audioManager;
    _voiceoverPlugin;
    _captionsPlugin;
    _actions;
    constructor() {
        super();
        bindAllMethods(this);
    }
    _i18n;
    get i18n() {
        if (!this._i18n) {
            this._i18n = this.getPlugin('i18n');
        }
        return this._i18n;
    }
    _resizer;
    get resizer() {
        if (!this._resizer) {
            this._resizer = this.getPlugin('resizer');
        }
        return this._resizer;
    }
    // input
    _input;
    get input() {
        if (!this._input) {
            this._input = this.getPlugin('InputManager');
        }
        return this._input;
    }
    // store
    _store;
    get store() {
        return this._store;
    }
    // size
    _center = new Point(0, 0);
    get center() {
        return this._center;
    }
    get assets() {
        if (!this._assetManager) {
            this._assetManager = this.getPlugin('AssetManager');
        }
        return this._assetManager;
    }
    get scenes() {
        if (!this._sceneManager) {
            this._sceneManager = this.getPlugin('SceneManager');
        }
        return this._sceneManager;
    }
    get webEvents() {
        if (!this._webEventsManager) {
            this._webEventsManager = this.getPlugin('WebEventsManager');
        }
        return this._webEventsManager;
    }
    get keyboard() {
        if (!this._keyboardManager) {
            this._keyboardManager = this.getPlugin('KeyboardManager');
        }
        return this._keyboardManager;
    }
    get focus() {
        if (!this._focusManager) {
            this._focusManager = this.getPlugin('FocusManager');
        }
        return this._focusManager;
    }
    get size() {
        return this.resizer.size;
    }
    get popups() {
        if (!this._popupManager) {
            this._popupManager = this.getPlugin('PopupManager');
        }
        return this._popupManager;
    }
    get audio() {
        if (!this._audioManager) {
            this._audioManager = this.getPlugin('AudioManager');
        }
        return this._audioManager;
    }
    get actionContext() {
        return this.input.context;
    }
    set actionContext(context) {
        this.input.context = context;
    }
    get voiceover() {
        if (!this._voiceoverPlugin) {
            this._voiceoverPlugin = this.getPlugin('voiceover');
        }
        return this._voiceoverPlugin;
    }
    get captions() {
        if (!this._captionsPlugin) {
            this._captionsPlugin = this.getPlugin('captions');
        }
        return this._captionsPlugin;
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
    get isMobile() {
        return isMobile.any;
    }
    get isTouch() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    get signal() {
        return coreSignalRegistry;
    }
    get func() {
        return coreFunctionRegistry;
    }
    get exec() {
        return coreFunctionRegistry;
    }
    get views() {
        return [this.scenes.view, this.popups.view, this.captions.view];
    }
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
    /**
     * Destroy the application
     * This will destroy all plugins and the store
     * @param {RendererDestroyOptions} rendererDestroyOptions
     * @param {DestroyOptions} options
     */
    destroy(rendererDestroyOptions, options) {
        this._plugins.forEach((plugin) => {
            plugin.destroy();
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
        await this.init(this.config);
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
        Application_1.containerElement.classList.add('loaded');
        // return the Application instance to the create method, if needed
        return Application_1.instance;
    }
    getPlugin(pluginName) {
        const plugin = this._plugins.get(pluginName);
        if (!plugin) {
            Logger.error(`Plugin with name "${pluginName}" not found.`);
        }
        return plugin;
    }
    async postInitialize() {
        globalThis.__PIXI_APP__ = this;
        this._plugins.forEach((plugin) => {
            plugin.postInitialize(this);
        });
        this.webEvents.onVisibilityChanged.connect((visible) => {
            if (visible) {
                this.audio.restore();
            }
            else {
                this.audio.suspend();
            }
        });
        void this._resize();
    }
    actions(action) {
        return this.input.actions(action);
    }
    getUnloadedPlugin(id) {
        return this.config.plugins?.find((plugin) => plugin.id === id);
    }
    async loadPlugin(listItem) {
        if (this._plugins.has(listItem.id)) {
            Logger.error(`Plugin with id "${listItem.id}" already registered. Not registering.`);
            return Promise.resolve(false);
        }
        const plugin = await getDynamicModuleFromImportListItem(listItem);
        const pluginInstance = new plugin(listItem.id);
        if (pluginInstance.id !== listItem.id) {
            pluginInstance.id = listItem.id;
        }
        return await this.registerPlugin(pluginInstance, listItem.options);
    }
    sendAction(action, data) {
        this.input.sendAction(action, data);
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
            await this.registerPlugin(new SpinePlugin());
        }
    }
    // plugins
    async registerPlugin(plugin, options) {
        if (this._plugins.has(plugin.id)) {
            Logger.error(`Plugin with id "${plugin.id}" already registered. Not registering.`);
            return Promise.resolve();
        }
        Logger.log(`Registering plugin: ${plugin.id}`);
        this._plugins.set(plugin.id, plugin);
        return plugin.initialize(this, options);
    }
    async registerDefaultPlugins() {
        for (let i = 0; i < defaultPlugins.length; i++) {
            const plugin = new defaultPlugins[i]();
            await this.registerPlugin(plugin, this.config[plugin.id] || undefined);
        }
    }
    async registerPlugins() {
        if (isDev) {
            Logger.log('No custom plugins registered using "registerPlugins". Register them by overriding the "registerPlugins"' +
                ' method in your' +
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
        // is touch device
        return Promise.resolve();
    }
};
Application = Application_1 = __decorate([
    MethodBindingRoot,
    __metadata("design:paramtypes", [])
], Application);
export { Application };
