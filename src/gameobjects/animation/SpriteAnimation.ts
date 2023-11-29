import { Texture } from 'pixi.js';
import { Make } from '../../utils';
import * as NumberUtils from '../../utils/NumberUtils';

export interface SpriteAnimationConfig {
  name: string;
  sheet: string;
  numFrames: number;
  zeroPadding: number;
  framerate: number;
  loop: boolean;
  startFrame: number;
}

const defaultConfig: Partial<SpriteAnimationConfig> &
  Required<Pick<SpriteAnimationConfig, 'zeroPadding' | 'framerate' | 'loop' | 'startFrame'>> = {
  zeroPadding: 0,
  framerate: 60,
  loop: false,
  startFrame: 0,
};

export type SpriteAnimationProps = Partial<SpriteAnimationConfig> &
  Required<Pick<SpriteAnimationConfig, 'name' | 'sheet' | 'numFrames'>>;

/**
 * SpriteAnimation
 */
export class SpriteAnimation {
  private _frames: Texture[];
  private _frameRate: number;
  private _isLooping: boolean;
  private _onComplete: ((reversed?: boolean) => void) | undefined;
  private _onLoop: (() => void) | undefined;

  protected config: SpriteAnimationConfig;

  /**
   * Creates an instance of sprite animation.
   * @param props
   */
  constructor(props: SpriteAnimationProps) {
    this.config = { ...defaultConfig, ...props };

    this._frameRate = this.config.framerate;
    this._isLooping = this.config.loop;
    this._frames = [];

    let textureName: string;
    for (let i = 0; i < this.config.numFrames; ++i) {
      textureName =
        this.config.name + NumberUtils.addZeroPadding((i + this.config.startFrame).toString(), this.config.zeroPadding);
      this._frames[i] = Make.texture(textureName, this.config.sheet);
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
  public set framerate(value: number) {
    this._frameRate = value;
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
   * @returns frame
   * @param frame
   */
  public getFrame(frame: number): Texture {
    return this._frames[frame];
  }

  // TODO:SH: Optimize the adding of onComplete callbacks (constructor?)
  /**
   * onComplete
   * @todo SH: Optimize the adding of onComplete callbacks (constructor?)
   * @param callback
   */
  public onComplete(callback: (reversed?: boolean) => void) {
    this._onComplete = callback;
  }

  /**
   * onLoop
   * @param callback
   */
  public onLoop(callback: () => void) {
    this._onLoop = callback;
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
