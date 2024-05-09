import { Point, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { ICollider } from './ICollider';
import { Collision } from './types';
export declare function checkPointIntersection(point: Point, collider: ICollider): boolean;
export declare function checkCollision(rectA: Rectangle, rectB: Rectangle, entity1: Entity, entity2: Entity): Collision | false;
