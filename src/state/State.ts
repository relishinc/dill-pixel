import {IPoint, Point} from 'pixi.js';
import {Application} from '../core';
import {Container} from '../gameobjects';
import {AssetMapData} from '../load';
import {SignalConnections} from '../signals';
import {Add, Make} from '../utils';

/**
 * State
 */
export abstract class State<T extends Application = Application> extends Container<T> {
  private static _assets: AssetMapData[] = [];
  public static NAME: string = 'State';
  protected _size: Point;
  protected _connections: SignalConnections = new SignalConnections();
  protected _data: any;

  protected constructor() {
    super(false);
    this._size = new Point();
  }

  public static get ID(): string {
    return 'State';
  }

  public static get Assets(): AssetMapData[] {
    return State._assets || [];
  }

  public static set Assets(pAssets: AssetMapData[]) {
    this._assets = pAssets;
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

  get size() {
    return this._size;
  }

  set size(value: IPoint) {
    this._size.copyFrom(value);
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  /**
   * Updates state
   * @param deltaTime
   */
  public update(deltaTime: number): void {
    // override
  }

  /**
   * Determines whether resize on
   * @param size
   */
  public onResize(size: IPoint): void {
    // override
  }

  /**
   * Destroys state.
   * @param destroyOptions
   */
  public destroy(
    destroyOptions: Parameters<typeof Container.prototype.destroy>[0] = {
      children: true,
    },
  ): void {
    super.destroy(destroyOptions);
  }

  /**
   * Inits state
   * @param size{Point}
   */
  public init(size: IPoint): Promise<void> | void;
  public async init(size: Point): Promise<void> {
    // override
  }

  public positionSelfCenter(size: Point) {
    this.position.set(size.x * 0.5, size.y * 0.5);
  }

  /**
   * Animates in
   * @param callback
   */
  public animateIn(callback: () => void): Promise<void> | void;
  public async animateIn(callback: () => void): Promise<void> {
    callback();
  }

  /**
   * Animates out
   * @param callback
   */
  public animateOut(callback: () => void): Promise<void> | void;
  public async animateOut(callback: () => void): Promise<void> {
    callback();
  }
}
