import { Sprite, Ticker } from 'pixi.js';
import { type Size } from '../utils';
import { Container } from './Container';

export interface ISceneTransition extends Container {
  initialized: boolean;
  progress: number;
  active: boolean;
  destroy(): void;
  enter(): Promise<any> | void;
  exit(): Promise<any> | void;
  initialize(): void;
}

export class SceneTransition extends Container {
  public initialized: boolean = false;
  protected __background: Sprite;

  private _active: boolean = false;

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  private _progress: number;

  get progress(): number {
    return this._progress;
  }

  set progress(value: number) {
    this._progress = value;
  }

  constructor(autoUpdate: boolean = false) {
    super({ autoResize: true, autoUpdate: false, priority: -9999 });

    if (autoUpdate) {
      this.app.ticker.add(this._update);
    }

    this.addSignalConnection(
      this.app.assets.onLoadStart.connect(this.handleLoadStart),
      this.app.assets.onLoadProgress.connect(this.handleLoadProgress),
      this.app.assets.onLoadProgress.connect(this.handleLoadComplete),
    );
  }

  public initialize(): void;
  public async initialize(): Promise<void> {
    return Promise.resolve();
  }

  public resize(size: Size): void {
    void size;
  }

  public destroy(): void {
    this.app.ticker.remove(this._update);
    this.initialized = false;
    this._active = false;
    this._progress = 0;
    super.destroy();
  }

  /**
   * Called to animate the scene in
   * @returns {Promise<void>}
   */
  public enter(): void;
  public async enter(): Promise<any> {
    return Promise.resolve();
  }

  /**
   * Called to animate the scene out
   * @returns {Promise<void>}
   */
  public exit(): void;
  public async exit(): Promise<any> {
    return Promise.resolve();
  }

  protected handleLoadStart() {
    // signifies the preloading phase has started for the new scene
  }

  protected handleLoadProgress(progress: number) {
    // the preloading progress for the loading scene
    this._progress = progress;
  }

  protected handleLoadComplete() {
    // signifies the preloading phase is complete for the new scene
  }

  // check if initialized and active before calling update
  // this way we're sure in the case of a Splash sccreen, all the assets are loaded and the scene is initialized
  private _update(ticker: Ticker) {
    if (this.active && this.initialized) {
      this.update(ticker);
    }
  }
}
