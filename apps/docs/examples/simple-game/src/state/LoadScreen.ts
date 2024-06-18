import { LoadScreen as DillPixelLoadScreen } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite, Point } from 'pixi.js';

// The load screen is simply a black background

export class LoadScreen extends DillPixelLoadScreen {
  public static NAME: string = 'LoadScreen';

  private _bg!: Sprite;

  // Create the black background

  public init(pSize: Point) {
    super.init(pSize);
    this._bg = this.add.coloredSprite(0x000000);
  }

  // Animate the black background in from alpha 0 to 1

  public async animateIn(pOnComplete: () => void): Promise<void> {
    await gsap.timeline().fromTo(
      this._bg,
      {
        alpha: 0,
      },
      {
        duration: 0.5,
        alpha: 1,
      },
    );
    pOnComplete();
  }

  // Animate the black background out from alpha 1 to 0

  public async animateOut(pOnComplete: () => void): Promise<void> {
    await gsap.timeline().fromTo(
      this._bg,
      {
        alpha: 1,
      },
      {
        duration: 0.5,
        alpha: 0,
      },
    );
    pOnComplete();
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
