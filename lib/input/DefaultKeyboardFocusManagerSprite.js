import { Graphics, Sprite } from 'pixi.js';
import { Application } from '../core/Application';
export class DefaultKeyboardFocusManagerSprite extends Sprite {
    static { this.COLOR = 0xff0000; }
    static { this.PADDING = 4; }
    static { this.LINE_WIDTH = 2; }
    constructor(padding = DefaultKeyboardFocusManagerSprite.PADDING, outlineOptions = {
        color: DefaultKeyboardFocusManagerSprite.COLOR,
        width: DefaultKeyboardFocusManagerSprite.LINE_WIDTH,
        alignment: 0.5,
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
    hide(pOnComplete) {
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
            const targetAsContainer = this._target;
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
//# sourceMappingURL=DefaultKeyboardFocusManagerSprite.js.map