import { IMediaInstance } from '@pixi/sound';
import { IAudioChannel } from './AudioChannel';
import { IAudioManager } from './AudioManager';

export interface IAudioInstance {
  volume: number;
  media: IMediaInstance;
  channel: IAudioChannel;
  muted: boolean;

  updateVolume(): void;
}

export class AudioInstance implements IAudioInstance {
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
