import {Application as PIXIApplication, Assets, IApplicationOptions, Point, Ticker} from "pixi.js";
import * as PubSub from "pubsub-js";
import {AudioToken, HowlerManager, IAudioManager, IVoiceOverManager, VoiceOverManager,} from "./Audio";
import {CopyManager} from "./Copy";
import {AppConfig} from "./Data";
import * as Topics from "./Data/Topics";
import {HitAreaRenderer, KeyboardManager, MouseManager} from "./Input";
import {AssetMap, AssetMapData, LoadManager, SplashScreen} from "./Load";
import * as Physics from "./Physics";
import {PhysicsEngineType} from "./Physics";
import {PopupManager} from "./Popup";
import {SaveManager} from "./Save";
import {StateManager} from "./State";
import {AssetUtils, Delay, OrientationManager, ResizeManager, WebEventsManager,} from "./Utils";
import * as Factory from './Utils/Factory';

export interface HLFApplicationOptions extends IApplicationOptions {
	physics?: boolean;
}

export class Application extends PIXIApplication {
	protected static readonly SIZE_MIN_DEFAULT: Point = new Point(
		1024,
		768
	);
	protected static readonly SIZE_MAX_DEFAULT: Point = new Point(
		1365,
		768
	);
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
	protected _size: Point;
	protected _hitAreaRenderer!: HitAreaRenderer;
	protected _saveManager!: SaveManager;
	protected _orientationManager!: OrientationManager;
	protected _voiceoverManager!: IVoiceOverManager;

	protected _makeFactory: Factory.MakeFactory;
	protected _addFactory: Factory.AddFactory;

	protected startSplashProcess: OmitThisParameter<
		(pPersistentAssets: AssetMapData[], pOnComplete: () => void) => void
	>;
	protected _physics: any;

	static get containerElement(): HTMLElement | null {
		return document.getElementById(Application.containerID);
	}

	static get containerID(): string {
		return "game-container";
	}

	/**
	 * The config passed in can be a json object, or an `AppConfig` object.
	 * @param pConfig
	 * @see `AppConfig` for what can be contained in the passed in config.
	 * @default autoResize: true
	 * @default resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
	 */
	protected constructor(
		pConfig?: Partial<HLFApplicationOptions> & { [key: string]: any }
	) {
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
		this._mouseManager = new MouseManager(this.renderer.events);
		this._stateManager = new StateManager(this);
		this._popupManager = new PopupManager(this);
		this._loadManager = new LoadManager(this, this.createSplashScreen());
		this._audioManager = new HowlerManager(this);
		this._keyboardManager = new KeyboardManager(this);

		if (this.resizeTo) {
			this._resizeManager = new ResizeManager(this);
		} else {
			this._resizeManager = new ResizeManager(
				this,
				pConfig?.sizeMin || Application.SIZE_MIN_DEFAULT,
				pConfig?.sizeMax || Application.SIZE_MAX_DEFAULT
			);
		}

		this._copyManager = new CopyManager(this);
		this._saveManager = new SaveManager(this);
		this._orientationManager = new OrientationManager(this);
		this._voiceoverManager = new VoiceOverManager(this);

		/**
		 * Bind methods from some manager classes to callable methods in the application
		 */
		this.startSplashProcess = this._loadManager.startSplashProcess.bind(
			this._loadManager
		);
	}

	static get instance() {
		if (Application._instance === undefined) {
			console.error(
				"You've tried to access the instance of HLF.Application when it hasn't been set. " +
				"Please set the _instance in your Application."
			);
		}
		return Application._instance;
	}

	// create a canvas container element with a given id and append it to the DOM
	public static createContainer(pId: string) {
		const container = document.createElement("div");
		container.setAttribute("id", pId);
		document.body.appendChild(container);
		return container;
	}

	// static creation method that calls createContainer and instantiates the game
	public static create(pElement: string | HTMLElement = Application.containerID): Application | null {
		let el: HTMLElement | null = null;
		if (typeof pElement === "string") {
			const id = pElement;
			el = document.getElementById(id);
			if (!el) {
				el = Application.createContainer(pElement);
			}
		} else if (pElement instanceof HTMLElement) {
			el = pElement;
		}
		if (!el) {
			// no element to use
			console.error(`You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id.`);
			return null;
		}
		return this.instance.create(el);
	}

	// override this to set a custom resolution suffix;
	get resolutionSuffix(): string {
		return "@" + this.renderer.resolution + "x";
	}

	get add(): Factory.AddFactory {
		return this._addFactory;
	}

	get make(): Factory.MakeFactory {
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
	public get requiredAssets(): AssetMapData[] {
		// override
		return [];
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

	public get size(): Point {
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

	public get defaultState(): string | undefined {
		return undefined;
	}

	public get physics(): any {
		return this._physics;
	}

	public addPhysics(type: Physics.PhysicsEngineType = PhysicsEngineType.MATTER): any {
		if (type === PhysicsEngineType.MATTER) {
			this._physics = new Physics.MatterPhysics.Base(this);
		}
		return this._physics;
	}

	public broadcast(message: string, data?: any | undefined) {
		return PubSub.publishSync(message, data);
	}

	public subscribe<T, M>(
		message: string,
		callback: (message: T, data: M) => void
	) {
		return PubSub.subscribe(message, callback as () => void);
	}

	/**
	 *
	 * @param pGroupId
	 * @param pAssets
	 * proxy function for @link {AssetMap.addAssetGroup}
	 */
	public addAssetGroup(pGroupId: string, pAssets: AssetMapData[]): void {
		return AssetMap.addAssetGroup(pGroupId, pAssets);
	}

	public hasAsset(pAssetName: string) {
		return Assets.get(pAssetName) !== undefined;
	}

	/**
	 * initialize the Application singleton
	 * and append the view to the DOM
	 * @param pElement{String|HTMLElement}
	 */
	public create(pElement: HTMLElement): Application | null {
		if (pElement) {
			pElement.appendChild(Application.instance.view as HTMLCanvasElement);
		} else {
			console.error("No element found to append the view to.");
			return null;
		}

		Application.instance.init();
		return Application.instance;
	}

	/**
	 * Initializes all managers and starts the splash screen process.
	 */
	public async init(awaitFontsLoaded: boolean = true): Promise<void> {


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
	protected update(): void {
		const deltaTime: number = Ticker.shared.elapsedMS / 1000;
		this._stateManager.update(deltaTime);
		this._popupManager.update(deltaTime);
		this._loadManager.update(deltaTime);
		this._hitAreaRenderer.update(deltaTime);
		this._physics?.update(deltaTime);
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
	protected async onResize(pDelay: number = 0): Promise<void> {
		if (pDelay > 0) {
			await Delay(pDelay);
		}

		if (this._resizeManager.useAspectRatio) {
			this._size.copyFrom(this._resizeManager.getSize());
			const stageScale: number = this._resizeManager.getStageScale();
			this.stage.scale.set(stageScale);
			this.renderer.resize(this._size.x * stageScale, this._size.y * stageScale);
		} else {
			let w = this._size.x;
			let h = this._size.y;
			if ((this.resizeTo as HTMLElement)?.getBoundingClientRect) {
				const el = this.resizeTo as HTMLElement;
				w = el.getBoundingClientRect().width;
				h = el.getBoundingClientRect().height
			} else if ((this.resizeTo as Window)?.innerWidth) {
				const el = this.resizeTo as Window;
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
		this._orientationManager.onResize(this._size);

		this.broadcast(this.topics.KEYBOARD_REFOCUS);

		if (this._hitAreaRenderer.active) {
			this._hitAreaRenderer.renderHitAreas();
		}

		this.onResizeComplete();
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
	protected async onRequiredAssetsLoaded(): Promise<void> {
		// check if document.fonts is supported
		if (document?.fonts) {
			await document.fonts.ready;
		}

		if (this.state.default) {
			this.state.transitionTo(this.state.default, SplashScreen.NAME);
		}
	}
}
