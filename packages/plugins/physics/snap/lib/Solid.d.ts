import { Application } from 'dill-pixel';
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
    handleActorInteractions(deltaX: number, deltaY: number, ridingActors?: Actor[]): void;
    protected handleCollisionChange(_isColliding?: boolean): void;
}
//# sourceMappingURL=Solid.d.ts.map