import { Container } from '../gameobjects';
import { hidePopupComplete } from '../signals';
export var PopupState;
(function (PopupState) {
    PopupState[PopupState["CLOSED"] = 0] = "CLOSED";
    PopupState[PopupState["OPENING"] = 1] = "OPENING";
    PopupState[PopupState["OPEN"] = 2] = "OPEN";
    PopupState[PopupState["CLOSING"] = 3] = "CLOSING";
})(PopupState || (PopupState = {}));
/**
 * This is an abstract class from which all Popups should inherit.
 * However, you can also make your own implementation of {@link IPopup} if necessary.
 */
export class Popup extends Container {
    static { this.NAME = '__Popup'; }
    constructor(data) {
        super(true, false);
        /** Private backing field for {@link state} */
        this._state = PopupState.CLOSED;
        /** Storage for for {@link PopupToken.backdrop} */
        this._clickBackdropToClose = true;
        /** Private backing field for {@link keyboardToClose} */
        this._keyboardToClose = true;
        this.bindMethods('animateInComplete', 'animateOutComplete', 'onBlackoutClicked', 'show', 'hide', '_hide', 'animateIn', 'animateOut');
        this._popupData = data;
    }
    /** @inheritdoc */
    get id() {
        return this._id;
    }
    /** @inheritdoc */
    get keyboardToClose() {
        return this._keyboardToClose;
    }
    /** This is used to prevent duplicate calls to e.g. {@link hide} */
    get state() {
        return this._state;
    }
    get popupData() {
        return this._popupData;
    }
    /** Hide the popup, but only if it's open */
    hide() {
        if (this.state === PopupState.OPEN) {
            this._hide();
        }
    }
    /** @inheritdoc */
    init(size) {
        this._state = PopupState.CLOSED;
        this.onResize(size);
        if (this.blackout !== undefined) {
            this.blackout.on('pointerdown', this.onBlackoutClicked);
        }
    }
    /** @inheritdoc */
    onResize(size) {
        if (this.blackout !== undefined) {
            this.blackout.x = -size.x / 2;
            this.blackout.y = -size.y / 2;
            this.blackout.width = size.x;
            this.blackout.height = size.y;
        }
    }
    /**
     * Update tick. Needed for some animations.
     * Override this
     * @param _deltaTime Seconds elapsed since last call to {@link update}
     * @override
     */
    update(_deltaTime) {
        // Override me
    }
    /**
     * Show the popup, and set the close callback
     * You probably want to override {@link animateIn}, not {@link show}
     * @override
     */
    show(token) {
        this._id = token.id;
        this._callback = token.callback;
        this._state = PopupState.OPENING;
        this._clickBackdropToClose = token.backdrop ?? true;
        this._keyboardToClose = token.keyboard ?? true;
        this._popupData = token.data;
        this.animateIn(this.animateInComplete);
    }
    destroy(options) {
        this._callback = undefined;
        this._popupData = undefined;
        super.destroy(options);
    }
    async animateIn(callback) {
        callback();
    }
    async animateOut(callback) {
        callback();
    }
    /**
     * Click handler for {@link blackout}
     * Feel free to override this
     */
    onBlackoutClicked() {
        if (this._clickBackdropToClose === true) {
            this.hide();
        }
    }
    /**
     * This changes the popup's state to {@link PopupState.OPEN}
     * You may want to override this to do more things after the animation has completed
     */
    animateInComplete() {
        this._state = PopupState.OPEN;
    }
    /**
     * Hides the popup, and disables click handling on all children
     * You probably want to override {@link hide} or {@link animateOut}, not {@link _hide}
     * @override
     */
    _hide() {
        this.interactiveChildren = false;
        if (this.blackout !== undefined) {
            this.blackout.off('click');
            this.blackout.off('pointerdown');
        }
        this._state = PopupState.CLOSING;
        this.animateOut(this.animateOutComplete);
    }
    /**
     * This calls the popup's callback (which came from the `pToken` parameter in {@link show})
     * and also tells {@link PopupManager} that we are finished animating out, so the popup can be destroyed or pooled
     */
    animateOutComplete() {
        this._state = PopupState.CLOSED;
        if (this._callback !== undefined) {
            const callback = this._callback;
            this._callback = undefined;
            callback();
        }
        hidePopupComplete(this);
    }
}
//# sourceMappingURL=Popup.js.map