import {Texture} from 'pixi.js';
import {PixiUtils} from '../utils';
import * as NumberUtils from '../utils/NumberUtils';

/**
 * SpriteAnimation
 */
export class SpriteAnimation {
  private _frames: Texture[];
  private _frameRate: number;
  private _isLooping: boolean;
  private _onComplete: ((pReversed?: boolean) => void) | undefined;
  private _onLoop: (() => void) | undefined;

  // TODO:SH: Find a better format for shortening long constructors
  /**
   * Creates an instance of sprite animation.
   * @param pName
   * @param pSheet
   * @param pFrames
   * @param pZeroPadding
   * @param pFramerate
   * @param [pLooping]
   * @param [pStartFrame=0]
   */
  constructor(
    pName: string,
    pSheet: string | string[],
    pFrames: number,
    pZeroPadding: number,
    pFramerate: number,
    pLooping: boolean = false,
    pStartFrame: number = 0,
  ) {
    this._frameRate = pFramerate;
    this._isLooping = pLooping;
    this._frames = new Array<Texture>(pFrames);
    let textureName: string;
    for (let i = 0; i < pFrames; ++i) {
      textureName = pName + NumberUtils.addZeroPadding((i + pStartFrame).toString(), pZeroPadding);
      this._frames[i] = PixiUtils.getTexture(textureName, pSheet);
    }
  }

  /**
   * Gets number of frames
   */
  public get frames(): number {
    return this._frames.length;
  }

  /**
   * Gets framerate
   */
  public get framerate(): number {
    return this._frameRate;
  }

  /**
   * Sets framerate
   */
  public set framerate(pValue: number) {
    this._frameRate = pValue;
  }

  /**
   * Gets duration (automatically calculated based on framerate)
   */
  public get duration(): number {
    return this._frames.length / this._frameRate;
  }

  /**
   * Gets whether is looping
   */
  public get isLooping(): boolean {
    return this._isLooping;
  }

  /**
   * Gets a specific frame
   * @param pFrame
   * @returns frame
   */
  public getFrame(pFrame: number): Texture {
    return this._frames[pFrame];
  }

  // TODO:SH: Optimize the adding of onComplete callbacks (constructor?)
  /**
   * onComplete
   * @todo SH: Optimize the adding of onComplete callbacks (constructor?)
   * @param pOnComplete
   */
  public onComplete(pOnComplete: (pReversed?: boolean) => void) {
    this._onComplete = pOnComplete;
  }

  /**
   * onLoop
   * @param pOnLoop
   */
  public onLoop(pOnLoop: () => void) {
    this._onLoop = pOnLoop;
  }

  /**
   * Fires on complete
   * @param [pReversed]
   */
  public fireOnComplete(pReversed?: boolean): void {
    if (this._onComplete !== undefined) {
      this._onComplete(pReversed);
    }
  }

  /**
   * Fires on loop
   */
  public fireOnLoop(): void {
    if (this._onLoop !== undefined) {
      this._onLoop();
    }
  }
}
