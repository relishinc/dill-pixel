import { Container, Focusable, IPopup, Interactive, Popup } from 'dill-pixel';
import { Graphics, Text } from 'pixi.js';

import { gsap } from 'gsap';

const _Button = Focusable(Interactive(Container));

export class SimpleButton extends _Button {
  view: Graphics;

  constructor() {
    super();
    this.init();
  }

  init() {
    this.view = this.add.graphics().roundRect(0, 0, 60, 40).fill(0xff0000);
    this.cursor = 'pointer';
  }
}

class FocusableText extends Focusable(Text) {}

export class ExamplePopup extends Popup implements IPopup {
  window: Container;
  windowBacking: Graphics;
  title: FocusableText;
  closeButton: SimpleButton;

  protected _showAnimation: gsap.core.Timeline;

  initialize() {
    this.window = this.view.add.container({ x: -300, y: -200 });
    this.windowBacking = this.window.add
      .graphics()
      .roundRect(0, 0, Math.min(this.app.size.width - 40, 600), 400, 10)
      .fill({ color: 0x000fff });

    this.title = this.window.add.existing(
      new FocusableText({
        text: this.config.data?.title ?? 'Example Popup',
        style: {
          fill: 'white',
          fontWeight: 'bold',
          fontFamily: 'Arial',
        },
      }),
      {
        x: 50,
        y: 80,
        accessibleTitle: 'Popup text',
        accessibleType: 'div',
        accessibleHint: this.config.data?.title ?? 'Example' + ' Popup',
      },
    );

    this.closeButton = this.window.add.existing(new SimpleButton(), { x: this.windowBacking.width - 70, y: 10 });
    this.closeButton.accessibleTitle = 'Close button';
    this.closeButton.accessibleHint = 'Click to close popup';

    this.firstFocusableEntity = this.closeButton;
    this.app.focus.add(this.title, this.id, false);

    if (this.backing) {
      this.backing.alpha = 0;
    }
    this.window.x = -this.window.width * 0.5;
    this.window.alpha = 0;
    this.window.pivot.set(0, -10);
  }

  async show() {
    this._showAnimation = gsap.timeline();
    if (this.backing) {
      this._showAnimation.to(this.backing, { alpha: 1, duration: 0.5, ease: 'sine.out' });
    }
    this._showAnimation.to(this.window, { alpha: 1, duration: 0.3, ease: 'sine.out' }, '<+=0.25');
    this._showAnimation.to(this.window.pivot, { x: 0, y: 0, duration: 0.3, ease: 'sine.out' }, '<');
    return this._showAnimation;
  }

  public start() {
    this.closeButton.onInteraction('click').connectOnce(this.close);
    this.closeButton.onInteraction('tap').connectOnce(this.close);
  }

  async hide() {
    this._showAnimation.timeScale(2);
    return this._showAnimation.reverse();
  }

  resize() {
    super.resize();
    if (
      this.windowBacking.width > this.app.size.width ||
      (this.app.size.width > 600 && this.windowBacking.width < 600)
    ) {
      this.windowBacking.clear();
      this.windowBacking.roundRect(0, 0, Math.min(this.app.size.width - 40, 600), 400, 10).fill({ color: 0x000fff });
    }
    this.closeButton.x = this.windowBacking.width - 70;
    this.window.x = -this.window.width * 0.5;
  }
}
