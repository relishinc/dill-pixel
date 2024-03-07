import { IAudioInstance } from './AudioInstance';
import { IAudioManager } from './AudioManager';

export interface IAudioChannel {
  name: string;
  muted: boolean;
  volume: number;

  add(id: string, instance: IAudioInstance): IAudioInstance;

  get(id: string): IAudioInstance | undefined;

  remove(id: string): IAudioInstance | undefined;

  updateVolume(): void;
}

export class AudioChannel {
  private _muted: boolean = false;
  private _volume: number = 1.0;
  private _sounds: Map<string, IAudioInstance> = new Map<string, IAudioInstance>();

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
