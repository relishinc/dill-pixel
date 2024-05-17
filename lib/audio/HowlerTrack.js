import { Howl } from 'howler';
import { Assets } from 'pixi.js';
import { audioLoadError } from '../functions';
import { AssetUtils } from '../utils';
import * as HowlerUtils from './HowlerUtils';
/**
 * Class representing a Howler audio track.
 */
export class HowlerTrack {
    /**
     * File extensions that Howler will attempt to load audio files with, in this order.
     * @default ["webm", "mp3", "ogg", "m4a"]
     */
    static { this.FILE_EXTENSIONS = ['webm', 'mp3', 'ogg', 'm4a']; }
    /**
     * Get default URLs for the audio track.
     * @param _id - The ID of the audio track.
     * @returns An array of URLs.
     */
    static getDefaultUrls(_id) {
        return HowlerTrack.FILE_EXTENSIONS.map((ext) => AssetUtils.FILEPATH_AUDIO + _id + '.' + ext);
    }
    /**
     * Create a new Howler audio track.
     * @param trackId - The ID of the audio track.
     * @param category - The category of the audio track.
     * @param audioManager - The audio manager for the audio track.
     * @param volume - The volume of the audio track.
     * @param loop - Whether the audio track should loop.
     */
    constructor(trackId, category, audioManager, volume = 1, loop = false) {
        this._volume = 1;
        this._id = trackId;
        this._audioManager = audioManager;
        this._category = category;
        if (Assets.resolver.basePath) {
            this._urls = HowlerTrack.getDefaultUrls(this._id).map((url) => Assets.resolver.basePath + '/' + url);
        }
        else {
            this._urls = HowlerTrack.getDefaultUrls(this._id);
        }
        this.loadSource();
        this.setVolume(volume);
        this.setLooped(loop);
    }
    /**
     * Get the ID of the audio track.
     * @returns The ID of the audio track.
     */
    get id() {
        return this._id;
    }
    /**
     * Play the audio track.
     */
    play() {
        if (this._source.state() === HowlerUtils.State.UNLOADED) {
            console.error(this._id + ' source Howl is not loaded. Call loadSource() before playing.');
            return;
        }
        this._source.play();
    }
    /**
     * Pause the audio track.
     */
    pause() {
        this._source.pause();
    }
    /**
     * Stop the audio track.
     */
    stop() {
        this._source.stop();
    }
    /**
     * Fade the audio track to a specified volume over a specified duration.
     * @param volume - The target volume.
     * @param milliseconds - The duration of the fade.
     */
    fadeTo(volume, milliseconds) {
        const newVol = volume * this._audioManager.masterVolume * this._audioManager.getCategoryVolume(this._category);
        this._source.fade(this._source.volume(), newVol, milliseconds);
    }
    /**
     * Unload the source of the audio track.
     */
    unloadSource() {
        this._source.unload();
    }
    /**
     * Load the source of the audio track.
     */
    loadSource() {
        if (this._source === undefined) {
            this._source = new Howl({
                preload: true,
                src: this._urls,
                onloaderror: this.onLoadError.bind(this),
            });
        }
        // Recreating the Howl object breaks any event listeners that may have already been registered, so instead we directly modify Howler._src
        else {
            // @ts-ignore
            this._source._src = this._urls;
            this._source.load();
        }
    }
    /**
     * Check if the audio track is muted.
     * @returns Whether the audio track is muted.
     */
    isMuted() {
        return this._source.mute();
    }
    /**
     * Set whether the audio track is muted.
     * @param value - Whether the audio track should be muted.
     */
    setMuted(value) {
        this._source.mute(value);
    }
    /**
     * Check if the audio track is looped.
     * @returns Whether the audio track is looped.
     */
    isLooped() {
        // HACK GM => the typedefs say return type is Howl even though it's Howl | boolean, ie it can be either.
        // Looking at the js Howler source here:
        // https://github.com/goldfire/howler.js/blob/master/dist/howler.js
        // it will return the loop value first if there are no params.
        // To get around this we can apparently cast what is returned
        // to unknown and then to boolean.
        return this._source.loop();
    }
    /**
     * Set whether the audio track is looped.
     * @param pLoop - Whether the audio track should be looped.
     */
    setLooped(pLoop) {
        this._source.loop(pLoop);
    }
    /**
     * Get the volume of the audio track.
     * @returns The volume of the audio track.
     */
    getVolume() {
        return this._volume;
    }
    /**
     * Set the volume of the audio track.
     * @param volume - The volume of the audio track.
     */
    setVolume(volume) {
        this.setVolumeWithModifiers(volume, this._audioManager.masterVolume, this._audioManager.getCategoryVolume(this._category));
    }
    /**
     * Set the volume of the audio track with modifiers.
     * @param volume - The volume of the audio track.
     * @param masterVolume - The master volume.
     * @param categoryVolume - The category volume.
     */
    setVolumeWithModifiers(volume, masterVolume, categoryVolume) {
        this._volume = volume;
        const trackVolume = this._volume * masterVolume * categoryVolume;
        this._source.volume(trackVolume);
    }
    /**
     * Set the pitch of the audio track.
     * @param pitch - The pitch of the audio track.
     */
    setPitch(pitch) {
        if (pitch) {
            this._source.rate(pitch);
        }
    }
    /**
     * Get the pitch of the audio track.
     * @returns The pitch of the audio track.
     */
    getPitch() {
        return this._source.rate();
    }
    /**
     * Get the time position of the audio track.
     * @returns The time position of the audio track.
     */
    getTimePos() {
        return this._source.seek();
    }
    /**
     * Set the time position of the audio track.
     * @param pPos - The time position of the audio track.
     */
    setTimePos(pPos) {
        this._source.seek(pPos);
    }
    /**
     * Get the duration of the audio track.
     * @returns The duration of the audio track.
     */
    getDuration() {
        return this._source.duration();
    }
    /**
     * Check if the audio track is playing.
     * @returns Whether the audio track is playing.
     */
    isPlaying() {
        return this._source.playing();
    }
    /**
     * Add an event listener to the audio track.
     * @param eventName - The name of the event.
     * @param callback - The callback function.
     */
    on(eventName, callback) {
        this._source.on(eventName, callback);
    }
    /**
     * Remove an event listener from the audio track.
     * @param eventName - The name of the event.
     * @param callback - The callback function.
     */
    off(eventName, callback) {
        this._source.off(eventName, callback);
    }
    /**
     * Add an event listener to the audio track that will be called once.
     * @param eventName - The name of the event.
     * @param callback - The callback function.
     */
    once(eventName, callback) {
        this._source.once(eventName, callback);
    }
    /**
     * Get the source of the audio track.
     * @returns The source of the audio track.
     */
    getSource() {
        return this._source;
    }
    /**
     * Handle an error when loading the audio track.
     * @param pID - The ID of the audio track.
     * @param pError - The error.
     */
    onLoadError(pID, pError) {
        // @ts-ignore
        let currentSrc = this._source._src;
        if (currentSrc instanceof Array) {
            // as far as I can tell, this will only ever be a string or an empty array
            if (currentSrc.length === 0) {
                currentSrc = '';
            }
            else {
                currentSrc = currentSrc[0]; // like I said, I don't think this line ever happens
            }
        }
        this._urls = this._urls.slice(this._urls.indexOf(currentSrc) + 1); // any files earlier in the array were skipped by Howler anyway (e.g. unsupported formats)
        audioLoadError({
            id: this._id,
            category: this._category,
            src: currentSrc,
            fallback: [...this._urls],
            error: pError,
        });
    }
}
//# sourceMappingURL=HowlerTrack.js.map