/// <reference types="matter-js" />
import MatterPhysics from "./MatterPhysics";
export type MatterBodyLike = Matter.Body | Matter.Composite | Matter.Constraint | Matter.MouseConstraint | Matter.World;
export interface IMatterPhysicsObject {
    body: MatterBodyLike;
    debugColor: number;
    update(): void;
}
export * from './GameObjects';
export default MatterPhysics;
//# sourceMappingURL=index.d.ts.map