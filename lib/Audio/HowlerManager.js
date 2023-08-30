import { Dictionary } from "typescript-collections";
import { Application } from "../Application";
import * as AudioCategory from "../Audio/AudioCategory";
import * as HowlerUtils from "../Audio/HowlerUtils";
import { Signals } from "../Signals";
import { LogUtils, MathUtils } from "../Utils";
import { AudioCollection } from "./AudioCollection";
import { HowlerTrack } from "./HowlerTrack";
export class HowlerManager {
    constructor(app) {
        this.app = app;
        /**
         * How many of the {@link _audioloadTokens} have been loaded so far
         */
        this._loadedCount = 0;
        /**
         * The internal flag for print log statements.
         */
        this._debug = false;
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
    getCategoryVolume(pCategory) {
        return this.getCollection(pCategory).volume;
    }
    setCategoryVolume(pCategory, pVolume) {
        this.getCollection(pCategory).volume = pVolume;
        this.updateCategoryVolume(pCategory);
    }
    getDuration(pId, pCategory) {
        const track = this.getAudioTrack(pId, pCategory);
        if (track !== undefined) {
            return track.getDuration();
        }
        return undefined;
    }
    play(pId, pVolume = 1, pLoop = false, pCategory = AudioCategory.DEFAULT) {
        let loaded;
        const category = this.getCollection(pCategory);
        const track = category.tracks.getValue(pId);
        if (track === undefined) {
            this.load(pId, pCategory, () => {
                loaded = category.tracks.getValue(pId);
                loaded.setLooped(pLoop);
                loaded.setVolumeWithModifiers(pVolume, this._masterVolume, category.volume);
                loaded.play();
            });
        }
        else {
            track.setLooped(pLoop);
            track.setVolumeWithModifiers(pVolume, this._masterVolume, category.volume);
            track.play();
        }
    }
    pause(pId, pCategory) {
        const track = this.getAudioTrack(pId, pCategory);
        if (track !== undefined) {
            track.pause();
        }
    }
    stop(pId, pCategory) {
        const track = this.getAudioTrack(pId, pCategory);
        if (track !== undefined) {
            track.stop();
        }
    }
    load(pIds, pCategory, pOnLoad) {
        const category = this.getCollection(pCategory);
        let track;
        let id;
        // convert single Ids into array for simplicity
        if (typeof pIds === "string") {
            pIds = [pIds];
        }
        // Create the howls if they don't already exist
        for (let i = pIds.length - 1; i >= 0; --i) {
            id = pIds[i];
            track = category.tracks.getValue(id);
            if (track === undefined) {
                track = this.createAudioTrack(id, pCategory);
            }
            else {
                // Ensure that the actual source exists
                if (track.getSource().state() === HowlerUtils.State.UNLOADED) {
                    track.loadSource();
                }
            }
        }
        // If supplied, call the pOnLoad callback once all howls have loaded
        if (pOnLoad !== undefined) {
            let loadedCount = 0;
            for (let i = pIds.length - 1; i >= 0; --i) {
                const howl = category.tracks.getValue(pIds[i]).getSource();
                if (howl.state() !== HowlerUtils.State.LOADED) {
                    howl.on(HowlerUtils.Events.LOAD, () => {
                        ++loadedCount;
                        if (loadedCount >= pIds.length) {
                            pOnLoad();
                        }
                    });
                }
                else {
                    ++loadedCount;
                }
            }
            // If all Ids were already loaded, fire off the callback immediately
            if (loadedCount === pIds.length) {
                pOnLoad();
            }
        }
    }
    unload(pId, pCategory, pRemoveTrack) {
        const category = this.getCollection(pCategory);
        const track = category.tracks.getValue(pId);
        if (track !== undefined) {
            track.unloadSource();
            if (pRemoveTrack === true) {
                category.tracks.remove(pId);
            }
        }
    }
    fadeTo(pId, pCategory, pVolume, pDuration) {
        const track = this.getAudioTrack(pId, pCategory);
        if (track !== undefined) {
            pVolume = MathUtils.clamp(pVolume, 0, 1);
            track.fadeTo(pVolume, pDuration);
        }
    }
    getAudioTrack(pId, pCategory) {
        if (this._collections.containsKey(pCategory)) {
            return this._collections.getValue(pCategory).tracks.getValue(pId);
        }
        return undefined;
    }
    createAudioTrack(pId, pCategory = AudioCategory.DEFAULT, pVolume = 1, pLoop = false) {
        this.log("Creating new howler track with id %c%s%c and category %c%s%c.", LogUtils.STYLE_RED_BOLD, pId, LogUtils.STYLE_BLACK, LogUtils.STYLE_RED_BOLD, pCategory, LogUtils.STYLE_BLACK);
        const track = new HowlerTrack(pId, pCategory, this, pVolume, pLoop);
        const category = this.getCollection(pCategory);
        category.tracks.setValue(pId, track);
        return track;
    }
    /**
     * Loads a group of audio tracks and adds them to the same category.
     * @param pToken The token with the load data.
     */
    loadFromIds(pToken) {
        this.load(pToken.assets, pToken.category, pToken.callback);
    }
    /**
     * Loads a group of audio tracks into the categories specified by each data object.
     * @param pTopic The pubsub message id.
     * @param pData The token with the load data.
     */
    loadFromAssetMapData(pData) {
        this.log("Loading audio assets from AssetMap.");
        this._audioLoadTokenCallback = pData.callback;
        this._audioLoadTokenProgressCallback = pData.progressCallback;
        pData.assets.forEach((token) => {
            this._audioLoadTokens.push(token);
        });
        this.tryLoadFirstAssetMapAudioData();
    }
    /**
     * Called when a track is loaded using an AssetMapData object. Loads the next track or calls the load end callback.
     */
    onAudioFromAssetMapDataLoaded() {
        this._loadedCount++;
        const percent = (this._loadedCount / (this._loadedCount + this._audioLoadTokens.length)) *
            100;
        this._audioLoadTokenProgressCallback(percent);
        if (this.tryLoadFirstAssetMapAudioData() === false) {
            this.log("All audio from asset map loaded");
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
     * @param pCategory The category to update.
     */
    updateCategoryVolume(pCategory) {
        const collection = this.getCollection(pCategory);
        const tracks = collection.tracks.values();
        for (let i = tracks.length - 1; i >= 0; --i) {
            tracks[i].setVolumeWithModifiers(tracks[i].getVolume(), this._masterVolume, collection.volume);
        }
    }
    getCollection(pCategory) {
        if (this._collections.containsKey(pCategory) === false) {
            this.createCollection(pCategory);
        }
        return this._collections.getValue(pCategory);
    }
    createCollection(pCategory) {
        this._collections.setValue(pCategory, new AudioCollection());
    }
    onPlayRequested(pToken) {
        this.play(pToken.id, pToken.volume, pToken.loop, pToken.category);
    }
    onVisibilityChanged(pVisible) {
        if (pVisible) {
            this._masterVolume = this._previousMasterVolume;
            this.updateAllCategoryVolume();
        }
        else {
            this._previousMasterVolume = this._masterVolume;
            this._masterVolume = 0;
            this.updateAllCategoryVolume();
        }
    }
    onAudioLoadError(pData) {
        const canRetry = pData.fallback.length > 0;
        if (canRetry) {
            this.logW("Audio Load Error. Trying again with a fallback url.", pData);
            const track = this.getAudioTrack(pData.id, pData.category);
            if (track !== undefined) {
                track.loadSource();
            }
        }
        else {
            this.logE("Audio Load Error. No more fallback urls to try.", pData);
        }
    }
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    log(pText, ...pParams) {
        if (this._debug) {
            LogUtils.log(pText, { className: "HowlerManager", color: LogUtils.COLOR_LIGHT_BLUE }, ...pParams);
        }
    }
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    logW(pText, ...pParams) {
        if (this._debug) {
            LogUtils.logWarning(pText, { className: "HowlerManager", color: LogUtils.COLOR_LIGHT_BLUE }, ...pParams);
        }
    }
    /**
     * Logs an error message with class name and colour coding.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    logE(pText, ...pParams) {
        LogUtils.logError(pText, { className: "HowlerManager", color: LogUtils.COLOR_LIGHT_BLUE }, ...pParams);
    }
}
//# sourceMappingURL=HowlerManager.js.map