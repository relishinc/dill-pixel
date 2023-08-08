import { Container, Graphics, Point } from "pixi.js";
import { AddFactory, MakeFactory } from "../Utils/Factory";
import { IPopup } from "./IPopup";
import { IPopupToken } from "./PopupToken";
export declare enum POPUP_STATE {
    CLOSED = 0,
    OPENING = 1,
    OPEN = 2,
    CLOSING = 3
}
/**
 * This is an abstract class from which all Popups should inherit.
 * However, you can also make your own implementation of {@link IPopup} if necessary.
 */
export declare class Popup extends Container implements IPopup {
    static readonly NAME: string;
    /** @inheritdoc */
    blackout?: Graphics;
    /** This is where we keep the callback that we call when closing the popup  */
    protected _callback?: (...pParams: any[]) => void;
    /** Custom data sent to the popup */
    protected _popupData: any;
    /** Private backing field for {@link state} */
    protected _state: POPUP_STATE;
    /** Storage for for {@link PopupToken.backdrop} */
    protected _clickBackdropToClose: boolean | "static";
    /** Private backing field for {@link keyboardToClose} */
    protected _keyboardToClose: boolean;
    protected _addFactory: AddFactory;
    protected _makeFactory: MakeFactory;
    /** Private backing field for {@link id} */
    private _id?;
    /** @inheritdoc */
    get id(): string;
    /** This is used to prevent duplicate calls to e.g. {@link hide} */
    get state(): POPUP_STATE;
    /** @inheritdoc */
    get keyboardToClose(): boolean;
    get popupData(): any;
    protected get add(): AddFactory;
    protected get make(): MakeFactory;
    /** Hide the popup, but only if it's open */
    hide(): void;
    /** @inheritdoc */
    init(pSize: Point): void;
    /** @inheritdoc */
    onResize(pSize: Point): void;
    /**
     * Update tick. Needed for some animations.
     * Override this
     * @param pDeltaTime Seconds elapsed since last call to {@link update}
     * @override
     */
    update(pDeltaTime: number): void;
    /**
     * Show the popup, and set the close callback
     * You probably want to override {@link AnimateIn}, not {@link show}
     * @override
     */
    show(pToken: IPopupToken): void;
    destroy(options?: Parameters<typeof Container.prototype.destroy>[0]): void;
    /**
     * Called by {@link show}
     * Don't forget to call the callback when complete
     */
    protected AnimateIn(pCallback: () => void): Promise<void>;
    /**
     * Called by {@link hide}
     * Don't forget to call the callback when complete
     */
    protected AnimateOut(pCallback: () => void): Promise<void>;
    /**
     * Click handler for {@link blackout}
     * Feel free to override this
     */
    protected OnBlackoutClicked(): void;
    /**
     * This changes the popup's state to {@link POPUP_STATE.OPEN}
     * You may want to override this to do more things after the animation has completed
     */
    protected OnAnimateInComplete(): void;
    /**
     * Hides the popup, and disables click handling on all children
     * You probably want to override {@link hide} or {@link AnimateOut}, not {@link _hide}
     * @override
     */
    protected _hide(): void;
    /**
     * This calls the popup's callback (which came from the `pToken` parameter in {@link show})
     * and also tells {@link PopupManager} that we are finished animating out, so the popup can be destroyed or pooled
     */
    protected OnAnimateOutComplete(): void;
}
//# sourceMappingURL=Popup.d.ts.map