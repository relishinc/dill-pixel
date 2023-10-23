import {Container as PIXIContainer, IDestroyOptions, IPoint} from 'pixi.js';
import {SignalConnection, SignalConnections} from 'typed-signals';
import {Application} from '../core';
import {Editor} from '../misc';
import {Signals} from '../signals';
import {Add, Make} from '../utils/factory';

/**
 * Enhanced PIXI Container that has a factory for adding children, and a reference to the Application instance
 * @class Container
 * @extends PIXIContainer
 */
export class Container extends PIXIContainer {
  protected _addFactory: Add;
  protected _connections: SignalConnections = new SignalConnections();

  protected _editMode = false;
  protected editor: Editor;
  public editable: boolean = true;
  public childrenEditable: boolean = true;

  constructor(listenForResize: boolean = true) {
    super();
    this.onResize = this.onResize.bind(this);
    this._addFactory = new Add(this);
    if (listenForResize) {
      Signals.onResize.connect(this.onResize);
    }
  }

  set editMode(value: boolean) {
    this._editMode = value;
    if (this._editMode) {
      this.enableEditMode();
    } else {
      this.disableEditMode();
    }
  }

  get editMode(): boolean {
    return this._editMode;
  }

  enableEditMode() {
    this.editor = new Editor(this);
  }

  disableEditMode() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  get add(): Add {
    return this._addFactory;
  }

  get make(): typeof Make {
    return Make;
  }

  get app(): Application {
    return Application.instance;
  }

  destroy(_options?: IDestroyOptions | boolean) {
    this.disconnectAllSignals();
    super.destroy(_options);
  }

  public onResize(_size: IPoint) {
    //
  }

  /**
   * @protected
   * adds a signal connection
   */
  protected addSignalConnection(pConnection: SignalConnection) {
    this._connections.add(pConnection);
  }

  /**
   * @protected
   * removes all signal connections
   */
  protected disconnectAllSignals() {
    this._connections.disconnectAll();
  }
}
