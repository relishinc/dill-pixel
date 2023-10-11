// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';
import { Application as PIXIApplication, Assets, Point, Ticker } from 'pixi.js';
import { HowlerManager, VoiceOverManager } from '../audio';
import { CopyManager } from '../copy';
import { DefaultKeyboardFocusManagerSprite, HitAreaRenderer, KeyboardFocusManager, KeyboardManager, MouseManager, } from '../input';
import { AssetMap, LoadManager, SplashScreen } from '../load';
import { PhysicsEngineType } from '../physics';
import { PopupManager } from '../popup';
import { SaveManager } from '../save';
import { keyboardReFocus, Signals } from '../signals';
import { StateManager } from '../state';
import { AssetUtils, Delay, OrientationManager, ResizeManager, WebEventsManager } from '../utils';
import { Add, Make } from '../utils/factory';
import { AppConfig } from './AppConfig';
const isDev = process.env.NODE_ENV === 'development';
export class Application extends PIXIApplication {
    static { this.SIZE_MIN_DEFAULT = new Point(1024, 768); }
    static { this.SIZE_MAX_DEFAULT = new Point(1365, 768); }
    /**
     * The config passed in can be a json object, or an `AppConfig` object.
     * @param pConfig
     * @see `AppConfig` for what can be contained in the passed in config.
     * @default autoResize: true
     * @default resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
     */
    constructor(pConfig) {
        // TODO Relish GM => Look into what might be added to the AppConfig class and if there is reason to cache it.
        super(new AppConfig(pConfig));
        if (isDev || pConfig?.showStatsInProduction) {
            this.addStats();
        }
        // start the ticker if it hasn't been started yet
        if (!this.ticker.started) {
            this.ticker.start();
        }
        // set the resolution suffix for loading assets
        AssetUtils.resolutionSuffix = this.resolutionSuffix;
        // bind functions
        this.update = this.update.bind(this);
        this.onRequiredAssetsLoaded = this.onRequiredAssetsLoaded.bind(this);
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
        if (this.resizeTo) {
            this._resizeManager = new ResizeManager(this);
        }
        else {
            this._resizeManager = new ResizeManager(this, pConfig?.sizeMin || Application.SIZE_MIN_DEFAULT, pConfig?.sizeMax || Application.SIZE_MAX_DEFAULT);
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
            console.error("You've tried to access the instance of HLF.Application when it hasn't been set. " +
                'Please set the _instance in your Application.');
        }
        return Application._instance;
    }
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
     * @param pElement{string | HTMLElement} - The id of the element to use as the container, or the element itself.
     */
    static create(pElement = Application.containerID) {
        let el = null;
        if (typeof pElement === 'string') {
            el = document.getElementById(pElement);
            if (!el) {
                el = Application.createContainer(pElement);
            }
        }
        else if (pElement instanceof HTMLElement) {
            el = pElement;
        }
        if (!el) {
            // no element to use
            console.error('You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id.');
            return null;
        }
        return this.instance.create(el);
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
        return this._size;
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
    get debugger() {
        if (!this._debugger) {
            this.addDebugger();
        }
        return this._debugger;
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
    addFocusManager() {
        this._keyboardFocusManager = new KeyboardFocusManager(DefaultKeyboardFocusManagerSprite);
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
     * @param pGroupIdOrClass
     * @param pAssets
     * proxy function for @link {AssetMap.addAssetGroup}
     */
    addAssetGroup(pGroupIdOrClass, pAssets) {
        if (typeof pGroupIdOrClass === 'string') {
            return AssetMap.addAssetGroup(pGroupIdOrClass, pAssets);
        }
        else {
            const Klass = pGroupIdOrClass;
            if (!Klass.NAME) {
                throw new Error(`You tried to add an asset group for ${Klass}, but it has no NAME defined.`);
            }
            if (!Klass.Assets) {
                throw new Error(`You tried to add an asset group for ${Klass.NAME}, but it has no assets defined.`);
            }
            return AssetMap.addAssetGroup(Klass.NAME, pAssets || Klass.Assets);
        }
    }
    hasAsset(pAssetName) {
        return Assets.get(pAssetName) !== undefined;
    }
    /**
     * initialize the Application singleton
     * and append the view to the DOM
     * @param pElement{String|HTMLElement}
     */
    create(pElement) {
        if (pElement) {
            pElement.appendChild(Application.instance.view);
        }
        else {
            console.error('No element found to append the view to.');
            return null;
        }
        Application.instance.init();
        return Application.instance;
    }
    /**
     * Initializes all managers and starts the splash screen process.
     */
    async init() {
        this.onPlayAudio = this.onPlayAudio.bind(this);
        this.addToStage(this._stateManager);
        this.addToStage(this._popupManager);
        this.addToStage(this._loadManager);
        this._hitAreaRenderer = this.addToStage(new HitAreaRenderer(this.stage));
        this.addToStage(this._keyboardFocusManager);
        this._audioManager.init();
        Signals.playAudio.connect(this.onPlayAudio);
        this.addAssetGroups();
        this.createAssetMap();
        this.registerStates();
        this.state.statesRegistered();
        this.registerPopups();
        this.registerLoadingScreens();
        await this.loadDocumentFonts();
        this.startSplashProcess(this.requiredAssets, this.onRequiredAssetsLoaded);
        this.onResize(0);
        // Delayed to fix incorrect iOS resizing in WKWebView. See: https://bugs.webkit.org/show_bug.cgi?id=170595
        this.onResize(0.5);
        this._webEventsManager.registerResizeCallback(() => this.onResize(0.5));
        this.setup();
    }
    async loadDocumentFonts() {
        // check if document.fonts is supported
        if (document?.fonts) {
            await document.fonts.ready;
            await this.allFontsLoaded();
        }
    }
    async addDebugger() {
        const DebuggerClass = await import('../debug').then((m) => m.Debugger);
        this._debugger = new DebuggerClass(this);
    }
    setup() {
        // override me to set up application specific stuff
    }
    /**
     * Called once per frame. Updates the `StateManager`, `PopupManager`, `LoadManager` and `HitAreaRenderer`.
     */
    update() {
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
     * Override to setup the asset map for this application.
     * @override
     */
    addAssetGroups() {
        // override
    }
    createAssetMap() {
        // override
    }
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
     * Override to register any and all popups needed for this application.
     * @override
     */
    registerPopups() {
        // override
    }
    /**
     * Override to register any and all states needed for this application.
     * @override
     */
    registerStates() {
        // override
    }
    /**
     * Called when the application window is resized.
     * @param pDelay A delay before telling the rest of the application that a resize occured.
     * @default 0
     */
    async onResize(pDelay = 0) {
        if (pDelay > 0) {
            await Delay(pDelay);
        }
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
        this._stateManager.onResize(this._size);
        this._loadManager.onResize(this._size);
        this._popupManager.onResize(this._size);
        this._orientationManager.onResize();
        // emit a global resize signal that anything can listen to
        Signals.onResize.emit(this._size);
        keyboardReFocus();
        if (this._hitAreaRenderer.active) {
            this._hitAreaRenderer.renderHitAreas();
        }
        this.onResizeComplete();
    }
    onPlayAudio(token) {
        this.audio.play(token.id, token.volume, token.loop, token.category);
    }
    /**
     * Called when resize is complete after the delay.
     * @override
     */
    onResizeComplete() {
        // override
    }
    getFontsList() {
        return [];
    }
    allFontsLoaded() {
        const fonts = this.getFontsList();
        if (fonts?.length > 0) {
            return Promise.all(fonts.map((ff) => {
                const font = new FontFaceObserver(ff.family, ff.data);
                return font.load();
            })).catch((e) => {
                console.error('Error loading fonts', e);
            });
        }
        else {
            return Promise.resolve();
        }
    }
    /**
     * Override to specify what should happen after all persistent assets have been loaded.
     * @override
     */
    async onRequiredAssetsLoaded() {
        // transition to the default state, if set
        if (this.state.default) {
            this.state.transitionTo(this.state.default);
        }
    }
}
//# sourceMappingURL=Application.js.map