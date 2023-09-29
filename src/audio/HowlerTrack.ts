import { Howl } from 'howler';
import { Assets } from 'pixi.js';
import { audioLoadError } from '../signals';
import { AssetUtils } from '../utils/AssetUtils';
import * as HowlerUtils from './HowlerUtils';
import { IAudioManager } from './IAudioManager';
import { IAudioTrack } from './IAudioTrack';

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

  constructor(
    pId: string,
    pCategory: string,
    pAudioManager: IAudioManager,
    pVolume: number = 1,
    pLoop: boolean = false,
  ) {
    this._id = pId;
    this._audioManager = pAudioManager;
    this._category = pCategory;

    if (Assets.resolver.basePath !== '') {
      this._urls = HowlerTrack.getDefaultUrls(this._id).map((url) => Assets.resolver.basePath + '/' + url);
    } else {
      this._urls = HowlerTrack.getDefaultUrls(this._id);
    }

    this.loadSource();

    this.setVolume(pVolume);
    this.setLooped(pLoop);
  }

  private static getDefaultUrls(_id: string): string[] {
    return HowlerTrack.FILE_EXTENSIONS.map((ext) => AssetUtils.FILEPATH_AUDIO + _id + '.' + ext);
  }

  public get id() {
    return this._id;
  }

  public getSource(): Howl {
    return this._source;
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

  public fadeTo(pVolume: number, pMilliseconds: number): void {
    const newVol: number =
      pVolume * this._audioManager.masterVolume * this._audioManager.getCategoryVolume(this._category);
    this._source.fade(this._source.volume(), newVol, pMilliseconds);
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

  public setMuted(pMute: boolean): void {
    this._source.mute(pMute);
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

  public setVolume(pVolume: number): void {
    this.setVolumeWithModifiers(
      pVolume,
      this._audioManager.masterVolume,
      this._audioManager.getCategoryVolume(this._category),
    );
  }

  public setVolumeWithModifiers(pVolume: number, pMasterVolume: number, pCategoryVolume: number): void {
    this._volume = pVolume;
    this._source.volume(this._volume * pMasterVolume * pCategoryVolume);
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

  public on(pEvent: string, pCallback: () => void): void {
    this._source.on(pEvent, pCallback);
  }

  public off(pEvent: string, pCallback?: () => void): void {
    this._source.off(pEvent, pCallback);
  }

  public once(pEvent: string, pCallback: () => void): void {
    this._source.once(pEvent, pCallback);
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
