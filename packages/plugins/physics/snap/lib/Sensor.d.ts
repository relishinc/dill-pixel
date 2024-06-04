import { Application } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Collision, EntityType } from './types';

export declare class Sensor<T = any, A extends Application = Application> extends Actor<T, A> {
    type: string;
    isSensor: boolean;
    isColliding: boolean;
    /**
     * Types of entities that can pass through this sensor without triggering a collision
     * All actors by default, so sensors can still be pushed by and ride on solids,
     * but we don't check collisions with other actors in the moveX and moveY methods
     * You can call "resolveAllCollisions" to still resolve collisions for actors,
     * but not have this sensor be "pushed" by them
     */
    passThroughTypes: EntityType[];
    get collideables(): Entity[];
    added(): void;
    removed(): void;
    update(_deltaTime?: number): void;
    /**
     * Resolve all collisions for this sensor
     * ignores passThroughTypes
     */
    resolveAllCollisions(): null | Collision[];
    getOuterCollisions(collideables?: Entity<any, Application<import('pixi.js').Renderer>>[]): Collision[];
}
//# sourceMappingURL=Sensor.d.ts.map