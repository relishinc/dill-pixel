import {State} from '../state/State';

/**
 * Load screen
 */
export class LoadScreen extends State {
  /**
   * onLoadComplete
   * @param pCallback
   */
  public onLoadComplete = (pCallback: () => void): void => {
    pCallback();
  };
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
}

export type LoadScreenProvider = LoadScreen | (() => LoadScreen);
