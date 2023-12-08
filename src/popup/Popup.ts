import { Graphics, Point, Sprite } from 'pixi.js';
import { Container } from '../gameobjects';
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
  public blackout?: Graphics | Sprite;
  /** This is where we keep the callback that we call when closing the popup  */
  protected _callback?: (...args: any[]) => void;
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

  constructor(data?: any) {
    super(true, false);
    this.bindMethods('animateInComplete', 'animateOutComplete', 'onBlackoutClicked');
    this._popupData = data;
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
  public init(size: Point): void {
    this._state = POPUP_STATE.CLOSED;
    this.onResize(size);
    if (this.blackout !== undefined) {
      this.blackout.on('click', this.onBlackoutClicked);
    }
  }

  /** @inheritdoc */
  public onResize(size: Point): void {
    if (this.blackout !== undefined) {
      this.blackout.x = -size.x / 2;
      this.blackout.y = -size.y / 2;
      (this.blackout as Sprite).width = size.x;
      (this.blackout as Sprite).height = size.y;
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
   * You probably want to override {@link animateIn}, not {@link show}
   * @override
   */
  public show(token: IPopupToken): void {
    this._id = token.id;
    this._callback = token.callback;
    this._state = POPUP_STATE.OPENING;
    this._clickBackdropToClose = token.backdrop ?? true;
    this._keyboardToClose = token.keyboard ?? true;
    this._popupData = token.data;

    this.animateIn(this.animateInComplete);
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
  protected async animateIn(callback: () => void): Promise<void> {
    callback();
  }

  /**
   * Called by {@link hide}
   * Don't forget to call the callback when complete
   */
  protected async animateOut(callback: () => void): Promise<void> {
    callback();
  }

  /**
   * Click handler for {@link blackout}
   * Feel free to override this
   */
  protected onBlackoutClicked() {
    if (this._clickBackdropToClose === true) {
      this.hide();
    }
  }

  /**
   * This changes the popup's state to {@link POPUP_STATE.OPEN}
   * You may want to override this to do more things after the animation has completed
   */
  protected animateInComplete() {
    console.log(this);
    this._state = POPUP_STATE.OPEN;
  }

  /**
   * Hides the popup, and disables click handling on all children
   * You probably want to override {@link hide} or {@link animateOut}, not {@link _hide}
   * @override
   */
  protected _hide(): void {
    this.interactiveChildren = false;
    if (this.blackout !== undefined) {
      this.blackout.off('click');
    }
    this._state = POPUP_STATE.CLOSING;
    this.animateOut(this.animateOutComplete);
  }

  /**
   * This calls the popup's callback (which came from the `pToken` parameter in {@link show})
   * and also tells {@link PopupManager} that we are finished animating out, so the popup can be destroyed or pooled
   */
  protected animateOutComplete() {
    this._state = POPUP_STATE.CLOSED;
    if (this._callback !== undefined) {
      const callback = this._callback;
      this._callback = undefined;
      callback();
    }

    hidePopupComplete(this);
  }
}
