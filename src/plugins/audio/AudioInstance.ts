import { IMediaInstance } from '@pixi/sound';
import { gsap } from 'gsap';
import { Signal } from '../../signals';
import { IAudioChannel } from './AudioChannel';
import { IAudioManager } from './AudioManager';

export interface IAudioInstance {
  volume: number;
  media: IMediaInstance;
  channel: IAudioChannel;
  muted: boolean;
  id: string;
  manager: IAudioManager;
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
}

export class AudioInstance implements IAudioInstance {
  public onStart: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onStop: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onEnd: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onPaused: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  public onResumed: Signal<(instance: IAudioInstance) => void> = new Signal<(instance: IAudioInstance) => void>();
  private _media: IMediaInstance;
  private _volume: number = 1;
  private _muted: boolean = false;
  private _isPlaying: boolean = false;

  constructor(
    public id: string,
    public channel: IAudioChannel,
    public manager: IAudioManager,
  ) {
    this.muted = this.channel.muted;
  }

  get media(): IMediaInstance {
    return this._media;
  }

  set media(value: IMediaInstance) {
    this._media = value;
    if (value) {
      this.volume = this.media.volume;
      this.addListeners();
    }
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

  get isPlaying() {
    return this._isPlaying;
  }

  pause(): void {
    this._isPlaying = false;
    this.media.paused = true;
  }

  remove(): void {
    this.channel.remove(this.id);
  }

  stop() {
    if (this.media) {
      this.media.stop();
    }
  }

  updateVolume(): void {
    this.volume = this._volume;
  }

  addListeners() {
    this.removeListeners();
    this.media.on('start', this._handleStart);
    this.media.on('stop', this._handleStop);
    this.media.on('end', this._handleOnEnd);
    this.media.on('paused', this._handleOnPaused);
    this.media.on('resumed', this._handleOnResumed);
  }

  removeListeners() {
    if (!this.media) {
      return;
    }
    this.media.off('start', this._handleStart);
    this.media.off('stop', this._handleStop);
    this.media.off('end', this._handleOnEnd);
    this.media.off('paused', this._handleOnPaused);
    this.media.off('resumed', this._handleOnResumed);
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
    if (time === undefined) {
      this.media.play({});
    } else {
      this.media.play({ start: time });
    }
  }

  private _handleStart() {
    this._isPlaying = true;
    this.onStart.emit(this);
  }

  private _handleStop() {
    this._isPlaying = false;
    this.onStop.emit(this);
  }

  private _handleOnEnd() {
    this._isPlaying = false;
    this.onEnd.emit(this);
  }

  private _handleOnPaused() {
    this._isPlaying = false;
    this.onPaused.emit(this);
  }

  private _handleOnResumed() {
    this._isPlaying = true;
    this.onResumed.emit(this);
  }
}
