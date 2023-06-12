"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HowlerTrack = void 0;
const howler_1 = require("howler");
const pixi_js_1 = require("pixi.js");
const HowlerUtils = __importStar(require("../Audio/HowlerUtils"));
const Topics = __importStar(require("../Data/Topics"));
const AssetUtils_1 = require("../Utils/AssetUtils");
class HowlerTrack {
    constructor(pId, pCategory, pAudioManager, pVolume = 1, pLoop = false) {
        this._volume = 1;
        this._id = pId;
        this._audioManager = pAudioManager;
        this._category = pCategory;
        if (pixi_js_1.Assets.resolver.basePath !== "") {
            this._urls = HowlerTrack.getDefaultUrls(this._id).map((url) => pixi_js_1.Assets.resolver.basePath + "/" + url);
        }
        else {
            this._urls = HowlerTrack.getDefaultUrls(this._id);
        }
        this.loadSource();
        this.setVolume(pVolume);
        this.setLooped(pLoop);
    }
    static getDefaultUrls(_id) {
        return HowlerTrack.FILE_EXTENSIONS.map((ext) => AssetUtils_1.AssetUtils.FILEPATH_AUDIO + _id + "." + ext);
    }
    get id() { return this._id; }
    getSource() {
        return this._source;
    }
    play() {
        if (this._source.state() === HowlerUtils.State.UNLOADED) {
            console.error(this._id + " source Howl is not loaded. Call loadSource() before playing.");
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
    fadeTo(pVolume, pMilliseconds) {
        const newVol = pVolume * this._audioManager.masterVolume
            * this._audioManager.getCategoryVolume(this._category);
        this._source.fade(this._source.volume(), newVol, pMilliseconds);
    }
    unloadSource() {
        this._source.unload();
    }
    loadSource() {
        if (this._source === undefined) {
            this._source = new howler_1.Howl({
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
    setMuted(pMute) {
        this._source.mute(pMute);
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
    setVolume(pVolume) {
        this.setVolumeWithModifiers(pVolume, this._audioManager.masterVolume, this._audioManager.getCategoryVolume(this._category));
    }
    setVolumeWithModifiers(pVolume, pMasterVolume, pCategoryVolume) {
        this._volume = pVolume;
        this._source.volume(this._volume * pMasterVolume * pCategoryVolume);
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
    on(pEvent, pCallback) {
        this._source.on(pEvent, pCallback);
    }
    off(pEvent, pCallback) {
        this._source.off(pEvent, pCallback);
    }
    once(pEvent, pCallback) {
        this._source.once(pEvent, pCallback);
    }
    onLoadError(pID, pError) {
        // @ts-ignore
        let currentSrc = this._source._src;
        if (currentSrc instanceof Array) { // as far as I can tell, this will only ever be a string or an empty array
            if (currentSrc.length === 0) {
                currentSrc = "";
            }
            else {
                currentSrc = currentSrc[0]; // like I said, I don't think this line ever happens
            }
        }
        this._urls = this._urls.slice(this._urls.indexOf(currentSrc) + 1); // any files earlier in the array were skipped by Howler anyway (e.g. unsupported formats)
        PubSub.publishSync(Topics.AUDIO_LOAD_ERROR, {
            id: this._id,
            category: this._category,
            src: currentSrc,
            fallback: [...this._urls],
            error: pError,
        });
    }
}
/** Howler will attempt to load audio files with these extensions, in this order.
 * @default ["webm", "mp3", "ogg", "m4a"]
 */
HowlerTrack.FILE_EXTENSIONS = [
    "webm", "mp3", "ogg", "m4a",
];
exports.HowlerTrack = HowlerTrack;
//# sourceMappingURL=HowlerTrack.js.map