import { Container, Interactive, Spine } from 'dill-pixel';

import { Rectangle } from 'pixi.js';
import { gsap } from 'gsap';

/**
 * Spine-animated cauldron, with some dynamic functionality, like
 * play splash animation and set up an inner sprite that follows up the spine animation.
 */
export class Dragon extends Interactive(Container) {
  /** Inner container for the cauldron */
  private container: Container;
  private spine: Spine;
  private readonly _animations = [this.playIdle, this.playBubbles, this.playTransition];
  private _currentAnimation = 0;

  constructor() {
    super();
    this.container = this.add.container({ scale: 0 });

    this.spine = this.container.add.spine({
      data: 'spine/dragon-skeleton',
      animationName: 'dragon-bubbles',
      loop: true,
      autoUpdate: true,
    });

    this.eventMode = 'static';
    this.interactiveChildren = true;
    this.cursor = 'pointer';
    this.hitArea = new Rectangle(-this.spine.width * 0.5, -this.spine.height, this.spine.width, this.spine.height);

    this.addSignalConnection(this.onInteraction('pointerdown').connect(this._next));
  }

  playIdle() {
    this.spine.state.setAnimation(0, 'dragon-idle', true);
  }

  /** Play dragon's bubbles animation, in loop */
  public playBubbles() {
    this.spine.state.setAnimation(0, 'dragon-bubbles', true);
  }

  /** Play dragon's transition animation, in loop */
  public playTransition() {
    this.spine.state.setAnimation(0, 'dragon-transition', true);
  }

  /** Show cauldron */
  public async show(animated = true) {
    gsap.killTweensOf(this.container.scale);
    this.visible = true;
    if (animated) {
      this.container.scale.set(0);
      await gsap.to(this.container.scale, { x: 1, y: 1, duration: 0.3, ease: 'back.out' });
    } else {
      this.container.scale.set(1);
    }
  }

  /** Hide cauldron */
  public async hide(animated = true) {
    gsap.killTweensOf(this.container.scale);
    if (animated) {
      await gsap.to(this.container.scale, { x: 0, y: 0, duration: 0.3, ease: 'back.in' });
    } else {
      this.container.scale.set(0);
    }
    this.visible = false;
  }

  private _next() {
    this._currentAnimation = (this._currentAnimation + 1) % this._animations.length;
    this._animations[this._currentAnimation]();
  }
}
