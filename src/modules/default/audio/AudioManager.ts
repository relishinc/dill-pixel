import { IMediaInstance, PlayOptions, sound, soundAsset, SoundSourceMap } from '@pixi/sound';
import { gsap } from 'gsap';
import { AssetsManifest, extensions, UnresolvedAsset } from 'pixi.js';
import { IApplication } from '../../../core';
import { CoreModule } from '../../../core/decorators';
import { Signal } from '../../../signals';
import { Logger } from '../../../utils';
import { IModule, Module } from '../../Module';

extensions.add(soundAsset);

export interface IAudioInstance {
  volume: number;
  media: IMediaInstance;
  channel: IAudioChannel;
  muted: boolean;

  updateVolume(): void;
}

class AudioInstance implements IAudioInstance {
  private _volume: number = 1;
  private _muted: boolean = false;

  constructor(
    public id: string,
    public media: IMediaInstance,
    public channel: IAudioChannel,
    public manager: IAudioManager,
  ) {
    this.volume = this.media.volume;
    this.muted = this.channel.muted;
  }

  get muted(): boolean {
    return this._muted;
  }

  set muted(value: boolean) {
    this._muted = value;
    this.media.muted = this._muted;
  }

  public get volume(): number {
    return this._volume;
  }

  public set volume(value: number) {
    this._volume = value;
    this.media.volume = this._volume * this.channel.volume * this.manager.masterVolume;
  }

  updateVolume(): void {
    this.volume = this._volume;
  }
}

export interface IAudioChannel {
  name: string;
  muted: boolean;
  volume: number;

  add(id: string, instance: AudioInstance): IAudioInstance;

  get(id: string): IAudioInstance | undefined;

  remove(id: string): IAudioInstance | undefined;

  updateVolume(): void;
}

class AudioChannel {
  private _muted: boolean = false;
  private _volume: number = 1.0;
  private _sounds: Map<string, AudioInstance> = new Map<string, AudioInstance>();

  constructor(
    public name: string,
    public manager: IAudioManager,
  ) {
    this.muted = this.manager.muted;
  }

  get muted(): boolean {
    return this._muted;
  }

  set muted(value: boolean) {
    this._muted = value;
    this._setMuted();
  }

  get volume(): number {
    return this._volume;
  }

  set volume(value: number) {
    this._volume = value;
    this.updateVolume();
  }

  add(id: string, instance: AudioInstance): IAudioInstance {
    this._sounds.set(id, instance);
    return instance;
  }

  get(id: string): IAudioInstance | undefined {
    return this._sounds.get(id);
  }

  remove(id: string): IAudioInstance | undefined {
    const instance = this._sounds.get(id);
    if (instance) {
      instance.media.stop();
      this._sounds.delete(id);
    }
    return instance;
  }

  _setMuted(): void {
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
}

type SoundDetail = { id: string; instance: IAudioInstance; channelName: string };
type ChannelVolumeDetail = { channel: IAudioChannel; volume: number };

type ChannelName = 'music' | 'sfx' | 'voiceover' | string;

export interface IAudioManager extends IModule {
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
}

@CoreModule
export class AudioManager extends Module implements IAudioManager {
  // signals
  public onSoundStarted = new Signal<(detail: SoundDetail) => void>();
  public onSoundEnded = new Signal<(detail: SoundDetail) => void>();
  public onMuted: Signal<(muted: boolean) => void> = new Signal<(muted: boolean) => void>();
  public onMasterVolumeChanged = new Signal<(volume: number) => void>();
  public onChannelVolumeChanged = new Signal<(detail: ChannelVolumeDetail) => void>();

  private _masterVolume: number = 1;
  private _muted: boolean = false;
  private _paused: boolean = false;
  private _channels: Map<string, IAudioChannel> = new Map();

  public constructor(id: string = 'AudioManager') {
    super(id);
    this.createChannel('music');
    this.createChannel('sfx');
    this.createChannel('voiceover');
  }

  get masterVolume(): number {
    return this._masterVolume;
  }

  set masterVolume(value: number) {
    this._masterVolume = value;
    this._channels.forEach((channel) => channel.updateVolume());
  }

  get channels(): Map<string, IAudioChannel> {
    return this._channels;
  }

  get muted(): boolean {
    return this._muted;
  }

  set muted(value: boolean) {
    this._muted = value;
    this._setMuted();
  }

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    Logger.log('AudioManager initialized', app);
    if (typeof app?.manifest === 'object') {
      this.addAllFromManifest(app.manifest);
    }
    return Promise.resolve(undefined);
  }

  public createChannel(name: string): void {
    if (this._channels.has(name)) {
      throw new Error(`Channel with name ${name} already exists.`);
    }
    const channel = new AudioChannel(name, this);
    this._channels.set(name, channel);
  }

  public setChannelVolume(channelName: ChannelName | ChannelName[], volume: number): void {
    if (!Array.isArray(channelName)) {
      channelName = [channelName];
    }
    channelName.forEach((name) => this._setChannelVolume(name, volume));
  }

  public getChannel(name: ChannelName): IAudioChannel | undefined {
    return this._channels.get(name);
  }

  public mute() {
    this._muted = true;
    this._setMuted();
  }

  public unmute() {
    this._muted = false;
    this._setMuted();
  }

  public pause(): void {
    this._paused = true;
    this._setPaused();
  }

  public resume(): void {
    this._paused = false;
    this._setPaused();
  }

  public addAllFromManifest(manifest: AssetsManifest) {
    manifest.bundles.forEach((bundle) => {
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
        if (ext === 'mp3' || ext === 'ogg' || ext === 'wav') {
          this.add(asset);
        }
      });
    });
  }

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

  public stop(soundId: string, channelName: ChannelName = 'sfx'): IAudioInstance | undefined {
    Logger.log('stop', soundId, channelName);
    const channel = this._channels.get(channelName);
    if (channel) {
      return channel.remove(soundId);
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

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

  public async crossFade(
    outSoundId: string,
    inSoundId: string,
    channelName: ChannelName = 'music',
    duration: number = 2,
  ): Promise<gsap.core.Tween | null> {
    const crossfadeProps = { duration, ease: 'linear.easeNone' };
    void this.fadeOut(outSoundId, channelName, crossfadeProps);
    return this.fadeIn(inSoundId, channelName, crossfadeProps);
  }

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

  private _setMuted(): void {
    this._channels.forEach((channel) => {
      channel.muted = this._muted;
    });
    this.onMuted.emit(this._muted);
  }

  private _setPaused(): void {
    if (this._paused) {
      sound.pauseAll();
    } else {
      sound.resumeAll();
    }
  }

  private _setChannelVolume(channelName: ChannelName, volume: number): void {
    const channel = this._channels.get(channelName);
    if (channel) {
      channel.volume = volume;
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  private _soundStarted(id: string, instance: IAudioInstance, channelName: ChannelName): void {
    // Logger.log(`${id} started in ${channelName} channel`);
    this.onSoundStarted.emit({ id, instance, channelName });
  }

  private _soundEnded(id: string, instance: IAudioInstance, channelName: ChannelName): void {
    // Logger.log(`${id} ended in ${channelName} channel`);
    this.onSoundEnded.emit({ id, instance, channelName });
  }
}
