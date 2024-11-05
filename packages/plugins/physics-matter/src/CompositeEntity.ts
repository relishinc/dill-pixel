import { Container } from 'dill-pixel';
import { IMatterCompositeObject } from './interfaces';
import { System } from './System';
import { MatterBodyLike } from './types';

export class CompositeEntity extends Container implements IMatterCompositeObject {
  debugColor: number;
  bodies: MatterBodyLike[] = [];
  joints: Matter.Constraint[] = [];

  constructor() {
    super();
  }

  public get system(): typeof System {
    return System;
  }

  createBodies(): void {}

  createJoints(): void {}

  added() {
    this.createBodies();
    this.createJoints();

    this.system.api.composite.add(this.system.engine.world, [...this.bodies, ...this.joints]);
  }

  onRemoved(): void {
    this.system.api.composite.remove(this.system.engine.world, this.bodies);
  }

  update(): void {}
}
