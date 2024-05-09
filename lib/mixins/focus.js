import { Application } from '../core/Application';
import { Signal } from '../signals';
export function Focusable(Base) {
    return class extends Base {
        _accessibleDiv;
        isFocused = false;
        isKeyDown = false;
        focusEnabled = true;
        tabIndex = 0;
        // pixi accessibility options
        accessible = false;
        accessibleType = 'button';
        accessibleTitle = 'Focusable';
        accessibleHint = 'Press enter to focus';
        accessiblePointerEvents = 'auto';
        accessibleChildren = true;
        // signals
        onFocus = new Signal();
        onFocusIn = new Signal();
        onFocusOut = new Signal();
        onBlur = new Signal();
        _eventsDisabled = false;
        constructor(...args) {
            super(...args);
            this.eventMode = 'static';
            this.on('mouseover', this._onMouseOver);
            this.on('mousedown', this._onMouseDown);
            this.on('click', this._handleClick);
            this.on('tap', this._handleClick);
        }
        get app() {
            return Application.getInstance();
        }
        focusIn() {
            if (this.app.focus.active) {
                // @ts-expect-error Argument of type { type: string; } is not assignable to parameter of type FederatedPointerEvent
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
                // @ts-expect-error Argument of type { type: string; } is not assignable to parameter of type FederatedPointerEvent
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
        getFocusSize() {
            return [this.getFocusArea().width, this.getFocusArea().height];
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _onMouseOver(_e) {
            this.app.focus.setFocus(this);
        }
        _onMouseDown(e) {
            this._maybeEmit('pointerdown', e);
        }
        _handleClick(e) {
            this._maybeEmit('click', e);
            this.click();
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _handleKeyUp(_e) { }
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
