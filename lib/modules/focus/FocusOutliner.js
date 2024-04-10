import { Container, Graphics } from 'pixi.js';
import { Application } from '../../core/Application';
import { resolvePointLike } from '../../utils/functions';
import { bindMethods } from '../../utils/methodBinding';
export class FocusOutliner extends Container {
    constructor(conig) {
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
    draw(focusTarget) {
        this.clear();
        const bounds = focusTarget.getFocusArea().clone();
        this._graphics.strokeStyle = { width: this._config.lineWidth, color: this._config.color, alpha: 1 };
        if (this._config.shape === 'rectangle') {
            this._graphics.rect(0, 0, bounds.width, bounds.height);
        }
        else {
            this._graphics.roundRect(0, 0, bounds.width, bounds.height, this._config.radius);
        }
        this._graphics.stroke();
        if (focusTarget) {
            this._focusTarget = focusTarget;
            Application.getInstance().ticker.add(this._updatePosition);
        }
    }
    clear() {
        this._graphics.clear();
        Application.getInstance().ticker.remove(this._updatePosition);
    }
    destroy(options) {
        this.clear();
        this._graphics.destroy();
        super.destroy(options);
    }
    _updatePosition() {
        if (!this._focusTarget) {
            return;
        }
        const pos = this._focusTarget.getGlobalPosition();
        const focusPos = this._focusTarget.getFocusPosition();
        if (focusPos) {
            const fp = resolvePointLike(focusPos);
            pos.x += fp.x;
            pos.y += fp.y;
        }
        this.position.set(pos.x, pos.y);
    }
}
//# sourceMappingURL=FocusOutliner.js.map