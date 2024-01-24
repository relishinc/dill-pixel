import {Dictionary} from 'typescript-collections';
import {Sprite} from '../Sprite';
import {SpriteAnimation} from './SpriteAnimation';

/**
 * Animated sprite
 */
export class AnimatedSprite extends Sprite {
  private _offset: number = 0;
  private _elapsed: number;
  private _frame: number;
  private _animations: Dictionary<string, SpriteAnimation>;
  private _isPlaying: boolean;
  private _isReversed: boolean;
  private _activeAnimation!: SpriteAnimation;

  /**
   * Creates an instance of animated sprite.
   */
  constructor() {
    super();
    this.anchor.set(0.5);
    this._animations = new Dictionary<string, SpriteAnimation>();
    this._elapsed = -1;
    this._frame = -1;
    this._isPlaying = false;
    this._isReversed = false;
  }

  /**
   * Gets whether is playing
   */
  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  get currentFrame(): number {
    return this._frame;
  }

  set currentFrame(frame: number) {
    if (!this._activeAnimation) {
      console.warn(
        `AnimatedSprite: ${this.constructor.name}:: can't set the current frame before an active animation has been chosen.`,
      );
      return;
    }
    if (frame < 0 || frame > this._activeAnimation.frames) {
      console.warn(
        `AnimatedSprite: ${this.constructor.name}:: The frame ${frame} is outside of the number of frames for the current animation`,
      );
      return;
    }
    this._frame = frame;
  }

  /**
   * Adds animation
   * @param key
   * @param spriteAnimation
   * @returns animation
   */
  public addAnimation(key: string, spriteAnimation: SpriteAnimation): SpriteAnimation {
    this._animations.setValue(key, spriteAnimation);
    return spriteAnimation;
  }

  /**
   * Plays animated sprite
   * @param key
   * @param reverse
   * @param startingFrame
   */
  public play(key: string, reverse: boolean = false, startingFrame: number = 0): void {
    const anim: SpriteAnimation | undefined = this._animations.getValue(key);
    if (anim !== undefined) {
      this._isReversed = reverse;
      this._isPlaying = true;
      this._elapsed = startingFrame ? (startingFrame / anim.frames) * anim.duration : 0;
      this._activeAnimation = anim;
    } else {
      console.log(`AnimatedSprite.play: Animation with key ${key} was not found`);
    }
  }

  /**
   * Holds frame
   * @param key
   * @param frame
   */
  public holdFrame(key: string, frame: number = 0): void {
    const anim: SpriteAnimation | undefined = this._animations.getValue(key);
    if (anim !== undefined) {
      this._isReversed = false;
      this._isPlaying = false;
      this._elapsed = (frame / anim.frames) * anim.duration;
      this._activeAnimation = anim;
      this.updateFrame();
    } else {
      console.log(`AnimatedSprite.holdFrame: Animation with key ${key} not found`);
    }
  }

  /**
   * Updates animated sprite
   * @param deltaTime
   */
  public update(deltaTime: number): void {
    if (this._isPlaying) {
      this._elapsed += deltaTime;
      this.updateFrame();
    }
  }

  /**
   * Updates frame
   */
  private updateFrame(): void {
    let looped: boolean = false;
    let complete: boolean = false;
    if (this._elapsed >= this._activeAnimation.duration) {
      if (this._activeAnimation.isLooping) {
        looped = true;
        this._elapsed %= this._activeAnimation.duration;
      } else {
        complete = true;
        this._elapsed = this._activeAnimation.duration;
        this._isPlaying = false;
      }
    }
    let animPerc: number = this._elapsed / this._activeAnimation.duration;
    if (this._isReversed) {
      animPerc = 1 - animPerc;
    }
    let newFrame: number = Math.floor(animPerc * this._activeAnimation.frames);
    newFrame = Math.min(Math.max(newFrame, 0), this._activeAnimation.frames - 1);
    if (newFrame !== this._frame) {
      this._frame = newFrame;
      this.texture = this._activeAnimation.getFrame(this._frame);
    }

    // Delaying these calls to avoid any issues with destroying the item in these callbacks
    if (looped) {
      this._activeAnimation.fireOnLoop();
    } else if (complete) {
      this._activeAnimation.fireOnComplete(this._isReversed);
    }
  }
}
