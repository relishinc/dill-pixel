import { Graphics, Sprite } from "pixi.js";
import { Application } from "../Application";
export class DefaultKeyboardFocusManagerSprite extends Sprite {
    constructor(padding = DefaultKeyboardFocusManagerSprite.PADDING, outlineOptions = {
        color: DefaultKeyboardFocusManagerSprite.COLOR,
        width: DefaultKeyboardFocusManagerSprite.LINE_WIDTH,
        alignment: 0.5
    }) {
        super();
        this.padding = padding;
        this.outlineOptions = outlineOptions;
        this._gfx = new Graphics();
    }
    get target() {
        return this._target;
    }
    show(pFocusable) {
        this._target = pFocusable;
        this.redraw();
    }
    hide(pOnComplete, pInstantly) {
        this._target = undefined;
        if (this._gfx) {
            this._gfx.clear();
        }
        this.visible = false;
        if (pOnComplete) {
            pOnComplete();
        }
    }
    redraw() {
        // important, as the position extends the parent, and will affect the call to toLocal later on
        this.position.set(0, 0);
        if (this._target === undefined) {
            this.visible = false;
        }
        else {
            this.visible = true;
            const pos = this.toLocal(this.parent.position, this._target, this._target.getFocusPosition());
            this.position.set(pos.x - this.outlineOptions.width * 0.5 - this.padding, pos.y - this.outlineOptions.width * 0.5 - this.padding);
            const size = this._target.getFocusSize();
            this._gfx.clear();
            this._gfx.lineStyle(this.outlineOptions);
            this._gfx.drawRoundedRect(pos.x, pos.y, size.x + this.padding * 2, size.y + this.padding * 2, 8);
            this._gfx.closePath();
            this.texture = Application.instance.renderer.generateTexture(this._gfx);
        }
    }
}
DefaultKeyboardFocusManagerSprite.COLOR = 0xff0000;
DefaultKeyboardFocusManagerSprite.PADDING = 4;
DefaultKeyboardFocusManagerSprite.LINE_WIDTH = 2;
//# sourceMappingURL=DefaultKeyboardFocusManagerSprite.js.map