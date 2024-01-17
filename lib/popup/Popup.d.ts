import { Graphics, Point, Sprite } from 'pixi.js';
import { Container } from '../gameobjects';
import { IPopup } from './IPopup';
import { IPopupToken } from './PopupToken';
export declare enum PopupState {
    CLOSED = 0,
    OPENING = 1,
    OPEN = 2,
    CLOSING = 3
}
/**
 * This is an abstract class from which all Popups should inherit.
 * However, you can also make your own implementation of {@link IPopup} if necessary.
 */
export declare class Popup extends Container<any> implements IPopup {
    /** @inheritdoc */
    blackout?: Graphics | Sprite;
    static readonly NAME: string;
    /** This is where we keep the callback that we call when closing the popup  */
    protected _callback?: (...args: any[]) => void;
    /** Custom data sent to the popup */
    protected _popupData: any;
    /** Private backing field for {@link state} */
    protected _state: PopupState;
    /** Storage for for {@link PopupToken.backdrop} */
    protected _clickBackdropToClose: boolean | 'static';
    /** Private backing field for {@link keyboardToClose} */
    protected _keyboardToClose: boolean;
    /** Private backing field for {@link id} */
    private _id?;
    constructor(data?: any);
    /** @inheritdoc */
    get id(): string;
    /** @inheritdoc */
    get keyboardToClose(): boolean;
    /** This is used to prevent duplicate calls to e.g. {@link hide} */
    get state(): PopupState;
    get popupData(): any;
    /** Hide the popup, but only if it's open */
    hide(): void;
    /** @inheritdoc */
    init(size: Point): void;
    /** @inheritdoc */
    onResize(size: Point): void;
    /**
     * Update tick. Needed for some animations.
     * Override this
     * @param _deltaTime Seconds elapsed since last call to {@link update}
     * @override
     */
    update(_deltaTime: number): void;
    /**
     * Show the popup, and set the close callback
     * You probably want to override {@link animateIn}, not {@link show}
     * @override
     */
    show(token: IPopupToken): void;
    destroy(options?: Parameters<typeof Container.prototype.destroy>[0]): void;
    /**
     * Called by {@link show}
     * Don't forget to call the callback when complete
     */
    protected animateIn(callback: () => void): Promise<void> | void;
    /**
     * Called by {@link hide}
     * Don't forget to call the callback when complete
     */
    protected animateOut(callback: () => void): Promise<void> | void;
    /**
     * Click handler for {@link blackout}
     * Feel free to override this
     */
    protected onBlackoutClicked(): void;
    /**
     * This changes the popup's state to {@link PopupState.OPEN}
     * You may want to override this to do more things after the animation has completed
     */
    protected animateInComplete(): void;
    /**
     * Hides the popup, and disables click handling on all children
     * You probably want to override {@link hide} or {@link animateOut}, not {@link _hide}
     * @override
     */
    protected _hide(): void;
    /**
     * This calls the popup's callback (which came from the `pToken` parameter in {@link show})
     * and also tells {@link PopupManager} that we are finished animating out, so the popup can be destroyed or pooled
     */
    protected animateOutComplete(): void;
}
//# sourceMappingURL=Popup.d.ts.map