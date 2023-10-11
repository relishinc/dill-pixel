import {Point} from 'pixi.js';
import {SignalConnections} from 'typed-signals';
import {Application} from '../core/Application';
import {Container} from '../gameobjects';
import {AssetMapData} from '../load';
import {Add, Make} from '../utils/factory';

/**
 * State
 */
export abstract class State extends Container {
  public static NAME: string = 'State';
  private static _assets: AssetMapData[] = [];

  protected _size: Point;
  protected _connections: SignalConnections = new SignalConnections();
  protected _data: any;

  constructor() {
    super(false);
    this._size = new Point();
  }

  public static get ID(): string {
    return 'State';
  }

  public static set Assets(pAssets: AssetMapData[]) {
    this._assets = pAssets;
  }

  public static get Assets(): AssetMapData[] {
    return State._assets || [];
  }

  /**
   * gets the Applicationinstance
   */
  public get app(): Application {
    return Application.instance;
  }

  /**
   * gets the Add factory
   */
  public get add(): Add {
    return this._addFactory;
  }

  /**
   * gets the Make factory
   */
  public get make(): typeof Make {
    return Make;
  }

  /**
   * Inits state
   * @param pSize{Point}
   * @param pData
   */
  public init(pSize: Point, pData?: any): void {
    this.onResize(pSize);
    this._data = pData;
  }

  /**
   * Updates state
   * @param pDeltaTime
   */
  public update(pDeltaTime: number): void {
    // override
  }

  /**
   * Determines whether resize on
   * @param pSize
   */
  public onResize(pSize: Point): void {
    this._size.copyFrom(pSize);
    this.position.set(this._size.x * 0.5, this._size.y * 0.5);
  }

  /**
   * Animates in
   * @param pOnComplete
   */
  public animateIn(pOnComplete: () => void): void {
    pOnComplete();
  }

  /**
   * Animates out
   * @param pOnComplete
   */
  public animateOut(pOnComplete: () => void): void {
    pOnComplete();
  }

  /**
   * Destroys state.
   * @param pOptions
   */
  public destroy(
    pOptions: Parameters<typeof Container.prototype.destroy>[0] = {
      children: true,
    },
  ): void {
    super.destroy(pOptions);
  }
}
