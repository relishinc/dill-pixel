import { Sprite } from 'pixi.js';
import { Container } from './Container';

export interface ISceneTransition extends Container {
  progress: number;
  active: boolean;
  destroy(): void;

  enter(): Promise<any> | void;
  exit(): Promise<any> | void;
}

export class SceneTransition extends Container {
  protected __background: Sprite;

  constructor(autoUpdate: boolean = false) {
    super({ autoResize: true, autoUpdate, priority: -9999 });
    this.addSignalConnection(
      this.app.assets.onLoadStart.connect(this.handleLoadStart),
      this.app.assets.onLoadProgress.connect(this.handleLoadProgress),
      this.app.assets.onLoadProgress.connect(this.handleLoadComplete),
    );
  }

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
}
