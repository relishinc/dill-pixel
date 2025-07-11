import { Options, PlayOptions, Sound, sound, SoundMap, SoundSourceMap } from '@pixi/sound';
import { gsap } from 'gsap';
import { Assets, AssetsManifest, UnresolvedAsset } from 'pixi.js';
import { Signal } from '../../signals';
import { AudioAsset, Logger } from '../../utils';
import type { IPlugin } from '../Plugin';
import { Plugin } from '../Plugin';

import { IApplication } from '../../core';
import { AudioChannel, IAudioChannel } from './AudioChannel';
import { AudioInstance, IAudioInstance } from './AudioInstance';
import TweenVars = gsap.TweenVars;

export type SoundDetail = { id: string; instance: IAudioInstance; channelName: string };
export type ChannelVolumeDetail = { channel: IAudioChannel; volume: number };
export type ChannelMutedDetail = { channel: IAudioChannel; muted: boolean };
export type ChannelName = 'music' | 'sfx' | 'voiceover' | (string & {});

// patch sound.add to fix console.assert error
sound.add = function (
  source: string | SoundSourceMap,
  sourceOptions?: Options | string | ArrayBuffer | AudioBuffer | HTMLAudioElement | Sound,
): any {
  if (typeof source === 'object') {
    const results: SoundMap = {};

    for (const alias in source) {
      // @ts-expect-error _getOptions is private
      const options: Options = this._getOptions(source[alias], sourceOptions as Options);

      results[alias] = this.add(alias, options);
    }

    return results;
  }

  // eslint-disable-next-line no-console

  if (sourceOptions instanceof Sound) {
    // @ts-expect-error _sounds is private
    this._sounds[source] = sourceOptions;

    return sourceOptions;
  }
  // @ts-expect-error _getOptions is private
  const options: Options = this._getOptions(sourceOptions);
  const sound: Sound = Sound.from(options);
  // @ts-expect-error _sounds is private
  this._sounds[source] = sound;

  return sound;
};

export interface IAudioManagerPlugin<C extends ChannelName = ChannelName> extends IPlugin {
  onSoundStarted: Signal<(detail: SoundDetail) => void>;
  onSoundEnded: Signal<(detail: SoundDetail) => void>;
  onMasterVolumeChanged: Signal<(volume: number) => void>;
  onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
  onMuted: Signal<(muted: boolean) => void>;
  onChannelMuted: Signal<(detail: ChannelMutedDetail) => void>;

  masterVolume: number;
  muted: boolean;
  channels: Map<string, IAudioChannel>;
  music: IAudioChannel;
  sfx: IAudioChannel;
  voiceover: IAudioChannel;
  vo: IAudioChannel;

  readonly paused: boolean;

  createChannel(name: string): void;

  play(soundId: AudioAsset, channelName: C, options?: PlayOptions): Promise<IAudioInstance>;

  isPlaying(soundId: AudioAsset, channelName: C): boolean;

  load(soundId: AudioAsset | AudioAsset[], channelName: C, options?: PlayOptions): void;

  stop(soundId: AudioAsset, channelName: C): IAudioInstance | undefined;

  setChannelVolume(channelName: C | C[], volume: number): void;

  getChannel(name: C): IAudioChannel | undefined;

  addAllFromManifest(manifest: AssetsManifest): void;

  addAllFromBundle(bundleName: string, manifest?: AssetsManifest | string | undefined): void;

  add(soundAsset: UnresolvedAsset): void;

  fade(soundId: AudioAsset, channelName: C, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;

  fadeIn(soundId: AudioAsset, channelName: C, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;

  fadeOut(soundId: AudioAsset, channelName: C, props?: gsap.TweenVars): Promise<gsap.core.Tween | null>;

  crossFade(
    outSoundId: AudioAsset,
    inSoundId: AudioAsset,
    channelName: C,
    duration?: number,
  ): Promise<gsap.core.Tween | null>;

  mute(): void;

  unmute(): void;

  pause(): void;

  resume(): void;

  suspend(): void;

  restore(): Promise<void>;

  getAudioInstance(soundId: AudioAsset, channelName: C): IAudioInstance | undefined;

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
export class AudioManagerPlugin<C extends ChannelName = ChannelName> extends Plugin implements IAudioManagerPlugin<C> {
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
  /**
   * Signal that is emitted when a channel is muted or unmuted.
   * The callback function receives a ChannelMutedDetail object.
   */
  public onChannelMuted: Signal<(detail: ChannelMutedDetail) => void> = new Signal<
    (detail: ChannelMutedDetail) => void
  >();

  private _storedVolume: number | undefined = undefined;
  private _paused: boolean = false;
  private _idMap: Map<string, string> = new Map();

  /**
   * Creates a new AudioManager instance.
   * @param {string} id - The ID of the AudioManager. Default is 'AudioManager'.
   */
  public constructor(id: string = 'audio') {
    super(id);

    this.createChannel('music');
    this.createChannel('sfx');
    this.createChannel('voiceover');
  }

  private _masterVolume: number = 1;

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

  private _muted: boolean = false;

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

  private _channels: Map<C, IAudioChannel> = new Map();

  /**
   * Gets the map of audio channels.
   * @returns {Map<string, IAudioChannel>} The map of audio channels.
   */
  get channels(): Map<string, IAudioChannel> {
    return this._channels;
  }

  get music(): IAudioChannel {
    return this._channels.get('music' as C)!;
  }

  get sfx(): IAudioChannel {
    return this._channels.get('sfx' as C)!;
  }

  get voiceover(): IAudioChannel {
    return this._channels.get('voiceover' as C)!;
  }

  get vo(): IAudioChannel {
    return this._channels.get('voiceover' as C)!;
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
  public initialize(_options: any, app: IApplication): Promise<void> {
    sound.disableAutoPause = true;
    // TODO: investigate why this causes a console.assert error during load because audio files are already added.
    if (typeof app?.manifest === 'object') {
      this.addAllFromManifest(app.manifest);
    }
    return Promise.resolve();
  }

  /**
   * Creates a new audio channel.
   * @param {string} name
   */
  public createChannel(name: string): void {
    if (this._channels.has(name as C)) {
      throw new Error(`Channel with name ${name} already exists.`);
    }
    const channel = new AudioChannel<C>(name as C, this);
    this._channels.set(name as C, channel);
  }

  /**
   * Sets the volume of the specified channel.
   * @param {ChannelName|ChannelName[]} channelName
   * @param {number} volume
   */
  public setChannelVolume(channelName: C | C[], volume: number): void {
    if (!Array.isArray(channelName)) {
      channelName = [channelName];
    }
    channelName.forEach((name) => this._setChannelVolume(name as C, volume));
  }

  /**
   * Gets the audio channel with the specified name.
   * @param {C} name
   * @returns {IAudioChannel | undefined}
   */
  public getChannel(name: C): IAudioChannel | undefined {
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

  get paused(): boolean {
    return this._paused;
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

  private _addPrefix(asset: UnresolvedAsset): void {
    const prefix = Assets.resolver.basePath.replace('./', '');
    if (Array.isArray(asset.src)) {
      const mappedSrc = asset.src.map((s) => {
        return (s as string).startsWith(prefix) ? s : `${prefix}/${s}`;
      });
      asset.src = mappedSrc;
    } else {
      asset.src = asset.src?.startsWith(prefix) ? asset.src : `${prefix}/${asset.src}`;
    }
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
      this._addPrefix(asset);
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
        if (a === undefined || sound.exists(a)) {
          return;
        }
        // @ts-expect-error soundAsset is not a string error
        obj[a] = soundAsset.src;
      });
      sound.add(obj);
    }
  }

  isPlaying(soundId: string, channelName: C): boolean {
    const channel = this._channels.get(channelName);
    if (channel) {
      return channel.get(soundId)?.isPlaying === true;
    }
    return false;
  }

  /**
   * Plays a sound with the specified ID in the specified channel.
   * @param {string} soundId
   * @param {C} channelName
   * @param {PlayOptions} options
   * @returns {Promise<IAudioInstance>}
   */
  public async play(soundId: AudioAsset, channelName: C = 'sfx' as C, options?: PlayOptions): Promise<IAudioInstance> {
    if (this._idMap.has(soundId)) {
      soundId = this._idMap.get(soundId) as string;
    }
    const channel = this._channels.get(channelName);
    if (channel) {
      soundId = this._verifySoundId(soundId);
      const audioInstance = channel.add(
        soundId,
        new AudioInstance<C>(soundId, channel, this as IAudioManagerPlugin<C>),
      );
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
      audioInstance.isPlaying = true;
      return audioInstance;
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  /**
   * Stops a sound with the specified ID in the specified channel.
   * @param {AudioAsset} soundId
   * @param {C} channelName
   * @returns {IAudioInstance | undefined}
   */
  public stop(soundId: AudioAsset, channelName: C = 'sfx' as C): IAudioInstance | undefined {
    const channel = this._channels.get(channelName);
    if (channel) {
      return channel.remove(soundId);
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  /**
   * Fades in a sound with the specified ID in the specified channel.
   * @param {AudioAsset} soundId
   * @param {C} channelName
   * @param {gsap.TweenVars} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  public async fadeIn(
    soundId: AudioAsset,
    channelName: C = 'music' as C,
    props: gsap.TweenVars,
  ): Promise<gsap.core.Tween | null> {
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
   * @param {AudioAsset} soundId
   * @param {C} channelName
   * @param {Partial<gsap.TweenVars>} props
   * @returns {Promise<gsap.core.Tween | null>}
   */
  public async fadeOut(
    soundId: AudioAsset,
    channelName: C = 'music' as C,
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
   * @param {AudioAsset} outSoundId
   * @param {AudioAsset} inSoundId
   * @param {ChannelName} channelName
   * @param {number} duration
   * @returns {Promise<gsap.core.Tween | null>}
   */
  public async crossFade(
    outSoundId: AudioAsset,
    inSoundId: AudioAsset,
    channelName: ChannelName = 'music',
    duration: number = 2,
  ): Promise<gsap.core.Tween | null> {
    const crossFadeProps = { duration, ease: 'linear.easeNone' };
    void this.fadeOut(outSoundId, channelName as C, crossFadeProps);
    return this.fadeIn(inSoundId, channelName as C, crossFadeProps);
  }

  /**
   * Fades a sound with the specified ID in the specified channel.
   * @param {AudioAsset} soundId
   * @param {ChannelName} channelName
   * @param {gsap.TweenVars} props
   * @param {boolean} stopOnComplete
   * @returns {Promise<gsap.core.Tween | null>}
   */
  public async fade(
    soundId: AudioAsset,
    channelName: ChannelName = 'music',
    props: gsap.TweenVars,
    stopOnComplete: boolean = false,
  ): Promise<gsap.core.Tween | null> {
    const channel = this._channels.get(channelName as C);
    if (channel) {
      soundId = this._verifySoundId(soundId);
    }
    const soundInstance = channel?.get(soundId);
    if (soundInstance) {
      const tween = gsap.to(soundInstance, props);
      tween.eventCallback('onComplete', () => {
        if (stopOnComplete) {
          this.stop(soundId, channelName as C);
        }
      });
      return tween;
    }
    return null;
  }

  /**
   * Restores the audio state after it has been suspended.
   */
  public async restore() {
    const ctx = sound?.context?.audioContext;
    if (ctx) {
      await ctx.resume();
    }
    this.resume();
    if (this._storedVolume !== undefined) {
      this.masterVolume = this._storedVolume;
    }
    this._channels.forEach((channel) => {
      channel.restore();
    });
    this.muted = this._muted;
  }

  /**
   * Suspends the audio by setting the master volume to 0 and pausing all sounds.
   */
  public suspend() {
    this._storedVolume = this._masterVolume;
    this.masterVolume = 0;
    this.pause();
  }

  public getAudioInstance(soundId: AudioAsset, channelName: C = 'sfx' as C): IAudioInstance | undefined {
    const channel = this._channels.get(channelName);
    soundId = this._verifySoundId(soundId);
    if (channel) {
      return channel.get(soundId);
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  public load(soundId: AudioAsset | AudioAsset[], channelName: C = 'sfx' as C, options?: PlayOptions): void {
    if (!Array.isArray(soundId)) {
      soundId = [soundId];
    }
    for (let id of soundId) {
      if (this._idMap.has(id)) {
        soundId = this._idMap.get(id) as string;
      }
      const channel = this._channels.get(channelName);
      if (channel) {
        id = this._verifySoundId(id);
        // const audioInstance = new AudioInstance(id, channel, this);
        const soundInstance = sound.find(id);
        soundInstance.options = { ...options, autoPlay: false };
        const audioInstance = channel.add(id, new AudioInstance<C>(id, channel, this as IAudioManagerPlugin<C>));
        audioInstance.media = soundInstance.instances[0];
        audioInstance.pause();
      } else {
        throw new Error(`Channel ${channelName} does not exist.`);
      }
    }
  }

  public stopAll(fade: boolean = false, duration: number = 1, props: TweenVars = {}) {
    if (fade) {
      // get all playing sounds
      const playingSounds: IAudioInstance[] = [];
      this._channels.forEach((channel) => {
        channel.instances.forEach((instance) => {
          if (instance.isPlaying) {
            instance.storedVolume = instance.volume;
            playingSounds.push(instance);
          }
        });
      });
      if (playingSounds.length > 0) {
        gsap.to(playingSounds, {
          volume: 0,
          duration,
          ...props,
          onComplete: () => {
            playingSounds.forEach((instance) => {
              instance.stop();
              instance.volume = instance.storedVolume;
            });
          },
        });
      }
    } else {
      sound.stopAll();
    }
  }

  protected getCoreSignals(): string[] {
    return [
      'onSoundStarted',
      'onSoundEnded',
      'onMuted',
      'onMasterVolumeChanged',
      'onChannelVolumeChanged',
      'onChannelMuted',
    ];
  }

  private _verifySoundId(soundId: AudioAsset): string {
    const originalSoundId = soundId;
    if (this._idMap.has(soundId)) {
      return this._idMap.get(soundId) as string;
    }
    // try appending .mp3 or .ogg
    if (!sound.exists(soundId)) {
      // Logger.log(`Sound with ID ${soundId} does not exist. Trying different extensions.`);
      if (sound.exists(soundId + '.mp3')) {
        soundId += '.mp3';
      } else if (sound.exists(soundId + '.ogg')) {
        soundId += '.ogg';
      } else if (sound.exists(soundId + '.wav')) {
        soundId += '.wav';
      } else {
        soundId = originalSoundId;
        let sound = Assets.get(soundId);
        if (!sound) {
          soundId = originalSoundId + '.mp3';
          sound = Assets.get(soundId);
        }
        if (!sound) {
          soundId = originalSoundId + '.ogg';
          sound = Assets.get(soundId);
        }
        if (!sound) {
          soundId = originalSoundId + '.wav';
          sound = Assets.get(soundId);
        }
        if (sound) {
          this._findAndAddFromManifest(soundId, sound);
        } else {
          throw new Error(`Sound with ID ${soundId} does not exist.`);
        }
      }
    }
    this._idMap.set(soundId, soundId);
    return soundId;
  }

  private _findAndAddFromManifest(soundId: AudioAsset, sound: Sound) {
    const manifest = this.app.manifest;
    if (manifest === undefined || typeof manifest === 'string') {
      throw new Error('Manifest is not available');
    }
    for (let i = 0; i < manifest.bundles.length; i++) {
      const bundle = manifest.bundles[i];
      if (!Array.isArray(bundle?.assets)) {
        bundle.assets = [bundle.assets];
      }
      for (let j = 0; j < bundle.assets.length; j++) {
        const asset = bundle.assets[j];
        this._addPrefix(asset);
        // detect sound assets by asset.src extension
        const src = asset.src;
        const filename = sound.url.split('/').pop() ?? '';
        if (Array.isArray(src)) {
          for (let s = 0; s < src.length; s++) {
            const urlOrResolvedSrc = src[s];
            let url: string;
            if (typeof urlOrResolvedSrc !== 'string') {
              url = urlOrResolvedSrc.src!;
            } else {
              url = urlOrResolvedSrc as string;
            }
            if (url.includes(filename)) {
              this.add(asset);
              return;
            }
          }
        } else {
          if (src?.includes(filename)) {
            this.add(asset);
            return;
          }
        }
      }
    }
  }

  /**
   * @private
   */
  private _setMuted(): void {
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
   * @param {C} channelName
   * @param {number} volume
   * @private
   */
  private _setChannelVolume(channelName: C, volume: number): void {
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
   * @param {C} channelName
   * @private
   */
  private _soundStarted(id: string, instance: IAudioInstance, channelName: C): void {
    // Logger.log(`${id} started in ${channelName} channel`);
    this.onSoundStarted.emit({ id, instance, channelName });
  }

  /**
   * Sound ended event handler. Emit the onSoundEnded signal.
   * @param {string} id
   * @param {IAudioInstance} instance
   * @param {C} channelName
   * @private
   */
  private _soundEnded(id: string, instance: IAudioInstance, channelName: C): void {
    // Logger.log(`${id} ended in ${channelName} channel`);
    this.onSoundEnded.emit({ id, instance, channelName });
  }
}
