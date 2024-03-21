import { Spine } from '@pixi/spine-pixi';
import { Container } from 'pixi.js';

/**
 * Spine-animated cauldron, with some dynamic functionality, like
 * play splash animation and set up an inner sprite that follows up the spine animation.
 */
export class Cauldron extends Container {
  /** Inner container for the cauldron */
  private container: Container;
  private spine: Spine;

  constructor(shadow = false) {
    super();
    this.container = new Container();
    this.addChild(this.container);

    this.spine = Spine.from({
      skeleton: 'game/cauldron-skeleton.json',
      atlas: 'game/cauldron-skeleton.atlas',
    });

    this.spine.autoUpdate = true;
    this.spine.y = 50;
    this.spine.state.setAnimation(0, 'animation', true);
    this.container.addChild(this.spine);
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
}
