/**
 * @file Application.ts
 * This file defines the main Application class for the project, along with some related types and functions.
 */
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { Application as PIXIApplication, Assets, Point, Ticker } from 'pixi.js';
import { HowlerManager, playVO, VoiceOverManager } from '../audio';
import { CopyManager } from '../copy';
import { isDev, updateFocus } from '../functions';
import { DefaultKeyboardFocusManagerSprite, HitAreaRenderer, KeyboardFocusManager, KeyboardManager, MouseManager } from '../input';
import { AssetMap, LoadManager, SplashScreen } from '../load';
import { PhysicsEngineType } from '../physics';
import { PopupManager } from '../popup';
import { SaveManager } from '../save';
import { Signals } from '../signals';
import { StateManager } from '../state';
import { Add, AssetUtils, bindMethods, delay, HTMLTextStyleManager, Make, OrientationManager, ResizeManager, WebEventsManager } from '../utils';
import { ResizeManagerNew } from '../utils/ResizeManagerNew';
import { AppConfig } from './AppConfig';
const isDevEnv = isDev();
/**
 * Main Application class.
 * @extends PIXIApplication
 */
export class Application extends PIXIApplication {
    static { this.SIZE_MIN_DEFAULT = new Point(1024, 768); }
    static { this.SIZE_MAX_DEFAULT = new Point(1365, 768); }
    /**
     * Creates a container element with the given id and appends it to the DOM.
     * @param pId{string} - The id of the element to create.
     */
    static createContainer(pId) {
        const container = document.createElement('div');
        container.setAttribute('id', pId);
        document.body.appendChild(container);
        return container;
    }
    /**
     * Creates a new instance of the Application class and returns it.
     */
    static getInstance() {
        if (!this._instance) {
            throw new Error('Application has not been initialized yet.');
        }
        return this._instance;
    }
    /**
     * The config passed in can be a json object, or an `AppConfig` object.
     * @param appConfig
     * @see `AppConfig` for what can be contained in the passed-in config.
     * @default resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
     * @default useNewResizeManager: true
     * @default resizeOptions: undefined
     * @default resizeDebounce: 0
     * @default useSpine: false
     * @default showStats: false
     * @default showStateDebugMenu: false
     */
    constructor(appConfig) {
        if (Application._instance) {
            throw new Error('Application already exists. Use Application.getInstance() instead.');
        }
        super(new AppConfig(appConfig));
        this._initialized = false;
        this._resizeDebounce = 0;
        Application._instance = this;
        this._resizeDebounce = appConfig?.resizeDebounce ?? 0;
        this._useSpine = appConfig?.useSpine || false;
        this._useNewResizeManager = appConfig?.useNewResizeManager ?? true;
        this._resizeOptions = appConfig?.resizeOptions || {};
        if (appConfig?.showStats) {
            this.addStats().then(() => {
                console.log('stats.js added');
            });
        }
        this._showStateDebugMenu = appConfig?.showStateDebugMenu ?? false;
        this._useHash = appConfig?.useHashChange ?? false;
        // start the ticker if it hasn't been started yet
        if (!this.ticker.started) {
            this.ticker.start();
        }
        // set the resolution suffix for loading assets
        AssetUtils.resolutionSuffix = this.resolutionSuffix;
        // bind functions
        bindMethods(this, 'update', 'onRequiredAssetsLoaded');
        // create factories
        this._addFactory = new Add(this.stage);
        this._size = new Point();
        Ticker.shared.add(this.update);
        this._webEventsManager = new WebEventsManager(this);
        this._mouseManager = new MouseManager(this.renderer.events);
        this._stateManager = new StateManager(this);
        this._popupManager = new PopupManager(this);
        this._loadManager = new LoadManager(this, this.createSplashScreen());
        this._audioManager = new HowlerManager(this);
        this._keyboardManager = new KeyboardManager(this);
        this.addFocusManager();
        if (this._useNewResizeManager && this._resizeOptions) {
            this._resizeManager = new ResizeManagerNew(this);
        }
        else {
            if (this.resizeTo) {
                this._resizeManager = new ResizeManager(this);
            }
            else {
                this._resizeManager = new ResizeManager(this, appConfig?.sizeMin || Application.SIZE_MIN_DEFAULT, appConfig?.sizeMax || Application.SIZE_MAX_DEFAULT);
            }
        }
        this._copyManager = new CopyManager(this);
        this._saveManager = new SaveManager(this);
        this._orientationManager = new OrientationManager(this);
        this._voiceoverManager = new VoiceOverManager(this);
        /**
         * Bind methods from some manager classes to callable methods in the application
         */
        this.startSplashProcess = this._loadManager.startSplashProcess.bind(this._loadManager);
    }
    static get containerElement() {
        return document.getElementById(Application.containerID) || undefined;
    }
    static get containerID() {
        return 'game-container';
    }
    /**
     * gets the current singleton instance
     */
    static get instance() {
        if (Application._instance === undefined) {
            throw new Error('Application has not been initialized yet.');
        }
        return Application._instance;
    }
    set resizeOptions(value) {
        this._resizeOptions = value;
        this.resizer.options = this._resizeOptions;
    }
    // override this to set a custom resolution suffix;
    get resolutionSuffix() {
        return '@' + this.renderer.resolution + 'x';
    }
    get add() {
        return this._addFactory;
    }
    get make() {
        return Make;
    }
    get addToStage() {
        return this.stage.addChild.bind(this.stage);
    }
    /**
     * Override to specify assets that should persist between state loads.
     *
     * Note: Splash screen assets are loaded before requiredAssets
     * @override
     */
    get requiredAssets() {
        // override
        return [];
    }
    get state() {
        return this._stateManager;
    }
    get keyboard() {
        return this._keyboardManager;
    }
    get popups() {
        return this._popupManager;
    }
    get audio() {
        return this._audioManager;
    }
    get voiceover() {
        return this._voiceoverManager;
    }
    get size() {
        return this._size || new Point();
    }
    get screenSize() {
        return this.resizer?.screenSize || new Point();
    }
    get hitAreaRenderer() {
        return this._hitAreaRenderer;
    }
    get resizer() {
        return this._resizeManager;
    }
    get copy() {
        return this._copyManager;
    }
    get webEvents() {
        return this._webEventsManager;
    }
    get saveManager() {
        return this._saveManager;
    }
    get orientationManager() {
        return this._orientationManager;
    }
    get load() {
        return this._loadManager;
    }
    get defaultState() {
        return undefined;
    }
    get physics() {
        return this._physics;
    }
    get htmlTextStyles() {
        return HTMLTextStyleManager;
    }
    get signals() {
        return Signals;
    }
    async addStats() {
        const Stats = await import('stats.js').then((m) => m.default);
        this.stats = new Stats();
        this.stats.dom.id = 'stats';
        Application.containerElement?.appendChild(this.stats.dom);
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.top = '24px';
        this.stats.dom.style.right = '40px';
        this.stats.dom.style.left = 'auto';
    }
    async addPhysics(type = PhysicsEngineType.MATTER) {
        let PhysicsModule;
        switch (type) {
            case PhysicsEngineType.RAPIER:
                PhysicsModule = await import('../physics/rapier').then((m) => m.RapierPhysics);
                break;
            case PhysicsEngineType.MATTER:
            default:
                PhysicsModule = await import('../physics/matter').then((m) => m.MatterPhysics);
                break;
        }
        this._physics = new PhysicsModule(this);
        return this._physics;
    }
    /**
     *
     * proxy function for @link {AssetMap.addAssetGroup}
     * @param groupIdOrClass
     * @param assets
     */
    addAssetGroup(groupIdOrClass, assets) {
        if (typeof groupIdOrClass === 'string') {
            return AssetMap.addAssetGroup(groupIdOrClass, assets);
        }
        else {
            const Klass = groupIdOrClass;
            if (!Klass.NAME) {
                throw new Error(`You tried to add an asset group for ${Klass}, but it has no NAME defined.`);
            }
            if (!Klass.Assets) {
                throw new Error(`You tried to add an asset group for ${Klass.NAME}, but it has no assets defined.`);
            }
            return AssetMap.addAssetGroup(Klass.NAME, assets || Klass.Assets);
        }
    }
    hasAsset(pAssetName) {
        return Assets.get(pAssetName) !== undefined;
    }
    async initialize() {
        if (this._initialized) {
            throw new Error('Application has already been initialized.');
        }
        await this.init();
        await this._setup();
        await this.setup();
        this._initialized = true;
    }
    /**
     * Initializes all managers and starts the splash screen process.
     */
    async init() {
        // load required externals
        if (this._useSpine) {
            await this.addSpine();
        }
        await this.resizer.initialize(this._resizeOptions);
        this.addToStage(this._stateManager);
        this.addToStage(this._popupManager);
        this.addToStage(this._loadManager);
        this._hitAreaRenderer = this.addToStage(new HitAreaRenderer(this.stage));
        this.addToStage(this._keyboardFocusManager);
        this._audioManager.init();
        this.addAssetGroups();
        this.createAssetMap();
        this.registerStates();
        this.state.statesRegistered();
        this.registerPopups();
        this.registerLoadingScreens();
        await this.loadDocumentFonts();
        await this.loadHTMLTextStyles();
        this.startSplashProcess(this.requiredAssets, this.onRequiredAssetsLoaded);
        // Delayed to fix incorrect iOS resizing in WKWebView. See: https://bugs.webkit.org/show_bug.cgi?id=170595
        this.onResize(this._resizeDebounce ?? 0);
        this._webEventsManager.registerResizeCallback(() => this.onResize(this._resizeDebounce ?? 0));
        this._webEventsManager.registerVisibilityChangedCallback((visible) => {
            if (visible) {
                this.onResize(0);
                this.ticker.start();
                this.ticker.speed = 1;
            }
            else {
                this.ticker.stop();
                this.ticker.speed = 0;
            }
        });
    }
    async loadDocumentFonts() {
        // check if document.fonts is supported
        if (document?.fonts) {
            await document.fonts.ready;
            await this.allFontsLoaded();
        }
    }
    listFonts() {
        if (document?.fonts?.values()) {
            return [...document.fonts.values()];
        }
        return [];
    }
    /**
     * Preload any custom font styles to be used later on with html text
     * currently not sure if there's a better way to do this...
     * @see https://github.com/pixijs/html-text/pull/30
     * @see {HTMLTextStyleManager} for functionality
     * @override
     * @returns {Promise<void>}
     * @async
     * @example
     * // in your Application.ts:
     * import {loadAndAddHTMLTextStyle} from 'dill-pixel';
     *
     * // override loadHTMLTextStyles and do:
     * await loadAndAddHTMLTextStyle('style1', FONT_FAMILY_NAME_1, { fontSize: 16, lineHeight: 19, fill: 'white' }, [{url:'assets/fonts/{fontFile1}.woff2', weight: 'normal'}, {url:'assets/fonts/{fontFile2}.woff2', weight: 'bold'}]);
     *
     * // then later on, from anywhere in your app, you can do:
     * import {getHTMLTextStyle} from 'dill-pixel';
     * this.add.htmlText( 'This is some text', getHTMLTextStyle('style1'), ...);
     */
    async loadHTMLTextStyles() {
        // override
        return Promise.resolve();
    }
    /**
     * Plays a voiceover. Override to e.g. add clauses to playback
     * @param {string | (string | number)[]} key
     * @param {PlayMode | Callback | Partial<IPlayOptions>} mode
     * @param {Callback} callback
     */
    playVO(key, mode, callback) {
        playVO(key, mode, callback);
    }
    /**
     * adds a {KeyboardFocusManager} to the stage
     * @protected
     */
    addFocusManager() {
        this._keyboardFocusManager = new KeyboardFocusManager(DefaultKeyboardFocusManagerSprite);
    }
    /**
     * Adds the Spine plugin to the application.
     * @protected
     */
    async addSpine() {
        await import('../spine/spine');
    }
    async setup() {
        // override me to set up application specific stuff
    }
    /**
     * Called once per frame. Updates the `StateManager`, `PopupManager`, `LoadManager` and `HitAreaRenderer`.
     */
    update() {
        if (!this._initialized) {
            return;
        }
        if (this.stats) {
            this.stats.begin();
        }
        const deltaTime = Ticker.shared.elapsedMS / 1000;
        this._stateManager.update(deltaTime);
        this._popupManager.update(deltaTime);
        this._loadManager.update(deltaTime);
        this._hitAreaRenderer.update(deltaTime);
        this._physics?.update(deltaTime);
        if (this.stats) {
            this.stats.end();
        }
    }
    /**
     * Override to return the appropriate splash screen instance to use.
     * @override
     */
    createSplashScreen() {
        // override
        return new SplashScreen();
    }
    /**
     * Override to set up the asset groups for this application.
     * States do this by default now.
     * @override
     * @example addAssetGroups() {
     *   this.addAssetGroup(SplashScreen.NAME, SplashScreen.Assets);
     * }
     */
    addAssetGroups() {
        // override
    }
    createAssetMap() {
        // override
    }
    /**
     * Registers a state with the state manager.
     * @param {string | LoadScreen} pIdOrClass
     * @param {LoadScreenProvider} pScreen
     * @protected
     */
    registerDefaultLoadScreen(pIdOrClass, pScreen) {
        this.load.registerLoadScreen(pIdOrClass, pScreen, true);
    }
    /**
     * Override to register any and all loading screens needed for this application.
     * @override
     */
    registerLoadingScreens() {
        // override
    }
    /**
     * Override for a good place to register any and all popups needed for this application.
     * You can also do this on demand by calling `this.app.popup.registerPopup(...)` from anywhere in your app.
     * @override
     */
    registerPopups() {
        // override
    }
    /**
     * Override to register any and all states needed for this application.
     * @override
     * @example
     * protected registerStates(): void {
     *   this.state.register(LandingPageState);
     *   this.state.register(GameState);
     *   this.state.register(GameOverState);
     * }
     */
    registerStates() {
        // override
    }
    async onResize(debounceDelay = 0) {
        if (debounceDelay > 0) {
            await delay(debounceDelay);
        }
        if (this._useNewResizeManager) {
            this.resizer.resize();
            this._size = this._size.copyFrom(this.resizer.getSize());
        }
        else {
            if (this._resizeManager.useAspectRatio) {
                this._size.copyFrom(this._resizeManager.getSize());
                const stageScale = this._resizeManager.getStageScale();
                this.stage.scale.set(stageScale);
                this.renderer.resize(this._size.x * stageScale, this._size.y * stageScale);
            }
            else {
                let w = this._size.x;
                let h = this._size.y;
                if (this.resizeTo?.getBoundingClientRect) {
                    const el = this.resizeTo;
                    w = el.getBoundingClientRect().width;
                    h = el.getBoundingClientRect().height;
                }
                else if (this.resizeTo?.innerWidth) {
                    const el = this.resizeTo;
                    w = el.innerWidth;
                    h = el.innerHeight;
                }
                this._size = new Point(w, h);
                this._resizeManager.sizeMin = this._size;
                this._resizeManager.sizeMax = this._size;
                this.renderer.resize(w, h);
            }
        }
        // emit a global resize signal that anything can listen to
        this.ticker.addOnce(() => {
            this._stateManager.onResize(this._size);
            this._loadManager.onResize(this._size);
            this._popupManager.onResize(this._size);
            this._orientationManager.onResize();
            Signals.onResize.emit(this._size);
            updateFocus();
            if (this._hitAreaRenderer.active) {
                this._hitAreaRenderer.renderHitAreas();
            }
            this.onResizeComplete();
        });
    }
    /**
     * Called when resize is complete after the delay.
     * @override
     */
    onResizeComplete() {
        // override
    }
    /**
     * Override to load any custom fonts.
     * @returns {Font[]}
     * @protected
     * @example
     * protected getFontsList(): Font[] {
     *   return [{ family: 'Open Sans', data: { weight: 400 } }];
     * }
     */
    getFontsList() {
        return [];
    }
    /**
     * Called after all fonts have been loaded.
     * @returns {Promise<void>}
     * @protected
     */
    async allFontsLoaded() {
        const fonts = this.getFontsList();
        if (fonts?.length > 0) {
            return Promise.all(fonts.map((ff) => {
                const font = new FontFaceObserver(ff.family, ff.data);
                return font.load();
            })).catch((e) => {
                console.warn('Error loading fonts', e);
            });
        }
        else {
            return Promise.resolve();
        }
    }
    async onRequiredAssetsLoaded() {
        void this.boot();
    }
    async boot() {
        void this.loadDefaultState();
    }
    async loadDefaultState() {
        if (this.state.default) {
            this.state.transitionTo(this.state.default);
        }
    }
    /**
     * Sets up the application.
     * adds this app as a global variable for debugging
     * Tells the @link{StateManager} to show the debug menu if configured
     * Tells the @link{StateManager} to listen for hash changes if configured
     * @private
     */
    _setup() {
        if (isDevEnv) {
            // for pixi devtools
            globalThis.__PIXI_APP__ = this;
        }
        this.state.useHash = this._useHash;
        this.state.useDebugMenu = this._showStateDebugMenu;
    }
}
//# sourceMappingURL=Application.js.map