import type {Collider, RigidBody} from '@dimforge/rapier2d';
import RapierPhysics from './RapierPhysics';

export * from './GameObjects'
export type RapierBodyLike = RigidBody;

export interface IRapierPhysicsObject {
	body: RapierBodyLike;
	collider?: Collider;
	colliders?: Collider[]
	debugColor: number

	update(): void;
}

export default RapierPhysics;

