import RAPIER from '@dimforge/rapier2d';
import RapierPhysics from "./RapierPhysics";
export * from './GameObjects';
export type RapierBodyLike = RAPIER.RigidBody;
export interface IRapierPhysicsObject {
    body: RapierBodyLike;
    collider?: RAPIER.Collider;
    colliders?: RAPIER.Collider[];
    debugColor: number;
    update(): void;
}
export default RapierPhysics;
//# sourceMappingURL=index.d.ts.map