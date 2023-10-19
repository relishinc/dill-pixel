import { Container } from 'pixi.js';
import { Application } from '../core';
import { IPhysicsAddFactory, IPhysicsBase, IPhysicsFactory } from './interfaces';

export class PhysicsBase implements IPhysicsBase {
  _factory: IPhysicsFactory;

  protected _debug: boolean = false;

  constructor(protected app: Application) {}

  get factory(): IPhysicsFactory {
    return this._factory;
  }

  set debug(value: boolean) {
    this._debug = value;
  }

  get debug(): boolean {
    return false;
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
    // noop
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
