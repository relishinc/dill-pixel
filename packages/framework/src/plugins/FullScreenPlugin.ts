import { Application } from '../core/Application';
import { Signal } from '../signals';
import { bindAllMethods, Logger } from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export interface IFullScreenPlugin extends IPlugin {
  isFullScreen: boolean;
  fullScreenElement: HTMLElement | Window | null;
  onFullScreenChange: Signal<(isFullscreen: boolean) => void>;
  toggleFullScreen: () => void;
  setFullScreen: (value: boolean) => void;
  setFullScreenElement: (element: HTMLElement | Window | null) => void;
  readonly canFullscreen: boolean;
}

/**
 * Maintains a list of callbacks for specific web events and invokes callbacks when event occurs.
 */
export class FullScreenPlugin extends Plugin implements IFullScreenPlugin {
  public readonly id = 'fullscreen';

  // signals
  public onFullScreenChange: Signal<(isFullscreen: boolean) => void> = new Signal<(isFullscreen: boolean) => void>();

  private _isFullScreen: boolean = false;
  private _fullScreenElement: HTMLElement | Window | null = null;

  set isFullScreen(value: boolean) {
    this._isFullScreen = value;
    this.setFullScreen(value);
  }

  get isFullScreen(): boolean {
    return this._isFullScreen;
  }

  set fullScreenElement(value: HTMLElement | Window | null) {
    this.setFullScreenElement(value);
  }

  get fullScreenElement(): HTMLElement | Window | null {
    return this._fullScreenElement;
  }
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
    document.addEventListener('fullscreenchange', this._onFullScreenChange);
    document.addEventListener('webkitfullscreenchange', this._onFullScreenChange);
    document.addEventListener('mozfullscreenchange', this._onFullScreenChange);
    document.addEventListener('msfullscreenchange', this._onFullScreenChange);
    document.addEventListener('fullscreenchange', this._onFullScreenChange);
  }

  public destroy() {
    document.removeEventListener('fullscreenchange', this._onFullScreenChange);
    document.removeEventListener('webkitfullscreenchange', this._onFullScreenChange);
    document.removeEventListener('mozfullscreenchange', this._onFullScreenChange);
    document.removeEventListener('msfullscreenchange', this._onFullScreenChange);
    document.removeEventListener('fullscreenchange', this._onFullScreenChange);
  }

  public toggleFullScreen() {
    this.setFullScreen(!this._isFullScreen);
  }

  public setFullScreen(value: boolean) {
    this._isFullScreen = value;
    if (value) {
      this._requestFullscreen();
    } else {
      this._exitFullscreen();
    }
  }

  public setFullScreenElement(value: HTMLElement | Window | null) {
    if (!value) {
      Logger.warn('No element passed to setFullScreenElement for fullscreen mode');
    }
    this._fullScreenElement = value;
  }

  public get canFullscreen(): boolean {
    const element = this._fullScreenElement || Application.containerElement;
    if (!element) return false;

    const fullscreenElement = element as HTMLElement;
    return !!(
      fullscreenElement.requestFullscreen ||
      (fullscreenElement as any).webkitRequestFullscreen ||
      (fullscreenElement as any).msRequestFullscreen ||
      (fullscreenElement as any).mozRequestFullScreen
    );
  }

  public get isFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement ||
      (document as any).mozFullScreenElement
    );
  }

  protected getCoreSignals(): string[] {
    return ['onFullScreenChange'];
  }

  protected getCoreFunctions(): string[] {
    return ['toggleFullScreen', 'setFullScreen', 'setFullScreenElement'];
  }

  private _requestFullscreen() {
    const element = this._fullScreenElement || Application.containerElement;
    if (!element) {
      Logger.error('No element available for fullscreen mode');
      return;
    }

    const fullscreenElement = element as HTMLElement;
    try {
      if (fullscreenElement.requestFullscreen) {
        fullscreenElement.requestFullscreen();
      } else if ((fullscreenElement as any).webkitRequestFullscreen) {
        (fullscreenElement as any).webkitRequestFullscreen();
      } else if ((fullscreenElement as any).msRequestFullscreen) {
        (fullscreenElement as any).msRequestFullscreen();
      } else if ((fullscreenElement as any).mozRequestFullScreen) {
        (fullscreenElement as any).mozRequestFullScreen();
      }
    } catch (error) {
      Logger.error('Failed to request fullscreen:', error);
      // Reset the fullscreen state since it failed
      this._isFullScreen = false;
    }
  }

  private _exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    }
  }

  /**
   * Called when the browser visibility changes. Passes the `hidden` flag of the document to all callbacks.
   */
  private _onFullScreenChange(): void {
    this.onFullScreenChange.emit(document.fullscreenElement !== null);
  }
}
