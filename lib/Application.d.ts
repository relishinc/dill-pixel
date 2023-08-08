import { Application as PIXIApplication, IApplicationOptions, Point } from "pixi.js";
import { IAudioManager, IVoiceOverManager } from "./Audio";
import { CopyManager } from "./Copy";
import * as Topics from "./Data/Topics";
import { HitAreaRenderer, KeyboardManager, MouseManager } from "./Input";
import { AssetMapData, LoadManager, LoadScreen, LoadScreenProvider, SplashScreen } from "./Load";
import { PhysicsBase, PhysicsEngineType } from "./Physics";
import { PopupManager } from "./Popup";
import { SaveManager } from "./Save";
import { State, StateManager } from "./State";
import { OrientationManager, ResizeManager, WebEventsManager } from "./Utils";
import * as Factory from './Utils/Factory';
export interface HLFApplicationOptions extends IApplicationOptions {
    physics?: boolean;
}
type DebuggerType = typeof import("./Debugger").Debugger;
export declare class Application extends PIXIApplication {
    protected static readonly SIZE_MIN_DEFAULT: Point;
    protected static readonly SIZE_MAX_DEFAULT: Point;
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
    protected _screenSizeRatio: number;
    protected _size: Point;
    protected _hitAreaRenderer: HitAreaRenderer;
    protected _saveManager: SaveManager;
    protected _orientationManager: OrientationManager;
    protected _voiceoverManager: IVoiceOverManager;
    protected _makeFactory: Factory.MakeFactory;
    protected _addFactory: Factory.AddFactory;
    protected startSplashProcess: OmitThisParameter<(pPersistentAssets: AssetMapData[], pOnComplete: () => void) => void>;
    protected _debugger: any;
    protected _physics: PhysicsBase;
    /**
     * The config passed in can be a json object, or an `AppConfig` object.
     * @param pConfig
     * @see `AppConfig` for what can be contained in the passed in config.
     * @default autoResize: true
     * @default resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
     */
    protected constructor(pConfig?: Partial<HLFApplicationOptions> & {
        [key: string]: any;
    });
    static get containerElement(): HTMLElement | null;
    static get containerID(): string;
    /**
     * gets the current singleton instance
     */
    static get instance(): Application;
    /**
     * Creates a container element with the given id and appends it to the DOM.
     * @param pId{string} - The id of the element to create.
     */
    static createContainer(pId: string): HTMLDivElement;
    /**
     * Creates a new instance of the Application class and returns it.
     * @param pElement{string | HTMLElement} - The id of the element to use as the container, or the element itself.
     */
    static create(pElement?: string | HTMLElement): Application | null;
    get resolutionSuffix(): string;
    get add(): Factory.AddFactory;
    get make(): Factory.MakeFactory;
    get addToStage(): <U extends import("pixi.js").DisplayObject[]>(...children: U) => U[0];
    /**
     * Override to specify assets that should persist between state loads.
     *
     * Note: Splash screen assets are loaded before requiredAssets
     * @override
     */
    get requiredAssets(): AssetMapData[];
    get state(): StateManager;
    get popups(): PopupManager;
    get audio(): IAudioManager;
    get voiceover(): IVoiceOverManager;
    get size(): Point;
    get hitAreaRenderer(): HitAreaRenderer;
    get resizer(): ResizeManager;
    get copy(): CopyManager;
    get webEvents(): WebEventsManager;
    get saveManager(): SaveManager;
    get orientationManager(): OrientationManager;
    get load(): LoadManager;
    get topics(): typeof Topics;
    get defaultState(): string | undefined;
    get physics(): PhysicsBase;
    get debugger(): DebuggerType;
    addPhysics(type?: PhysicsEngineType): Promise<PhysicsBase>;
    /**
     *
     * @param pGroupId
     * @param pAssets
     * proxy function for @link {AssetMap.addAssetGroup}
     */
    addAssetGroup(pGroupIdOrClass: string | typeof State, pAssets?: AssetMapData[]): void;
    hasAsset(pAssetName: string): boolean;
    /**
     * initialize the Application singleton
     * and append the view to the DOM
     * @param pElement{String|HTMLElement}
     */
    create(pElement: HTMLElement): Application | null;
    /**
     * Initializes all managers and starts the splash screen process.
     */
    init(awaitFontsLoaded?: boolean): Promise<void>;
    addDebugger(): Promise<void>;
    protected setup(): void;
    /**
     * Called once per frame. Updates the `StateManager`, `PopupManager`, `LoadManager` and `HitAreaRenderer`.
     */
    protected update(): void;
    /**
     * Override to return the appropriate splash screen instance to use.
     * @override
     */
    protected createSplashScreen(): SplashScreen;
    /**
     * Override to setup the asset map for this application.
     * @override
     */
    protected createAssetMap(): void;
    protected registerDefaultLoadScreen(pIdOrClass: string | typeof LoadScreen, pScreen?: LoadScreenProvider): void;
    /**
     * Override to register any and all loading screens needed for this application.
     * @override
     */
    protected registerLoadingScreens(): void;
    /**
     * Override to register any and all popups needed for this application.
     * @override
     */
    protected registerPopups(): void;
    /**
     * Override to register any and all states needed for this application.
     * @override
     */
    protected registerStates(): void;
    /**
     * Called when the application window is resized.
     * @param pDelay A delay before telling the rest of the application that a resize occured.
     * @default 0
     */
    protected onResize(pDelay?: number): Promise<void>;
    protected onPlayAudio(message: string, data: any): void;
    /**
     * Called when resize is complete after the delay.
     * @override
     */
    protected onResizeComplete(): void;
    /**
     * Override to specify what should happen after all persistent assets have been loaded.
     * @override
     */
    protected onRequiredAssetsLoaded(): Promise<void>;
}
export {};
//# sourceMappingURL=Application.d.ts.map