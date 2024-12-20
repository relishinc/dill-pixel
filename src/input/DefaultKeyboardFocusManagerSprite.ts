import { ILineStyleOptions } from '@pixi/graphics';
import { Container, Graphics, Sprite } from 'pixi.js';
import { Application } from '../core';
import { IFocusable } from './IFocusable';
import { IKeyboardFocus } from './IKeyboardFocus';

export class DefaultKeyboardFocusManagerSprite extends Sprite implements IKeyboardFocus {
  public static COLOR: number = 0xff0000;
  public static PADDING: number = 4;
  public static LINE_WIDTH: number = 2;

  protected _target: IFocusable | undefined;
  protected _gfx: Graphics = new Graphics();

  constructor(
    private padding: number = DefaultKeyboardFocusManagerSprite.PADDING,
    private outlineOptions: ILineStyleOptions = {
      color: DefaultKeyboardFocusManagerSprite.COLOR,
      width: DefaultKeyboardFocusManagerSprite.LINE_WIDTH,
      alignment: 0.5,
    },
  ) {
    super();
  }

  get target(): IFocusable | undefined {
    return this._target;
  }

  public show(pFocusable: IFocusable): void {
    this._target = pFocusable;
    this.redraw();
  }

  public hide(pOnComplete?: () => void): void {
    this._target = undefined;
    if (this._gfx) {
      this._gfx.clear();
    }
    this.visible = false;

    if (pOnComplete) {
      pOnComplete();
    }
  }

  public redraw(): void {
    // important, as the position extends the parent, and will affect the call to toLocal later on
    this.position.set(0, 0);

    if (this._target === undefined) {
      this.visible = false;
    } else {
      this.visible = true;
      const targetAsContainer = this._target as unknown as Container;
      const focusPos = this._target.getFocusPosition();

      const globalPos = targetAsContainer.getGlobalPosition();
      globalPos.x += focusPos.x;
      globalPos.y += focusPos.y;
      const pos = this.toLocal(globalPos);

      const outlineWidth = this.outlineOptions?.width ?? 2;
      this.position.set(pos.x - outlineWidth * 0.5 - this.padding, pos.y - outlineWidth * 0.5 - this.padding);

      const size = this._target.getFocusSize() ?? { x: targetAsContainer?.width, y: targetAsContainer?.height };
      this._gfx.clear();
      this._gfx.lineStyle(this.outlineOptions);
      this._gfx.drawRoundedRect(pos.x, pos.y, size.x + this.padding * 2, size.y + this.padding * 2, 8);
      this._gfx.closePath();

      this.texture = Application.instance.renderer.generateTexture(this._gfx);
    }
  }
}
