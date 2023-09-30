import { Application } from '../core/Application';
import { IAudioManager } from './IAudioManager';
import { IAudioTrack } from './IAudioTrack';
export declare class HowlerManager implements IAudioManager {
    private app;
    private _masterVolume;
    private _collections;
    private _previousMasterVolume;
    /**
     * The collection of audio asset map data to load.
     */
    private _audioLoadTokens;
    /**
     * The callback to call after all AssetMapAudioData tracks have been loaded.
     */
    private _audioLoadTokenCallback;
    /**
     * The callback to call after each of the {@link _audioLoadTokens} has been loaded.
     * @param progress is a number from 0 to 100
     */
    private _audioLoadTokenProgressCallback;
    /**
     * How many of the {@link _audioloadTokens} have been loaded so far
     */
    private _loadedCount;
    /**
     * The internal flag for print log statements.
     */
    private _debug;
    constructor(app: Application);
    /**
     * Enabling this will print all debug logs.
     */
    set debug(pEnabled: boolean);
    get masterVolume(): number;
    set masterVolume(pVolume: number);
    init(): void;
    getCategoryVolume(pCategory: string): number;
    setCategoryVolume(pCategory: string, pVolume: number): void;
    getDuration(pId: string, pCategory: string): number | undefined;
    play(pId: string, pVolume?: number, pLoop?: boolean, pCategory?: string): void;
    pause(pId: string, pCategory: string): void;
    stop(pId: string, pCategory: string): void;
    load(pIds: string | string[], pCategory: string, pOnLoad?: () => void): void;
    unload(pId: string, pCategory: string, pRemoveTrack: boolean): void;
    fadeTo(pId: string, pCategory: string, pVolume: number, pDuration: number): void;
    getAudioTrack(pId: string, pCategory: string): IAudioTrack | undefined;
    createAudioTrack(pId: string, pCategory?: string, pVolume?: number, pLoop?: boolean): IAudioTrack;
    /**
     * Loads a group of audio tracks and adds them to the same category.
     * @param pToken The token with the load data.
     */
    private loadFromIds;
    /**
     * Loads a group of audio tracks into the categories specified by each data object.
     * @param pTopic The pubsub message id.
     * @param pData The token with the load data.
     */
    private loadFromAssetMapData;
    /**
     * Called when a track is loaded using an AssetMapData object. Loads the next track or calls the load end callback.
     */
    private onAudioFromAssetMapDataLoaded;
    /**
     * Tries to load the first audio load token. If one exists, it is removed and used to load the audio track.
     * @returns Whether there was an audio track load requested.
     */
    private tryLoadFirstAssetMapAudioData;
    private updateAllCategoryVolume;
    /**
     * Updates the volume of all the tracks in a specific category.
     * @param pCategory The category to update.
     */
    private updateCategoryVolume;
    private getCollection;
    private createCollection;
    private onPlayRequested;
    private onVisibilityChanged;
    private onAudioLoadError;
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
//# sourceMappingURL=HowlerManager.d.ts.map