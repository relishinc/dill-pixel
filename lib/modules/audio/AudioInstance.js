export class AudioInstance {
    constructor(id, media, channel, manager) {
        this.id = id;
        this.media = media;
        this.channel = channel;
        this.manager = manager;
        this._volume = 1;
        this._muted = false;
        this.volume = this.media.volume;
        this.muted = this.channel.muted;
    }
    get muted() {
        return this._muted;
    }
    set muted(value) {
        this._muted = value;
        this.media.muted = this._muted;
    }
    get volume() {
        return this._volume;
    }
    set volume(value) {
        this._volume = value;
        this.media.volume = this._volume * this.channel.volume * this.manager.masterVolume;
    }
    updateVolume() {
        this.volume = this._volume;
    }
}
//# sourceMappingURL=AudioInstance.js.map