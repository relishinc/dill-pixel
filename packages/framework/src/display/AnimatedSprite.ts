import { AnimatedSprite as PIXIAnimatedSprite, Texture, Ticker } from 'pixi.js';
import { AnimatedSpriteProps, resolveTexture } from '../mixins';
import { Signal } from '../signals';
import {
  bindAllMethods,
  getFirstMapEntry,
  getLastMapEntry,
  getNextMapEntry,
  getPreviousMapEntry,
  getZeroPaddedNumber,
  Logger,
  SpriteSheetLike,
} from '../utils';

export class AnimatedSprite extends PIXIAnimatedSprite {
  onAnimationChange: Signal<(currentAnimation: string) => void> = new Signal();
  onAnimationStart: Signal<() => void> = new Signal();
  onAnimationStop: Signal<() => void> = new Signal();
  onAnimationLoop: Signal<() => void> = new Signal();
  onAnimationComplete: Signal<() => void> = new Signal();
  onAnimationFrameChange: Signal<() => void> = new Signal();
  public defaultTexturePrefix: string = '';
  public defaultSheet: string | undefined;
  public defaultAnimation: string;
  public defaultAnimationSpeed: number;
  public defaultZeroPad: number | undefined;
  public autoPlay: boolean;
  public currentAnimation: string;
  protected _animations: Map<string, Texture[]>;

  constructor(protected config?: Partial<AnimatedSpriteProps>) {
    // get default animation
    const animations = config?.animations ?? {};
    const defaultAnimationName = config?.animation ?? Object.keys(animations)[0];
    const defaultAnimation = animations[defaultAnimationName as string];
    const defaultSheet = config?.sheet;
    const defaultTexturePrefix = config?.texturePrefix || '';
    const defaultZeroPad = config?.zeroPad;
    const defaultStartIndex = config?.startIndex ?? 0;

    super(
      AnimatedSprite.generateTexturesFromProps(
        defaultAnimationName,
        defaultAnimation,
        defaultTexturePrefix,
        defaultSheet,
        defaultZeroPad,
        defaultStartIndex,
      ),
      config?.autoUpdate !== false,
    );
    bindAllMethods(this);
    this.defaultSheet = defaultSheet;
    this.defaultTexturePrefix = defaultTexturePrefix;
    this.defaultZeroPad = defaultZeroPad;
    this._generateAnimations();
    this.currentAnimation = this.defaultAnimation = defaultAnimationName;
    this.autoPlay = config?.autoPlay ?? true;
    this.loop = config?.loop ?? true;
    this.updateAnchor = config?.updateAnchor ?? false;
    this.animationSpeed = this.defaultAnimationSpeed = config?.animationSpeed ?? 1;
    this.on('added', this._added);
  }

  protected _paused: boolean = false;

  get paused(): boolean {
    return this._paused;
  }

  set paused(value: boolean) {
    this._paused = value;
  }

  get speed(): number {
    return this.animationSpeed;
  }

  set speed(value: number) {
    this.animationSpeed = this.defaultAnimationSpeed = value;
  }

  protected _isReversed: boolean = false;

  get isReversed(): boolean {
    return this._isReversed;
  }

  static generateTexturesFromProps(
    animationName: string,
    props?: Partial<AnimatedSpriteProps>,
    defaultTexturePrefix = '',
    defaultSheet: SpriteSheetLike | undefined = undefined,
    defaultZeroPad?: number,
    defaultStartIndex?: number,
  ): Texture[] {
    const textures: Texture[] = [];
    let asset = '';
    const sheet = props?.sheet ?? defaultSheet;
    if (props?.numFrames > 1) {
      const idx = props?.startIndex ?? defaultStartIndex ?? 0;
      for (let i = idx; i < idx + props?.numFrames; i++) {
        asset = `${defaultTexturePrefix}${props?.texturePrefix ?? animationName}${getZeroPaddedNumber(i, props?.zeroPad ?? defaultZeroPad)}`;
        textures.push(
          resolveTexture({
            asset,
            sheet,
          }),
        );
      }
    } else {
      asset = `${defaultTexturePrefix}${props?.texturePrefix ?? animationName}`;
      textures.push(
        resolveTexture({
          asset,
          sheet,
        }),
      );
    }
    return textures;
  }

  reverse() {
    this._isReversed = !this._isReversed;
    if (this._isReversed) {
      this.setAnimation(`${this.currentAnimation}_reverse`);
    } else {
      this.setAnimation(this.currentAnimation.split('_reverse')[0]);
    }
  }

  setAnimation(animationName: string, autoPlay: boolean = true) {
    if (!this._animations.has(animationName)) {
      Logger.error(`Animation ${animationName} does not exist`);
      return;
    }
    this.textures = this._animations.get(animationName) as Texture[];
    this.currentAnimation = animationName;
    const animSpeed = this.config?.animations?.[animationName.split('_reverse')[0]]?.animationSpeed;
    if (animSpeed) {
      this.animationSpeed = animSpeed;
    } else {
      this.animationSpeed = this.defaultAnimationSpeed;
    }
    this.onAnimationChange.emit(animationName);
    if (autoPlay) {
      this.play();
    }
  }

  play() {
    super.play();
    this.onAnimationStart?.emit();
  }

  stop() {
    super.stop();
    this.onAnimationStop?.emit();
  }

  nextAnimation() {
    const entry = getNextMapEntry(this._animations, this.currentAnimation) ?? getFirstMapEntry(this._animations);
    if (entry) {
      this.setAnimation(entry[0]);
    }
  }

  previousAnimation() {
    const entry = getPreviousMapEntry(this._animations, this.currentAnimation) ?? getLastMapEntry(this._animations);
    if (entry) {
      this.setAnimation(entry[0]);
    }
  }

  update(ticker: Ticker) {
    if (this._paused) {
      return;
    }
    super.update(ticker);
  }

  private _generateAnimations() {
    this._animations = new Map();
    const animations = this.config?.animations ?? {};
    if (animations) {
      for (const [key, value] of Object.entries(animations)) {
        this._animations.set(
          key,
          AnimatedSprite.generateTexturesFromProps(
            key,
            value,
            this.defaultTexturePrefix,
            this.defaultSheet,
            this.defaultZeroPad,
          ),
        );
      }
      if (this.config?.reversible) {
        for (const [key, value] of Object.entries(animations)) {
          const textures = AnimatedSprite.generateTexturesFromProps(
            key,
            value,
            this.defaultTexturePrefix,
            this.defaultSheet,
            this.defaultZeroPad,
          );
          textures.reverse();
          this._animations.set(`${key}_reverse`, textures);
        }
      }
    }
  }

  private _added() {
    this.onLoop = () => {
      this.onAnimationLoop.emit();
    };
    this.onComplete = () => {
      this.onAnimationComplete.emit();
    };
    this.onFrameChange = () => {
      this.onAnimationFrameChange.emit();
    };

    if (this.autoPlay) {
      this.play();
    }
  }
}
