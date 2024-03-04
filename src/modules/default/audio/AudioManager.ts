import { IMediaInstance, PlayOptions, sound, Sound, soundAsset, SoundSourceMap } from '@pixi/sound';
import { AssetsManifest, extensions, UnresolvedAsset } from 'pixi.js';
import { IApplication } from '../../../core';
import { CoreModule } from '../../../core/decorators';
import { Signal } from '../../../signals';
import { Logger } from '../../../utils';
import { IModule, Module } from '../../Module';

extensions.add(soundAsset);

class AudioChannel {
  public volume: number = 1.0;
  public muted: boolean = false;
  private _sounds: Map<string, Sound> = new Map<string, Sound>();

  constructor(public name: string) {}

  add(id: string, instance: Sound): void {
    instance.volume = this.volume;
    this._sounds.set(id, instance);
  }

  remove(id: string): Sound | undefined {
    const instance = this._sounds.get(id);
    if (instance) {
      instance.stop();
      sound.remove(id);
      this._sounds.delete(id);
    }
    return instance;
  }

  setVolume(volume: number): void {
    this.volume = volume;
    this._sounds.forEach((sound) => (sound.volume = this.volume));
  }

  mute(muted: boolean): void {
    this.muted = muted;
    this._sounds.forEach((sound) => (sound.muted = this.muted));
  }
}

type SoundDetail = { id: string; instance: IMediaInstance; channelName: string };

type ChannelName = 'music' | 'sfx' | 'voiceover' | string;

export interface IAudioManager extends IModule {
  onSoundStarted: Signal<(detail: SoundDetail) => void>;
  onSoundEnded: Signal<(detail: SoundDetail) => void>;

  createChannel(name: string): void;

  play(soundId: string, channelName: ChannelName, options?: PlayOptions): Promise<IMediaInstance>;

  stop(soundId: string, channelName: ChannelName): Sound | undefined;

  setVolume(channelName: ChannelName | ChannelName[], volume: number): void;

  addAllFromManifest(manifest: AssetsManifest): void;

  add(soundAsset: UnresolvedAsset): void;

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

  private _muted: boolean = false;
  private _paused: boolean = false;
  private _channels: Map<string, AudioChannel> = new Map();

  public constructor(id: string = 'AudioManager') {
    super(id);
    this.createChannel('music');
    this.createChannel('sfx');
    this.createChannel('voiceover');
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
    const channel = new AudioChannel(name);
    this._channels.set(name, channel);
  }

  public setVolume(channelName: ChannelName | ChannelName[], volume: number): void {
    if (!Array.isArray(channelName)) {
      channelName = [channelName];
    }
    channelName.forEach((name) => this._setVolume(name, volume));
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
        console.log(a);
        if (a === undefined) {
          return;
        }
        // @ts-ignore
        obj[a] = soundAsset.src;
      });
      console.log(obj);
      sound.add(obj);
    }
  }

  public async play(soundId: string, channelName: ChannelName = 'sfx', options?: PlayOptions): Promise<IMediaInstance> {
    const createdSound = Sound.from(soundId);
    const channel = this._channels.get(channelName);
    Logger.log('play', soundId, channelName, options);
    if (channel) {
      channel.add(soundId, createdSound);
      const instance = await sound.play(soundId, options);
      instance.on('start', () => this._soundStarted(soundId, instance, channelName));
      instance.on('end', () => this._soundEnded(soundId, instance, channelName));
      return instance;
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  public stop(soundId: string, channelName: ChannelName = 'sfx'): Sound | undefined {
    const channel = this._channels.get(channelName);
    if (channel) {
      return channel.remove(soundId);
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  private _setMuted(): void {
    this._channels.forEach((channel) => channel.mute(this._muted));
  }

  private _setPaused(): void {
    if (this._paused) {
      sound.pauseAll();
    } else {
      sound.resumeAll();
    }
  }

  private _setVolume(channelName: ChannelName, volume: number): void {
    const channel = this._channels.get(channelName);
    if (channel) {
      channel.setVolume(volume);
    } else {
      throw new Error(`Channel ${channelName} does not exist.`);
    }
  }

  private _soundStarted(id: string, instance: IMediaInstance, channelName: ChannelName): void {
    console.log(`${id} started in ${channelName} channel`);
    this.onSoundStarted.emit({ id, instance, channelName });
  }

  private _soundEnded(id: string, instance: IMediaInstance, channelName: ChannelName): void {
    console.log(`${id} ended in ${channelName} channel`);
    this.onSoundEnded.emit({ id, instance, channelName });
  }
}
