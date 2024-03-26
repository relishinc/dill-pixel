import { Container, Focusable, Interactive, IPopup, Popup } from 'dill-pixel';
import { gsap } from 'gsap';
import { Graphics, Text } from 'pixi.js';

const _Button = Focusable(Interactive(Container));

export class SimpleButton extends _Button {
  view: Graphics;

  constructor() {
    super();
    this.init();
  }

  focusIn() {}

  init() {
    this.view = this.add.graphics().roundRect(0, 0, 60, 40).fill(0xff0000);
  }
}

export class ExamplePopup extends Popup implements IPopup {
  window: Container;
  title: Text;
  closeButton: SimpleButton;

  protected _showAnimation: gsap.core.Timeline;

  initialize() {
    this.window = this.view.add.container({ x: -300, y: -200 });
    this.window.add.graphics().roundRect(0, 0, 600, 400, 10).fill({ color: 0x000fff });
    this.title = this.window.add.text({
      text: this.config.data?.title ?? 'Example Popup',
      style: { fill: 'white', fontWeight: 'bold', fontFamily: 'Arial' },
      x: 50,
      y: 80,
    });

    this.closeButton = this.window.add.existing(new SimpleButton(), { x: 530, y: 10 });

    this.firstFocusableEntity = this.closeButton;

    if (this.backing) {
      this.backing.alpha = 0;
    }
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

  async close() {
    void this.app.popups.hide(this.id);
  }
}
