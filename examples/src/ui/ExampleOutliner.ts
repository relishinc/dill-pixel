import { Animated, FocusOutliner, FocusOutlinerConfig, IFocusable } from '@relish-studios/dill-pixel';
import { Graphics } from 'pixi.js';

export class ExampleOutliner extends Animated(FocusOutliner) {
  _anim: gsap.core.Tween;
  private _corner1: Graphics = new Graphics();
  private _corner2: Graphics = new Graphics();
  private _corner3: Graphics = new Graphics();
  private _corner4: Graphics = new Graphics();
  private _corners: Graphics[] = [this._corner1, this._corner2, this._corner3, this._corner4];

  constructor(config?: Partial<FocusOutlinerConfig>) {
    super(config);
  }

  draw(focusTarget: IFocusable): void {
    this.clear();
    this.setFocusTarget(focusTarget);
    this._graphics.strokeStyle = { width: 4, color: this._config.color, alpha: 1 };
  }

  clear(): void {
    this.clearFocusTarget();
    this._corners.forEach((corner) => {
      corner.clear();
    });
  }
}
