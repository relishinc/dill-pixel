import { Graphics } from 'pixi.js';
import { Application } from '../core';
import { Container } from '../gameobjects';
import { IPhysicsAddFactory, IPhysicsBase, IPhysicsFactory } from './interfaces';

export class PhysicsBase implements IPhysicsBase {
  _factory: IPhysicsFactory;

  protected _debug: boolean = false;
  protected _debugGraphics: Graphics;
  protected _debugContainer: Container;

  constructor(protected app: Application) {}

  get factory(): IPhysicsFactory {
    return this._factory;
  }

  set debug(value: boolean) {
    this._debug = value;
    if (this._debug) {
      if (!this._debugGraphics || !this._debugContainer || !this._debugGraphics.parent) {
        this._debugContainer = this.app.add.container({ position: [this.app.size.x * 0.5, this.app.size.y * 0.5] });
        this._debugGraphics = this._debugContainer.add.graphics();
        this.app.stage.setChildIndex(this._debugContainer, this.app.stage.children.length - 1);
      }
    } else {
      this._debugContainer?.parent.removeChild(this._debugContainer);
      this._debugGraphics?.destroy({ children: true });
      this._debugContainer?.destroy({ children: true });
    }
  }

  get debug(): boolean {
    return this._debug;
  }

  get add(): IPhysicsAddFactory {
    return this.factory.add;
  }

  set container(value: Container) {
    this.factory.container = value;
  }

  /**
   * Initializes the physics engine
   * @param _autoStart
   * @param _debug
   * @param _autoCreateBounds
   * @param _engineOptions
   */
  init(_autoStart: boolean, _debug: boolean, _autoCreateBounds?: boolean, _engineOptions?: any): void {
    // noop
  }

  destroy() {
    if (this._debugGraphics) {
      this._debugGraphics?.destroy();
    }
    if (this._debugContainer) {
      this.app.stage.removeChild(this._debugContainer);
    }
  }

  update(pDeltaTime: number) {
    // noop
  }

  addToWorld(body: any) {
    // noop
  }

  removeFromWorld(body: any) {
    // noop
  }
}
