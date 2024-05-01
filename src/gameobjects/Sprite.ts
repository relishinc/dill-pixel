import { Texture } from '@pixi/core';
import { IPoint, Point, Sprite as PIXISprite } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core/Application';
import { IFocusable } from '../input/IFocusable';
import { Add } from '../utils/factory/Add';
import { Make } from '../utils/factory/Make';
import { bindAllMethods, bindMethods } from '../utils/FrameworkUtils';

export class Sprite<T extends Application = Application> extends PIXISprite implements IFocusable {
  public static __dill_pixel_top_level_class = true;
  public editable: boolean = true;
  // add
  protected _addFactory: Add;
  // optionally add signals to a SignalConnections instance for easy removal
  protected _signalConnections: SignalConnections = new SignalConnections();
  // focus management
  protected _focusable: boolean;
  protected _focusSize: Point = new Point();
  protected _focusPosition: Point = new Point();

  constructor(texture?: Texture) {
    super(texture);
    this._addFactory = new Add(this);

    this.bindMethods('updateFocusValues');

    this.on('added', this.updateFocusValues);
    this.on('childAdded', this.updateFocusValues);
    this.on('childRemoved', this.updateFocusValues);

    this.updateFocusValues();
  }

  public get focusPosition(): Point {
    return this._focusPosition;
  }

  public set focusPosition(value: Point) {
    this._focusPosition = value;
  }

  public get focusSize(): Point {
    return this._focusSize;
  }

  public set focusSize(value: Point) {
    this._focusSize = value;
  }

  get add(): Add {
    return this._addFactory;
  }

  get make(): typeof Make {
    return Make;
  }

  get app(): T {
    return Application.instance as T;
  }

  get focusable(): boolean {
    return this._focusable;
  }

  set focusable(value: boolean) {
    this._focusable = value;
  }

  public getFocusPosition(): Point {
    return this._focusPosition;
  }

  public getFocusSize(): IPoint {
    return this._focusSize;
  }

  public isFocusable(): boolean {
    return this._focusable;
  }

  public onFocusActivated(): void {}

  public onFocusBegin(): void {}

  public onFocusEnd(): void {}

  protected updateFocusValues() {
    const bounds = this.getBounds();
    this._focusSize = new Point(bounds.width, bounds.height);
    this._focusPosition = new Point(-this.width * this.anchor.x, -this.height * this.anchor.y);
  }

  /**
   * @protected
   * adds a signal connection
   */
  protected addSignalConnection(pConnection: SignalConnection) {
    this._signalConnections.add(pConnection);
  }

  /**
   * @protected
   * removes all signal connections
   */
  protected disconnectAllSignals() {
    this._signalConnections.disconnectAll();
  }

  /**
   * @param methodNames
   * @protected
   */
  protected bindMethods(...methodNames: string[]) {
    return bindMethods(this, ...methodNames);
  }

  /**
   * @protected
   */
  protected bindAllMethods() {
    return bindAllMethods(this);
  }
}
