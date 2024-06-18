import { Container, Focusable, Interactive } from 'dill-pixel';
import { Graphics } from 'pixi.js';

const _Actor = Focusable(Interactive(Container));

export class Actor extends _Actor {
  private _view: Graphics;
  private _originalY: number;

  constructor(private color: number = 0xffffff) {
    super();
  }

  focusIn() {
    this.alpha = 1;
  }

  focusOut() {
    this.alpha = 0.5;
  }

  click() {
    this._view.tint = 0xff0000;
    this.animateFromTo({ y: this._originalY }, { y: 400, yoyo: true, repeat: -1, duration: 1, ease: 'sine.inOut' });
  }

  blur() {
    this._view.tint = this.color;
    this.clearAnimations();
    this.y = this._originalY;
  }

  getFocusPosition() {
    return { x: -this._view.width * 0.5 - 15, y: -this._view.height * 0.5 - 15 };
  }

  getFocusArea() {
    // custom boundary
    const bounds = this._view.getBounds();
    bounds.width += 30;
    bounds.height += 30;
    bounds.x -= 15;
    bounds.y -= 15;
    return bounds;
  }

  added() {
    this.eventMode = 'static';
    this.accessibleType = 'div';
    this.accessibleChildren = true;

    this._view = this.add.graphics().circle(0, 0, 50).fill({ color: 'white' });
    this._view.tint = this.color;

    this.alpha = 0.5;
    this._originalY = this.y;
  }

  setTint(color: number = 0xffffff) {
    this.color = color;
    this._view.tint = color;
  }
}
