import { LoadScreen } from 'dill-pixel';
import { gsap, Sine } from 'gsap';
import { Sprite, Point } from 'pixi.js';

export class Interstitial extends LoadScreen {
  public static NAME: string = 'Interstitial';

  private _bg!: Sprite;
  private _loaded: boolean = false;

  public init(pSize: Point) {
    super.init(pSize);
    this._bg = this.add.sprite({ asset: 'black2x2', alpha: 0, scale: [this._size.x, this._size.y] });
  }

  public onLoadProgress(progress: number) {
  }

  public async animateIn(pOnComplete: () => void): Promise<void> {
    const timeline = gsap.timeline();
    await timeline.to(this._bg, {
      duration: 0.5,
      alpha: 1,
      ease: Sine.easeOut,
    });
    pOnComplete();
  }

  public async animateOut(pOnComplete: () => void): Promise<void> {
    const timeline = gsap.timeline();
    await timeline.to(this._bg, {
      duration: 0.5,
      alpha: 0,
      ease: Sine.easeInOut,
    });
    document.body.dispatchEvent(new Event('loadComplete'));
    pOnComplete();
  }

  public onResize(pSize: Point) {
    super.onResize(pSize);

    if (this._bg !== undefined) {
      this._bg.scale.set(this._size.x, this._size.y);
    }
  }
}
