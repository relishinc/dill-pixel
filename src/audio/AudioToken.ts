import * as AudioCategory from './AudioCategory';

/**
 * Class representing an audio token.
 */
export class AudioToken {
  /**
   * The ID of the audio token.
   */
  public id: string;

  /**
   * The volume of the audio token.
   */
  public volume: number;

  /**
   * Whether the audio token should loop.
   */
  public loop: boolean;

  /**
   * The category of the audio token.
   */
  public category: string;

  /**
   * Create a new audio token.
   * @param {string} pId - The ID of the audio token.
   * @param {number} pVolume - The volume of the audio token.
   * @param {boolean} pLoop - Whether the audio token should loop.
   * @param {string} pCategory - The category of the audio token.
   */
  constructor(pId: string, pVolume: number = 1, pLoop: boolean = false, pCategory: string = AudioCategory.DEFAULT) {
    this.id = pId;
    this.volume = pVolume;
    this.loop = pLoop;
    this.category = pCategory;
  }
}
