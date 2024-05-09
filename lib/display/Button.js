import { Application } from '../core/Application';
import { FactoryContainer } from '../mixins/factory';
import { Focusable } from '../mixins/focus';
import { Interactive } from '../mixins/interaction';
import { WithSignals } from '../mixins/signals';
import { Signal } from '../signals';
import { bindAllMethods } from '../utils/methodBinding';
export const ButtonConfigKeys = ['textures', 'cursor', 'disabledCursor', 'sheet', 'enabled'];
// Create a new class that extends Container and includes the Interactive and Focusable mixins.
const _Button = Focusable(Interactive(WithSignals(FactoryContainer())));
/**
 * @class
 * @extends {Container}
 * @implements {IFocusable}
 * @description A class representing a button.
 */
export class Button extends _Button {
    // signals
    onDown = new Signal();
    onUp = new Signal();
    onUpOutside = new Signal();
    onOut = new Signal();
    onOver = new Signal();
    onClick = new Signal();
    onEnabled = new Signal();
    onDisabled = new Signal();
    onKeyboardEvent = new Signal();
    // visual
    view;
    // whether the button is down
    isDown;
    isOver;
    // config
    config;
    // enabled state
    _enabled;
    // a set of unique callbacks for when the button is down
    _isDownCallbacks = new Map();
    _isDownListenerAdded = false;
    /**
     * @constructor
     * @param {Partial<ButtonConfig>} config - The configuration for the button.
     */
    constructor(config) {
        super();
        bindAllMethods(this);
        this.config = Object.assign({
            textures: { default: '' },
            sheet: undefined,
            enabled: true,
            cursor: 'default',
            disabledCursor: 'not-allowed',
        }, config);
        // Create a sprite with the default texture and add it to the container.
        this.view = this.add.sprite({ asset: this.config.textures.default, sheet: this.config.sheet, anchor: 0.5 });
        this.cursor = this.config.cursor;
        this.enabled = config.enabled !== false;
        // Set up interaction handlers.
        // make them high priority so they run before any other interaction handlers
        this.addSignalConnection(this.onInteraction('pointerover').connect(this.handlePointerOver, -1), this.onInteraction('pointerout').connect(this.handlePointerOut, -1), this.onInteraction('pointerup').connect(this.handlePointerUp, -1), this.onInteraction('click').connect(this.handleClick, -1), this.onInteraction('tap').connect(this.handleClick, -1), this.onInteraction('pointerdown').connect(this.handlePointerDown, -1));
    }
    /**
     * @description Sets the enabled state of the button.
     * @param {boolean} enabled - Whether the button is enabled.
     */
    set enabled(enabled) {
        if (this._enabled === enabled) {
            return;
        }
        this._enabled = enabled;
        this.cursor = this._enabled ? this.config.cursor : this.config.disabledCursor;
        this.focusEnabled = enabled;
        if (this._enabled) {
            this.view.texture = this.make.texture({
                asset: this.config.textures.default,
                sheet: this.config.sheet,
            });
            this.onEnabled.emit();
        }
        else {
            this.view.texture = this.make.texture({
                asset: this.config.textures.disabled || this.config.textures.default,
                sheet: this.config.sheet,
            });
            this.onDisabled.emit();
        }
    }
    get app() {
        return Application.getInstance();
    }
    focusOut() {
        super.focusOut();
        this.isDown = false;
        this.isOver = false;
    }
    blur() {
        super.blur();
        this.isDown = false;
        this.isOver = false;
    }
    getFocusArea() {
        return this.view.getBounds().clone();
    }
    getFocusPosition() {
        return [-this.width * 0.5, -this.height * 0.5];
    }
    addIsDownCallback(callbackId, callback) {
        this._isDownCallbacks.set(callbackId, callback);
        this._checkIsDownCallbacks();
    }
    removeIsDownCallback(callbackId) {
        this._isDownCallbacks.delete(callbackId);
    }
    /**
     * @description Handles the pointer over event.
     * Sets the texture of the button to the hover texture and emits the onOver event.
     */
    handlePointerOver() {
        if (!this._enabled) {
            return;
        }
        if (!this.isOver) {
            this.isOver = true;
        }
        if (this.isDown) {
            return;
        }
        this.view.texture = this.make.texture({
            asset: this.config.textures.hover || this.config.textures.default,
            sheet: this.config.sheet,
        });
        this.onOver.emit();
    }
    /**
     * @description Handles the pointer out event.
     * Sets the texture of the button to the default texture and emits the onOut event.
     */
    handlePointerOut() {
        this.isOver = false;
        if (!this._enabled) {
            return;
        }
        if (this.isDown) {
            return;
        }
        this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
        this.onOut.emit();
    }
    /**
     * @description Handles the pointer down event.
     * Sets the isDown property to true and changes the texture of the button.
     */
    handlePointerDown() {
        if (!this._enabled && !this.isKeyDown) {
            return;
        }
        if (!this.isDown) {
            window.removeEventListener('pointerup', this.handlePointerUpOutside);
            window.addEventListener('pointerup', this.handlePointerUpOutside);
            this.isDown = true;
            this.view.texture = this.make.texture({
                asset: this.config.textures.active || this.config.textures.hover || this.config.textures.default,
                sheet: this.config.sheet,
            });
            this.onDown.emit();
        }
    }
    /**
     * @description Handles the pointer up event.
     * Removes the keyup event listener and emits the onPress and onUp events.
     */
    handlePointerUp() {
        if (!this._enabled || !this.isOver) {
            return;
        }
        window.removeEventListener('pointerup', this.handlePointerUpOutside);
        this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
        this.onUp.emit();
    }
    handleClick() {
        this.isDown = false;
        this.onClick.emit();
    }
    /**
     * @description Handles the pointer up event.
     */
    handlePointerUpOutside() {
        if (!this._enabled || this.isOver) {
            return;
        }
        window.removeEventListener('pointerup', this.handlePointerUpOutside);
        this.view.texture = this.make.texture({ asset: this.config.textures.default, sheet: this.config.sheet });
        this.isDown = false;
        this.isOver = false;
        this.onUpOutside.emit();
    }
    _checkIsDownCallbacks() {
        // check if there are any callbacks, if there are, add the ticker listener
        if (!this._isDownListenerAdded && this._isDownCallbacks.size > 0) {
            this._isDownListenerAdded = true;
            this.app.ticker.add(this._handleIsDownCallbacks);
        }
        else {
            this.app.ticker.remove(this._handleIsDownCallbacks);
            this._isDownListenerAdded = false;
        }
    }
    _handleIsDownCallbacks() {
        if (this.isDown) {
            this._isDownCallbacks.forEach((callback) => {
                callback();
            });
        }
    }
}
