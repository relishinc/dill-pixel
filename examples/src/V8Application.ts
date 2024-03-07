import { Application, Container, Focusable, Interactive, PIXIGraphics } from 'dill-pixel';
import { Assets } from 'pixi.js';

const _Actor = Focusable(Interactive(Container));

export class Actor extends _Actor {
  private _view: PIXIGraphics;
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

  focus() {
    this._view.tint = 0xff0000;
    this.animateFromTo({ y: this._originalY }, { y: 400, yoyo: true, repeat: -1, duration: 1, ease: 'sine.inOut' });
  }

  blur() {
    this._view.tint = this.color;
    this.clearAnimations();
    this.y = this._originalY;
  }

  getFocusArea() {
    // custom boundary
    const bounds = this.getBounds();
    bounds.width += 30;
    bounds.height += 30;
    bounds.x -= 15;
    bounds.y -= 15;
    return bounds;
  }

  added() {
    this.eventMode = 'static';
    this._view = this.add.graphics().circle(0, 0, 50).fill('white');
    this._view.tint = this.color;
    this.accessibleType = 'button';
    this.accessibleTitle = 'Actor';
    this.accessibleHint = 'Press enter to change color';
    this.alpha = 0.5;
    this._originalY = this.y;
  }

  setTint(color: number = 0xffffff) {
    this.color = color;
    this._view.tint = color;
  }
}

export class V8Application extends Application {
  protected async setup() {
    await Assets.loadBundle(['required', 'game']);
  }

  public customFunction(): void {
    console.log('V8App custom function');
  }
}
