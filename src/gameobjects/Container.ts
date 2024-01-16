import {Container as PIXIContainer, IDestroyOptions, IPoint, Point, Ticker} from 'pixi.js';
import {SignalConnection, SignalConnections} from 'typed-signals';
import {Application} from '../core';
import {Editor} from '../misc';
import {Signals} from '../signals';
import {Add, bindAllMethods, bindMethods, Make} from '../utils';

/**
 * Enhanced PIXI Container that has:
 * a factory for adding children,
 * a reference to the Application instance,
 * a signal connection manager,
 * and auto update / resize capabilities
 * @class Container
 * @extends PIXIContainer
 */
export class Container<T extends Application = Application> extends PIXIContainer {
  public editable: boolean = true;
  public childrenEditable: boolean = true;
  protected _addFactory: Add;
  // optionally add signals to a SignalConnections instance for easy removal
  protected _signalConnections: SignalConnections = new SignalConnections();
  protected _editMode = false;
  protected editor: Editor;
  // focus management
  protected _focusable: boolean = false;

  constructor(autoResize: boolean = true, autoUpdate: boolean = false, autoBindMethods: boolean = true) {
    super();

    this._addFactory = new Add(this);

    if (autoBindMethods) {
      this.bindAllMethods();
    } else {
      this.bindMethods('onResize', 'update');
    }

    if (autoResize) {
      this.addSignalConnection(Signals.onResize.connect(this.onResize));
    }

    if (autoUpdate) {
      Ticker.shared.add(this.update, this);
    }
  }

  get focusable(): boolean {
    return this._focusable;
  }

  set focusable(value: boolean) {
    this._focusable = value;
  }

  get editMode(): boolean {
    return this._editMode;
  }

  set editMode(value: boolean) {
    this._editMode = value;
    if (this._editMode) {
      this.enableEditMode();
    } else {
      this.disableEditMode();
    }
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

  destroy(_options?: IDestroyOptions | boolean) {
    this.disconnectAllSignals();
    super.destroy(_options);
  }

  enableEditMode() {
    this.editor = new Editor(this);
  }

  disableEditMode() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  public onResize(_size: IPoint) {
    // noop
  }

  public update(_deltaTime: number) {
    // noop
  }

  // focus stuff
  public onFocusBegin(): void {
    console.log(`onFocusBegin for ${this.name}`);
  }

  public onFocusEnd(): void {
    console.log(`onFocusEnd for ${this.name}`);
  }

  public onFocusActivated(): void {
    console.log(`onFocusActivated for ${this.name}`);
  }

  public getFocusPosition(): Point {
    return new Point(-this.width * 0.5, -this.height * 0.5);
  }

  public getFocusSize(): IPoint {
    const bounds = this.getBounds();
    return new Point(bounds.width, bounds.height);
  }

  public isFocusable?(): boolean {
    return this._focusable;
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

  protected bindAllMethods() {
    return bindAllMethods(this);
  }
}
