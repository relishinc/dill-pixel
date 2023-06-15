var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Application as PIXIApplication, Assets, Point, Ticker } from "pixi.js";
import * as PubSub from "pubsub-js";
import { HowlerManager, VoiceOverManager, } from "./Audio";
import { CopyManager } from "./Copy";
import { AppConfig } from "./Data";
import * as Topics from "./Data/Topics";
import { HitAreaRenderer, KeyboardManager, MouseManager } from "./Input";
import { AssetMap, LoadManager, SplashScreen } from "./Load";
import * as Physics from "./Physics";
import { PopupManager } from "./Popup";
import { SaveManager } from "./Save";
import { StateManager } from "./State";
import { AssetUtils, Delay, OrientationManager, ResizeManager, WebEventsManager, } from "./Utils";
import * as Factory from './Utils/Factory';
class Application extends PIXIApplication {
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
        // set the resolution suffix for loading assets
        AssetUtils.resolutionSuffix = this.resolutionSuffix;
        // bind functions
        this.update = this.update.bind(this);
        this.onRequiredAssetsLoaded = this.onRequiredAssetsLoaded.bind(this);
        // create factories
        this._makeFactory = new Factory.MakeFactory();
        this._addFactory = new Factory.AddFactory(this.stage);
        this._size = new Point();
        Ticker.shared.add(this.update);
        this._webEventsManager = new WebEventsManager(this);
        this._mouseManager = new MouseManager(this.renderer.plugins.interaction);
        this._stateManager = new StateManager(this);
        this._popupManager = new PopupManager(this);
        this._loadManager = new LoadManager(this, this.createSplashScreen());
        this._audioManager = new HowlerManager(this);
        this._keyboardManager = new KeyboardManager(this);
        this._resizeManager = new ResizeManager(this, Application.SIZE_MIN_DEFAULT, Application.SIZE_MAX_DEFAULT);
        this._copyManager = new CopyManager(this);
        this._saveManager = new SaveManager(this);
        this._orientationManager = new OrientationManager(this);
        this._voiceoverManager = new VoiceOverManager(this);
        /**
         * Bind methods from some manager classes to callable methods in the application
         */
        this.startSplashProcess = this._loadManager.startSplashProcess.bind(this._loadManager);
    }
    static get instance() {
        if (Application._instance === undefined) {
            console.error("You've tried to access the instance of HLF.Application when it hasn't been set. " +
                "Please set the _instance in your Application.");
        }
        return Application._instance;
    }
    // override this to set a custom resolution suffix;
    get resolutionSuffix() {
        return "@" + this.renderer.resolution + "x";
    }
    get add() {
        return this._addFactory;
    }
    get make() {
        return this._makeFactory;
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
    get topics() {
        return Topics;
    }
    get defaultState() {
        return undefined;
    }
    get physics() {
        return this._physics;
    }
    addPhysics(type) {
        this._physics = new Physics.MatterPhysics.Base(this);
        return this._physics;
    }
    broadcast(message, data) {
        return PubSub.publishSync(message, data);
    }
    subscribe(message, callback) {
        return PubSub.subscribe(message, callback);
    }
    /**
     *
     * @param pGroupId
     * @param pAssets
     * proxy function for @link {AssetMap.addAssetGroup}
     */
    addAssetGroup(pGroupId, pAssets) {
        return AssetMap.addAssetGroup(pGroupId, pAssets);
    }
    hasAsset(pAssetName) {
        return Assets.get(pAssetName) !== undefined;
    }
    /**
     * Initializes all managers and starts the splash screen process.
     */
    init() {
        this.onPlayAudio = this.onPlayAudio.bind(this);
        this.addToStage(this._stateManager);
        this.addToStage(this._popupManager);
        this.addToStage(this._loadManager);
        this.addToStage((this._hitAreaRenderer = new HitAreaRenderer(this.stage)));
        this._audioManager.init();
        this.subscribe(this.topics.PLAY_AUDIO, this.onPlayAudio);
        this.createAssetMap();
        this.registerStates();
        this.registerPopups();
        this.registerLoadingScreens();
        this.startSplashProcess(this.requiredAssets, this.onRequiredAssetsLoaded);
        this.onResize(0);
        // Delayed to fix incorrect iOS resizing in WKWebView. See: https://bugs.webkit.org/show_bug.cgi?id=170595
        this.onResize(0.5);
        this._webEventsManager.registerResizeCallback(() => this.onResize(0.5));
    }
    /**
     * Called once per frame. Updates the `StateManager`, `PopupManager`, `LoadManager` and `HitAreaRenderer`.
     */
    update() {
        var _a;
        const deltaTime = Ticker.shared.elapsedMS / 1000;
        this._stateManager.update(deltaTime);
        this._popupManager.update(deltaTime);
        this._loadManager.update(deltaTime);
        this._hitAreaRenderer.update(deltaTime);
        (_a = this._physics) === null || _a === void 0 ? void 0 : _a.update(deltaTime);
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
    createAssetMap() {
        // override
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
    onResize(pDelay = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pDelay > 0) {
                yield Delay(pDelay);
            }
            this._size.copyFrom(this._resizeManager.getSize());
            const stageScale = this._resizeManager.getStageScale();
            this.stage.scale.set(stageScale);
            this.renderer.resize(this._size.x * stageScale, this._size.y * stageScale);
            this._stateManager.onResize(this._size);
            this._loadManager.onResize(this._size);
            this._popupManager.onResize(this._size);
            this._orientationManager.onResize(this._size);
            this.broadcast(this.topics.KEYBOARD_REFOCUS);
            if (this._hitAreaRenderer.active) {
                this._hitAreaRenderer.renderHitAreas();
            }
            this.onResizeComplete();
        });
    }
    onPlayAudio(message, data) {
        const token = data;
        this.audio.play(token.id, token.volume, token.loop, token.category);
    }
    /**
     * Called when resize is complete after the delay.
     * @override
     */
    onResizeComplete() {
        // override
    }
    /**
     * Override to specify what should happen after all persistent assets have been loaded.
     * @override
     */
    onRequiredAssetsLoaded() {
        if (this.state.default) {
            this.state.transitionTo(this.state.default, SplashScreen.NAME);
        }
    }
}
Application.SIZE_MIN_DEFAULT = new Point(1024, 768);
Application.SIZE_MAX_DEFAULT = new Point(1365, 768);
export { Application };
//# sourceMappingURL=Application.js.map