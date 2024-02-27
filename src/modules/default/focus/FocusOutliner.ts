import { Container, DestroyOptions, Graphics, PointLike } from 'pixi.js';
import { Application } from '../../../core';
import { bindMethods } from '../../../utils';
import { IFocusable } from './FocusManager';

export type FocusOutlinerConfig = {
  color: number;
  shape: 'rectangle' | 'rounded rectangle';
  lineWidth?: number;
  radius?: number;
};

export interface IFocusOutliner {
  position: PointLike;

  draw(focusTarget: IFocusable): void;

  clear(): void;

  destroy(args?: DestroyOptions): void;
}

export class FocusOutliner extends Container implements IFocusOutliner {
  private _config: FocusOutlinerConfig;
  private _graphics: Graphics;
  private _focusTarget: IFocusable;

  constructor(conig?: Partial<FocusOutlinerConfig>) {
    super();
    bindMethods(this, '_updatePosition');
    this._config = {
      color: 0x00ffff,
      shape: 'rounded rectangle',
      radius: 8,
      lineWidth: 2,
      ...conig,
    };
    this._graphics = new Graphics();
    this.addChild(this._graphics);
  }

  public draw(focusTarget: IFocusable): void {
    this.clear();
    const bounds = focusTarget.getBounds();
    this._graphics.strokeStyle = { width: this._config.lineWidth, color: this._config.color, alpha: 1 };
    if (this._config.shape === 'rectangle') {
      this._graphics.rect(-bounds.width * 0.5, -bounds.height * 0.5, bounds.width, bounds.height);
    } else {
      this._graphics.roundRect(
        -bounds.width * 0.5,
        -bounds.height * 0.5,
        bounds.width,
        bounds.height,
        this._config.radius,
      );
    }

    this._graphics.stroke();
    if (focusTarget) {
      this._focusTarget = focusTarget;
      Application.getInstance().ticker.add(this._updatePosition);
    }
  }

  public clear(): void {
    this._graphics.clear();
    Application.getInstance().ticker.remove(this._updatePosition);
  }

  public destroy(options?: DestroyOptions) {
    this.clear();
    this._graphics.destroy();
    super.destroy(options);
  }

  private _updatePosition() {
    if (!this._focusTarget) {
      return;
    }
    this.position.set(this._focusTarget.getGlobalPosition().x, this._focusTarget.getGlobalPosition().y);
  }
}
