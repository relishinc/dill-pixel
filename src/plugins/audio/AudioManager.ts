import { PlayOptions, sound, SoundSourceMap } from '@pixi/sound';
import { gsap } from 'gsap';
import { AssetsManifest, UnresolvedAsset } from 'pixi.js';
import { IApplication } from '../../core/Application';
import { CorePlugin } from '../../core/decorators';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { IPlugin, Plugin } from '../Plugin';
import { AudioChannel, IAudioChannel } from './AudioChannel';
import { AudioInstance, IAudioInstance } from './AudioInstance';

type SoundDetail = { id: string; instance: IAudioInstance; channelName: string };
type ChannelVolumeDetail = { channel: IAudioChannel; volume: number };
type ChannelName = 'music' | 'sfx' | 'voiceover' | string;

export interface IAudioManager extends IPlugin {
  onSoundStarted: Signal<(detail: SoundDetail) => void>;
  onSoundEnded: Signal<(detail: SoundDetail) => void>;
  onMasterVolumeChanged: Signal<(volume: number) => void>;
  onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
  onMuted: Signal<(muted: boolean) => void>;

  masterVolume: number;
  muted: boolean;
  channels: Map<string, IAudioChannel>;

  createChannel(name: string): void;

  play(soundId: string, channelName: ChannelName, options?: PlayOptions): Promise<IAudioInstance>;

  stop(soundId: string, channelName: ChannelName): IAudioInstance | undefined;

  setChannelVolume(channelName: ChannelName | ChannelName[], volume: number): void;

  getChannel(name: ChannelName): IAudioChannel | undefined;

  addAllFromManifest(manifest: AssetsManifest): void;

  addAllFromBundle(bundleName: string, manifest?: AssetsManifest | string | undefined): void;

  add(soundAsset: UnresolvedAsset): void;

  fade(soundId: string, channelName: ChannelName, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;

  fadeIn(soundId: string, channelName: ChannelName, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;

  fadeOut(soundId: string, channelName: ChannelName, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;

  crossFade(
    outSoundId: string,
    inSoundId: string,
    channelName: ChannelName,
    duration?: number,
  ): Promise<gsap.core.Tween | null>;

  mute(): void;

  unmute(): void;

  pause(): void;

  resume(): void;

  suspend(): void;

  restore(): void;
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
@CorePlugin
export class AudioManager extends Plugin implements IAudioManager {
  // signals
  /**
   * Signal that is emitted when a sound starts playing.
   * The callback function receives a SoundDetail object.
   */
  public onSoundStarted: Signal<(detail: SoundDetail) => void> = new Signal<(detail: SoundDetail) => void>();
  /**
   * Signal that is emitted when a sound ends.
   * The callback function receives a SoundDetail object.
   */
  public onSoundEnded: Signal<(detail: SoundDetail) => void> = new Signal<(detail: SoundDetail) => void>();
  /**
   * Signal that is emitted when the system is muted or unmuted.
   */
  public onMuted: Signal<(muted: boolean) => void> = new Signal<(muted: boolean) => void>();
  /**
   * Signal that is emitted when the master volume changes.
   * The callback function receives the new volume as a number.
   */
  public onMasterVolumeChanged: Signal<(volume: number) => void> = new Signal<(volume: number) => void>();
  /**
   * Signal that is emitted when a channel's volume changes.
   * The callback function receives a ChannelVolumeDetail object.
   */
  public onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void> = new Signal<
    (detail: ChannelVolumeDetail) => void
  >();

  private _masterVolume: number = 1;
  private _storedVolume: number | undefined = undefined;
  private _muted: boolean = false;
  private _paused: boolean = false;
  private _channels: Map<string, IAudioChannel> = new Map();

  /**
   * Creates a new AudioManager instance.
   * @param {string} id - The ID of the AudioManager. Default is 'AudioManager'.
   */
  public constructor(id: string = 'AudioManager') {
    super(id);
    this.createChannel('music');
    this.createChannel('sfx');
    this.createChannel('voiceover');
  }

  /**
   * Gets the master volume.
   * @returns {number} The master volume.
   */
  get masterVolume(): number {
    return this._masterVolume;
  }

  /**
   * Sets the master volume.
   * @param {number} value - The new master volume.
   */
  set masterVolume(value: number) {
    this._masterVolume = value;
    this._channels.forEach((channel) => channel.updateVolume());
  }

  /**
   * Gets the map of audio channels.
   * @returns {Map<string, IAudioChannel>} The map of audio channels.
   */
  get channels(): Map<string, IAudioChannel> {
    return this._channels;
  }

  /**
   * Gets whether the audio is muted.
   * @returns {boolean} True if the audio is muted, false otherwise.
   */
  get muted(): boolean {
    return this._muted;
  }

  /**
   * Sets whether the audio is muted.
   * @param {boolean} value - True to mute the audio, false to unmute.
   */
  set muted(value: boolean) {
    this._muted = value;
    this._setMuted();
  }

  public destroy(): void {
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
  public initialize(app: IApplication): Promise<void> {
    Logger.log('AudioManager initialized', app);
    if (typeof app?.manifest === 'object') {
      this.addAllFromManifest(app.manifest);
    }
    return Promise.resolve(undefined);
  }

  /**
   * Creates a new audio channel.
   * @param {string} name
   */
  public createChannel(name: string): void {
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
  public setChannelVolume(channelName: ChannelName | ChannelName[], volume: number): void {
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
  public getChannel(name: ChannelName): IAudioChannel | undefined {
    return this._channels.get(name);
  }

  /**
   * Mutes the audio.
   */
  public mute() {
    this._muted = true;
    this._setMuted();
  }

  /**
   * Unmutes the audio.
   */
  public unmute() {
    this._muted = false;
    this._setMuted();
  }

  /**
   * Pauses the audio.
   */
  public pause(): void {
    this._paused = true;
    this._setPaused();
  }

  /**
   * Resumes the audio.
   */
  public resume(): void {
    this._paused = false;
    this._setPaused();
  }

  /**
   * Adds all sound assets from the specified manifest.
   * @param {AssetsManifest} manifest
   */
  public addAllFromManifest(manifest: AssetsManifest) {
    manifest.bundles.forEach((bundle) => {
      this.addAllFromBundle(bundle.name, manifest);
    });
  }

  /**
   * Adds all sound assets from the specified bundle.
   * @param {string} bundleName
   * @param {AssetsManifest | string | undefined} manifest
   */
  public addAllFromBundle(bundleName: string, manifest?: AssetsManifest | string | undefined) {
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
      const ext = (src as string).split('.').pop();
      if (ext === 'mp3' || ext === 'ogg' || ext === 'wav' || ext === 'webm') {
        this.add(asset);
      }
    });
  }

  /**
   * Adds a sound asset to the AudioManager.
   * @param {UnresolvedAsset} soundAsset
   */
  public add(soundAsset: UnresolvedAsset): void {
    let alias = soundAsset.alias;
    if (!Array.isArray(soundAsset.alias)) {
      alias = [soundAsset.alias as string];
    }
    if (alias) {
      const obj: SoundSourceMap = {};
      (alias as string[]).forEach((a: string) => {
        if (a === undefined) {
          return;
        }
        // @ts-ignore
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
  public async play(soundId: string, channelName: ChannelName = 'sfx', options?: PlayOptions): Promise<IAudioInstance> {
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
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  /**
   * Stops a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @returns {IAudioInstance | undefined}
   */
  public stop(soundId: string, channelName: ChannelName = 'sfx'): IAudioInstance | undefined {
    Logger.log('stop', soundId, channelName);
    const channel = this._channels.get(channelName);
    if (channel) {
      return channel.remove(soundId);
    } else {
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
  public async fadeIn(
    soundId: string,
    channelName: ChannelName = 'music',
    props: gsap.TweenVars,
  ): Promise<gsap.core.Tween | null> {
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

  /**
   * Fades out a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {ChannelName} channelName
   * @param {Partial<gsap.TweenVars>} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  public async fadeOut(
    soundId: string,
    channelName: ChannelName = 'music',
    props: Partial<gsap.TweenVars> = { volume: 0 },
  ): Promise<gsap.core.Tween | null> {
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
  public async crossFade(
    outSoundId: string,
    inSoundId: string,
    channelName: ChannelName = 'music',
    duration: number = 2,
  ): Promise<gsap.core.Tween | null> {
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
  public async fade(
    soundId: string,
    channelName: ChannelName = 'music',
    props: gsap.TweenVars,
    stopOnComplete: boolean = false,
  ): Promise<gsap.core.Tween | null> {
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

  /**
   * Restores the audio state after it has been suspended.
   */
  public restore() {
    if (this._storedVolume !== undefined) {
      this.masterVolume = this._storedVolume;
    }
    this.muted = this._muted;
    this.resume();
  }

  /**
   * Suspends the audio by setting the master volume to 0 and pausing all sounds.
   */
  public suspend() {
    this._storedVolume = this._masterVolume;
    this.masterVolume = 0;
    this.pause();
  }

  /**
   * @private
   */
  private _setMuted(): void {
    this._channels.forEach((channel) => {
      channel.muted = this._muted;
    });
    if (this._muted) {
      sound.muteAll();
    } else {
      sound.unmuteAll();
    }
    this.onMuted.emit(this._muted);
  }

  /**
   * @private
   */
  private _setPaused(): void {
    if (this._paused) {
      sound.pauseAll();
    } else {
      sound.resumeAll();
    }
  }

  /**
   * Sets the volume of the specified channel.
   * @param {ChannelName} channelName
   * @param {number} volume
   * @private
   */
  private _setChannelVolume(channelName: ChannelName, volume: number): void {
    const channel = this._channels.get(channelName);
    if (channel) {
      channel.volume = volume;
    } else {
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
  private _soundStarted(id: string, instance: IAudioInstance, channelName: ChannelName): void {
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
  private _soundEnded(id: string, instance: IAudioInstance, channelName: ChannelName): void {
    // Logger.log(`${id} ended in ${channelName} channel`);
    this.onSoundEnded.emit({ id, instance, channelName });
  }
}