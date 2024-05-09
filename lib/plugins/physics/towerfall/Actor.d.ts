import { Rectangle } from 'pixi.js';
import { Application } from '../../../core/Application';
import { Entity } from './Entity';
import { Collision, EntityType } from './types';
export declare class Actor<T = any, A extends Application = Application> extends Entity<T, A> {
    type: string;
    isActor: boolean;
    passThroughTypes: EntityType[];
    passingThrough: Set<Entity>;
    get collideables(): Entity[];
    added(): void;
    removed(): void;
    squish(_collision?: Collision, _pushingEntity?: Entity): void;
    moveX(amount: number, onCollide?: (collision: Collision, pushingEntity?: Entity) => void, onNoCollisions?: (() => void) | null, pushingEntity?: Entity): void;
    moveY(amount: number, onCollide?: ((collision: Collision, pushingEntity?: Entity) => void) | null, onNoCollisions?: (() => void) | null, pushingEntity?: Entity): void;
    collideAt(x: number, y: number, box: Rectangle): Collision[] | false;
    isRiding(solid: Entity): boolean;
    setPassingThrough(entity: Entity): void;
    removePassingThrough(entity: Entity): void;
    isPassingThrough(entity: Entity): boolean;
}
