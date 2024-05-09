import { gsap } from 'gsap';
import { Signal } from '../../signals';
import { bindAllMethods } from '../../utils/methodBinding';
export class AudioInstance {
    id;
    channel;
    manager;
    onStart = new Signal();
    onStop = new Signal();
    onEnd = new Signal();
    onPaused = new Signal();
    onResumed = new Signal();
    onProgress = new Signal();
    _media;
    _volume = 1;
    _muted = false;
    _isPlaying = false;
    constructor(id, channel, manager) {
        this.id = id;
        this.channel = channel;
        this.manager = manager;
        bindAllMethods(this);
        this.muted = this.channel.muted;
    }
    get media() {
        return this._media;
    }
    set media(value) {
        this._media = value;
        if (value) {
            this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume;
            if (this.muted) {
                this._media.muted = this.muted;
            }
            this.addListeners();
        }
    }
    get muted() {
        return this._muted;
    }
    set muted(value) {
        this._muted = value;
        if (this._media) {
            this._media.muted = this._muted;
        }
    }
    get volume() {
        return this._volume;
    }
    set volume(value) {
        this._volume = value;
        if (this._media) {
            this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume;
        }
    }
    get isPlaying() {
        return this._isPlaying;
    }
    pause() {
        this._isPlaying = false;
        if (this._media) {
            this._media.paused = true;
        }
    }
    resume() {
        this._isPlaying = true;
        if (this._media) {
            this._media.paused = false;
        }
    }
    remove() {
        this.channel.remove(this.id);
    }
    stop() {
        if (this._media) {
            this._media.stop();
        }
        this.onEnd.emit(this);
    }
    updateVolume() {
        this.volume = this._volume;
    }
    addListeners() {
        this.removeListeners();
        this._media.on('end', this._handleMediaEnded);
        this._media.on('start', this._handleMediaStarted);
        this._media.on('stop', this._handleMediaStopped);
        this._media.on('pause', this._handleMediaPaused);
        this._media.on('progress', this._handleMediaProgress);
        this._media.on('resumed', this._handleMediaResumed);
    }
    removeListeners() {
        if (!this.media) {
            return;
        }
        this._media.off('end', this._handleMediaEnded);
        this._media.off('start', this._handleMediaStarted);
        this._media.off('stop', this._handleMediaStopped);
        this._media.off('pause', this._handleMediaPaused);
        this._media.off('progress', this._handleMediaProgress);
        this._media.off('resumed', this._handleMediaResumed);
    }
    destroy() {
        this.stop();
        this.removeListeners();
    }
    fadeTo(volume, duration) {
        return gsap.to(this.media, { volume, duration });
    }
    play(time) {
        this._isPlaying = true;
        if (time) {
            this.media.play({ start: time });
        }
        else {
            this.media.play({});
        }
    }
    _handleMediaEnded() {
        this.onEnd.emit(this);
    }
    _handleMediaStarted() {
        this.onStart.emit(this);
    }
    _handleMediaStopped() {
        this.onStop.emit(this);
    }
    _handleMediaPaused() {
        this.onPaused.emit(this);
    }
    _handleMediaProgress() {
        this.onProgress.emit(this);
    }
    _handleMediaResumed() {
        this.onResumed.emit(this);
    }
}
