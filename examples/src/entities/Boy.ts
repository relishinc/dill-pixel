import { Container, Interactive } from 'dill-pixel';

import { Rectangle } from 'pixi.js';
import { Spine } from '@pixi/spine-pixi';

export class Boy extends Interactive(Container) {
  private _container: Container;
  private _spine: Spine;
  private _animations: string[];
  private _currentAnimation: number;

  constructor() {
    super();
    this._container = this.add.container();
    this._spine = this._container.add.spine({
      data: 'spine/spineboy-pro',
      autoUpdate: true,
      loop: true,
    });
    this._animations = this._spine.state.data.skeletonData.animations.map((a) => a.name);
    console.log(this._animations);
    this._currentAnimation = 0;
  }

  added() {
    console.log('Boy added!');
    this._setAnimation();

    this.eventMode = 'static';
    this.interactiveChildren = true;
    this.cursor = 'pointer';
    this.hitArea = new Rectangle(-350, -500, 500, 500);

    this.onInteraction('pointerdown').connect(this._next);
  }

  _next() {
    console.log('Boy:: next');
    this._currentAnimation++;
    if (this._currentAnimation >= this._animations.length) {
      this._currentAnimation = 0;
    }
    this._setAnimation();
  }

  _setAnimation() {
    console.log(`Boy:: setting animation to ${this._animations[this._currentAnimation]}`);
    this._spine.state.setAnimation(0, this._animations[this._currentAnimation], true);
  }
}
