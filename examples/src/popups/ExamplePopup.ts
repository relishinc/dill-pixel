import { GREEN } from '@/utils/Constants.ts';
import { gsap } from 'gsap';
import { Popup } from 'html-living-framework/Popup';
import { Point, Sprite, Text } from 'pixi.js';

export default class ExamplePopup extends Popup {
  _bg: Sprite;
  _text: Text;

  public static get NAME(): string {
    return 'ExamplePopup';
  }

  init(pSize: Point) {
    super.init(pSize);

    this.alpha = 0;
    this.blackout.alpha = 0;
    this.blackout.eventMode = 'none';

    this._bg = this.add.coloredSprite(GREEN, [400, 400], 'rounded_rectangle', 1, [0, 0], 0.5, 1, { radius: 20 });
  }

  show(pToken: any): void {
    super.show(pToken);
    this._text = this.add.text(`This is a popup ${this._popupData}`, {
      align: 'center',
      fill: 'white',
      fontSize: 24,
      fontFamily: 'arboria',
    });
  }

  async AnimateIn(pCallback: () => void): Promise<void> {
    this.y = 10;
    await gsap.to(this.blackout, { alpha: 1, visible: true, duration: 0.3 });
    await gsap.to(this, { alpha: 1, y: 0, visible: true, ease: 'sine.out', duration: 0.4 });
    pCallback();
  }

  async AnimateOut(pCallback: () => void): Promise<void> {
    gsap.to(this, { alpha: 0, y: -5, ease: 'sine.in', duration: 0.3 });
    await gsap.to(this.blackout, { alpha: 0, duration: 0.2, delay: 0.1 });
    pCallback();
  }
}
