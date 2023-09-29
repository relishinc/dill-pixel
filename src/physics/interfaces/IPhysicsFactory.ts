import { Container } from 'pixi.js';
import { IPhysicsAddFactory } from './IPhysicsAddFactory';
import { IPhysicsMakeFactory } from './IPhysicsMakeFactory';

export interface IPhysicsFactory {
  add: IPhysicsAddFactory;
  make: IPhysicsMakeFactory;

  set container(value: Container);
}
