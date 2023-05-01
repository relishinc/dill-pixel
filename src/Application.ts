import * as PIXI from "pixi.js";
import {Assets, Sprite} from "pixi.js";
import {gsap} from "gsap";
import * as PubSub from "pubsub-js";
import {AnchorManager, AnchorPosition, IPadding} from "../../../html-living-framework/src/Utils/Anchor";
import {AddFactory} from "./Utils/Add";
import {MakeFactory} from "./Utils/Make";
import {AudioToken} from "./Audio";
import {HowlerManager} from "./Audio/HowlerManager";
import {IAudioManager} from "./Audio/IAudioManager";
import {IVoiceOverManager, VoiceOverManager} from "./Audio/VoiceOverManager";
import {CopyManager} from "./Copy/CopyManager";
import {AppConfig} from "./Data";
import * as Topics from "./Data/Topics";
import {HitAreaRenderer} from "./Input/HitAreaRenderer";
import {KeyboardManager} from "./Input/KeyboardManager";
import {MouseManager} from "./Input/MouseManager";
import {AssetMapData} from "./Load/AssetMapData";
import {LoadManager} from "./Load/LoadManager";
import {SplashScreen} from "./Load/SplashScreen";
import {PopupManager} from "./Popup/PopupManager";
import {AnchorManager} from "./Utils/Anchor";
import {SaveManager} from "./Save/SaveManager";
import {StateManager} from "./State/StateManager";
import {AssetUtils} from "./Utils/AssetUtils";
import {OrientationManager} from "./Utils/OrientationManager";
import {ResizeManager} from "./Utils/ResizeManager";
import {WebEventsManager} from "./Utils/WebEventsManager";

export abstract class Application extends PIXI.Application {
    protected static readonly SIZE_MIN_DEFAULT: PIXI.Point = new PIXI.Point(1024, 768);
    protected static readonly SIZE_MAX_DEFAULT: PIXI.Point = new PIXI.Point(1365, 768);
    protected static _instance: Application;
    protected _stateManager: StateManager;
    protected _audioManager: IAudioManager;
    protected _popupManager: PopupManager;
    protected _loadManager: LoadManager;
    protected _keyboardManager: KeyboardManager;
    protected _resizeManager: ResizeManager;
    protected _copyManager: CopyManager;
    protected _mouseManager: MouseManager;
    protected _webEventsManager: WebEventsManager;
    protected _screenSizeRatio!: number;
    protected _size: PIXI.Point;
    protected _hitAreaRenderer!: HitAreaRenderer;
    protected _saveManager!: SaveManager;
    protected _orientationManager!: OrientationManager;
    protected _voiceoverManager!: IVoiceOverManager;

    protected _make: MakeFactory;
    protected _add: AddFactory;
    protected _anchorManager: AnchorManager;

    get add(): AddFactory {
        return this._add;
    }

    get make(): MakeFactory {
        return this._make;
    }

    anchor(object:Sprite, anchorPosition:AnchorPosition, padding?:IPadding):void{
        return this._anchorManager.anchor(object,anchorPosition, padding);
    }

    get addToStage() {
        return this.stage.addChild.bind(this.stage);
    }

    /**
     * The config passed in can be a json object, or an `AppConfig` object.
     * @param pConfig
     * @see `AppConfig` for what can be contained in the passed in config.
     * @default autoResize: true
     * @default resolution: PIXI.utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
     */
    constructor(pConfig?: PIXI.IApplicationOptions & { [key: string]: any }) {
        // TODO Relish GM => Look into what might be added to the AppConfig class and if there is reason to cache it.
        super(new AppConfig(pConfig));
        this._make = new MakeFactory();
        this._add = new AddFactory(this.stage);
        this._anchorManager = new AnchorManager(this.stage);

        // TODO:SH: Find a better alternative to having this be assigned here (rework ResourceUtils?)
        AssetUtils.resolutionSuffix = "@" + this.renderer.resolution + "x";
        this._size = new PIXI.Point();

        PIXI.Ticker.shared.add(this.update.bind(this));

        // Prevent Typescript from culling unused imports
        PubSub.publishSync("placeholder_message", undefined);

        this._webEventsManager = new WebEventsManager();
        this._mouseManager = new MouseManager(this.renderer.plugins.interaction);
        this._stateManager = new StateManager();
        this._popupManager = new PopupManager();
        this._loadManager = new LoadManager(this.createSplashScreen());
        this._audioManager = new HowlerManager();
        this._keyboardManager = new KeyboardManager();
        this._resizeManager = new ResizeManager(Application.SIZE_MIN_DEFAULT, Application.SIZE_MAX_DEFAULT);
        this._copyManager = new CopyManager();
        this._saveManager = new SaveManager();
        this._orientationManager = new OrientationManager();
        this._voiceoverManager = new VoiceOverManager();
    }

    static get instance() {
        if (Application._instance === undefined) {
            console.error("You've tried to access the instance of HLF.Application when it hasn't been set. " +
                "Please set the _instance in your Application.");
        }
        return Application._instance;
    }

    /**
     * Override to specify assets that should persist between state loads.
     *
     * Note: Splash screen assets are loaded before requiredAssets
     * @override
     */
    public get requiredAssets(): AssetMapData[] {
        // override
        return new Array<AssetMapData>();
    }

    public get state(): StateManager {
        return this._stateManager;
    }

    public get audio(): IAudioManager {
        return this._audioManager;
    }

    public get voiceover(): IVoiceOverManager {
        return this._voiceoverManager;
    }

    public get size(): PIXI.Point {
        return this._size;
    }

    public get hitAreaRenderer(): HitAreaRenderer {
        return this._hitAreaRenderer;
    }

    public get resizer(): ResizeManager {
        return this._resizeManager;
    }

    public get copy(): CopyManager {
        return this._copyManager;
    }

    public get webEvents(): WebEventsManager {
        return this._webEventsManager;
    }

    public get saveManager(): SaveManager {
        return this._saveManager;
    }

    public get orientationManager(): OrientationManager {
        return this._orientationManager;
    }

    public get load(): LoadManager {
        return this._loadManager;
    }

    public get topics() {
        return Topics;
    }

    public broadcast(message: string, data?: any | undefined) {
        return PubSub.publishSync(message, data);
    }

    public subscribe<T, M>(message: string, callback: (message:T, data:M) => void) {
        return PubSub.subscribe(message, callback as ()=>void)
    }

    public hasAsset(pAssetName: string) {
        return Assets.get(pAssetName) !== undefined;
    }

    /**
     * Initializes all managers and starts the splash screen process.
     */
    public init(): void {


        this.onPlayAudio = this.onPlayAudio.bind(this);

        // this.addToStage(this._stateManager);
        // this.addToStage(this._popupManager);
        // this.addToStage(this._loadManager);

        this.stage.addChild(this._stateManager);
        this.stage.addChild(this._loadManager);

        this._hitAreaRenderer = new HitAreaRenderer(this.stage);
        this.stage.addChild(this._hitAreaRenderer);

        this._audioManager.init();

        // @ts-ignore
        this.subscribe(this.topics.PLAY_AUDIO, this.onPlayAudio);


        this.createAssetMap();
        this.registerStates();
        this.registerPopups();
        this.registerLoadingScreens();

        this._loadManager.startSplashProcess(this.requiredAssets, this.onLoadRequiredAssetsComplete.bind(this));

        this.onResize(0);
        // Delayed to fix incorrect iOS resizing in WKWebView. See: https://bugs.webkit.org/show_bug.cgi?id=170595
        this.onResize(0.5);
        this._webEventsManager.registerResizeCallback(() => this.onResize(0.5));
    }

    /**
     * Called once per frame. Updates the `StateManager`, `PopupManager`, `LoadManager` and `HitAreaRenderer`.
     */
    protected update(): void {
        const deltaTime: number = PIXI.Ticker.shared.elapsedMS / 1000;
        this._stateManager.update(deltaTime);
        this._popupManager.update(deltaTime);
        this._loadManager.update(deltaTime);
        this._hitAreaRenderer.update(deltaTime);
    }

    /**
     * Override to return the appropriate splash screen instance to use.
     * @override
     */
    protected createSplashScreen(): SplashScreen {
        // override
        return new SplashScreen();
    }

    /**
     * Override to setup the asset map for this application.
     * @override
     */
    protected createAssetMap(): void {
        // override
    }

    /**
     * Override to register any and all loading screens needed for this application.
     * @override
     */
    protected registerLoadingScreens(): void {
        // override
    }

    /**
     * Override to register any and all popups needed for this application.
     * @override
     */
    protected registerPopups(): void {
        // override
    }

    /**
     * Override to register any and all states needed for this application.
     * @override
     */
    protected registerStates(): void {
        // override
    }

    /**
     * Called when the application window is resized.
     * @param pDelay A delay before telling the rest of the application that a resize occured.
     * @default 0
     */
    protected onResize(pDelay: number = 0): void {
        gsap.delayedCall(pDelay, () => {
            this._size.copyFrom(this._resizeManager.getSize());
            const stageScale: number = this._resizeManager.getStageScale();

            this.stage.scale.set(stageScale);
            this.renderer.resize(this._size.x * stageScale, this._size.y * stageScale);

            this._stateManager.onResize(this._size);
            this._loadManager.onResize(this._size);
            this._popupManager.onResize(this._size);
            this._orientationManager.onResize(this._size);
            this._anchorManager.setSize(this._size);
            PubSub.publishSync(Topics.KEYBOARD_REFOCUS, undefined);

            if (this._hitAreaRenderer.active) {
                this._hitAreaRenderer.renderHitAreas();
            }

            this.onResizeComplete();

        });
    }

    protected onPlayAudio(message: string, data: any) {
        const token: AudioToken = data as AudioToken;
        this.audio.play(token.id, token.volume, token.loop, token.category);
    }

    /**
     * Called when resize is complete after the delay.
     * @override
     */
    protected onResizeComplete() {
        // override
    }

    /**
     * Override to specify what should happen after all persistent assets have been loaded.
     * @override
     */
    protected onLoadRequiredAssetsComplete(): void {
        // override
    }
}
