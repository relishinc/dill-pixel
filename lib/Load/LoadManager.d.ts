import { Container, Point } from "pixi.js";
import { Application } from "../Application";
import { AssetMapData } from "./AssetMapData";
import { LoadScreen, LoadScreenProvider } from "./LoadScreen";
import { SplashScreen } from "./SplashScreen";
/**
 * Manages all asset loading.
 * @extends Container
 */
export declare class LoadManager extends Container {
    private app;
    /**
     * Cached size of the game.
     */
    private _size;
    /**
     * The splashscreen that hides all required asset loading.
     */
    private _splashScreen;
    /**
     * Dictionary of all registered load screens.
     */
    private _loadScreens;
    /**
     * The current active load screen.
     */
    private _currentLoadScreen;
    /**
     * Is current load screen persistent or created and destroyed on demand
     */
    private _isCurrentLoadScreenPersistent;
    /**
     * The default load screen to use.
     */
    private _defaultLoadScreen;
    private _defaultLoadScreenId;
    /**
     * The current active load complete callback.
     */
    private _onLoadComplete;
    /**
     * The internal flag for print log statements.
     */
    private _debug;
    /**
     * Creates an instance of a `LoadManager` and returns it.
     * @param app The parant @link {Application}
     * @param pSplashScreen The splashscreen instance to use.
     */
    constructor(app: Application, pSplashScreen: SplashScreen);
    get defaultLoadScreen(): LoadScreenProvider | undefined;
    get defaultLoadScreenId(): string | undefined;
    /**
     * Enabling this will print all debug logs.
     */
    set debug(pEnabled: boolean);
    /**
     * Updates the current active load screen.
     * @param pDeltaTime PIXI.ticker.shared.elapsedMS / 1000.
     */
    update(pDeltaTime: number): void;
    /**
     * Begins the initial splash process.
     * @description
     * 1. Splash screen assets loaded.
     * 2. Splash screen is shown.
     * 3. Persistent assets are loaded.
     * 4. Callback passed in is called.
     * @param pPersistentAssets The assets that should persist between all state changes.
     * @param pOnComplete The function to call after all persitent assets have been loaded.
     */
    startSplashProcess(pPersistentAssets: AssetMapData[], pOnComplete: () => void): void;
    /**
     * Registers a load screen.
     * @param pIdOrClass The id of the new state or the class of the new state.
     * @param pScreen The load screen.
     * @param [pDefault] Is the new load screen the default one.
     */
    registerLoadScreen(pIdOrClass: string | typeof LoadScreen, pScreen?: LoadScreenProvider, pDefault?: boolean): void;
    /**
     * Called when the window is resized.
     * @param pSize The new size.
     */
    onResize(pSize: Point): void;
    /**
     * Attempts to show the requested load screen.
     * @param pTopic The PubSub message id.
     * @param pData Data containing what loadscreen to show and what to call when it is shown.
     */
    private showLoadScreen;
    /**
     * Attempts to hide the requested load screen.
     * @param pTopic The PubSub message id.
     * @param pData Data containing what loadscreen to hide and what to call when it is hidden.
     */
    private hideLoadScreen;
    /**
     * Loads requested assets using the supplied loadscreen.
     * @param pAssets The assets to load.
     * @param pOnComplete The function to call when the load is complete.
     */
    private load;
    /**
     * Loads assets needed by the splash screen.
     * @param pAssets The splash screen assets to load.
     * @param pOnComplete The function to call when assets are loaded.
     */
    private loadOnSplash;
    /**
     * Removes assets from PIXI cache.
     * @param pAssets The assets to unload.
     * @param pOnComplete The function to call when the unload is complete.
     */
    private unload;
    /**
     * Retrieves a load screen.
     * @param pLoadScreen The load screen to retrieve.
     * @returns The requested load screen or undefined.
     */
    private getLoadScreen;
    /**
     * Loads the requested assets.
     * @todo Relish SH => Find out how to properly handle load screens when assets are already cached.
     * Currently, doesn't animate load bar at all (remains empty) since no loading occurs.
     * Ideally, should animate to full, OR not appear at all.
     * @param pAssets The assets requested.
     */
    private loadAssets;
    /**
     * Unloads the track and removes it from the AudioManager.
     * @param pData The audio data of thee track to destroy.
     */
    private destroyAudioResource;
    /**
     * Removes assets from PIXI cache and unloads them from webGL.
     * @param pId The id of the asset to destroy.
     */
    private destroyPixiResource;
    /**
     * Removes redundant requested loads.
     * @param pAssets The asset list to search through.
     * @returns The trimmed down asset list.
     */
    private removeRedundantLoads;
    /**
     * Called when a file is loaded in PIXI.
     * @param pLoader The PIXI loader.
     * @param pResource The resource that was loaded.
     */
    private onPixiLoadProgress;
    private onPixiLoadError;
    /**
     * Called when a file is loaded by the {@link IAudioManager} (usually {@link HowlerManager}).
     * @param pProgress
     */
    private onAudioLoadProgress;
    /**
     * Called once both audio and PIXI have finished loading assets
     */
    private onAllLoadsComplete;
    /**
     * Called when all assets required for the requested state are loaded.
     */
    private onLoadScreenComplete;
    /**
     * Called when the load screen is completely hidden.
     */
    private onLoadAnimateOutComplete;
    /**
     * Called when a load is requested.
     * @param pTopic The PubSub message id.
     * @param pToken The data defining the load request.
     */
    private onLoadRequested;
    /**
     * Called when an unload is requested.
     * @param pTopic The PubSub message id.
     * @param pToken The data defining the unload request.
     */
    private onUnloadRequested;
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    private log;
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logW;
    /**
     * Logs an error message with class name and colour coding.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    private logE;
}
//# sourceMappingURL=LoadManager.d.ts.map