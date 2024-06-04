import { PlayOptions } from '@pixi/sound';
import { AssetsManifest, UnresolvedAsset } from 'pixi.js';
import { Signal } from '../../signals';
import { IPlugin, Plugin } from '../Plugin';
import { IAudioChannel } from './AudioChannel';
import { IAudioInstance } from './AudioInstance';
import { IApplication } from '../../core';

import TweenVars = gsap.TweenVars;
export type SoundDetail = {
    id: string;
    instance: IAudioInstance;
    channelName: string;
};
export type ChannelVolumeDetail = {
    channel: IAudioChannel;
    volume: number;
};
export type ChannelName = 'music' | 'sfx' | 'voiceover' | string;
export interface IAudioManagerPlugin extends IPlugin {
    onSoundStarted: Signal<(detail: SoundDetail) => void>;
    onSoundEnded: Signal<(detail: SoundDetail) => void>;
    onMasterVolumeChanged: Signal<(volume: number) => void>;
    onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
    onMuted: Signal<(muted: boolean) => void>;
    masterVolume: number;
    muted: boolean;
    channels: Map<string, IAudioChannel>;
    music: IAudioChannel;
    sfx: IAudioChannel;
    voiceover: IAudioChannel;
    vo: IAudioChannel;
    createChannel(name: string): void;
    play(soundId: string, channelName: ChannelName, options?: PlayOptions): Promise<IAudioInstance>;
    isPlaying(soundId: string, channelName: ChannelName): boolean;
    load(soundId: string | string[], channelName: ChannelName, options?: PlayOptions): void;
    stop(soundId: string, channelName: ChannelName): IAudioInstance | undefined;
    setChannelVolume(channelName: ChannelName | ChannelName[], volume: number): void;
    getChannel(name: ChannelName): IAudioChannel | undefined;
    addAllFromManifest(manifest: AssetsManifest): void;
    addAllFromBundle(bundleName: string, manifest?: AssetsManifest | string | undefined): void;
    add(soundAsset: UnresolvedAsset): void;
    fade(soundId: string, channelName: ChannelName, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;
    fadeIn(soundId: string, channelName: ChannelName, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;
    fadeOut(soundId: string, channelName: ChannelName, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;
    crossFade(outSoundId: string, inSoundId: string, channelName: ChannelName, duration?: number): Promise<gsap.core.Tween | null>;
    mute(): void;
    unmute(): void;
    pause(): void;
    resume(): void;
    suspend(): void;
    restore(): Promise<void>;
    getAudioInstance(soundId: string, channelName: string): IAudioInstance | undefined;
    stopAll(fade?: boolean, duration?: number, props?: TweenVars): void;
}
/**
 * AudioManager is a class that manages audio playback in the application.
 * It provides methods to play, stop, fade in/out, and crossfade sounds.
 * It also allows you to create and manage audio channels.
 *
 * @example
 * const audioManager = new AudioManager();
 * audioManager.play('soundId', 'music');
 */
export declare class AudioManagerPlugin extends Plugin implements IAudioManagerPlugin {
    /**
     * Signal that is emitted when a sound starts playing.
     * The callback function receives a SoundDetail object.
     */
    onSoundStarted: Signal<(detail: SoundDetail) => void>;
    /**
     * Signal that is emitted when a sound ends.
     * The callback function receives a SoundDetail object.
     */
    onSoundEnded: Signal<(detail: SoundDetail) => void>;
    /**
     * Signal that is emitted when the system is muted or unmuted.
     */
    onMuted: Signal<(muted: boolean) => void>;
    /**
     * Signal that is emitted when the master volume changes.
     * The callback function receives the new volume as a number.
     */
    onMasterVolumeChanged: Signal<(volume: number) => void>;
    /**
     * Signal that is emitted when a channel's volume changes.
     * The callback function receives a ChannelVolumeDetail object.
     */
    onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
    private _storedVolume;
    private _paused;
    private _idMap;
    /**
     * Creates a new AudioManager instance.
     * @param {string} id - The ID of the AudioManager. Default is 'AudioManager'.
     */
    constructor(id?: string);
    private _masterVolume;
    /**
     * Gets the master volume.
     * @returns {number} The master volume.
     */
    get masterVolume(): number;
    /**
     * Sets the master volume.
     * @param {number} value - The new master volume.
     */
    set masterVolume(value: number);
    private _muted;
    /**
     * Gets whether the audio is muted.
     * @returns {boolean} True if the audio is muted, false otherwise.
     */
    get muted(): boolean;
    /**
     * Sets whether the audio is muted.
     * @param {boolean} value - True to mute the audio, false to unmute.
     */
    set muted(value: boolean);
    private _channels;
    /**
     * Gets the map of audio channels.
     * @returns {Map<string, IAudioChannel>} The map of audio channels.
     */
    get channels(): Map<string, IAudioChannel>;
    get music(): IAudioChannel;
    get sfx(): IAudioChannel;
    get voiceover(): IAudioChannel;
    get vo(): IAudioChannel;
    destroy(): void;
    /**
     * Initializes the AudioManager.
     * @param {IApplication} app
     * @returns {Promise<void>}
     */
    initialize(app: IApplication): Promise<void>;
    /**
     * Creates a new audio channel.
     * @param {string} name
     */
    createChannel(name: string): void;
    /**
     * Sets the volume of the specified channel.
     * @param {ChannelName | ChannelName[]} channelName
     * @param {number} volume
     */
    setChannelVolume(channelName: ChannelName | ChannelName[], volume: number): void;
    /**
     * Gets the audio channel with the specified name.
     * @param {ChannelName} name
     * @returns {IAudioChannel | undefined}
     */
    getChannel(name: ChannelName): IAudioChannel | undefined;
    /**
     * Mutes the audio.
     */
    mute(): void;
    /**
     * Unmutes the audio.
     */
    unmute(): void;
    /**
     * Pauses the audio.
     */
    pause(): void;
    /**
     * Resumes the audio.
     */
    resume(): void;
    /**
     * Adds all sound assets from the specified manifest.
     * @param {AssetsManifest} manifest
     */
    addAllFromManifest(manifest: AssetsManifest): void;
    /**
     * Adds all sound assets from the specified bundle.
     * @param {string} bundleName
     * @param {AssetsManifest | string | undefined} manifest
     */
    addAllFromBundle(bundleName: string, manifest?: AssetsManifest | string | undefined): void;
    /**
     * Adds a sound asset to the AudioManager.
     * @param {UnresolvedAsset} soundAsset
     */
    add(soundAsset: UnresolvedAsset): void;
    isPlaying(soundId: string, channelName: ChannelName): boolean;
    /**
     * Plays a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {PlayOptions} options
     * @returns {Promise<IAudioInstance>}
     */
    play(soundId: string, channelName?: ChannelName, options?: PlayOptions): Promise<IAudioInstance>;
    /**
     * Stops a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @returns {IAudioInstance | undefined}
     */
    stop(soundId: string, channelName?: ChannelName): IAudioInstance | undefined;
    /**
     * Fades in a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {gsap.TweenVars} props
     * @returns {Promise<gsap.core.Tween | null>}
     */
    fadeIn(soundId: string, channelName: string | undefined, props: gsap.TweenVars): Promise<gsap.core.Tween | null>;
    /**
     * Fades out a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {Partial<gsap.TweenVars>} props
     * @returns {Promise<gsap.core.Tween | null>}
     */
    fadeOut(soundId: string, channelName?: ChannelName, props?: Partial<gsap.TweenVars>): Promise<gsap.core.Tween | null>;
    /**
     * Crossfades between two sounds in the specified channel.
     * @param {string} outSoundId
     * @param {string} inSoundId
     * @param {ChannelName} channelName
     * @param {number} duration
     * @returns {Promise<gsap.core.Tween | null>}
     */
    crossFade(outSoundId: string, inSoundId: string, channelName?: ChannelName, duration?: number): Promise<gsap.core.Tween | null>;
    /**
     * Fades a sound with the specified ID in the specified channel.
     * @param {string} soundId
     * @param {ChannelName} channelName
     * @param {gsap.TweenVars} props
     * @param {boolean} stopOnComplete
     * @returns {Promise<gsap.core.Tween | null>}
     */
    fade(soundId: string, channelName: string | undefined, props: gsap.TweenVars, stopOnComplete?: boolean): Promise<gsap.core.Tween | null>;
    /**
     * Restores the audio state after it has been suspended.
     */
    restore(): Promise<void>;
    /**
     * Suspends the audio by setting the master volume to 0 and pausing all sounds.
     */
    suspend(): void;
    getAudioInstance(soundId: string, channelName?: string): IAudioInstance | undefined;
    load(soundId: string | string[], channelName?: ChannelName, options?: PlayOptions): void;
    stopAll(fade?: boolean, duration?: number, props?: TweenVars): void;
    protected getCoreSignals(): string[];
    private _verifySoundId;
    private _findAndAddFromManifest;
    /**
     * @private
     */
    private _setMuted;
    /**
     * @private
     */
    private _setPaused;
    /**
     * Sets the volume of the specified channel.
     * @param {ChannelName} channelName
     * @param {number} volume
     * @private
     */
    private _setChannelVolume;
    /**
     * Sound started event handler. Emit the onSoundStarted signal.
     * @param {string} id
     * @param {IAudioInstance} instance
     * @param {ChannelName} channelName
     * @private
     */
    private _soundStarted;
    /**
     * Sound ended event handler. Emit the onSoundEnded signal.
     * @param {string} id
     * @param {IAudioInstance} instance
     * @param {ChannelName} channelName
     * @private
     */
    private _soundEnded;
}
//# sourceMappingURL=AudioManagerPlugin.d.ts.map