import { Dictionary } from 'typescript-collections';
import { Application } from '../core';
import { Signals } from '../signals';
import { LogUtils, MathUtils } from '../utils';
import * as AudioCategory from './AudioCategory';
import { AudioCollection } from './AudioCollection';
import { HowlerTrack } from './HowlerTrack';
import * as HowlerUtils from './HowlerUtils';
// utility functions to call from HowlerManager
export function setMasterVolume(value) {
    Application.instance.audio.masterVolume = value;
}
export function getMasterVolume() {
    return Application.instance.audio.masterVolume;
}
export function fadeAudioTo(id, category, volume, duration) {
    Application.instance.audio.fadeTo(id, category, volume, duration);
}
/**
 * Creates an IAudioTrack.
 * @returns The created IAudioTrack.
 * @param trackId
 * @param category
 */
export function createAudioTrack(trackId, category) {
    return Application.instance.audio.createAudioTrack(trackId, category);
}
/**
 * Gets a track.
 * @returns The IAudioTrack created or undefined if not able to create track.
 * This could happen if the source file could not be found.
 * @param trackId
 * @param category
 */
export function getAudioTrack(trackId, category) {
    return Application.instance.audio.getAudioTrack(trackId, category || AudioCategory.DEFAULT);
}
/**
 * Gets the volume of a specific category.
 * @param category The category to check.
 * @returns The volume of the category.
 */
export function getAudioCategoryVolume(category) {
    return Application.instance.audio.getCategoryVolume(category);
}
/**
 * Sets the volume of a specific category.
 * @param category
 * @param volume
 */
export function setAudioCategoryVolume(category, volume) {
    Application.instance.audio.setCategoryVolume(category, volume);
}
/**
 * Gets the length of an IAudioTrack.
 * @returns The length of the track or `undefined` if the track doesn't exist.
 * @param trackId
 * @param category
 */
export function getAudioTrackDuration(trackId, category) {
    return Application.instance.audio.getDuration(trackId, category);
}
/**
 * Plays a track. If the track does not exist, this function will create it.
 * @returns The track playing.
 * @param trackId
 * @param volume
 * @param loop
 * @param category
 * @param pitch
 */
export function playAudioTrack(trackId, volume, loop, category, pitch) {
    return Application.instance.audio.play(trackId, volume, loop, category || AudioCategory.DEFAULT, pitch);
}
/**
 * Pauses a track.
 * @param trackId
 * @param category
 */
export function pauseAudioTrack(trackId, category) {
    return Application.instance.audio.pause(trackId, category || AudioCategory.DEFAULT);
}
/**
 * Stops a track.
 * @param trackId
 * @param category
 */
export function stopAudioTrack(trackId, category) {
    return Application.instance.audio.stop(trackId, category || AudioCategory.DEFAULT);
}
export class HowlerManager {
    constructor(app) {
        this.app = app;
        this.autoMuteOnVisibilityChange = true;
        /**
         * How many of the {@link _audioloadTokens} have been loaded so far
         */
        this._loadedCount = 0;
        /**
         * The internal flag for print log statements.
         */
        this._debug = false;
        this._ctx = new AudioContext();
        this._masterVolume = 1;
        this._previousMasterVolume = this._masterVolume;
        this._collections = new Dictionary();
        this._audioLoadTokens = new Array();
        this.onPlayRequested = this.onPlayRequested.bind(this);
        this.loadFromIds = this.loadFromIds.bind(this);
        this.loadFromAssetMapData = this.loadFromAssetMapData.bind(this);
        this.onAudioLoadError = this.onAudioLoadError.bind(this);
    }
    /**
     * Enabling this will print all debug logs.
     */
    set debug(pEnabled) {
        this._debug = pEnabled;
    }
    get masterVolume() {
        return this._masterVolume;
    }
    set masterVolume(pVolume) {
        this._masterVolume = MathUtils.clamp(pVolume, 0, 1);
        this.updateAllCategoryVolume();
    }
    init() {
        Application.instance.webEvents.registerVisibilityChangedCallback(this.onVisibilityChanged.bind(this));
        Signals.playAudio.connect(this.onPlayRequested);
        Signals.loadAudio.connect(this.loadFromIds);
        Signals.loadAudioFromAssetMap.connect(this.loadFromAssetMapData);
        Signals.audioLoadError.connect(this.onAudioLoadError);
    }
    getCategoryVolume(category) {
        return this.getCollection(category).volume;
    }
    setCategoryVolume(category, pVolume) {
        this.getCollection(category).volume = pVolume;
        this.updateCategoryVolume(category);
    }
    getDuration(trackId, category) {
        const track = this.getAudioTrack(trackId, category);
        if (track !== undefined) {
            return track.getDuration();
        }
        return undefined;
    }
    play(trackId, volume = 1, loop = false, category = AudioCategory.DEFAULT, pitch) {
        this.ensureCtx();
        let loaded;
        const collection = this.getCollection(category);
        const track = collection.tracks.getValue(trackId);
        if (track === undefined) {
            this.load(trackId, category, () => {
                loaded = collection.tracks.getValue(trackId);
                loaded.setLooped(loop);
                loaded.setVolumeWithModifiers(volume, this._masterVolume, collection.volume);
                loaded.setPitch(pitch);
                loaded.play();
                return loaded;
            });
        }
        else {
            track.setLooped(loop);
            track.setVolumeWithModifiers(volume, this._masterVolume, collection.volume);
            track.setPitch(pitch);
            track.play();
            return track;
        }
    }
    pause(trackId, category) {
        const track = this.getAudioTrack(trackId, category);
        if (track !== undefined) {
            track.pause();
        }
        return track;
    }
    stop(trackId, category) {
        const track = this.getAudioTrack(trackId, category);
        if (track !== undefined) {
            track.stop();
        }
        return track;
    }
    load(ids, category, onLoadCallback) {
        const collection = this.getCollection(category);
        let track;
        let id;
        // convert single Ids into array for simplicity
        if (typeof ids === 'string') {
            ids = [ids];
        }
        // Create the howls if they don't already exist
        for (let i = ids.length - 1; i >= 0; --i) {
            id = ids[i];
            track = collection.tracks.getValue(id);
            if (track === undefined) {
                track = this.createAudioTrack(id, category);
            }
            else {
                // Ensure that the actual source exists
                if (track.getSource().state() === HowlerUtils.State.UNLOADED) {
                    track.loadSource();
                }
            }
        }
        // If supplied, call the pOnLoad callback once all howls have loaded
        if (onLoadCallback !== undefined) {
            let loadedCount = 0;
            for (let i = ids.length - 1; i >= 0; --i) {
                const howl = collection.tracks.getValue(ids[i]).getSource();
                if (howl.state() !== HowlerUtils.State.LOADED) {
                    howl.on(HowlerUtils.Events.LOAD, () => {
                        ++loadedCount;
                        if (loadedCount >= ids.length) {
                            onLoadCallback();
                        }
                    });
                }
                else {
                    ++loadedCount;
                }
            }
            // If all Ids were already loaded, fire off the callback immediately
            if (loadedCount === ids.length) {
                onLoadCallback();
            }
        }
    }
    unload(trackId, category, removeTrack = false) {
        const collection = this.getCollection(category);
        const track = collection.tracks.getValue(trackId);
        if (track !== undefined) {
            track.unloadSource();
            if (removeTrack) {
                collection.tracks.remove(trackId);
            }
        }
    }
    fadeTo(trackId, category, volume, pDuration) {
        const track = this.getAudioTrack(trackId, category);
        if (track !== undefined) {
            volume = MathUtils.clamp(volume, 0, 1);
            track.fadeTo(volume, pDuration);
        }
    }
    getAudioTrack(trackId, category) {
        if (this._collections.containsKey(category)) {
            return this._collections.getValue(category).tracks.getValue(trackId);
        }
        return undefined;
    }
    createAudioTrack(trackId, category = AudioCategory.DEFAULT, volume = 1, loop = false) {
        this.log('Creating new howler track with id %c%s%c and category %c%s%c.', LogUtils.STYLE_RED_BOLD, trackId, LogUtils.STYLE_BLACK, LogUtils.STYLE_RED_BOLD, category, LogUtils.STYLE_BLACK);
        const collection = this.getCollection(category);
        const track = new HowlerTrack(trackId, category, this, volume, loop);
        collection.tracks.setValue(trackId, track);
        return track;
    }
    ensureCtx() {
        if (this._ctx.state === 'suspended') {
            Signals.audioContextSuspendedError.emit();
            return false;
        }
        return true;
    }
    /**
     * Loads a group of audio tracks and adds them to the same category.
     * @param token
     */
    loadFromIds(token) {
        this.load(token.assets, token.category, token.callback);
    }
    /**
     * Loads a group of audio tracks into the categories specified by each data object.
     * @param data
     */
    loadFromAssetMapData(data) {
        this.log('Loading audio assets from AssetMap.');
        this._audioLoadTokenCallback = data.callback;
        this._audioLoadTokenProgressCallback = data.progressCallback;
        data.assets.forEach((token) => {
            this._audioLoadTokens.push(token);
        });
        this.tryLoadFirstAssetMapAudioData();
    }
    /**
     * Called when a track is loaded using an AssetMapData object. Loads the next track or calls the load end callback.
     */
    onAudioFromAssetMapDataLoaded() {
        this._loadedCount++;
        const percent = (this._loadedCount / (this._loadedCount + this._audioLoadTokens.length)) * 100;
        this._audioLoadTokenProgressCallback(percent);
        if (!this.tryLoadFirstAssetMapAudioData()) {
            this.log('All audio from asset map loaded');
            this._audioLoadTokenCallback();
        }
    }
    /**
     * Tries to load the first audio load token. If one exists, it is removed and used to load the audio track.
     * @returns Whether there was an audio track load requested.
     */
    tryLoadFirstAssetMapAudioData() {
        if (this._audioLoadTokens.length > 0) {
            const token = this._audioLoadTokens[0];
            this._audioLoadTokens.shift();
            this.load(token.assetName, token.category, this.onAudioFromAssetMapDataLoaded.bind(this));
            return true;
        }
        return false;
    }
    updateAllCategoryVolume() {
        for (let i = 0; i < this._collections.keys().length; ++i) {
            this.updateCategoryVolume(this._collections.keys()[i]);
        }
    }
    /**
     * Updates the volume of all the tracks in a specific category.
     * @param category The category to update.
     */
    updateCategoryVolume(category) {
        const collection = this.getCollection(category);
        const tracks = collection.tracks.values();
        for (let i = tracks.length - 1; i >= 0; --i) {
            tracks[i].setVolumeWithModifiers(tracks[i].getVolume(), this._masterVolume, collection.volume);
        }
        Signals.onAudioCategoryVolumeChanged.emit({
            category,
            volume: collection.volume,
            masterVolume: this._masterVolume,
        });
    }
    getCollection(category) {
        if (!this._collections.containsKey(category)) {
            this.createCollection(category);
        }
        return this._collections.getValue(category);
    }
    createCollection(category) {
        this._collections.setValue(category, new AudioCollection());
    }
    onPlayRequested(token) {
        this.play(token.id, token.volume, token.loop, token.category);
    }
    onVisibilityChanged(isVisible) {
        if (this.autoMuteOnVisibilityChange) {
            if (isVisible) {
                this._masterVolume = this._previousMasterVolume;
                this.updateAllCategoryVolume();
            }
            else {
                this._previousMasterVolume = this._masterVolume;
                this._masterVolume = 0;
                this.updateAllCategoryVolume();
            }
        }
    }
    onAudioLoadError(data) {
        const canRetry = data.fallback.length > 0;
        if (canRetry) {
            this.logW('Audio Load Error. Trying again with a fallback url.', data);
            const track = this.getAudioTrack(data.id, data.category);
            if (track !== undefined) {
                track.loadSource();
            }
        }
        else {
            this.logE('Audio Load Error. No more fallback urls to try.', data);
        }
    }
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     * @param text
     * @param rest
     */
    log(text, ...rest) {
        if (this._debug) {
            LogUtils.log(text, { className: 'HowlerManager', color: LogUtils.COLOR_LIGHT_BLUE }, ...rest);
        }
    }
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     * @param text
     * @param rest
     */
    logW(text, ...rest) {
        if (this._debug) {
            LogUtils.logWarning(text, { className: 'HowlerManager', color: LogUtils.COLOR_LIGHT_BLUE }, ...rest);
        }
    }
    /**
     * Logs an error message with class name and colour coding.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     * @param text
     * @param rest
     */
    logE(text, ...rest) {
        LogUtils.logError(text, { className: 'HowlerManager', color: LogUtils.COLOR_LIGHT_BLUE }, ...rest);
    }
}
//# sourceMappingURL=HowlerManager.js.map