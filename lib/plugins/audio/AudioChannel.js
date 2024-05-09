export class AudioChannel {
    name;
    manager;
    _muted = false;
    _volume = 1.0;
    _sounds = new Map();
    constructor(name, manager) {
        this.name = name;
        this.manager = manager;
        this.muted = this.manager.muted;
    }
    get muted() {
        return this._muted;
    }
    set muted(value) {
        this._muted = value;
        this._setMuted();
    }
    get volume() {
        return this._volume;
    }
    set volume(value) {
        this._volume = value;
        this.updateVolume();
    }
    add(id, instance) {
        this._sounds.set(id, instance);
        return instance;
    }
    get(id) {
        return this._sounds.get(id);
    }
    remove(id) {
        const instance = this._sounds.get(id);
        if (instance) {
            instance.destroy();
            this._sounds.delete(id);
        }
        return instance;
    }
    _setMuted() {
        this._sounds.forEach((sound) => {
            sound.muted = this._muted;
        });
    }
    updateVolume() {
        this._sounds.forEach((sound) => {
            sound.updateVolume();
        });
        this.manager.onChannelVolumeChanged.emit({ channel: this, volume: this._volume });
    }
    destroy() { }
}
