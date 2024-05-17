import {Howl} from 'howler';
import {Assets} from 'pixi.js';
import {audioLoadError} from '../functions';
import {AssetUtils, WithRequiredProps} from '../utils';
import * as HowlerUtils from './HowlerUtils';
import {IAudioManager} from './IAudioManager';
import {IAudioTrack} from './IAudioTrack';

/**
 * Type for audio track configuration.
 */
export type AudioTrackConfig = {
  id: string;
  category: string;
  volume?: number;
  loop?: boolean;
};

/**
 * Type for required audio track configuration.
 */
export type RequiredAudioTrackConfig = WithRequiredProps<AudioTrackConfig, 'id'>;

/**
 * Class representing a Howler audio track.
 */
export class HowlerTrack implements IAudioTrack {
  /**
   * File extensions that Howler will attempt to load audio files with, in this order.
   * @default ["webm", "mp3", "ogg", "m4a"]
   */
  public static FILE_EXTENSIONS = ['webm', 'mp3', 'ogg', 'm4a'];

  private _id: string;
  private _source!: Howl;
  private _volume: number = 1;
  private _category: string;
  private _audioManager: IAudioManager;
  private _urls: string[];

  /**
   * Get default URLs for the audio track.
   * @param _id - The ID of the audio track.
   * @returns An array of URLs.
   */
  private static getDefaultUrls(_id: string): string[] {
    return HowlerTrack.FILE_EXTENSIONS.map((ext) => AssetUtils.FILEPATH_AUDIO + _id + '.' + ext);
  }

  /**
   * Create a new Howler audio track.
   * @param trackId - The ID of the audio track.
   * @param category - The category of the audio track.
   * @param audioManager - The audio manager for the audio track.
   * @param volume - The volume of the audio track.
   * @param loop - Whether the audio track should loop.
   */
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

  /**
   * Get the ID of the audio track.
   * @returns The ID of the audio track.
   */
  public get id() {
    return this._id;
  }

  /**
   * Play the audio track.
   */
  public play(): void {
    if (this._source.state() === HowlerUtils.State.UNLOADED) {
      console.error(this._id + ' source Howl is not loaded. Call loadSource() before playing.');
      return;
    }
    this._source.play();
  }

  /**
   * Pause the audio track.
   */
  public pause(): void {
    this._source.pause();
  }

  /**
   * Stop the audio track.
   */
  public stop(): void {
    this._source.stop();
  }

  /**
   * Fade the audio track to a specified volume over a specified duration.
   * @param volume - The target volume.
   * @param milliseconds - The duration of the fade.
   */
  public fadeTo(volume: number, milliseconds: number): void {
    const newVol: number =
      volume * this._audioManager.masterVolume * this._audioManager.getCategoryVolume(this._category);
    this._source.fade(this._source.volume(), newVol, milliseconds);
  }

  /**
   * Unload the source of the audio track.
   */
  public unloadSource(): void {
    this._source.unload();
  }

  /**
   * Load the source of the audio track.
   */
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

  /**
   * Check if the audio track is muted.
   * @returns Whether the audio track is muted.
   */
  public isMuted(): boolean {
    return this._source.mute();
  }

  /**
   * Set whether the audio track is muted.
   * @param value - Whether the audio track should be muted.
   */
  public setMuted(value: boolean): void {
    this._source.mute(value);
  }

  /**
   * Check if the audio track is looped.
   * @returns Whether the audio track is looped.
   */
  public isLooped(): boolean {
    // HACK GM => the typedefs say return type is Howl even though it's Howl | boolean, ie it can be either.
    // Looking at the js Howler source here:
    // https://github.com/goldfire/howler.js/blob/master/dist/howler.js
    // it will return the loop value first if there are no params.
    // To get around this we can apparently cast what is returned
    // to unknown and then to boolean.
    return this._source.loop() as unknown as boolean;
  }

  /**
   * Set whether the audio track is looped.
   * @param pLoop - Whether the audio track should be looped.
   */
  public setLooped(pLoop: boolean): void {
    this._source.loop(pLoop);
  }

  /**
   * Get the volume of the audio track.
   * @returns The volume of the audio track.
   */
  public getVolume(): number {
    return this._volume;
  }

  /**
   * Set the volume of the audio track.
   * @param volume - The volume of the audio track.
   */
  public setVolume(volume: number): void {
    this.setVolumeWithModifiers(
      volume,
      this._audioManager.masterVolume,
      this._audioManager.getCategoryVolume(this._category),
    );
  }

  /**
   * Set the volume of the audio track with modifiers.
   * @param volume - The volume of the audio track.
   * @param masterVolume - The master volume.
   * @param categoryVolume - The category volume.
   */
  public setVolumeWithModifiers(volume: number, masterVolume: number, categoryVolume: number): void {
    this._volume = volume;
    const trackVolume = this._volume * masterVolume * categoryVolume;

    this._source.volume(trackVolume);
  }

  /**
   * Set the pitch of the audio track.
   * @param pitch - The pitch of the audio track.
   */
  public setPitch(pitch?: number): void {
    if (pitch) {
      this._source.rate(pitch);
    }
  }

  /**
   * Get the pitch of the audio track.
   * @returns The pitch of the audio track.
   */
  public getPitch(): number {
    return this._source.rate();
  }

  /**
   * Get the time position of the audio track.
   * @returns The time position of the audio track.
   */
  public getTimePos(): number {
    return this._source.seek() as number;
  }

  /**
   * Set the time position of the audio track.
   * @param pPos - The time position of the audio track.
   */
  public setTimePos(pPos: number): void {
    this._source.seek(pPos);
  }

  /**
   * Get the duration of the audio track.
   * @returns The duration of the audio track.
   */
  public getDuration(): number {
    return this._source.duration();
  }

  /**
   * Check if the audio track is playing.
   * @returns Whether the audio track is playing.
   */
  public isPlaying(): boolean {
    return this._source.playing();
  }

  /**
   * Add an event listener to the audio track.
   * @param eventName - The name of the event.
   * @param callback - The callback function.
   */
  public on(eventName: string, callback: () => void): void {
    this._source.on(eventName, callback);
  }

  /**
   * Remove an event listener from the audio track.
   * @param eventName - The name of the event.
   * @param callback - The callback function.
   */
  public off(eventName: string, callback?: () => void): void {
    this._source.off(eventName, callback);
  }

  /**
   * Add an event listener to the audio track that will be called once.
   * @param eventName - The name of the event.
   * @param callback - The callback function.
   */
  public once(eventName: string, callback: () => void): void {
    this._source.once(eventName, callback);
  }

  /**
   * Get the source of the audio track.
   * @returns The source of the audio track.
   */
  public getSource(): Howl {
    return this._source;
  }

  /**
   * Handle an error when loading the audio track.
   * @param pID - The ID of the audio track.
   * @param pError - The error.
   */
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
