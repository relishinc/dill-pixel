import { Bounds, Container, DestroyOptions, Graphics, PointLike } from 'pixi.js';
import { Application } from '../../core/Application';
import { bindAllMethods, resolvePointLike } from '../../utils';
import type { IFocusable } from './FocusManagerPlugin';

export type FocusOutlinerConfig = {
  color: number;
  shape: 'rectangle' | 'rounded rectangle';
  lineWidth?: number;
  radius?: number;
};

export interface IFocusOutliner {
  position: PointLike;
  focusBounds: Bounds;

  draw(focusTarget: IFocusable): void;

  clear(): void;

  destroy(args?: DestroyOptions): void;

  setFocusTarget(focusTarget: IFocusable): void;

  clearFocusTarget(): void;

  updatePosition(): void;
}

export class FocusOutliner extends Container implements IFocusOutliner {
  focusBounds: Bounds;
  focusTarget: IFocusable | null;
  protected _config: FocusOutlinerConfig;
  protected _graphics: Graphics;

  constructor(config?: Partial<FocusOutlinerConfig>) {
    super();
    bindAllMethods(this);
    this._config = {
      color: 0x00ffff,
      shape: 'rounded rectangle',
      radius: 8,
      lineWidth: 2,
      ...config,
    };
    this._graphics = new Graphics();
    this.addChild(this._graphics);
  }

  public draw(focusTarget: IFocusable): void {
    this.clear();
    this.setFocusTarget(focusTarget);
    if (!this.focusTarget) {
      return;
    }
    this._graphics.strokeStyle = { width: this._config.lineWidth, color: this._config.color, alpha: 1 };
    if (this._config.shape === 'rectangle') {
      this._graphics.rect(0, 0, this.focusBounds.width, this.focusBounds.height);
    } else {
      this._graphics.roundRect(0, 0, this.focusBounds.width, this.focusBounds.height, this._config.radius);
    }
    this._graphics.stroke();
  }

  public clear(): void {
    this.clearFocusTarget();
  }

  public destroy(options?: DestroyOptions) {
    this.clear();
    this._graphics.destroy();
    super.destroy(options);
  }

  public setFocusTarget(focusTarget: IFocusable) {
    if (focusTarget) {
      this.focusTarget = focusTarget;
      this.focusBounds = this.focusTarget.getFocusArea().clone();
      Application.getInstance().ticker.add(this.updatePosition);
    }
  }

  public clearFocusTarget() {
    this.focusTarget = null;
    Application.getInstance().ticker.remove(this.updatePosition);
  }

  public updatePosition() {
    if (!this.focusTarget) {
      return;
    }
    const pos = this.focusTarget.getGlobalPosition();
    const focusPos = this.focusTarget.getFocusPosition();
    if (focusPos) {
      const fp = resolvePointLike(focusPos);
      pos.x += fp.x;
      pos.y += fp.y;
    }

    this.position.set(pos.x, pos.y);
  }
}
