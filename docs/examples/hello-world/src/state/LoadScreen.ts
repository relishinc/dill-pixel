import { LoadScreen as DillPixelLoadScreen } from 'dill-pixel';
import { Point, Sprite } from 'pixi.js';

// The load screen is simply a black background

export class LoadScreen extends DillPixelLoadScreen {
  static NAME: string = 'LoadScreen';
  private _bg!: Sprite;

  // Create the black background

  public init(pSize: Point) {
    super.init(pSize);
    this._bg = this.add.coloredSprite(0x000000);
  }

  // When the screen resizes, resize the background

  public onResize(pSize: Point) {
    super.onResize(pSize);

    if (this._bg) {
      this._bg.width = this._size.x;
      this._bg.height = this._size.y;
    }
  }
}
