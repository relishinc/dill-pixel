import { Point, Rectangle } from 'pixi.js';
import { Application } from 'dill-pixel';
import { Entity } from './Entity';
import { Collision, EntityType } from './types';

export declare class Actor<T = any, A extends Application = Application> extends Entity<T, A> {
    type: string;
    isActor: boolean;
    passThroughTypes: EntityType[];
    passingThrough: Set<Entity>;
    riding: Set<Entity>;
    mostRiding: Entity | null;
    protected _activeCollisions: Collision[];
    get activeCollisions(): Collision[];
    set activeCollisions(value: Collision[]);
    get ridingAllowed(): boolean;
    get collideables(): Entity[];
    added(): void;
    removed(): void;
    squish(_collision?: Collision, _pushingEntity?: Entity, _direction?: Point): void;
    postUpdate(): void;
    moveX(amount: number, onCollide?: ((collision: Collision, pushingEntity?: Entity, direction?: Point) => void) | null, onNoCollisions?: (() => void) | null, pushingEntity?: Entity): void;
    moveY(amount: number, onCollide?: ((collision: Collision, pushingEntity?: Entity, direction?: Point) => void) | null, onNoCollisions?: (() => void) | null, pushingEntity?: Entity): void;
    collideAt(x: number, y: number, box: Rectangle, sides?: ('top' | 'right' | 'bottom' | 'left')[]): Collision[] | false;
    isRiding(solid: Entity): boolean;
    setPassingThrough(entity: Entity): void;
    removePassingThrough(entity: Entity): void;
    isPassingThrough(entity: Entity): boolean;
    private clearAllRiding;
    private setAllRiding;
}
//# sourceMappingURL=Actor.d.ts.map