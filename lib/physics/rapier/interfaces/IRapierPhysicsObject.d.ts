import { Collider } from '@dimforge/rapier2d';
import { RapierBodyLike } from '../types';
export interface IRapierPhysicsObject {
    body: RapierBodyLike;
    collider?: Collider;
    colliders?: Collider[];
    debugColor: number;
    update(): void;
}
//# sourceMappingURL=IRapierPhysicsObject.d.ts.map