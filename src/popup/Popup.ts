import { Graphics, Point } from 'pixi.js';
import { Container } from '../gameobjects/Container';
import { hidePopupComplete } from '../signals';
import { IPopup } from './IPopup';
import { IPopupToken } from './PopupToken';

export enum POPUP_STATE {
  CLOSED,
  OPENING,
  OPEN,
  CLOSING,
}

/**
 * This is an abstract class from which all Popups should inherit.
 * However, you can also make your own implementation of {@link IPopup} if necessary.
 */
export class Popup extends Container implements IPopup {
  public static readonly NAME: string = '__Popup';
  /** @inheritdoc */
  public blackout?: Graphics;
  /** This is where we keep the callback that we call when closing the popup  */
  protected _callback?: (...pParams: any[]) => void;
  /** Custom data sent to the popup */
  protected _popupData: any;
  /** Private backing field for {@link state} */
  protected _state: POPUP_STATE = POPUP_STATE.CLOSED;
  /** Storage for for {@link PopupToken.backdrop} */
  protected _clickBackdropToClose: boolean | 'static' = true;
  /** Private backing field for {@link keyboardToClose} */
  protected _keyboardToClose: boolean = true;

  /** Private backing field for {@link id} */
  private _id?: string;
  /** @inheritdoc */
  public get id(): string {
    return this._id!;
  }

  /** This is used to prevent duplicate calls to e.g. {@link hide} */
  public get state(): POPUP_STATE {
    return this._state;
  }

  /** @inheritdoc */
  public get keyboardToClose() {
    return this._keyboardToClose;
  }

  get popupData() {
    return this._popupData;
  }

  /** Hide the popup, but only if it's open */
  public hide(): void {
    if (this.state === POPUP_STATE.OPEN) {
      this._hide();
    }
  }

  /** @inheritdoc */
  public init(pSize: Point): void {
    this._state = POPUP_STATE.CLOSED;
    this.onResize(pSize);
    if (this.blackout !== undefined) {
      this.blackout.on('click', this.OnBlackoutClicked.bind(this));
    }
  }

  /** @inheritdoc */
  public onResize(pSize: Point): void {
    if (this.blackout !== undefined) {
      this.blackout.x = -pSize.x / 2;
      this.blackout.y = -pSize.y / 2;
      this.blackout.width = pSize.x;
      this.blackout.height = pSize.y;
    }
  }

  /**
   * Update tick. Needed for some animations.
   * Override this
   * @param _deltaTime Seconds elapsed since last call to {@link update}
   * @override
   */
  public update(_deltaTime: number): void {
    // Override me
  }

  /**
   * Show the popup, and set the close callback
   * You probably want to override {@link AnimateIn}, not {@link show}
   * @override
   */
  public show(pToken: IPopupToken): void {
    this._id = pToken.id;
    this._callback = pToken.callback;
    this._state = POPUP_STATE.OPENING;
    this._clickBackdropToClose = pToken.backdrop ?? true;
    this._keyboardToClose = pToken.keyboard ?? true;
    this._popupData = pToken.data;
    this.AnimateIn(this.OnAnimateInComplete.bind(this));
  }

  public destroy(options?: Parameters<typeof Container.prototype.destroy>[0]): void {
    this._callback = undefined;
    this._popupData = undefined;
    super.destroy(options);
  }

  /**
   * Called by {@link show}
   * Don't forget to call the callback when complete
   */
  protected async AnimateIn(pCallback: () => void): Promise<void> {
    console.log('default AnimateIn');
    pCallback();
  }

  /**
   * Called by {@link hide}
   * Don't forget to call the callback when complete
   */
  protected async AnimateOut(pCallback: () => void): Promise<void> {
    console.log('default AnimateOut');
    pCallback();
  }

  /**
   * Click handler for {@link blackout}
   * Feel free to override this
   */
  protected OnBlackoutClicked() {
    if (this._clickBackdropToClose === true) {
      this.hide();
    }
  }

  /**
   * This changes the popup's state to {@link POPUP_STATE.OPEN}
   * You may want to override this to do more things after the animation has completed
   */
  protected OnAnimateInComplete() {
    this._state = POPUP_STATE.OPEN;
  }

  /**
   * Hides the popup, and disables click handling on all children
   * You probably want to override {@link hide} or {@link AnimateOut}, not {@link _hide}
   * @override
   */
  protected _hide(): void {
    this.interactiveChildren = false;
    if (this.blackout !== undefined) {
      this.blackout.off('click');
    }
    this._state = POPUP_STATE.CLOSING;
    this.AnimateOut(this.OnAnimateOutComplete.bind(this));
  }

  /**
   * This calls the popup's callback (which came from the `pToken` parameter in {@link show})
   * and also tells {@link PopupManager} that we are finished animating out, so the popup can be destroyed or pooled
   */
  protected OnAnimateOutComplete() {
    this._state = POPUP_STATE.CLOSED;
    if (this._callback !== undefined) {
      const callback = this._callback;
      this._callback = undefined;
      callback();
    }

    hidePopupComplete(this);
  }
}
