import { Application } from '../core';
import { IAudioManager } from './IAudioManager';
import { IAudioTrack } from './IAudioTrack';
export declare function setMasterVolume(value: number): void;
export declare function getMasterVolume(): number;
export declare function fadeAudioTo(id: string, category: string, volume: number, duration: number): void;
/**
 * Creates an IAudioTrack.
 * @returns The created IAudioTrack.
 * @param trackId
 * @param category
 */
export declare function createAudioTrack(trackId: string, category: string): IAudioTrack;
/**
 * Gets a track.
 * @returns The IAudioTrack created or undefined if not able to create track.
 * This could happen if the source file could not be found.
 * @param trackId
 * @param category
 */
export declare function getAudioTrack(trackId: string, category?: string): IAudioTrack | undefined;
/**
 * Gets the volume of a specific category.
 * @param category The category to check.
 * @returns The volume of the category.
 */
export declare function getAudioCategoryVolume(category: string): number;
/**
 * Sets the volume of a specific category.
 * @param category
 * @param volume
 */
export declare function setAudioCategoryVolume(category: string, volume: number): void;
/**
 * Gets the length of an IAudioTrack.
 * @returns The length of the track or `undefined` if the track doesn't exist.
 * @param trackId
 * @param category
 */
export declare function getAudioTrackDuration(trackId: string, category: string): number | undefined;
/**
 * Plays a track. If the track does not exist, this function will create it.
 * @returns The track playing.
 * @param trackId
 * @param volume
 * @param loop
 * @param category
 * @param pitch
 */
export declare function playAudioTrack(trackId: string, volume?: number, loop?: boolean, category?: string, pitch?: number): IAudioTrack | undefined;
/**
 * Pauses a track.
 * @param trackId
 * @param category
 */
export declare function pauseAudioTrack(trackId: string, category: string): IAudioTrack | undefined;
/**
 * Stops a track.
 * @param trackId
 * @param category
 */
export declare function stopAudioTrack(trackId: string, category: string): IAudioTrack | undefined;
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
    getCategoryVolume(category: string): number;
    setCategoryVolume(category: string, pVolume: number): void;
    getDuration(trackId: string, category: string): number | undefined;
    play(trackId: string, volume?: number, loop?: boolean, category?: string, pitch?: number): IAudioTrack | undefined;
    pause(trackId: string, category: string): IAudioTrack | undefined;
    stop(trackId: string, category: string): IAudioTrack | undefined;
    load(ids: string | string[], category: string, onLoadCallback?: () => void): void;
    unload(trackId: string, category: string, removeTrack?: boolean): void;
    fadeTo(trackId: string, category: string, volume: number, pDuration: number): void;
    getAudioTrack(trackId: string, category: string): IAudioTrack | undefined;
    createAudioTrack(trackId: string, category?: string, volume?: number, loop?: boolean): IAudioTrack;
    /**
     * Loads a group of audio tracks and adds them to the same category.
     * @param token
     */
    private loadFromIds;
    /**
     * Loads a group of audio tracks into the categories specified by each data object.
     * @param data
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
     * @param category The category to update.
     */
    private updateCategoryVolume;
    private getCollection;
    private createCollection;
    private onPlayRequested;
    private onVisibilityChanged;
    private onAudioLoadError;
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     * @param text
     * @param rest
     */
    private log;
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     * @param text
     * @param rest
     */
    private logW;
    /**
     * Logs an error message with class name and colour coding.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     * @param text
     * @param rest
     */
    private logE;
}
//# sourceMappingURL=HowlerManager.d.ts.map