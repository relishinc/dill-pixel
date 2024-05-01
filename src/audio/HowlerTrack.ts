import { Howl } from 'howler';
import { Assets } from 'pixi.js';
import { audioLoadError } from '../functions/audio';
import { WithRequiredProps } from '../utils/Types';
import * as HowlerUtils from './HowlerUtils';
import { IAudioManager } from './IAudioManager';
import { IAudioTrack } from './IAudioTrack';

export type AudioTrackConfig = {
  id: string;
  category: string;
  volume?: number;
  loop?: boolean;
};

export type RequiredAudioTrackConfig = WithRequiredProps<AudioTrackConfig, 'id'>;

export class HowlerTrack implements IAudioTrack {
  /** Howler will attempt to load audio files with these extensions, in this order.
   * @default ["webm", "mp3", "ogg", "m4a"]
   */
  public static FILE_EXTENSIONS = ['webm', 'mp3', 'ogg', 'm4a'];

  private _id: string;
  private _source!: Howl;
  private _volume: number = 1;
  private _category: string;
  private _audioManager: IAudioManager;
  private _urls: string[];

  private static getDefaultUrls(_id: string): string[] {
    return HowlerTrack.FILE_EXTENSIONS.map((ext) => AssetUtils.FILEPATH_AUDIO + _id + '.' + ext);
  }

  constructor(
    trackId: string,
    category: string,
    audioManager: IAudioManager,
    volume: number = 1,
    loop: boolean = false,
  ) {
    this._id = trackId;
    this._audioManager = audioManager;
    this._category = category;

    if (Assets.resolver.basePath) {
      this._urls = HowlerTrack.getDefaultUrls(this._id).map((url) => Assets.resolver.basePath + '/' + url);
    } else {
      this._urls = HowlerTrack.getDefaultUrls(this._id);
    }

    this.loadSource();

    this.setVolume(volume);
    this.setLooped(loop);
  }

  public get id() {
    return this._id;
  }

  public play(): void {
    if (this._source.state() === HowlerUtils.State.UNLOADED) {
      console.error(this._id + ' source Howl is not loaded. Call loadSource() before playing.');
      return;
    }
    this._source.play();
  }

  public pause(): void {
    this._source.pause();
  }

  public stop(): void {
    this._source.stop();
  }

  public fadeTo(volume: number, milliseconds: number): void {
    const newVol: number =
      volume * this._audioManager.masterVolume * this._audioManager.getCategoryVolume(this._category);
    this._source.fade(this._source.volume(), newVol, milliseconds);
  }

  public unloadSource(): void {
    this._source.unload();
  }

  public loadSource(): void {
    if (this._source === undefined) {
      this._source = new Howl({
        preload: true,
        src: this._urls,
        onloaderror: this.onLoadError.bind(this),
      });
    }
    // Recreating the Howl object breaks any event listeners that may have already been registered, so instead we directly modify Howler._src
    else {
      // @ts-ignore
      this._source._src = this._urls;
      this._source.load();
    }
  }

  public isMuted(): boolean {
    return this._source.mute();
  }

  public setMuted(value: boolean): void {
    this._source.mute(value);
  }

  public isLooped(): boolean {
    // HACK GM => the typedefs say return type is Howl even though it's Howl | boolean, ie it can be either.
    // Looking at the js Howler source here:
    // https://github.com/goldfire/howler.js/blob/master/dist/howler.js
    // it will return the loop value first if there are no params.
    // To get around this we can apparently cast what is returned
    // to unknown and then to boolean.
    return this._source.loop() as unknown as boolean;
  }

  public setLooped(pLoop: boolean): void {
    this._source.loop(pLoop);
  }

  public getVolume(): number {
    return this._volume;
  }

  public setVolume(volume: number): void {
    this.setVolumeWithModifiers(
      volume,
      this._audioManager.masterVolume,
      this._audioManager.getCategoryVolume(this._category),
    );
  }

  public setVolumeWithModifiers(volume: number, masterVolume: number, categoryVolume: number): void {
    this._volume = volume;
    const trackVolume = this._volume * masterVolume * categoryVolume;

    this._source.volume(trackVolume);
  }

  public setPitch(pitch?: number): void {
    if (pitch) {
      this._source.rate(pitch);
    }
  }

  public getPitch(): number {
    return this._source.rate();
  }

  public getTimePos(): number {
    return this._source.seek() as number;
  }

  public setTimePos(pPos: number): void {
    this._source.seek(pPos);
  }

  public getDuration(): number {
    return this._source.duration();
  }

  public isPlaying(): boolean {
    return this._source.playing();
  }

  public on(eventName: string, callback: () => void): void {
    this._source.on(eventName, callback);
  }

  public off(eventName: string, callback?: () => void): void {
    this._source.off(eventName, callback);
  }

  public once(eventName: string, callback: () => void): void {
    this._source.once(eventName, callback);
  }

  public getSource(): Howl {
    return this._source;
  }

  private onLoadError(pID: number | undefined | null, pError: any): void {
    // @ts-ignore
    let currentSrc: string | string[] = this._source._src;
    if (currentSrc instanceof Array) {
      // as far as I can tell, this will only ever be a string or an empty array
      if (currentSrc.length === 0) {
        currentSrc = '';
      } else {
        currentSrc = currentSrc[0]; // like I said, I don't think this line ever happens
      }
    }
    this._urls = this._urls.slice(this._urls.indexOf(currentSrc) + 1); // any files earlier in the array were skipped by Howler anyway (e.g. unsupported formats)
    audioLoadError({
      id: this._id,
      category: this._category,
      src: currentSrc,
      fallback: [...this._urls],
      error: pError,
    });
  }
}
