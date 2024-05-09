import { Container, Graphics } from 'pixi.js';
import { Application } from '../../core/Application';
import { resolvePointLike } from '../../utils/functions';
import { bindAllMethods } from '../../utils/methodBinding';
export class FocusOutliner extends Container {
    focusBounds;
    focusTarget;
    _config;
    _graphics;
    constructor(config) {
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
    draw(focusTarget) {
        this.clear();
        this.setFocusTarget(focusTarget);
        if (!this.focusTarget) {
            return;
        }
        this._graphics.strokeStyle = { width: this._config.lineWidth, color: this._config.color, alpha: 1 };
        if (this._config.shape === 'rectangle') {
            this._graphics.rect(0, 0, this.focusBounds.width, this.focusBounds.height);
        }
        else {
            this._graphics.roundRect(0, 0, this.focusBounds.width, this.focusBounds.height, this._config.radius);
        }
        this._graphics.stroke();
    }
    clear() {
        this.clearFocusTarget();
    }
    destroy(options) {
        this.clear();
        this._graphics.destroy();
        super.destroy(options);
    }
    setFocusTarget(focusTarget) {
        if (focusTarget) {
            this.focusTarget = focusTarget;
            this.focusBounds = this.focusTarget.getFocusArea().clone();
            Application.getInstance().ticker.add(this.updatePosition);
        }
    }
    clearFocusTarget() {
        this.focusTarget = null;
        Application.getInstance().ticker.remove(this.updatePosition);
    }
    updatePosition() {
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
