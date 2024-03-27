import { Application as PIXIApplication, IApplicationOptions, Point } from 'pixi.js';
import { IAudioManager, IVoiceOverManager } from '../audio';
import { CopyManager } from '../copy';
import { DefaultKeyboardFocusManagerSprite, HitAreaRenderer, KeyboardFocusManager, KeyboardManager, MouseManager } from '../input';
import { AssetMapData, LoadManager, LoadScreen, LoadScreenProvider, SplashScreen } from '../load';
import { PhysicsBase, PhysicsEngineType } from '../physics';
import { PopupManager } from '../popup';
import { SaveManager } from '../save';
import { State, StateManager } from '../state';
import { Add, HTMLTextStyleManager, Make, OrientationManager, ResizeManager, WebEventsManager } from '../utils';
export interface DillPixelApplicationOptions extends IApplicationOptions {
    physics?: boolean;
    useSpine?: boolean;
    showStatsInProduction?: boolean;
    showStateDebugInProduction?: boolean;
}
export type Font = {
    family: string;
    data?: {
        weight?: number | string;
    };
};
export declare function create<T extends Application = Application>(ApplicationClass: typeof Application, config?: Partial<DillPixelApplicationOptions>, domElement?: string | HTMLElement): Promise<T> | T;
export declare class Application<T extends Application = any> extends PIXIApplication {
    protected static readonly SIZE_MIN_DEFAULT: Point;
    protected static readonly SIZE_MAX_DEFAULT: Point;
    protected static _instance: Application;
    protected _stateManager: StateManager<T>;
    protected _audioManager: IAudioManager;
    protected _popupManager: PopupManager<T>;
    protected _loadManager: LoadManager;
    protected _keyboardManager: KeyboardManager;
    protected _keyboardFocusManager: KeyboardFocusManager<DefaultKeyboardFocusManagerSprite>;
    protected _resizeManager: ResizeManager;
    protected _copyManager: CopyManager;
    protected _mouseManager: MouseManager;
    protected _webEventsManager: WebEventsManager;
    protected _size: Point;
    protected _hitAreaRenderer: HitAreaRenderer;
    protected _saveManager: SaveManager;
    protected _orientationManager: OrientationManager;
    protected _voiceoverManager: IVoiceOverManager;
    protected _addFactory: Add;
    protected startSplashProcess: OmitThisParameter<(pPersistentAssets: AssetMapData[], pOnComplete: () => void) => void>;
    protected _physics: PhysicsBase;
    protected stats: any;
    protected _useSpine: boolean;
    protected _initialized: boolean;
    /**
     * Creates a container element with the given id and appends it to the DOM.
     * @param pId{string} - The id of the element to create.
     */
    static createContainer(pId: string): HTMLDivElement;
    /**
     * Creates a new instance of the Application class and returns it.
     */
    static getInstance<T extends Application = Application>(): T;
    /**
     * The config passed in can be a json object, or an `AppConfig` object.
     * @param appConfig
     * @see `AppConfig` for what can be contained in the passed-in config.
     * @default autoResize: true
     * @default resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
     */
    constructor(appConfig?: Partial<DillPixelApplicationOptions> & {
        [key: string]: any;
    });
    static get containerElement(): HTMLElement | undefined;
    static get containerID(): string;
    /**
     * gets the current singleton instance
     */
    static get instance(): Application;
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
    get state(): StateManager<T>;
    get keyboard(): KeyboardManager;
    get popups(): PopupManager<T>;
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
    get htmlTextStyles(): typeof HTMLTextStyleManager;
    addStats(): Promise<void>;
    addPhysics(type?: PhysicsEngineType): Promise<PhysicsBase>;
    /**
     *
     * proxy function for @link {AssetMap.addAssetGroup}
     * @param groupIdOrClass
     * @param assets
     */
    addAssetGroup(groupIdOrClass: string | typeof State<T> | typeof State, assets?: AssetMapData[]): void;
    hasAsset(pAssetName: string): boolean;
    initialize(): Promise<void>;
    /**
     * Initializes all managers and starts the splash screen process.
     */
    init(): Promise<void>;
    loadDocumentFonts(): Promise<void>;
    listFonts(): FontFace[];
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
    loadHTMLTextStyles(): Promise<void>;
    protected addFocusManager(): void;
    protected addSpine(): Promise<void>;
    protected setup(): Promise<void> | void;
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
     * Override to set up the asset map for this application.
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
     * @param debounceDelay A delay (in seconds) before telling the rest of the application that a resize occurred.
     * @default 0
     */
    protected onResize(debounceDelay: number): Promise<void> | void;
    /**
     * Called when resize is complete after the delay.
     * @override
     */
    protected onResizeComplete(): void;
    protected getFontsList(): Font[];
    protected allFontsLoaded(): Promise<void>;
    /**
     * Override to specify what should happen after all persistent assets have been loaded.
     * @override
     */
    protected onRequiredAssetsLoaded(): Promise<void> | void;
}
//# sourceMappingURL=Application.d.ts.map