import { Point, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { ICollider } from './ICollider';
import { Collision } from './types';

export declare function checkPointIntersection(point: Point, collider: ICollider): boolean;
type Overlap = {
    x: number;
    y: number;
    area: number;
};
export declare function getIntersectionArea(rectA: Rectangle, rectB: Rectangle): Overlap;
export declare function checkCollision(rectA: Rectangle, rectB: Rectangle, entity1: Entity, entity2: Entity): Collision | false;
export {};
//# sourceMappingURL=utils.d.ts.map