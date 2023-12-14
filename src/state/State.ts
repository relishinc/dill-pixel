import {Point} from 'pixi.js';
import {SignalConnections} from 'typed-signals';
import {Application} from '../core';
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

  set data(value: any) {
    this._data = value;
  }

  get data(): any {
    return this._data;
  }

  protected constructor() {
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
   * gets the Application instance
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
   * @param size{Point}
   */
  public async init(size: Point): Promise<void> {
    // override
  }

  /**
   * Updates state
   * @param _deltaTime
   */
  public update(_deltaTime: number): void {
    // override
  }

  /**
   * Determines whether resize on
   * @param size
   */
  public onResize(size: Point): void {
    this._size.copyFrom(size);
    this.position.set(this._size.x * 0.5, this._size.y * 0.5);
  }

  /**
   * Animates in
   * @param callback
   */
  public animateIn(callback: () => void): void {
    callback();
  }

  /**
   * Animates out
   * @param callback
   */
  public animateOut(callback: () => void): void {
    callback();
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
