import { LoadScreen as DillPixelLoadScreen } from '@relish-studios/dill-pixel';
import { Sprite, Point } from 'pixi.js';

export class LoadScreen extends DillPixelLoadScreen {
  public static NAME: string = 'LoadScreen';

  private _bg!: Sprite;

  public init(pSize: Point) {
    super.init(pSize);
    this._bg = this.add.coloredSprite(0x000000);
  }

  public onResize(pSize: Point) {
    super.onResize(pSize);

    if (this._bg) {
      this._bg.width = this._size.x;
      this._bg.height = this._size.y;
    }
  }
}
