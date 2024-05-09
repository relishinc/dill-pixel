import { Application } from '../../../core/Application';
import { Actor } from './Actor';
import { Entity } from './Entity';
export declare class Solid<T = any, A extends Application = Application> extends Entity<T, A> {
    type: string;
    isSolid: boolean;
    protected _isColliding: boolean;
    get collideables(): Entity[];
    get isColliding(): boolean;
    set isColliding(value: boolean);
    added(): void;
    removed(): void;
    move(x: number, y: number): void;
    getAllRidingActors(): Actor[];
    collidesWith(entity: Entity): boolean;
    protected handleCollisionChange(_isColliding?: boolean): void;
    private handleActorInteractions;
}
