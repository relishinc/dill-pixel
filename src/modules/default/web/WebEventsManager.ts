import { Application } from '../../../core';
import { Signal } from '../../../signals';
import { bindAllMethods } from '../../../utils/methodBinding';
import { Size } from '../../../utils/types';
import { IModule } from '../../IModule';

export interface IWebEventsManager extends IModule {
  onResize: Signal<(size: { width: number; height: number }) => void>;
  onVisibilityChanged: Signal<(visible: boolean) => void>;
}

/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export class WebEventsManager implements IModule {
  public readonly id = 'webEventsManager';

  // signals
  public onResize = new Signal<(size: Size) => void>();
  public onVisibilityChanged = new Signal<(visible: boolean) => void>();

  /**
   * Creates callback arrays and registers to web events.
   */
  constructor() {
    bindAllMethods(this);
  }

  get app(): Application {
    return Application.getInstance();
  }

  initialize(): void {
    document.addEventListener('visibilitychange', this.onVisibilityChangedInternal, false);
    window.addEventListener('resize', this.onResizeInternal);
    document.addEventListener('fullscreenchange', this.onResizeInternal);
  }

  destroy() {
    document.removeEventListener('visibilitychange', this.onVisibilityChangedInternal, false);
    window.removeEventListener('resize', this.onResizeInternal);
    document.removeEventListener('fullscreenchange', this.onResizeInternal);
  }

  /**
   * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
   */
  private onVisibilityChangedInternal(): void {
    this.onVisibilityChanged.emit(!document.hidden);
  }

  /**
   * Called when the browser resizes.
   */
  private onResizeInternal(): void {
    this.onResize.emit({ width: window.innerWidth, height: window.innerHeight });
  }
}
