import { Logger } from '../../utils';
import { IAudioInstance } from './AudioInstance';
import { ChannelName, IAudioManagerPlugin } from './AudioManagerPlugin';

export interface IAudioChannel {
  name: string;
  muted: boolean;
  volume: number;
  instances: IAudioInstance[];

  add(id: string, instance: IAudioInstance): IAudioInstance;

  get(id: string): IAudioInstance | undefined;

  remove(id: string): IAudioInstance | undefined;

  updateVolume(): void;

  restore(): void;

  destroy(): void;

  pause(): void;

  resume(): void;
}

export class AudioChannel<C extends ChannelName = ChannelName> {
  private _sounds: Map<string, IAudioInstance> = new Map<string, IAudioInstance>();

  constructor(
    public name: C,
    public manager: IAudioManagerPlugin<C>,
  ) {
    this.muted = this.manager.muted;
  }

  get instances(): IAudioInstance[] {
    return Array.from(this._sounds.values());
  }

  private _muted: boolean = false;

  get muted(): boolean {
    return this._muted;
  }

  set muted(value: boolean) {
    this._muted = value;
    this._setMuted();
  }

  private _volume: number = 1.0;

  get volume(): number {
    return this._volume;
  }

  set volume(value: number) {
    this._volume = value;
    this.updateVolume();
  }

  add(id: string, instance: IAudioInstance): IAudioInstance {
    this._sounds.set(id, instance);
    return instance;
  }

  get(id: string): IAudioInstance | undefined {
    return this._sounds.get(id);
  }

  remove(id: string): IAudioInstance | undefined {
    const instance = this._sounds.get(id);
    if (instance) {
      instance.destroy();
      this._sounds.delete(id);
    }
    return instance;
  }

  pause(): void {
    this._sounds.forEach((sound) => {
      try {
        sound.pause();
      } catch (error) {
        Logger.error('Error pausing sound', sound.id, error);
      }
    });
  }

  resume(): void {
    this._sounds.forEach((sound) => {
      try {
        sound.resume();
      } catch (error) {
        Logger.error('Error resuming sound', sound.id, error);
      }
    });
  }

  _setMuted(): void {
    this._sounds.forEach((sound) => {
      sound.muted = this._muted;
    });
  }

  updateVolume() {
    this.manager.app.ticker.addOnce(() => {
      this._sounds.forEach((sound) => {
        sound.updateVolume();
      });
      this.manager.onChannelVolumeChanged.emit({ channel: this, volume: this._volume });
    });
  }

  restore() {
    this.muted = this._muted;
    this.volume = this._volume;
  }

  destroy() {}
}
