import { Point } from 'pixi.js';
import { Application } from '../core/Application';
import * as MathUtils from './MathUtils';

export class ResizeManager {
  private _sizeMin: Point;
  private _sizeMax: Point;
  private _ratioMin!: number;
  private _ratioMax!: number;
  private _useAspectRatio: boolean = false;

  constructor(
    private app: Application,
    pSizeMin?: Point | undefined,
    pSizeMax?: Point | undefined,
  ) {
    if (pSizeMin) {
      this._useAspectRatio = true;
      this._sizeMin = pSizeMin;
      if (pSizeMax) {
        this._sizeMax = pSizeMax;
      } else {
        this._sizeMax = pSizeMin;
      }
    }
    if (this._useAspectRatio) {
      this.updateRatio();
    } else {
      this._sizeMin = new Point(0, 0);
      this._sizeMax = new Point(0, 0);
    }
  }

  public get useAspectRatio(): boolean {
    return this._useAspectRatio;
  }

  public set sizeMin(pSize: Point) {
    this._sizeMin.copyFrom(pSize);
    this.updateRatio();
  }

  public set sizeMax(pSize: Point) {
    this._sizeMax.copyFrom(pSize);
    this.updateRatio();
  }

  private get windowAspectRatio(): number {
    return window.innerWidth / window.innerHeight;
  }

  private get gameAspectRatio(): number {
    return MathUtils.clamp(this.windowAspectRatio, this._ratioMin, this._ratioMax);
  }

  public getSize(): Point {
    const size: Point = new Point();
    size.y = this._sizeMax.y;
    size.x = size.y * this.gameAspectRatio;
    return size;
  }

  public getStageScale(): number {
    // if the window is wider than we support, fill the entire height
    if (this.gameAspectRatio < this.windowAspectRatio) {
      return window.innerHeight / this.getSize().y;
    }
    // otherwise, window is narrower or equal to what we support, so we fill the entire width
    else {
      return window.innerWidth / this.getSize().x;
    }
  }

  private updateRatio(): void {
    this._ratioMin = this._sizeMin.x / this._sizeMin.y;
    this._ratioMax = this._sizeMax.x / this._sizeMax.y;
  }
}
