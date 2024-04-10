var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { sound } from '@pixi/sound';
import { gsap } from 'gsap';
import { CoreModule } from '../../core/decorators';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { Module } from '../Module';
import { AudioChannel } from './AudioChannel';
import { AudioInstance } from './AudioInstance';
let AudioManager = class AudioManager extends Module {
    constructor(id = 'AudioManager') {
        super(id);
        // signals
        this.onSoundStarted = new Signal();
        this.onSoundEnded = new Signal();
        this.onMuted = new Signal();
        this.onMasterVolumeChanged = new Signal();
        this.onChannelVolumeChanged = new Signal();
        this._masterVolume = 1;
        this._muted = false;
        this._paused = false;
        this._channels = new Map();
        this.createChannel('music');
        this.createChannel('sfx');
        this.createChannel('voiceover');
    }
    get masterVolume() {
        return this._masterVolume;
    }
    set masterVolume(value) {
        this._masterVolume = value;
        this._channels.forEach((channel) => channel.updateVolume());
    }
    get channels() {
        return this._channels;
    }
    get muted() {
        return this._muted;
    }
    set muted(value) {
        this._muted = value;
        this._setMuted();
    }
    destroy() {
        this._channels.forEach((channel) => {
            channel.destroy();
        });
        this._channels.clear();
        this.onSoundStarted.disconnectAll();
        this.onSoundEnded.disconnectAll();
        this.onMuted.disconnectAll();
        this.onMasterVolumeChanged.disconnectAll();
        this.onChannelVolumeChanged.disconnectAll();
        super.destroy();
    }
    initialize(app) {
        Logger.log('AudioManager initialized', app);
        if (typeof app?.manifest === 'object') {
            this.addAllFromManifest(app.manifest);
        }
        return Promise.resolve(undefined);
    }
    createChannel(name) {
        if (this._channels.has(name)) {
            throw new Error(`Channel with name ${name} already exists.`);
        }
        const channel = new AudioChannel(name, this);
        this._channels.set(name, channel);
    }
    setChannelVolume(channelName, volume) {
        if (!Array.isArray(channelName)) {
            channelName = [channelName];
        }
        channelName.forEach((name) => this._setChannelVolume(name, volume));
    }
    getChannel(name) {
        return this._channels.get(name);
    }
    mute() {
        this._muted = true;
        this._setMuted();
    }
    unmute() {
        this._muted = false;
        this._setMuted();
    }
    pause() {
        this._paused = true;
        this._setPaused();
    }
    resume() {
        this._paused = false;
        this._setPaused();
    }
    addAllFromManifest(manifest) {
        manifest.bundles.forEach((bundle) => {
            this.addAllFromBundle(bundle.name, manifest);
        });
    }
    addAllFromBundle(bundleName, manifest) {
        if (!manifest) {
            manifest = this.app.manifest;
        }
        if (manifest === undefined || typeof manifest === 'string') {
            throw new Error('Manifest is not available');
        }
        const bundle = manifest.bundles.find((b) => b.name === bundleName);
        if (bundle === undefined) {
            throw new Error(`Bundle with name ${bundleName} does not exist.`);
        }
        if (!Array.isArray(bundle?.assets)) {
            bundle.assets = [bundle.assets];
        }
        bundle.assets.forEach((asset) => {
            // detect sound assets by asset.src extension
            let src = asset.src;
            if (Array.isArray(src)) {
                src = src[0];
            }
            const ext = src.split('.').pop();
            if (ext === 'mp3' || ext === 'ogg' || ext === 'wav' || ext === 'webm') {
                this.add(asset);
            }
        });
    }
    add(soundAsset) {
        let alias = soundAsset.alias;
        if (!Array.isArray(soundAsset.alias)) {
            alias = [soundAsset.alias];
        }
        if (alias) {
            const obj = {};
            alias.forEach((a) => {
                if (a === undefined) {
                    return;
                }
                // @ts-ignore
                obj[a] = soundAsset.src;
            });
            sound.add(obj);
        }
    }
    async play(soundId, channelName = 'sfx', options) {
        const channel = this._channels.get(channelName);
        Logger.log('play', soundId, channelName, options, channel);
        if (channel) {
            const mediaInstance = await sound.play(soundId, options);
            const audioInstance = channel.add(soundId, new AudioInstance(soundId, mediaInstance, channel, this));
            if (options?.volume !== undefined) {
                audioInstance.volume = options.volume;
            }
            mediaInstance.on('start', () => this._soundStarted(soundId, audioInstance, channelName));
            mediaInstance.on('end', () => this._soundEnded(soundId, audioInstance, channelName));
            return audioInstance;
        }
        else {
            throw new Error(`Channel ${channelName} does not exist.`);
        }
    }
    stop(soundId, channelName = 'sfx') {
        Logger.log('stop', soundId, channelName);
        const channel = this._channels.get(channelName);
        if (channel) {
            return channel.remove(soundId);
        }
        else {
            throw new Error(`Channel ${channelName} does not exist.`);
        }
    }
    async fadeIn(soundId, channelName = 'music', props) {
        const channel = this._channels.get(channelName);
        if (!channel?.get(soundId)) {
            await this.play(soundId, channelName, { volume: 0 });
        }
        if (props?.volume === 0) {
            Logger.warn('fadeIn volume is 0', soundId, channelName, props);
        }
        const fadeProps = Object.assign({ volume: props?.volume ?? 1, duration: 1, ease: 'linear.easeNone' }, props);
        return this.fade(soundId, channelName, fadeProps);
    }
    async fadeOut(soundId, channelName = 'music', props = { volume: 0 }) {
        if (!props) {
            props = {};
        }
        if (props?.volume === undefined) {
            props.volume = 0;
        }
        if (props?.volume > 0) {
            Logger.warn('fadeOut volume should probably be 0', soundId, channelName, props);
        }
        const fadeProps = Object.assign({ volume: 0, duration: 1, ease: 'linear.easeNone' }, props);
        return this.fade(soundId, channelName, fadeProps, true);
    }
    async crossFade(outSoundId, inSoundId, channelName = 'music', duration = 2) {
        const crossfadeProps = { duration, ease: 'linear.easeNone' };
        void this.fadeOut(outSoundId, channelName, crossfadeProps);
        return this.fadeIn(inSoundId, channelName, crossfadeProps);
    }
    async fade(soundId, channelName = 'music', props, stopOnComplete = false) {
        const channel = this._channels.get(channelName);
        const soundInstance = channel?.get(soundId);
        if (soundInstance) {
            const tween = gsap.to(soundInstance, props);
            tween.eventCallback('onComplete', () => {
                if (stopOnComplete) {
                    this.stop(soundId, channelName);
                }
            });
            return tween;
        }
        return null;
    }
    _setMuted() {
        this._channels.forEach((channel) => {
            channel.muted = this._muted;
        });
        this.onMuted.emit(this._muted);
    }
    _setPaused() {
        if (this._paused) {
            sound.pauseAll();
        }
        else {
            sound.resumeAll();
        }
    }
    _setChannelVolume(channelName, volume) {
        const channel = this._channels.get(channelName);
        if (channel) {
            channel.volume = volume;
        }
        else {
            throw new Error(`Channel ${channelName} does not exist.`);
        }
    }
    _soundStarted(id, instance, channelName) {
        // Logger.log(`${id} started in ${channelName} channel`);
        this.onSoundStarted.emit({ id, instance, channelName });
    }
    _soundEnded(id, instance, channelName) {
        // Logger.log(`${id} ended in ${channelName} channel`);
        this.onSoundEnded.emit({ id, instance, channelName });
    }
};
AudioManager = __decorate([
    CoreModule,
    __metadata("design:paramtypes", [String])
], AudioManager);
export { AudioManager };
//# sourceMappingURL=AudioManager.js.map