import RAPIER from '@dimforge/rapier2d';

export type RapierBodyLike = RAPIER.RigidBody;

export interface IRapierPhysicsObject {
	body: RapierBodyLike;
	collider: RAPIER.Collider;
	debugColor: number

	update(): void;
}


