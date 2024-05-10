import { Howl } from 'howler';
import { Dictionary } from 'typescript-collections';
import { Application } from '../core';
import { AssetMapAudioData } from '../load';
import { Signals } from '../signals';
import { LogUtils, MathUtils } from '../utils';
import * as AudioCategory from './AudioCategory';
import { AudioCollection } from './AudioCollection';
import { AudioToken } from './AudioToken';
import { HowlerTrack } from './HowlerTrack';
import * as HowlerUtils from './HowlerUtils';
import { IAudioManager } from './IAudioManager';
import { IAudioTrack } from './IAudioTrack';

// utility functions to call from HowlerManager

export function setMasterVolume(value: number): void {
  Application.instance.audio.masterVolume = value;
}

export function getMasterVolume(): number {
  return Application.instance.audio.masterVolume;
}

export function fadeAudioTo(id: string, category: string, volume: number, duration: number): void {
  Application.instance.audio.fadeTo(id, category, volume, duration);
}

/**
 * Creates an IAudioTrack.
 * @returns The created IAudioTrack.
 * @param trackId
 * @param category
 */
export function createAudioTrack(trackId: string, category: string): IAudioTrack {
  return Application.instance.audio.createAudioTrack(trackId, category);
}

/**
 * Gets a track.
 * @returns The IAudioTrack created or undefined if not able to create track.
 * This could happen if the source file could not be found.
 * @param trackId
 * @param category
 */
export function getAudioTrack(trackId: string, category?: string): IAudioTrack | undefined {
  return Application.instance.audio.getAudioTrack(trackId, category || AudioCategory.DEFAULT);
}

/**
 * Gets the volume of a specific category.
 * @param category The category to check.
 * @returns The volume of the category.
 */
export function getAudioCategoryVolume(category: string): number {
  return Application.instance.audio.getCategoryVolume(category);
}

/**
 * Sets the volume of a specific category.
 * @param category
 * @param volume
 */
export function setAudioCategoryVolume(category: string, volume: number) {
  Application.instance.audio.setCategoryVolume(category, volume);
}

/**
 * Gets the length of an IAudioTrack.
 * @returns The length of the track or `undefined` if the track doesn't exist.
 * @param trackId
 * @param category
 */
export function getAudioTrackDuration(trackId: string, category: string): number | undefined {
  return Application.instance.audio.getDuration(trackId, category);
}

/**
 * Plays a track. If the track does not exist, this function will create it.
 * @returns The track playing.
 * @param trackId
 * @param volume
 * @param loop
 * @param category
 * @param pitch
 */
export function playAudioTrack(
  trackId: string,
  volume?: number,
  loop?: boolean,
  category?: string,
  pitch?: number,
): IAudioTrack | undefined {
  return Application.instance.audio.play(trackId, volume, loop, category || AudioCategory.DEFAULT, pitch);
}

/**
 * Pauses a track.
 * @param trackId
 * @param category
 */
export function pauseAudioTrack(trackId: string, category: string): IAudioTrack | undefined {
  return Application.instance.audio.pause(trackId, category || AudioCategory.DEFAULT);
}

/**
 * Stops a track.
 * @param trackId
 * @param category
 */
export function stopAudioTrack(trackId: string, category: string): IAudioTrack | undefined {
  return Application.instance.audio.stop(trackId, category || AudioCategory.DEFAULT);
}

export class HowlerManager implements IAudioManager {
  public autoMuteOnVisibilityChange: boolean = true;
  private _masterVolume: number;
  private _collections: Dictionary<string, AudioCollection>;
  private _previousMasterVolume: number;
  /**
   * The collection of audio asset map data to load.
   */
  private _audioLoadTokens: AssetMapAudioData[];
  /**
   * The callback to call after all AssetMapAudioData tracks have been loaded.
   */
  private _audioLoadTokenCallback!: () => void;
  /**
   * The callback to call after each of the {@link _audioLoadTokens} has been loaded.
   * @param progress is a number from 0 to 100
   */
  private _audioLoadTokenProgressCallback!: (progress: number) => void;
  /**
   * How many of the {@link _audioloadTokens} have been loaded so far
   */
  private _loadedCount: number = 0;
  /**
   * The internal flag for print log statements.
   */
  private _debug: boolean = false;

  // private _ctx: AudioContext;

  constructor(private app: Application) {
    // this._ctx = new AudioContext();

    this._masterVolume = 1;
    this._previousMasterVolume = this._masterVolume;
    this._collections = new Dictionary<string, AudioCollection>();
    this._audioLoadTokens = new Array<AssetMapAudioData>();

    this.onPlayRequested = this.onPlayRequested.bind(this);
    this.loadFromIds = this.loadFromIds.bind(this);
    this.loadFromAssetMapData = this.loadFromAssetMapData.bind(this);
    this.onAudioLoadError = this.onAudioLoadError.bind(this);
  }

  /**
   * Enabling this will print all debug logs.
   */
  public set debug(pEnabled: boolean) {
    this._debug = pEnabled;
  }

  public get masterVolume(): number {
    return this._masterVolume;
  }

  public set masterVolume(pVolume: number) {
    this._masterVolume = MathUtils.clamp(pVolume, 0, 1);
    this.updateAllCategoryVolume();
  }

  public init(): void {
    Application.instance.webEvents.registerVisibilityChangedCallback(this.onVisibilityChanged.bind(this));

    Signals.playAudio.connect(this.onPlayRequested);
    Signals.loadAudio.connect(this.loadFromIds);
    Signals.loadAudioFromAssetMap.connect(this.loadFromAssetMapData);
    Signals.audioLoadError.connect(this.onAudioLoadError);
  }

  public getCategoryVolume(category: string): number {
    return this.getCollection(category).volume;
  }

  public setCategoryVolume(category: string, pVolume: number): void {
    this.getCollection(category).volume = pVolume;
    this.updateCategoryVolume(category);
  }

  public getDuration(trackId: string, category: string): number | undefined {
    const track: HowlerTrack | undefined = this.getAudioTrack(trackId, category) as HowlerTrack;

    if (track !== undefined) {
      return track.getDuration();
    }

    return undefined;
  }

  public play(
    trackId: string,
    volume: number = 1,
    loop: boolean = false,
    category: string = AudioCategory.DEFAULT,
    pitch?: number,
  ): IAudioTrack | undefined {
    //this.ensureCtx();

    let loaded: HowlerTrack;
    const collection: AudioCollection = this.getCollection(category);
    const track: HowlerTrack | undefined = collection.tracks.getValue(trackId) as HowlerTrack;
    if (track === undefined) {
      this.load(trackId, category, () => {
        loaded = collection.tracks.getValue(trackId) as HowlerTrack;
        loaded.setLooped(loop);
        loaded.setVolumeWithModifiers(volume, this._masterVolume, collection.volume);
        loaded.setPitch(pitch);
        loaded.play();
        return loaded;
      });
    } else {
      track.setLooped(loop);
      track.setVolumeWithModifiers(volume, this._masterVolume, collection.volume);
      track.setPitch(pitch);
      track.play();
      return track;
    }
  }

  public pause(trackId: string, category: string): IAudioTrack | undefined {
    const track: HowlerTrack | undefined = this.getAudioTrack(trackId, category) as HowlerTrack;
    if (track !== undefined) {
      track.pause();
    }
    return track;
  }

  public stop(trackId: string, category: string): IAudioTrack | undefined {
    const track: HowlerTrack | undefined = this.getAudioTrack(trackId, category) as HowlerTrack;
    if (track !== undefined) {
      track.stop();
    }
    return track;
  }

  public load(ids: string | string[], category: string, onLoadCallback?: () => void): void {
    const collection: AudioCollection = this.getCollection(category);
    let track: HowlerTrack | undefined;
    let id: string;
    // convert single Ids into array for simplicity
    if (typeof ids === 'string') {
      ids = [ids];
    }
    // Create the howls if they don't already exist
    for (let i = ids.length - 1; i >= 0; --i) {
      id = ids[i];
      track = collection.tracks.getValue(id) as HowlerTrack;
      if (track === undefined) {
        track = this.createAudioTrack(id, category) as HowlerTrack;
      } else {
        // Ensure that the actual source exists
        if (track.getSource().state() === HowlerUtils.State.UNLOADED) {
          track.loadSource();
        }
      }
    }
    // If supplied, call the pOnLoad callback once all howls have loaded
    if (onLoadCallback !== undefined) {
      let loadedCount: number = 0;
      for (let i = ids.length - 1; i >= 0; --i) {
        const howl: Howl = (collection.tracks.getValue(ids[i])! as HowlerTrack).getSource();
        if (howl.state() !== HowlerUtils.State.LOADED) {
          howl.on(HowlerUtils.Events.LOAD, () => {
            ++loadedCount;
            if (loadedCount >= ids.length) {
              onLoadCallback();
            }
          });
        } else {
          ++loadedCount;
        }
      }
      // If all Ids were already loaded, fire off the callback immediately
      if (loadedCount === ids.length) {
        onLoadCallback();
      }
    }
  }

  public unload(trackId: string, category: string, removeTrack: boolean = false): void {
    const collection: AudioCollection = this.getCollection(category);
    const track: IAudioTrack | undefined = collection.tracks.getValue(trackId);

    if (track !== undefined) {
      track.unloadSource();
      if (removeTrack) {
        collection.tracks.remove(trackId);
      }
    }
  }

  public fadeTo(trackId: string, category: string, volume: number, pDuration: number): void {
    const track: HowlerTrack | undefined = this.getAudioTrack(trackId, category) as HowlerTrack;
    if (track !== undefined) {
      volume = MathUtils.clamp(volume, 0, 1);
      track.fadeTo(volume, pDuration);
    }
  }

  public getAudioTrack(trackId: string, category: string): IAudioTrack | undefined {
    if (this._collections.containsKey(category)) {
      return this._collections.getValue(category)!.tracks.getValue(trackId);
    }

    return undefined;
  }

  public createAudioTrack(
    trackId: string,
    category: string = AudioCategory.DEFAULT,
    volume: number = 1,
    loop: boolean = false,
  ): IAudioTrack {
    this.log(
      'Creating new howler track with id %c%s%c and category %c%s%c.',
      LogUtils.STYLE_RED_BOLD,
      trackId,
      LogUtils.STYLE_BLACK,
      LogUtils.STYLE_RED_BOLD,
      category,
      LogUtils.STYLE_BLACK,
    );
    const collection: AudioCollection = this.getCollection(category);
    const track: HowlerTrack = new HowlerTrack(trackId, category, this, volume, loop);
    collection.tracks.setValue(trackId, track);
    return track;
  }

  private ensureCtx() {
    // if (this._ctx.state === 'suspended') {
    //   Signals.audioContextSuspendedError.emit();
    //   return false;
    // }

    return true;
  }

  /**
   * Loads a group of audio tracks and adds them to the same category.
   * @param token
   */
  private loadFromIds(token: { assets: string[]; category: string; callback: () => void }): void {
    this.load(token.assets, token.category, token.callback);
  }

  /**
   * Loads a group of audio tracks into the categories specified by each data object.
   * @param data
   */
  private loadFromAssetMapData(data: {
    assets: AssetMapAudioData[];
    callback: () => void;
    progressCallback: (progress: number) => void;
  }): void {
    this.log('Loading audio assets from AssetMap.');

    this._audioLoadTokenCallback = data.callback;
    this._audioLoadTokenProgressCallback = data.progressCallback;

    data.assets.forEach((token) => {
      this._audioLoadTokens.push(token);
    });

    this.tryLoadFirstAssetMapAudioData();
  }

  /**
   * Called when a track is loaded using an AssetMapData object. Loads the next track or calls the load end callback.
   */
  private onAudioFromAssetMapDataLoaded(): void {
    this._loadedCount++;
    const percent = (this._loadedCount / (this._loadedCount + this._audioLoadTokens.length)) * 100;

    this._audioLoadTokenProgressCallback(percent);

    if (!this.tryLoadFirstAssetMapAudioData()) {
      this.log('All audio from asset map loaded');
      this._audioLoadTokenCallback();
    }
  }

  /**
   * Tries to load the first audio load token. If one exists, it is removed and used to load the audio track.
   * @returns Whether there was an audio track load requested.
   */
  private tryLoadFirstAssetMapAudioData(): boolean {
    if (this._audioLoadTokens.length > 0) {
      const token: AssetMapAudioData = this._audioLoadTokens[0];
      this._audioLoadTokens.shift();
      this.load(token.assetName, token.category, this.onAudioFromAssetMapDataLoaded.bind(this));
      return true;
    }

    return false;
  }

  private updateAllCategoryVolume(): void {
    for (let i = 0; i < this._collections.keys().length; ++i) {
      this.updateCategoryVolume(this._collections.keys()[i]);
    }
  }

  /**
   * Updates the volume of all the tracks in a specific category.
   * @param category The category to update.
   */
  private updateCategoryVolume(category: string): void {
    const collection: AudioCollection = this.getCollection(category);
    const tracks: IAudioTrack[] = collection.tracks.values();
    for (let i = tracks.length - 1; i >= 0; --i) {
      tracks[i].setVolumeWithModifiers(tracks[i].getVolume(), this._masterVolume, collection.volume);
    }

    Signals.onAudioCategoryVolumeChanged.emit({
      category,
      volume: collection.volume,
      masterVolume: this._masterVolume,
    });
  }

  private getCollection(category: string): AudioCollection {
    if (!this._collections.containsKey(category)) {
      this.createCollection(category);
    }
    return this._collections.getValue(category)!;
  }

  private createCollection(category: string): void {
    this._collections.setValue(category, new AudioCollection());
  }

  private onPlayRequested(token: AudioToken): void {
    this.play(token.id, token.volume, token.loop, token.category);
  }

  private onVisibilityChanged(isVisible: boolean): void {
    if (this.autoMuteOnVisibilityChange) {
      if (isVisible) {
        this._masterVolume = this._previousMasterVolume;
        this.updateAllCategoryVolume();
      } else {
        this._previousMasterVolume = this._masterVolume;
        this._masterVolume = 0;
        this.updateAllCategoryVolume();
      }
    }
  }

  private onAudioLoadError(data: { id: string; category: string; src: string; fallback: string[]; error: any }): void {
    const canRetry: boolean = data.fallback.length > 0;
    if (canRetry) {
      this.logW('Audio Load Error. Trying again with a fallback url.', data);
      const track = this.getAudioTrack(data.id, data.category);
      if (track !== undefined) {
        track.loadSource();
      }
    } else {
      this.logE('Audio Load Error. No more fallback urls to try.', data);
    }
  }

  /**
   * Logs a message with class name and colour coding if debug flag is true.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   * @param text
   * @param rest
   */
  private log(text: string, ...rest: any[]): void {
    if (this._debug) {
      LogUtils.log(text, { className: 'HowlerManager', color: LogUtils.COLOR_LIGHT_BLUE }, ...rest);
    }
  }

  /**
   * Logs a warning message with class name and colour coding if debug flag is true.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   * @param text
   * @param rest
   */
  private logW(text: string, ...rest: any[]): void {
    if (this._debug) {
      LogUtils.logWarning(text, { className: 'HowlerManager', color: LogUtils.COLOR_LIGHT_BLUE }, ...rest);
    }
  }

  /**
   * Logs an error message with class name and colour coding.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   * @param text
   * @param rest
   */
  private logE(text: string, ...rest: any[]): void {
    LogUtils.logError(text, { className: 'HowlerManager', color: LogUtils.COLOR_LIGHT_BLUE }, ...rest);
  }
}
