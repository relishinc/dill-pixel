import {Dictionary} from 'typescript-collections';
import * as MathUtils from '../utils/MathUtils';
import {IAudioTrack} from './IAudioTrack';

/**
 * Class for managing a collection of audio tracks.
 */
export class AudioCollection {
  /**
   * Dictionary of audio tracks.
   */
  private _tracks: Dictionary<string, IAudioTrack>;

  /**
   * Volume of the audio collection.
   */
  private _volume: number;

  /**
   * Constructor for AudioCollection.
   */
  constructor() {
    this._tracks = new Dictionary<string, IAudioTrack>();
    this._volume = 1;
  }

  /**
   * Getter for volume.
   * @returns {number} - The volume of the audio collection.
   */
  public get volume(): number {
    return this._volume;
  }

  /**
   * Setter for volume.
   * @param {number} pValue - The new volume for the audio collection.
   */
  public set volume(pValue: number) {
    this._volume = MathUtils.clamp(pValue, 0, 1);
  }

  /**
   * Getter for tracks.
   * @returns {Dictionary<string, IAudioTrack>} - The tracks in the audio collection.
   */
  public get tracks(): Dictionary<string, IAudioTrack> {
    return this._tracks;
  }
}
