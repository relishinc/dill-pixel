import { LoadScreen } from 'dill-pixel';
import { gsap, Sine } from 'gsap';
import { Sprite, Point } from 'pixi.js';
import { Spinner } from './gameobjects/Spinner';

export class Interstitial extends LoadScreen {
  public static NAME: string = 'Interstitial';

  private _bg!: Sprite;
  private _spinner!: Spinner;

  public init(pSize: Point) {
    super.init(pSize);
    this._bg = this.add.sprite({ asset: 'black2x2', scale: [this._size.x, this._size.y] });
  }

  public onLoadProgress(progress: number) {
  }

  public async animateIn(pOnComplete: () => void): Promise<void> {

    // Create spinner
    this._spinner = this.add.existing(new Spinner(this.app));
    this._spinner.start();

    await gsap.timeline().fromTo(this, {
      alpha: 0,
    }, {
      duration: 0.5,
      alpha: 1,
      ease: Sine.easeOut,
    });

    pOnComplete();
  }

  public async animateOut(pOnComplete: () => void): Promise<void> {

    await gsap.timeline().fromTo(this, {
      alpha: 1, 
    }, {
      duration: 0.5,
      alpha: 0,
      ease: Sine.easeInOut,
    });
  
    // Remove spinner
    this._spinner.stop();
    this.removeChild(this._spinner);

    pOnComplete();
  }

  public onResize(pSize: Point) {
    super.onResize(pSize);

    if (this._bg !== undefined) {
      this._bg.scale.set(this._size.x, this._size.y);
    }
  }

  public destroy() {
    super.destroy();
  }

}
