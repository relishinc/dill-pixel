import { IDestroyOptions, IPoint, ParticleContainer as PIXIParticleContainer, Ticker } from 'pixi.js';
import { SignalConnection, SignalConnections } from 'typed-signals';
import { Application } from '../core';
import { Editor } from '../misc';
import { Signals } from '../signals';
import { Add, bindMethods, Make } from '../utils';

export interface ParticleContainerProps {
  maxSize: number;
  properties: Partial<{
    vertices: boolean;
    position: boolean;
    rotation: boolean;
    uvs: boolean;
    tint: boolean;
  }>;
  batchSize: number;
  autoResize: boolean;
}

/**
 * Enhanced PIXI Container that has:
 * a factory for adding children,
 * a reference to the Application instance,
 * a signal connection manager,
 * and auto update / resize capabilities
 * @class ParticleContainer
 * @extends PIXIParticleContainer
 */
export class ParticleContainer extends PIXIParticleContainer {
  public static __dill_pixel_top_level_class = true;
  public editable: boolean = true;
  public childrenEditable: boolean = true;
  protected _addFactory: Add;
  // optionally add signals to a SignalConnections instance for easy removal
  protected _signalConnections: SignalConnections = new SignalConnections();
  protected _editMode = false;
  protected editor: Editor;

  constructor(props: Partial<ParticleContainerProps> = {}, autoResize: boolean = true, autoUpdate: boolean = false) {
    const properties = Object.assign(
      {
        vertices: false,
        position: true,
        rotation: false,
        uvs: false,
        tint: false,
      },
      props.properties ?? {},
    );
    const derivedProps = Object.assign({ maxSize: 1500, properties, batchSize: 16384, autoResize: false }, props);

    super(derivedProps.maxSize, derivedProps.properties, derivedProps.batchSize, derivedProps.autoResize);

    this.update = this.update.bind(this);
    this.onResize = this.onResize.bind(this);
    this._addFactory = new Add(this);

    if (autoResize) {
      Signals.onResize.connect(this.onResize);
    }

    if (autoUpdate) {
      Ticker.shared.add(this.update);
    }
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

  get app(): Application {
    return Application.instance;
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
}
