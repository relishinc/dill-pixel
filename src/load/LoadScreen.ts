import {State} from '../state';

/**
 * Load screen
 */
export class LoadScreen extends State {
  protected _autoProgress: boolean;

  constructor() {
    super();
    this._autoProgress = true;
  }

  /**
   * autoProgress
   */
  public get autoProgress(): boolean {
    return this._autoProgress;
  }

  /**
   * onLoadProgress
   * @param _progress
   */
  public onLoadProgress(_progress: number): void {
    // do nothing
  }

  /**
   * onLoadComplete
   * @param pCallback
   */
  public onLoadComplete = (pCallback: () => void): void => {
    pCallback();
  };
}

export type LoadScreenProvider = LoadScreen | (() => LoadScreen);
