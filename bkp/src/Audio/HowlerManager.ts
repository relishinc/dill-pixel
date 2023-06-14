import { Howl } from "howler";
import { Dictionary } from "typescript-collections";
import { Application } from "../Application";
import * as AudioCategory from "../Audio/AudioCategory";
import * as HowlerUtils from "../Audio/HowlerUtils";
import * as Topics from "../Data/Topics";
import { AssetMapAudioData } from "../Load";
import { LogUtils, MathUtils } from "../Utils";
import { AudioCollection } from "./AudioCollection";
import { AudioToken } from "./AudioToken";
import { HowlerTrack } from "./HowlerTrack";
import { IAudioManager } from "./IAudioManager";
import { IAudioTrack } from "./IAudioTrack";

export class HowlerManager implements IAudioManager {
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

  constructor(private app: Application) {
    this._masterVolume = 1;
    this._previousMasterVolume = this._masterVolume;
    this._collections = new Dictionary<string, AudioCollection>();
    this._audioLoadTokens = new Array<AssetMapAudioData>();
  }

  public init(): void {
    Application.instance.webEvents.registerVisibilityChangedCallback(
      this.onVisibilityChanged.bind(this)
    );

    this.app.subscribe(Topics.PLAY_AUDIO, this.onPlayRequested.bind(this));
    this.app.subscribe(Topics.LOAD_AUDIO, this.loadFromIds.bind(this));
    this.app.subscribe(
      Topics.LOAD_AUDIO_FROM_ASSET_MAP,
      this.loadFromAssetMapData.bind(this)
    );
    this.app.subscribe(
      Topics.AUDIO_LOAD_ERROR,
      this.onAudioLoadError.bind(this)
    );
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

  public getCategoryVolume(pCategory: string): number {
    return this.getCollection(pCategory).volume;
  }

  public setCategoryVolume(pCategory: string, pVolume: number): void {
    this.getCollection(pCategory).volume = pVolume;
    this.updateCategoryVolume(pCategory);
  }

  public getDuration(pId: string, pCategory: string): number | undefined {
    const track: HowlerTrack | undefined = this.getAudioTrack(
      pId,
      pCategory
    ) as HowlerTrack;

    if (track !== undefined) {
      return track.getDuration();
    }

    return undefined;
  }

  public play(
    pId: string,
    pVolume: number = 1,
    pLoop: boolean = false,
    pCategory: string = AudioCategory.DEFAULT
  ): void {
    let loaded: HowlerTrack;
    const category: AudioCollection = this.getCollection(pCategory);
    const track: HowlerTrack | undefined = category.tracks.getValue(
      pId
    ) as HowlerTrack;
    if (track === undefined) {
      this.load(pId, pCategory, () => {
        loaded = category.tracks.getValue(pId) as HowlerTrack;
        loaded.setLooped(pLoop);
        loaded.setVolumeWithModifiers(
          pVolume,
          this._masterVolume,
          category.volume
        );
        loaded.play();
      });
    } else {
      track.setLooped(pLoop);
      track.setVolumeWithModifiers(
        pVolume,
        this._masterVolume,
        category.volume
      );
      track.play();
    }
  }

  public pause(pId: string, pCategory: string): void {
    const track: HowlerTrack | undefined = this.getAudioTrack(
      pId,
      pCategory
    ) as HowlerTrack;
    if (track !== undefined) {
      track.pause();
    }
  }

  public stop(pId: string, pCategory: string): void {
    const track: HowlerTrack | undefined = this.getAudioTrack(
      pId,
      pCategory
    ) as HowlerTrack;
    if (track !== undefined) {
      track.stop();
    }
  }

  public load(
    pIds: string | string[],
    pCategory: string,
    pOnLoad?: () => void
  ): void {
    const category: AudioCollection = this.getCollection(pCategory);
    let track: HowlerTrack | undefined;
    let id: string;
    // convert single Ids into array for simplicity
    if (typeof pIds === "string") {
      pIds = [pIds];
    }
    // Create the howls if they don't already exist
    for (let i = pIds.length - 1; i >= 0; --i) {
      id = pIds[i];
      track = category.tracks.getValue(id) as HowlerTrack;
      if (track === undefined) {
        track = this.createAudioTrack(id, pCategory) as HowlerTrack;
      } else {
        // Ensure that the actual source exists
        if (track.getSource().state() === HowlerUtils.State.UNLOADED) {
          track.loadSource();
        }
      }
    }
    // If supplied, call the pOnLoad callback once all howls have loaded
    if (pOnLoad !== undefined) {
      let loadedCount: number = 0;
      for (let i = pIds.length - 1; i >= 0; --i) {
        const howl: Howl = (
          category.tracks.getValue(pIds[i])! as HowlerTrack
        ).getSource();
        if (howl.state() !== HowlerUtils.State.LOADED) {
          howl.on(HowlerUtils.Events.LOAD, () => {
            ++loadedCount;
            if (loadedCount >= pIds.length) {
              pOnLoad();
            }
          });
        } else {
          ++loadedCount;
        }
      }
      // If all Ids were already loaded, fire off the callback immediately
      if (loadedCount === pIds.length) {
        pOnLoad();
      }
    }
  }

  public unload(pId: string, pCategory: string, pRemoveTrack: boolean): void {
    const category: AudioCollection = this.getCollection(pCategory);
    const track: IAudioTrack | undefined = category.tracks.getValue(pId);

    if (track !== undefined) {
      track.unloadSource();
      if (pRemoveTrack === true) {
        category.tracks.remove(pId);
      }
    }
  }

  public fadeTo(
    pId: string,
    pCategory: string,
    pVolume: number,
    pDuration: number
  ): void {
    const track: HowlerTrack | undefined = this.getAudioTrack(
      pId,
      pCategory
    ) as HowlerTrack;
    if (track !== undefined) {
      pVolume = MathUtils.clamp(pVolume, 0, 1);
      track.fadeTo(pVolume, pDuration);
    }
  }

  public getAudioTrack(
    pId: string,
    pCategory: string
  ): IAudioTrack | undefined {
    if (this._collections.containsKey(pCategory)) {
      return this._collections.getValue(pCategory)!.tracks.getValue(pId);
    }

    return undefined;
  }

  public createAudioTrack(
    pId: string,
    pCategory: string = AudioCategory.DEFAULT,
    pVolume: number = 1,
    pLoop: boolean = false
  ): IAudioTrack {
    this.log(
      "Creating new howler track with id %c%s%c and category %c%s%c.",
      LogUtils.STYLE_RED_BOLD,
      pId,
      LogUtils.STYLE_BLACK,
      LogUtils.STYLE_RED_BOLD,
      pCategory,
      LogUtils.STYLE_BLACK
    );
    const track: HowlerTrack = new HowlerTrack(
      pId,
      pCategory,
      this,
      pVolume,
      pLoop
    );
    const category: AudioCollection = this.getCollection(pCategory);
    category.tracks.setValue(pId, track);
    return track;
  }

  /**
   * Loads a group of audio tracks and adds them to the same category.
   * @param pTopic The pubsub message id.
   * @param pToken The token with the load data.
   */
  private loadFromIds(
    pTopic: string,
    pToken: { assets: string[]; category: string; callback: () => void }
  ): void {
    this.load(pToken.assets, pToken.category, pToken.callback);
  }

  /**
   * Loads a group of audio tracks into the categories specified by each data object.
   * @param pTopic The pubsub message id.
   * @param pData The token with the load data.
   */
  private loadFromAssetMapData(
    pTopic: string,
    pData: {
      assets: AssetMapAudioData[];
      callback: () => void;
      progressCallback: (progress: number) => void;
    }
  ): void {
    this.log("Loading audio assets from AssetMap.");

    this._audioLoadTokenCallback = pData.callback;
    this._audioLoadTokenProgressCallback = pData.progressCallback;

    pData.assets.forEach((token) => {
      this._audioLoadTokens.push(token);
    });

    this.tryLoadFirstAssetMapAudioData();
  }

  /**
   * Called when a track is loaded using an AssetMapData object. Loads the next track or calls the load end callback.
   */
  private onAudioFromAssetMapDataLoaded(): void {
    this._loadedCount++;
    const percent =
      (this._loadedCount / (this._loadedCount + this._audioLoadTokens.length)) *
      100;

    this._audioLoadTokenProgressCallback(percent);

    if (this.tryLoadFirstAssetMapAudioData() === false) {
      this.log("All audio from asset map loaded");
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
      this.load(
        token.assetName,
        token.category,
        this.onAudioFromAssetMapDataLoaded.bind(this)
      );
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
   * @param pCategory The category to update.
   */
  private updateCategoryVolume(pCategory: string): void {
    const collection: AudioCollection = this.getCollection(pCategory);
    const tracks: IAudioTrack[] = collection.tracks.values();
    for (let i = tracks.length - 1; i >= 0; --i) {
      tracks[i].setVolumeWithModifiers(
        tracks[i].getVolume(),
        this._masterVolume,
        collection.volume
      );
    }
  }

  private getCollection(pCategory: string): AudioCollection {
    if (this._collections.containsKey(pCategory) === false) {
      this.createCollection(pCategory);
    }
    return this._collections.getValue(pCategory)!;
  }

  private createCollection(pCategory: string): void {
    this._collections.setValue(pCategory, new AudioCollection());
  }

  private onPlayRequested(pTopic: string, pToken: AudioToken): void {
    this.play(pToken.id, pToken.volume, pToken.loop, pToken.category);
  }

  private onVisibilityChanged(pVisible: boolean): void {
    if (pVisible) {
      this._masterVolume = this._previousMasterVolume;
      this.updateAllCategoryVolume();
    } else {
      this._previousMasterVolume = this._masterVolume;
      this._masterVolume = 0;
      this.updateAllCategoryVolume();
    }
  }

  private onAudioLoadError(
    pTopic = Topics.AUDIO_LOAD_ERROR,
    pData: {
      id: string;
      category: string;
      src: string;
      fallback: string[];
      error: any;
    }
  ): void {
    const canRetry: boolean = pData.fallback.length > 0;
    if (canRetry) {
      this.logW("Audio Load Error. Trying again with a fallback url.", pData);
      const track = this.getAudioTrack(pData.id, pData.category);
      if (track !== undefined) {
        track.loadSource();
      }
    } else {
      this.logE("Audio Load Error. No more fallback urls to try.", pData);
    }
  }

  /**
   * Logs a message with class name and colour coding if debug flag is true.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private log(pText: string, ...pParams: any[]): void {
    if (this._debug) {
      LogUtils.log(
        pText,
        { className: "HowlerManager", color: LogUtils.COLOR_LIGHT_BLUE },
        ...pParams
      );
    }
  }

  /**
   * Logs a warning message with class name and colour coding if debug flag is true.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private logW(pText: string, ...pParams: any[]): void {
    if (this._debug) {
      LogUtils.logWarning(
        pText,
        { className: "HowlerManager", color: LogUtils.COLOR_LIGHT_BLUE },
        ...pParams
      );
    }
  }

  /**
   * Logs an error message with class name and colour coding.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private logE(pText: string, ...pParams: any[]): void {
    LogUtils.logError(
      pText,
      { className: "HowlerManager", color: LogUtils.COLOR_LIGHT_BLUE },
      ...pParams
    );
  }
}
