import { Container } from 'pixi.js';
import { IPhysicsAddFactory, IPhysicsBase, IPhysicsFactory } from 'src/physics/index';
import { Application } from '../core';

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

  init(pAutoStart: boolean, pDebug: boolean, autoCreateBounds?: boolean, pEngineOptions?: any): void {
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
