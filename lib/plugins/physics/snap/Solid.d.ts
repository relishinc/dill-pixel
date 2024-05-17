import { Application } from '../../../core/Application';
import { Actor } from './Actor';
import { Entity } from './Entity';
export declare class Solid<T = any, A extends Application = Application> extends Entity<T, A> {
    type: string;
    isSolid: boolean;
    get collideables(): Entity[];
    added(): void;
    removed(): void;
    move(x: number, y: number): void;
    getAllRidingActors(): Actor[];
    collidesWith(entity: Entity, dx: number, dy: number): boolean;
    handleActorInteractions(deltaX: number, deltaY: number, ridingActors?: Actor[]): void;
    protected handleCollisionChange(_isColliding?: boolean): void;
}
