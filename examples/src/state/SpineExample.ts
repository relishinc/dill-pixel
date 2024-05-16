import { BaseState } from '@/state/BaseState';
import { AssetMapData, SpineAsset } from 'dill-pixel';
import { Spine } from 'pixi-spine';
import { Point } from 'pixi.js';

export class SpineExample extends BaseState {
  private _spine: Spine;
  private _animations: string[];
  private _currentAnimation: number;

  public static get NAME(): string {
    return 'SpineExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new SpineAsset('spineboy-pro')];
  }

  init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('Spine example');
    this.setMainText('Click anywhere to change the animation');

    this._spine = this.add.spine({
      name: 'spineboy-pro',
      autoUpdate: true,
      scale: 0.75,
      position: [0, this.app.size.y * 0.5 - 20],
    });
    this._animations = this._spine.state.data.skeletonData.animations.map((a) => a.name);
    this._currentAnimation = 0;
    this.setAnimation();

    this.eventMode = 'static';
    this.on('pointerdown', this.handlePointerDown);
  }

  setAnimation() {
    this._spine.state.setAnimation(0, this._animations[this._currentAnimation], true);
    this.setMainText(
      `Current animation: "${this._animations[this._currentAnimation]}"\nClick anywhere to change the animation`,
    );
  }

  handlePointerDown() {
    // go to the next animation
    this._currentAnimation++;
    if (this._currentAnimation >= this._animations.length) {
      this._currentAnimation = 0;
    }
    this.setAnimation();
  }
}
