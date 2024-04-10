import { Application } from 'dill-pixel';
import { Signal } from '../signals';
export function Focusable(Base) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            this.isFocused = false;
            this.isKeyDown = false;
            this.focusEnabled = true;
            this.tabIndex = 0;
            // pixi accessibility options
            this.accessible = false;
            this.accessibleType = 'button';
            this.accessibleTitle = 'Focusable';
            this.accessibleHint = 'Press enter to focus';
            this.accessiblePointerEvents = 'auto';
            this.accessibleChildren = true;
            // signals
            this.onFocus = new Signal();
            this.onFocusIn = new Signal();
            this.onFocusOut = new Signal();
            this.onBlur = new Signal();
            this._eventsDisabled = false;
            this.eventMode = 'static';
            this.on('mouseover', this._onMouseOver);
            this.on('mousedown', this._onMouseDown);
            this.on('click', this._handleClick);
        }
        get app() {
            return Application.getInstance();
        }
        focusIn() {
            if (this.app.focus.active) {
                // @ts-ignore
                this.emit('pointerover', { type: 'pointerover' });
            }
        }
        blur() {
            if (!this.isKeyDown) {
                window.removeEventListener('keyup', this._handleKeyUp.bind(this));
            }
        }
        focusOut() {
            if (!this.isKeyDown) {
                window.removeEventListener('keyup', this._handleKeyUp.bind(this));
            }
            if (this.app.focus.active) {
                //@ts-ignore
                this.emit('pointerout', { type: 'pointerout' });
            }
        }
        click() { }
        getFocusPosition() {
            return null;
        }
        getFocusArea() {
            return this.getBounds();
        }
        _onMouseOver(e) {
            this.app.focus.setFocus(this);
        }
        _onMouseDown(e) {
            // @ts-ignore
            this._maybeEmit('pointerdown', e);
        }
        _handleClick(e) {
            this._maybeEmit('click', e);
            this.click();
        }
        _handleKeyUp(e) { }
        _maybeEmit(type, e) {
            if (this._eventsDisabled || e.type) {
                return;
            }
            this._eventsDisabled = true;
            this.emit(type, { type });
            this._eventsDisabled = false;
        }
    };
}
Focusable.INITTED = false;
//# sourceMappingURL=focus.js.map