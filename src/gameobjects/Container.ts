import {Container as PIXIContainer, IDestroyOptions, IPoint, Point, Ticker} from 'pixi.js';
import {SignalConnection, SignalConnections} from 'typed-signals';
import {Application} from '../core';
import {stopCaption} from '../functions';
import {IFocusable} from '../input';
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
export class Container<T extends Application = Application> extends PIXIContainer implements IFocusable {
  public static __dill_pixel_top_level_class = true;
  public editable: boolean = true;
  public childrenEditable: boolean = true;
  protected _addFactory: Add;
  // optionally add signals to a SignalConnections instance for easy removal
  protected _signalConnections: SignalConnections = new SignalConnections();
  protected _editMode = false;
  protected editor: Editor;
  // focus management
  protected _focusable: boolean;
  private _focusSize: Point = new Point();
  private _focusPosition: Point = new Point();
  private _voiceover: string;
  private _useAsCaptionTarget: boolean = true;

  constructor(autoResize: boolean = true, autoUpdate: boolean = false, autoBindMethods: boolean = true) {
    super();

    this._addFactory = new Add(this);

    if (autoBindMethods) {
      this.bindAllMethods();
    } else {
      this.bindMethods('onResize', 'update', 'updateFocusValues');
    }

    if (autoResize) {
      this.addSignalConnection(Signals.onResize.connect(this.onResize));
    }

    if (autoUpdate) {
      Ticker.shared.add(this.update, this);
    }

    this.on('added', this.updateFocusValues);
    this.on('childAdded', this.updateFocusValues);
    this.on('childRemoved', this.updateFocusValues);

    this.updateFocusValues();
  }

  get useAsCaptionTarget(): boolean {
    return this._useAsCaptionTarget;
  }

  set useAsCaptionTarget(value: boolean) {
    this._useAsCaptionTarget = value;
  }

  public get voiceover(): string {
    return this._voiceover;
  }

  public set voiceover(value: string) {
    this._voiceover = value;
    this.off('pointerover', this._onHoverForVO);
    this.off('pointerout', this._onOutForVO);
    if (this._voiceover) {
      this.on('pointerover', this._onHoverForVO);
      this.on('pointerout', this._onOutForVO);
    }
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
    this.off('added', this.updateFocusValues);
    this.off('childAdded', this.updateFocusValues);
    this.off('childRemoved', this.updateFocusValues);
    this.off('pointerover', this._onHoverForVO);
    this.off('pointerout', this._onOutForVO);
    super.destroy(_options);
  }

  // focus stuff
  public onFocusBegin(): void {
    if (this._voiceover) {
      this.app.playVO(this._voiceover, { data: { target: this._useAsCaptionTarget ? this : null } });
    }
  }

  public onFocusEnd(): void {
    if (this._voiceover) {
      stopCaption({ id: this._voiceover });
    }
  }

  public onFocusActivated(): void {}

  public getFocusPosition(): Point {
    return this._focusPosition;
  }

  public getFocusSize(): IPoint {
    return this._focusSize;
  }

  public isFocusable(): boolean {
    return this._focusable;
  }

  public enableEditMode() {
    this.editor = new Editor(this);
  }

  public disableEditMode() {
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

  protected _onHoverForVO() {
    this.app.playVO(this._voiceover, { data: { target: this._useAsCaptionTarget ? this : null } });
  }

  protected _onOutForVO() {
    if (this._voiceover) {
      stopCaption({ id: this._voiceover });
    }
  }

  protected updateFocusValues() {
    const bounds = this.getBounds();
    this._focusPosition = new Point(-this.width * 0.5, -this.height * 0.5);
    this._focusSize = new Point(bounds.width, bounds.height);
  }

  /**
   * @protected
   * adds a signal connection
   */
  protected addSignalConnection(...signalConnection: SignalConnection[]) {
    signalConnection.forEach((connection) => this._signalConnections.add(connection));
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
