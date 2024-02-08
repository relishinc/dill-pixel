import { Application } from '../core';
import { FlexContainer, UICanvas, UICanvasEdge } from '../ui';
import { Toast } from './Toast';
import { ToastConfig } from './types'; // a UICanvas solely for "toast" messages

// a UICanvas solely for "toast" messages
export class Toaster<T extends Application = Application> extends UICanvas {
  private static DEFAULT_TOAST_DURATION: number = 5000;
  private static DEFAULT_TOAST_ANIMATION_DURATION: number = 500;
  private static DEFAULT_TOAST_SPACING: number = 10;
  private static DEFAULT_TOAST_LOCATION: UICanvasEdge = 'bottom right';
  private static _instance: Toaster;
  static readonly NAME: string = '__Toaster';
  private _toastDuration: number = Toaster.DEFAULT_TOAST_DURATION;
  private _toastAnimationDuration: number = Toaster.DEFAULT_TOAST_ANIMATION_DURATION;
  private _toastSpacing: number = Toaster.DEFAULT_TOAST_SPACING;
  private _toastLocation: UICanvasEdge = Toaster.DEFAULT_TOAST_LOCATION;
  private _toastContainer: FlexContainer;

  public static showToast(config: ToastConfig) {
    const t = new Toast(config);
    this._instance._toastContainer.add.existing(t);
  }

  constructor(protected _app: Application<T>) {
    if (Toaster._instance) {
      throw new Error('Toaster has already been instantiated.');
    }
    super();
    this.name = Toaster.NAME;
    this.addToastContainer();
    Toaster._instance = this;
  }

  static get instance(): Toaster {
    if (!Toaster._instance) {
      throw new Error('Toaster has not been instantiated.');
    }
    return Toaster._instance;
  }

  static get toastLocation(): UICanvasEdge {
    return Toaster.instance._toastLocation;
  }

  static set toastLocation(value: UICanvasEdge) {
    this.instance._toastLocation = value;
    if (!this.instance._toastContainer) {
      this.instance.addToastContainer();
    } else {
      this.instance.addElement(this.instance._toastContainer, { align: value });
    }
  }

  static get toastDuration(): number {
    return this.instance._toastDuration;
  }

  static set toastDuration(value: number) {
    this.instance._toastDuration = value;
  }

  static get toastAnimationDuration(): number {
    return this.instance._toastAnimationDuration;
  }

  static set toastAnimationDuration(value: number) {
    this.instance._toastAnimationDuration = value;
  }

  static get toastSpacing(): number {
    return this.instance._toastSpacing;
  }

  static set toastSpacing(value: number) {
    this.instance._toastSpacing = value;
  }

  get app(): T {
    return this._app as T;
  }

  protected addToastContainer() {
    this._toastContainer = new FlexContainer({
      gap: this._toastSpacing,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
    });
    this.addElement(this._toastContainer, { align: this._toastLocation });
  }
}
