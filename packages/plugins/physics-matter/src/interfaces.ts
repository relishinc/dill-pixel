import { MatterBodyLike } from './types';

export interface IMatterPhysicsObject {
  body: MatterBodyLike;
  debugColor: number;

  update(): void;
}

export interface IMatterCompositeObject {
  bodies: MatterBodyLike[];
  debugColor: number;

  update(): void;
}
