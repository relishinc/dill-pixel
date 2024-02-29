import { Application } from '../../../core';
import { CoreModule } from '../../../core/decorators';
import { Signal } from '../../../signals';
import { bindAllMethods, Size } from '../../../utils';
import { IModule, Module } from '../../Module';

export interface IWebEventsManager extends IModule {
  onResize: Signal<(size: { width: number; height: number }) => void>;
  onVisibilityChanged: Signal<(visible: boolean) => void>;
}

/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
@CoreModule
export class WebEventsManager extends Module implements IWebEventsManager {
  public readonly id = 'WebEventsManager';

  // signals
  public onResize = new Signal<(size: Size) => void>();
  public onVisibilityChanged = new Signal<(visible: boolean) => void>();

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
    this.onResize.emit({ width: window.innerWidth, height: window.innerHeight });
  }
}
