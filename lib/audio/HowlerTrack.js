import { Howl } from 'howler';
import { Assets } from 'pixi.js';
import { audioLoadError } from '../functions';
import { AssetUtils } from '../utils';
import * as HowlerUtils from './HowlerUtils';
export class HowlerTrack {
    /** Howler will attempt to load audio files with these extensions, in this order.
     * @default ["webm", "mp3", "ogg", "m4a"]
     */
    static { this.FILE_EXTENSIONS = ['webm', 'mp3', 'ogg', 'm4a']; }
    static getDefaultUrls(_id) {
        return HowlerTrack.FILE_EXTENSIONS.map((ext) => AssetUtils.FILEPATH_AUDIO + _id + '.' + ext);
    }
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
    get id() {
        return this._id;
    }
    play() {
        if (this._source.state() === HowlerUtils.State.UNLOADED) {
            console.error(this._id + ' source Howl is not loaded. Call loadSource() before playing.');
            return;
        }
        this._source.play();
    }
    pause() {
        this._source.pause();
    }
    stop() {
        this._source.stop();
    }
    fadeTo(volume, milliseconds) {
        const newVol = volume * this._audioManager.masterVolume * this._audioManager.getCategoryVolume(this._category);
        this._source.fade(this._source.volume(), newVol, milliseconds);
    }
    unloadSource() {
        this._source.unload();
    }
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
    isMuted() {
        return this._source.mute();
    }
    setMuted(value) {
        this._source.mute(value);
    }
    isLooped() {
        // HACK GM => the typedefs say return type is Howl even though it's Howl | boolean, ie it can be either.
        // Looking at the js Howler source here:
        // https://github.com/goldfire/howler.js/blob/master/dist/howler.js
        // it will return the loop value first if there are no params.
        // To get around this we can apparently cast what is returned
        // to unknown and then to boolean.
        return this._source.loop();
    }
    setLooped(pLoop) {
        this._source.loop(pLoop);
    }
    getVolume() {
        return this._volume;
    }
    setVolume(volume) {
        this.setVolumeWithModifiers(volume, this._audioManager.masterVolume, this._audioManager.getCategoryVolume(this._category));
    }
    setVolumeWithModifiers(volume, masterVolume, categoryVolume) {
        this._volume = volume;
        this._source.volume(this._volume * masterVolume * categoryVolume);
    }
    setPitch(pitch) {
        if (pitch) {
            this._source.rate(pitch);
        }
    }
    getPitch() {
        return this._source.rate();
    }
    getTimePos() {
        return this._source.seek();
    }
    setTimePos(pPos) {
        this._source.seek(pPos);
    }
    getDuration() {
        return this._source.duration();
    }
    isPlaying() {
        return this._source.playing();
    }
    on(eventName, callback) {
        this._source.on(eventName, callback);
    }
    off(eventName, callback) {
        this._source.off(eventName, callback);
    }
    once(eventName, callback) {
        this._source.once(eventName, callback);
    }
    getSource() {
        return this._source;
    }
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