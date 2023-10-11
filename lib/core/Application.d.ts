import { Application as PIXIApplication, IApplicationOptions, Point } from 'pixi.js';
import { AudioToken, IAudioManager, IVoiceOverManager } from '../audio';
import { CopyManager } from '../copy';
import { DefaultKeyboardFocusManagerSprite, HitAreaRenderer, KeyboardFocusManager, KeyboardManager, MouseManager } from '../input';
import { AssetMapData, LoadManager, LoadScreen, LoadScreenProvider, SplashScreen } from '../load';
import { PhysicsBase, PhysicsEngineType } from '../physics';
import { PopupManager } from '../popup';
import { SaveManager } from '../save';
import { State, StateManager } from '../state';
import { OrientationManager, ResizeManager, WebEventsManager } from '../utils';
import { Add, Make } from '../utils/factory';
export interface HLFApplicationOptions extends IApplicationOptions {
    physics?: boolean;
    showStatsInProduction?: boolean;
    showStateDebugInProduction?: boolean;
}
type DebuggerType = typeof import('../debug').Debugger;
export declare class Application extends PIXIApplication {
    protected static readonly SIZE_MIN_DEFAULT: Point;
    protected static readonly SIZE_MAX_DEFAULT: Point;
    protected static _instance: Application;
    protected _stateManager: StateManager;
    protected _audioManager: IAudioManager;
    protected _popupManager: PopupManager;
    protected _loadManager: LoadManager;
    protected _keyboardManager: KeyboardManager;
    protected _keyboardFocusManager: KeyboardFocusManager<DefaultKeyboardFocusManagerSprite>;
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
    protected _addFactory: Add;
    protected startSplashProcess: OmitThisParameter<(pPersistentAssets: AssetMapData[], pOnComplete: () => void) => void>;
    protected _debugger: unknown;
    protected _physics: PhysicsBase;
    protected stats: any;
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
    static get containerElement(): HTMLElement | undefined;
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
    get add(): Add;
    get make(): typeof Make;
    get addToStage(): <U extends import("pixi.js").DisplayObject[]>(...children: U) => U[0];
    /**
     * Override to specify assets that should persist between state loads.
     *
     * Note: Splash screen assets are loaded before requiredAssets
     * @override
     */
    get requiredAssets(): AssetMapData[];
    get state(): StateManager;
    get keyboard(): KeyboardManager;
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
    get defaultState(): string | typeof State | undefined;
    get physics(): PhysicsBase;
    get debugger(): DebuggerType;
    addStats(): Promise<void>;
    addFocusManager(): void;
    addPhysics(type?: PhysicsEngineType): Promise<PhysicsBase>;
    /**
     *
     * @param pGroupIdOrClass
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
    init(): Promise<void>;
    loadDocumentFonts(): Promise<void>;
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
    protected addAssetGroups(): void;
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
    protected onPlayAudio(token: AudioToken): void;
    /**
     * Called when resize is complete after the delay.
     * @override
     */
    protected onResizeComplete(): void;
    protected getFontsList(): {
        family: string;
        data?: {
            weight?: number | string;
        };
    }[];
    protected allFontsLoaded(): Promise<any>;
    /**
     * Override to specify what should happen after all persistent assets have been loaded.
     * @override
     */
    protected onRequiredAssetsLoaded(): Promise<void>;
}
export {};
//# sourceMappingURL=Application.d.ts.map