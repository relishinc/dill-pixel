import { IMediaInstance } from '@pixi/sound';
import { gsap } from 'gsap';
import { Signal } from '../../signals';
import { bindAllMethods } from '../../utils';
import { IAudioChannel } from './AudioChannel';
import { IAudioManagerPlugin } from './AudioManagerPlugin';

export interface IAudioInstance {
  volume: number;
  media: IMediaInstance;
  channel: IAudioChannel;
  muted: boolean;
  id: string;
  manager: IAudioManagerPlugin;
  onStart: Signal<(instance: IAudioInstance) => void>;
  onStop: Signal<(instance: IAudioInstance) => void>;
  onEnd: Signal<(instance: IAudioInstance) => void>;
  onPaused: Signal<(instance: IAudioInstance) => void>;
  onResumed: Signal<(instance: IAudioInstance) => void>;
  isPlaying: boolean;

  fadeTo(volume: number, duration: number): gsap.core.Tween;

  stop(): void;

  destroy(): void;

  remove(): void;

  updateVolume(): void;

  addListeners(): void;

  removeListeners(): void;

  pause(): void;

  play(): void;

  resume(): void;
}

export class AudioInstance implements IAudioInstance {
  public onStart: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onStop: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onEnd: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onPaused: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onResumed: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onProgress: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();

  constructor(
    public id: string,
    public channel: IAudioChannel,
    public manager: IAudioManagerPlugin,
  ) {
    bindAllMethods(this);
    this.muted = this.channel.muted;
  }

  private _media: IMediaInstance;

  get media(): IMediaInstance {
    return this._media;
  }

  set media(value: IMediaInstance) {
    this._media = value;
    if (value) {
      this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume;
      if (this.muted) {
        this._media.muted = this.muted;
      }
      this.addListeners();
    }
  }

  private _volume: number = 1;

  public get volume(): number {
    return this._volume;
  }

  public set volume(value: number) {
    this._volume = value;
    if (this._media) {
      this._media.volume = this._volume * this.channel.volume * this.manager.masterVolume;
    }
  }

  private _muted: boolean = false;

  get muted(): boolean {
    return this._muted;
  }

  set muted(value: boolean) {
    this._muted = value;
    if (this._media) {
      this._media.muted = this._muted;
    }
  }

  private _isPlaying: boolean = false;

  get isPlaying() {
    return this._isPlaying;
  }

  pause(): void {
    this._isPlaying = false;
    if (this._media) {
      this._media.paused = true;
    }
  }

  resume(): void {
    this._isPlaying = true;
    if (this._media) {
      this._media.paused = false;
    }
  }

  remove(): void {
    this.channel.remove(this.id);
  }

  stop() {
    if (this._media) {
      this._media.stop();
    }
    this.onEnd.emit(this);
  }

  updateVolume(): void {
    this.volume = this._volume;
  }

  addListeners() {
    this.removeListeners();
    this._media.on('end', this._handleMediaEnded);
    this._media.on('start', this._handleMediaStarted);
    this._media.on('stop', this._handleMediaStopped);
    this._media.on('pause', this._handleMediaPaused);
    this._media.on('progress', this._handleMediaProgress);
    this._media.on('resumed', this._handleMediaResumed);
  }

  removeListeners() {
    if (!this.media) {
      return;
    }

    this._media.off('end', this._handleMediaEnded);
    this._media.off('start', this._handleMediaStarted);
    this._media.off('stop', this._handleMediaStopped);
    this._media.off('pause', this._handleMediaPaused);
    this._media.off('progress', this._handleMediaProgress);
    this._media.off('resumed', this._handleMediaResumed);
  }

  destroy() {
    this.stop();
    this.removeListeners();
  }

  public fadeTo(volume: number, duration: number): gsap.core.Tween {
    return gsap.to(this.media, { volume, duration });
  }

  public play(time?: number): void {
    this._isPlaying = true;
    if (time) {
      this.media.play({ start: time });
    } else {
      this.media.play({});
    }
  }

  private _handleMediaEnded() {
    this.onEnd.emit(this);
  }

  private _handleMediaStarted() {
    this.onStart.emit(this);
  }

  private _handleMediaStopped() {
    this.onStop.emit(this);
  }

  private _handleMediaPaused() {
    this.onPaused.emit(this);
  }

  private _handleMediaProgress() {
    this.onProgress.emit(this);
  }

  private _handleMediaResumed() {
    this.onResumed.emit(this);
  }
}
