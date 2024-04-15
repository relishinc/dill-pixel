import { BaseState } from '@/state/BaseState';
import { AssetMapData, AssetType, SpineAsset, TextureAsset, TextureAtlasAsset } from '@relish-studios/dill-pixel';
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
    return [
      new SpineAsset('spineboy-pro'),
      new TextureAsset('pickle', AssetType.PNG),
      new TextureAtlasAsset('buildings'),
    ];
  }

  init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('Spine Example');

    this._mainTitle.y = -150;

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
      `Current Animation: "${this._animations[this._currentAnimation]}"\nClick anywhere to change the animation.`,
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
