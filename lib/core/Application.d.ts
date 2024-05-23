/**
 * @file Application.ts
 * This file defines the main Application class for the project, along with some related types and functions.
 */
import { Application as PIXIApplication, Point } from 'pixi.js';
import { Callback, IAudioManager, IPlayOptions, IVoiceOverManager, PlayMode } from '../audio';
import { CopyManager } from '../copy';
import { DefaultKeyboardFocusManagerSprite, HitAreaRenderer, KeyboardFocusManager, KeyboardManager, MouseManager } from '../input';
import { AssetMapData, LoadManager, LoadScreen, LoadScreenProvider, SplashScreen } from '../load';
import { PhysicsBase, PhysicsEngineType } from '../physics';
import { PopupManager } from '../popup';
import { SaveManager } from '../save';
import { Signals } from '../signals';
import { State, StateManager } from '../state';
import { Add, HTMLTextStyleManager, Make, OrientationManager, ResizeManager, WebEventsManager } from '../utils';
import { IResizeManager } from '../utils/IResizeManager';
import { ResizeManagerOptions } from '../utils/ResizeManagerNew';
import { DillPixelApplicationOptions } from './AppConfig';
/**
 * Type for font.
 */
export type Font = {
    family: string;
    data?: {
        weight?: number | string;
    };
};
/**
 * Main Application class.
 * @extends PIXIApplication
 */
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
    protected _showStateDebugMenu: boolean;
    protected _useHash: boolean;
    protected _useNewResizeManager: boolean;
    protected _resizeOptions: Partial<ResizeManagerOptions>;
    protected _initialized: boolean;
    protected _resizeDebounce: number;
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
     * @default resolution: utils.isMobile.any === false ? 2 : (window.devicePixelRatio > 1 ? 2 : 1);
     * @default useNewResizeManager: true
     * @default resizeOptions: undefined
     * @default resizeDebounce: 0
     * @default useSpine: false
     * @default showStats: false
     * @default showStateDebugMenu: false
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
    set resizeOptions(value: Partial<ResizeManagerOptions>);
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
    get screenSize(): Point;
    get hitAreaRenderer(): HitAreaRenderer;
    get resizer(): IResizeManager;
    get copy(): CopyManager;
    get webEvents(): WebEventsManager;
    get saveManager(): SaveManager;
    get orientationManager(): OrientationManager;
    get load(): LoadManager;
    get defaultState(): string | typeof State | undefined;
    get physics(): PhysicsBase;
    get htmlTextStyles(): typeof HTMLTextStyleManager;
    get signals(): typeof Signals;
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
    /**
     * Plays a voiceover. Override to e.g. add clauses to playback
     * @param {string | (string | number)[]} key
     * @param {PlayMode | Callback | Partial<IPlayOptions>} mode
     * @param {Callback} callback
     */
    playVO(key: string | (string | number)[], mode?: PlayMode | Callback | Partial<IPlayOptions>, callback?: Callback): void;
    /**
     * adds a {KeyboardFocusManager} to the stage
     * @protected
     */
    protected addFocusManager(): void;
    /**
     * Adds the Spine plugin to the application.
     * @protected
     */
    protected addSpine(): Promise<void>;
    /**
     * Called after the init method resolves.
     * Override to set up application specific stuff.
     * @returns {Promise<void> | void}
     * @protected
     */
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
     * Override to set up the asset groups for this application.
     * States do this by default now.
     * @override
     * @example addAssetGroups() {
     *   this.addAssetGroup(SplashScreen.NAME, SplashScreen.Assets);
     * }
     */
    protected addAssetGroups(): void;
    protected createAssetMap(): void;
    /**
     * Registers a state with the state manager.
     * @param {string | LoadScreen} pIdOrClass
     * @param {LoadScreenProvider} pScreen
     * @protected
     */
    protected registerDefaultLoadScreen(pIdOrClass: string | typeof LoadScreen, pScreen?: LoadScreenProvider): void;
    /**
     * Override to register any and all loading screens needed for this application.
     * @override
     */
    protected registerLoadingScreens(): void;
    /**
     * Override for a good place to register any and all popups needed for this application.
     * You can also do this on demand by calling `this.app.popup.registerPopup(...)` from anywhere in your app.
     * @override
     */
    protected registerPopups(): void;
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
    protected registerStates(): void;
    /**
     * Called when the application window is resized.
     * @param debounceDelay - A delay (in seconds) before telling the rest of the application that a resize occurred.
     * @returns A promise that resolves when resizing is complete.
     */
    protected onResize(debounceDelay: number): Promise<void> | void;
    /**
     * Called when resize is complete after the delay.
     * @override
     */
    protected onResizeComplete(): void;
    /**
     * Override to load any custom fonts.
     * @returns {Font[]}
     * @protected
     * @example
     * protected getFontsList(): Font[] {
     *   return [{ family: 'Open Sans', data: { weight: 400 } }];
     * }
     */
    protected getFontsList(): Font[];
    /**
     * Called after all fonts have been loaded.
     * @returns {Promise<void>}
     * @protected
     */
    protected allFontsLoaded(): Promise<void>;
    /**
     * Override to specify what should happen after all persistent assets have been loaded.
     * @returns A promise that resolves when the operation is complete.
     */
    protected onRequiredAssetsLoaded(): Promise<void> | void;
    /**
     * Called after all required assets have been loaded.
     * @returns {Promise<void> | void}
     * @protected
     */
    protected boot(): Promise<void> | void;
    /**
     * Called from boot to load the default state.
     * @returns {Promise<void> | void}
     * @protected
     */
    protected loadDefaultState(): Promise<void> | void;
    /**
     * Sets up the application.
     * adds this app as a global variable for debugging
     * Tells the @link{StateManager} to show the debug menu if configured
     * Tells the @link{StateManager} to listen for hash changes if configured
     * @private
     */
    private _setup;
}
//# sourceMappingURL=Application.d.ts.map