import { Point } from 'pixi.js';
import { Application } from '../core/Application';
import * as MathUtils from './MathUtils';

type DesiredSizeConfig = {
  size: Point;
  maxFactor: number;
  sizeMin: Point;
  sizeMax: Point;
  ratioMin: number;
  ratioMax: number;
};

export class ResizeManager {
  private _sizeMin: Point;
  private _sizeMax: Point;
  private _ratioMin!: number;
  private _ratioMax!: number;
  private _useAspectRatio: boolean = false;
  private _desiredSizeConfig: DesiredSizeConfig;

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

  setDesiredSize(desiredSize: Point, maxFactor: number = 4): void {
    const sizeMin = new Point(desiredSize.x, desiredSize.y);
    const sizeMax = new Point(desiredSize.x * maxFactor, desiredSize.y * maxFactor);
    this._desiredSizeConfig = {
      size: desiredSize,
      maxFactor: maxFactor,
      sizeMin,
      sizeMax,
      ratioMin: sizeMin.x / sizeMin.y,
      ratioMax: sizeMax.x / sizeMax.y,
    };
  }

  getScaleRatio(size: Point = this.app.size) {
    let scale = 1;
    if (this._desiredSizeConfig) {
      const newAspectRatio = size.x / size.y;
      const desiredAspectRatio = MathUtils.clamp(
        newAspectRatio,
        this._desiredSizeConfig.ratioMin,
        this._desiredSizeConfig.ratioMax,
      );
      if (desiredAspectRatio < newAspectRatio) {
        scale = size.y / this._desiredSizeConfig.size.y;
      } else {
        scale = size.x / this._desiredSizeConfig.size.x;
      }
    } else {
      console.warn('ResizeManager: desiredSize is not set. Set it first using setDesiredSize()');
    }
    return scale;
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
