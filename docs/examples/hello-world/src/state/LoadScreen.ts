import { LoadScreen as DillPixelLoadScreen } from '@relish-studios/dill-pixel';
import { Sprite, Point } from 'pixi.js';

export class LoadScreen extends DillPixelLoadScreen {
  private _bg!: Sprite;

  public init(pSize: Point) {
    super.init(pSize);
    this._bg = this.add.coloredSprite(0xff0000);
  }

  public async animateIn(pOnComplete: () => void): Promise<void> {
    this._bg.alpha = 1;
    pOnComplete();
  }

  public async animateOut(pOnComplete: () => void): Promise<void> {
    this._bg.alpha = 0;
    pOnComplete();
  }

  public onResize(pSize: Point) {
    super.onResize(pSize);

    if (this._bg) {
      this._bg.width = this._size.x;
      this._bg.height = this._size.y;
    }
  }
}
