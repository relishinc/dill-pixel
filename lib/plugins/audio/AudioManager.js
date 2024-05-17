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
import { CorePlugin } from '../../core/decorators';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { Plugin } from '../Plugin';
import { AudioChannel } from './AudioChannel';
import { AudioInstance } from './AudioInstance';
/**
 * AudioManager is a class that manages audio playback in the application.
 * It provides methods to play, stop, fade in/out, and crossfade sounds.
 * It also allows you to create and manage audio channels.
 *
 * @example
 * const audioManager = new AudioManager();
 * audioManager.play('soundId', 'music');
 */
let AudioManager = class AudioManager extends Plugin {
    // signals
    /**
     * Signal that is emitted when a sound starts playing.
     * The callback function receives a SoundDetail object.
     */
    onSoundStarted = new Signal();
    /**
     * Signal that is emitted when a sound ends.
     * The callback function receives a SoundDetail object.
     */
    onSoundEnded = new Signal();
    /**
     * Signal that is emitted when the system is muted or unmuted.
     */
    onMuted = new Signal();
    /**
     * Signal that is emitted when the master volume changes.
     * The callback function receives the new volume as a number.
     */
    onMasterVolumeChanged = new Signal();
    /**
     * Signal that is emitted when a channel's volume changes.
     * The callback function receives a ChannelVolumeDetail object.
     */
    onChannelVolumeChanged = new Signal();
    _masterVolume = 1;
    _storedVolume = undefined;
    _muted = false;
    _paused = false;
    _channels = new Map();
    _idMap = new Map();
    /**
     * Creates a new AudioManager instance.
     * @param {string} id - The ID of the AudioManager. Default is 'AudioManager'.
     */
    constructor(id = 'AudioManager') {
        super(id);
        this.createChannel('music');
        this.createChannel('sfx');
        this.createChannel('voiceover');
    }
    /**
     * Gets the master volume.
     * @returns {number} The master volume.
     */
    get masterVolume() {
        return this._masterVolume;
    }
    /**
     * Sets the master volume.
     * @param {number} value - The new master volume.
     */
    set masterVolume(value) {
        this._masterVolume = value;
        this._channels.forEach((channel) => channel.updateVolume());
    }
    /**
     * Gets the map of audio channels.
     * @returns {Map<string, IAudioChannel>} The map of audio channels.
     */
    get channels() {
        return this._channels;
    }
    /**
     * Gets whether the audio is muted.
     * @returns {boolean} True if the audio is muted, false otherwise.
     */
    get muted() {
        return this._muted;
    }
    /**
     * Sets whether the audio is muted.
     * @param {boolean} value - True to mute the audio, false to unmute.
     */
    set muted(value) {
        this._muted = value;
        this._setMuted();
    }
    get music() {
        return this._channels.get('music');
    }
    get sfx() {
        return this._channels.get('sfx');
    }
    get voiceover() {
        return this._channels.get('voiceover');
    }
    get vo() {
        return this._channels.get('voiceover');
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
    /**
     * Initializes the AudioManager.
     * @param {IApplication} app
     * @returns {Promise<void>}
     */
    initialize(app) {
        if (typeof app?.manifest === 'object') {
            this.addAllFromManifest(app.manifest);
        }
        return Promise.resolve(undefined);
    }
    /**
     * Creates a new audio channel.
     * @param {string} name
     */
    createChannel(name) {
        if (this._channels.has(name)) {
            throw new Error(`Channel with name ${name} already exists.`);
        }
        const channel = new AudioChannel(name, this);
        this._channels.set(name, channel);
    }
    /**
     * Sets the volume of the specified channel.
     * @param {ChannelName | ChannelName[]} channelName
     * @param {number} volume
     */
    setChannelVolume(channelName, volume) {
        if (!Array.isArray(channelName)) {
            channelName = [channelName];
        }
        channelName.forEach((name) => this._setChannelVolume(name, volume));
    }
    /**
     * Gets the audio channel with the specified name.
     * @param {ChannelName} name
     * @returns {IAudioChannel | undefined}
     */
    getChannel(name) {
        return this._channels.get(name);
    }
    /**
     * Mutes the audio.
     */
    mute() {
        this._muted = true;
        this._setMuted();
    }
    /**
     * Unmutes the audio.
     */
    unmute() {
        this._muted = false;
        this._setMuted();
    }
    /**
     * Pauses the audio.
     */
    pause() {
        this._paused = true;
        this._setPaused();
    }
    /**
     * Resumes the audio.
     */
    resume() {
        this._paused = false;
        this._setPaused();
    }
    /**
     * Adds all sound assets from the specified manifest.
     * @param {AssetsManifest} manifest
     */
    addAllFromManifest(manifest) {
        manifest.bundles.forEach((bundle) => {
            this.addAllFromBundle(bundle.name, manifest);
        });
    }
    /**
     * Adds all sound assets from the specified bundle.
     * @param {string} bundleName
     * @param {AssetsManifest | string | undefined} manifest
     */
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
    /**
     * Adds a sound asset to the AudioManager.
     * @param {UnresolvedAsset} soundAsset
     */
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
                // @ts-expect-error soundAsset is not a string error
                obj[a] = soundAsset.src;
            });
            sound.add(obj);
        }
    }
    /**
     * Plays a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {PlayOptions} options
     * @returns {Promise<IAudioInstance>}
     */
    async play(soundId, channelName = 'sfx', options) {
        if (this._idMap.has(soundId)) {
            soundId = this._idMap.get(soundId);
        }
        const channel = this._channels.get(channelName);
        if (channel) {
            soundId = this._verifySoundId(soundId);
            const audioInstance = channel.add(soundId, new AudioInstance(soundId, channel, this));
            const mediaInstance = await sound.play(soundId, options);
            audioInstance.media = mediaInstance;
            if (options?.volume !== undefined) {
                mediaInstance.volume = options.volume;
                audioInstance.onStart.connect(() => {
                    () => this._soundStarted(soundId, audioInstance, channelName);
                });
                audioInstance.onEnd.connect(() => {
                    () => this._soundEnded(soundId, audioInstance, channelName);
                });
            }
            return audioInstance;
        }
        else {
            throw new Error(`Channel ${channelName} does not exist.`);
        }
    }
    /**
     * Stops a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @returns {IAudioInstance | undefined}
     */
    stop(soundId, channelName = 'sfx') {
        const channel = this._channels.get(channelName);
        if (channel) {
            return channel.remove(soundId);
        }
        else {
            throw new Error(`Channel ${channelName} does not exist.`);
        }
    }
    /**
     * Fades in a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {gsap.TweenVars} props
     * @returns {Promise<gsap.core.Tween | null>}
     */
    async fadeIn(soundId, channelName = 'music', props) {
        const channel = this._channels.get(channelName);
        if (channel) {
            soundId = this._verifySoundId(soundId);
        }
        if (!channel?.get(soundId)) {
            await this.play(soundId, channelName, { volume: 0 });
        }
        if (props?.volume === 0) {
            Logger.warn('fadeIn volume is 0', soundId, channelName, props);
        }
        const fadeProps = Object.assign({ volume: props?.volume ?? 1, duration: 1, ease: 'linear.easeNone' }, props);
        return this.fade(soundId, channelName, fadeProps);
    }
    /**
     * Fades out a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {Partial<gsap.TweenVars>} props
     * @returns {Promise<gsap.core.Tween | null>}
     */
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
    /**
     * Crossfades between two sounds in the specified channel.
     * @param {string} outSoundId
     * @param {string} inSoundId
     * @param {ChannelName} channelName
     * @param {number} duration
     * @returns {Promise<gsap.core.Tween | null>}
     */
    async crossFade(outSoundId, inSoundId, channelName = 'music', duration = 2) {
        const crossFadeProps = { duration, ease: 'linear.easeNone' };
        void this.fadeOut(outSoundId, channelName, crossFadeProps);
        return this.fadeIn(inSoundId, channelName, crossFadeProps);
    }
    /**
     * Fades a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {gsap.TweenVars} props
     * @param {boolean} stopOnComplete
     * @returns {Promise<gsap.core.Tween | null>}
     */
    async fade(soundId, channelName = 'music', props, stopOnComplete = false) {
        const channel = this._channels.get(channelName);
        if (channel) {
            soundId = this._verifySoundId(soundId);
        }
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
    /**
     * Restores the audio state after it has been suspended.
     */
    restore() {
        if (this._storedVolume !== undefined) {
            this.masterVolume = this._storedVolume;
        }
        this.muted = this._muted;
        this.resume();
    }
    /**
     * Suspends the audio by setting the master volume to 0 and pausing all sounds.
     */
    suspend() {
        this._storedVolume = this._masterVolume;
        this.masterVolume = 0;
        this.pause();
    }
    getAudioInstance(soundId, channelName = 'sfx') {
        const channel = this._channels.get(channelName);
        soundId = this._verifySoundId(soundId);
        if (channel) {
            return channel.get(soundId);
        }
        else {
            throw new Error(`Channel ${channelName} does not exist.`);
        }
    }
    load(soundId, channelName = 'sfx', options) {
        if (!Array.isArray(soundId)) {
            soundId = [soundId];
        }
        for (let id of soundId) {
            if (this._idMap.has(id)) {
                soundId = this._idMap.get(id);
            }
            const channel = this._channels.get(channelName);
            if (channel) {
                id = this._verifySoundId(id);
                // const audioInstance = new AudioInstance(id, channel, this);
                const soundInstance = sound.find(id);
                soundInstance.options = { ...options, autoPlay: false };
                const audioInstance = channel.add(id, new AudioInstance(id, channel, this));
                audioInstance.media = soundInstance.instances[0];
                audioInstance.pause();
            }
            else {
                throw new Error(`Channel ${channelName} does not exist.`);
            }
        }
    }
    _verifySoundId(soundId) {
        if (this._idMap.has(soundId)) {
            return this._idMap.get(soundId);
        }
        // try appending .mp3 or .ogg
        if (!sound.exists(soundId)) {
            // Logger.log(`Sound with ID ${soundId} does not exist. Trying different extensions.`);
            if (sound.exists(soundId + '.mp3')) {
                soundId += '.mp3';
            }
            else if (sound.exists(soundId + '.ogg')) {
                soundId += '.ogg';
            }
            else if (sound.exists(soundId + '.wav')) {
                soundId += '.wav';
            }
            else {
                throw new Error(`Sound with ID ${soundId} does not exist.`);
            }
        }
        // Logger.log(`Sound with id:${originalId} is now mapped to id:${soundId}`);
        this._idMap.set(soundId, soundId);
        return soundId;
    }
    /**
     * @private
     */
    _setMuted() {
        this._channels.forEach((channel) => {
            channel.muted = this._muted;
        });
        if (this._muted) {
            sound.muteAll();
        }
        else {
            sound.unmuteAll();
        }
        this.onMuted.emit(this._muted);
    }
    /**
     * @private
     */
    _setPaused() {
        if (this._paused) {
            sound.pauseAll();
        }
        else {
            sound.resumeAll();
        }
    }
    /**
     * Sets the volume of the specified channel.
     * @param {ChannelName} channelName
     * @param {number} volume
     * @private
     */
    _setChannelVolume(channelName, volume) {
        const channel = this._channels.get(channelName);
        if (channel) {
            channel.volume = volume;
        }
        else {
            throw new Error(`Channel ${channelName} does not exist.`);
        }
    }
    /**
     * Sound started event handler. Emit the onSoundStarted signal.
     * @param {string} id
     * @param {IAudioInstance} instance
     * @param {ChannelName} channelName
     * @private
     */
    _soundStarted(id, instance, channelName) {
        // Logger.log(`${id} started in ${channelName} channel`);
        this.onSoundStarted.emit({ id, instance, channelName });
    }
    /**
     * Sound ended event handler. Emit the onSoundEnded signal.
     * @param {string} id
     * @param {IAudioInstance} instance
     * @param {ChannelName} channelName
     * @private
     */
    _soundEnded(id, instance, channelName) {
        // Logger.log(`${id} ended in ${channelName} channel`);
        this.onSoundEnded.emit({ id, instance, channelName });
    }
};
AudioManager = __decorate([
    CorePlugin,
    __metadata("design:paramtypes", [String])
], AudioManager);
export { AudioManager };
