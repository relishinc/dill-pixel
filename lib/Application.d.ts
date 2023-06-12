import { Application as PIXIApplication, IApplicationOptions, Point } from "pixi.js";
import { IAudioManager, IVoiceOverManager } from "./Audio";
import { CopyManager } from "./Copy";
import * as Topics from "./Data/Topics";
import { HitAreaRenderer, KeyboardManager, MouseManager } from "./Input";
import { AssetMapData, LoadManager, SplashScreen } from "./Load";
import { Physics } from "./Physics";
import { PopupManager } from "./Popup";
import { SaveManager } from "./Save";
import { StateManager } from "./State";
import { OrientationManager, ResizeManager, WebEventsManager } from "./Utils";
import * as Factory from './Utils/Factory';
export interface HLFApplicationOptions extends IApplicationOptions {
    physics?: boolean;
}
export declare abstract class Application extends PIXIApplication {
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
    protected _physics: Physics;
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
    static get instance(): Application;
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
    get physics(): Physics;
    addPhysics(): Physics;
    broadcast(message: string, data?: any | undefined): boolean;
    subscribe<T, M>(message: string, callback: (message: T, data: M) => void): string;
    /**
     *
     * @param pGroupId
     * @param pAssets
     * proxy function for @link {AssetMap.addAssetGroup}
     */
    addAssetGroup(pGroupId: string, pAssets: AssetMapData[]): void;
    hasAsset(pAssetName: string): boolean;
    /**
     * Initializes all managers and starts the splash screen process.
     */
    init(): void;
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
    protected onRequiredAssetsLoaded(): void;
}
//# sourceMappingURL=Application.d.ts.map