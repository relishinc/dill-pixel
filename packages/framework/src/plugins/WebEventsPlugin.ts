import { Application } from '../core/Application';
import { Signal } from '../signals';
import type { Size } from '../utils';
import { bindAllMethods, debounce, getOrientation, type Orientation } from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export interface IWebEventsPlugin extends IPlugin {
  onResize: Signal<(size: { width: number; height: number }) => void>;
  onVisibilityChanged: Signal<(visible: boolean) => void>;
  onOrientationChanged: Signal<
    ({ orientation, screenOrientation }: { orientation: Orientation; screenOrientation: ScreenOrientation }) => void
  >;
}

/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export class WebEventsPlugin extends Plugin implements IWebEventsPlugin {
  public readonly id = 'webEvents';

  // signals
  public onResize: Signal<(size: Size) => void> = new Signal<(size: Size) => void>();
  public onVisibilityChanged: Signal<(visible: boolean) => void> = new Signal<(visible: boolean) => void>();
  public onOrientationChanged: Signal<
    ({ orientation, screenOrientation }: { orientation: Orientation; screenOrientation: ScreenOrientation }) => void
  > = new Signal<
    ({ orientation, screenOrientation }: { orientation: Orientation; screenOrientation: ScreenOrientation }) => void
  >();
  private _debouncedEmitVisibility = debounce((value: boolean) => {
    this.onVisibilityChanged.emit(value);
  }, 1);

  /**
   * Creates callback arrays and registers to web events.
   */
  constructor() {
    super();
    bindAllMethods(this);
  }

  get app(): Application {
    return Application.getInstance();
  }

  public initialize(): void {
    document.addEventListener('visibilitychange', this._onVisibilityChanged, false);
    window.addEventListener('pagehide', this._onPageHide, false);
    window.addEventListener('pageshow', this._onPageShow, false);
    window.addEventListener('resize', this._onResize);
    document.addEventListener('fullscreenchange', this._onResize);
    window.addEventListener('orientationchange', this._onOrientationChanged);
  }

  public destroy() {
    document.removeEventListener('visibilitychange', this._onVisibilityChanged, false);
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('fullscreenchange', this._onResize);
    window.removeEventListener('pagehide', this._onPageHide, false);
    window.removeEventListener('pageshow', this._onPageShow, false);
  }

  protected getCoreSignals(): string[] {
    return ['onVisibilityChanged', 'onOrientationChanged'];
  }

  /**
   * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
   */
  private _onVisibilityChanged(): void {
    this._emitVisibilityChanged(!document.hidden);
  }

  /**
   * Called when the browser resizes.
   */
  private _onResize(): void {
    const el = this.app.renderer.canvas?.parentElement;
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    if (el && el?.getBoundingClientRect()) {
      screenWidth = el.offsetWidth;
      screenHeight = el.offsetHeight;
    }
    this.onResize.emit({ width: screenWidth, height: screenHeight });
  }

  /**
   * Called when the page is hidden.
   * Some browsers (like Safari) don't support the `visibilitychange` event, so we also listen for `pagehide`.
   * We're just mimicking the `visibilitychange` event here.
   */
  private _onPageHide() {
    this._emitVisibilityChanged(false);
  }

  /**
   * Called when the page is shown.
   * Some browsers (like Safari) don't support the `visibilitychange` event, so we also listen for `pageshow`.
   * We're just mimicking the `visibilitychange` event here.
   * @private
   */
  private _onPageShow() {
    this._emitVisibilityChanged(true);
    this._onResize();
  }

  private _emitVisibilityChanged(value: boolean) {
    this._debouncedEmitVisibility(value);
  }

  private _onOrientationChanged(e: any) {
    let orientation: Orientation | null = null;
    const screenOrientation = e?.target?.screen?.orientation;
    const screenOrientationType = screenOrientation?.type;

    if (screenOrientationType) {
      if (screenOrientationType.includes('landscape')) {
        orientation = 'landscape';
      } else {
        orientation = 'portrait';
      }
      this.onOrientationChanged.emit({ orientation, screenOrientation });
      return;
    }

    setTimeout(() => {
      orientation = getOrientation();
      this.onOrientationChanged.emit({ orientation, screenOrientation });
    }, 10);
  }
}
