import { IAudioInstance } from './AudioInstance';
import { IAudioManagerPlugin } from './AudioManagerPlugin';

export interface IAudioChannel {
  name: string;
  muted: boolean;
  volume: number;
  instances: IAudioInstance[];

  add(id: string, instance: IAudioInstance): IAudioInstance;

  get(id: string): IAudioInstance | undefined;

  remove(id: string): IAudioInstance | undefined;

  updateVolume(): void;

  destroy(): void;
}

export class AudioChannel {
  private _sounds: Map<string, IAudioInstance> = new Map<string, IAudioInstance>();

  constructor(
    public name: string,
    public manager: IAudioManagerPlugin,
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

  destroy() {}
}
