import { GREEN } from '@/utils/Constants';
import { AssetMapData, LoadScreen, SplashScreen as DillPixelSplashScreen } from 'dill-pixel';
import { gsap } from 'gsap';
import { Point, Sprite } from 'pixi.js';

export class SplashScreen extends LoadScreen {
  public static NAME: string = DillPixelSplashScreen.NAME;

  private _bg!: Sprite;
  private _black!: Sprite;

  public static get Assets(): AssetMapData[] {
    return [];
  }

  public init(pSize: Point) {
    super.init(pSize);
  }

  public async animateIn(pOnComplete: () => void): Promise<void> {
    this._bg = this.add.coloredSprite(GREEN, 0);

    this.onResize(this.app.size);

    await gsap.to(this._bg, {
      duration: 0.75,
      alpha: 1,
      ease: 'sine.out',
    });

    if (pOnComplete) {
      pOnComplete();
    }
  }

  public async animateOut(pOnComplete: () => void): Promise<void> {
    await gsap.to(this, {
      duration: 0.5,
      alpha: 0,
      ease: 'sine.in',
    });
    if (pOnComplete) {
      pOnComplete();
    }
  }

  public onResize(pSize: Point) {
    super.onResize(pSize);
    if (this._bg) {
      this._bg.width = pSize.x;
      this._bg.height = pSize.y;
    }
  }
}
