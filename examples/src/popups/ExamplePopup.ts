import { buttonStyle, GREEN } from '@/utils/Constants';
import { Container, forceFocus, Popup, registerFocusables } from 'dill-pixel';
import { gsap } from 'gsap';
import { Point, Sprite, Text } from 'pixi.js';

export default class ExamplePopup extends Popup {
  _bg: Sprite;
  _text: Text;
  _button: Container;

  public static get NAME(): string {
    return 'ExamplePopup';
  }

  init(size: Point) {
    super.init(size);

    this._bg = this.add.coloredSprite({
      color: GREEN,
      size: [400, 300],
      shape: 'rounded_rectangle',
      radius: 20,
    });
  }

  show(token: any): void {
    super.show(token);
    this._text = this.add.text({
      value: `This is popup ${this._popupData}`,
      style: { align: 'center', fill: 'black', fontSize: 24, fontFamily: 'Kumbh Sans' },
      anchor: 0.5,
      position: [0, -40],
    });

    this._button = this.add.container({
      alpha: 1,
      position: [0, 40],
    });

    this._button.add.coloredSprite({ color: 0xffffff, size: [200, 60], shape: 'rounded_rectangle', radius: 10 });
    this._button.add.text({ value: 'Close me', anchor: 0.5, style: { ...buttonStyle, fontSize: 18 } });
    this._button.eventMode = 'static';
    this._button.cursor = 'pointer';
    this._button.focusable = true;

    registerFocusables(this._button);

    this._button.on('pointerdown', this.close);
    this._button.onFocusActivated = this.close;
  }

  async animateIn(callback: () => void): Promise<void> {
    if (this.blackout) {
      gsap.fromTo(this.blackout, { alpha: 0 }, { alpha: 1, visible: true, duration: 0.3 });
    }
    await gsap.fromTo(this, { alpha: 0, y: 20 }, { alpha: 1, y: 0, visible: true, ease: 'sine.out', duration: 0.4 });
    forceFocus(this._button);
    callback();
  }

  async animateOut(callback: () => void): Promise<void> {
    gsap.to(this, { alpha: 0, y: -10, ease: 'sine.in', duration: 0.3 });
    if (this.blackout) {
      await gsap.to(this.blackout, { alpha: 0, duration: 0.2, delay: 0.1 });
    }
    callback();
  }
}
