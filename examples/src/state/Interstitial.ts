import * as HLF from 'dill-pixel';
import { gsap, Sine } from 'gsap';
import * as PIXI from 'pixi.js';

export class Interstitial extends HLF.LoadScreen {
  public static NAME: string = 'Interstitial';

  private _bg!: PIXI.Sprite;
  private _loaded: boolean = false;

  public init(pSize: PIXI.Point, pData?: any) {
    super.init(pSize, pData);
    this._bg = this.add.sprite('black2x2', undefined, 0, 0, 0.5, [this._size.x, this._size.y]);
  }

  public onLoadProgress(progress: number) {
    console.log('interstitial progress', progress);
  }

  public async animateIn(pOnComplete: () => void): Promise<void> {
    const timeline = gsap.timeline();
    await timeline.to(this._bg, {
      duration: 1,
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
    console.log('got to oncomplete');
    pOnComplete();
  }

  public onResize(pSize: PIXI.Point) {
    super.onResize(pSize);

    if (this._bg !== undefined) {
      this._bg.scale.set(this._size.x, this._size.y);
    }
  }
}
