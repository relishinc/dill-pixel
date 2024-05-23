import { Application } from '../Application';
import { Signal } from '../signals';
import type { Size } from '../utils';
import { bindAllMethods } from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export interface IWebEventsPlugin extends IPlugin {
  onResize: Signal<(size: { width: number; height: number }) => void>;
  onVisibilityChanged: Signal<(visible: boolean) => void>;
}

/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export class WebEventsPlugin extends Plugin implements IWebEventsPlugin {
  public readonly id = 'webEvents';

  // signals
  public onResize: Signal<(size: Size) => void> = new Signal<(size: Size) => void>();
  public onVisibilityChanged: Signal<(visible: boolean) => void> = new Signal<(visible: boolean) => void>();

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
    window.addEventListener('resize', this._onResize);
    document.addEventListener('fullscreenchange', this._onResize);
  }

  public destroy() {
    document.removeEventListener('visibilitychange', this._onVisibilityChanged, false);
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('fullscreenchange', this._onResize);
  }

  protected getCoreSignals(): string[] {
    return ['onResize', 'onVisibilityChanged'];
  }

  /**
   * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
   */
  private _onVisibilityChanged(): void {
    this.onVisibilityChanged.emit(!document.hidden);
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
}
