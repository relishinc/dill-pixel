import { GREEN } from '@/utils/Constants';
import { Popup } from 'dill-pixel';
import { gsap } from 'gsap';
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
    if (this.blackout) {
      this.blackout.alpha = 0;
      this.blackout.eventMode = 'none';
    }

    this._bg = this.add.coloredSprite({
      color: GREEN,
      size: [400, 300],
      shape: 'rounded_rectangle',
      radius: 20,
    });
  }

  show(pToken: any): void {
    super.show(pToken);
    this._text = this.add.text({
      value: `This is a popup ${this._popupData}`,
      style: { align: 'center', fill: 'white', fontSize: 24, fontFamily: 'arboria' },
    });
  }

  async AnimateIn(pCallback: () => void): Promise<void> {
    this.y = 10;
    if (this.blackout) {
      await gsap.to(this.blackout, { alpha: 1, visible: true, duration: 0.3 });
    }
    await gsap.to(this, { alpha: 1, y: 0, visible: true, ease: 'sine.out', duration: 0.4 });
    pCallback();
  }

  async AnimateOut(pCallback: () => void): Promise<void> {
    gsap.to(this, { alpha: 0, y: -5, ease: 'sine.in', duration: 0.3 });
    if (this.blackout) {
      await gsap.to(this.blackout, { alpha: 0, duration: 0.2, delay: 0.1 });
    }

    pCallback();
  }
}
