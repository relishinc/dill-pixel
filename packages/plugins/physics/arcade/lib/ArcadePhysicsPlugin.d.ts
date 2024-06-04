import { Container, IApplication, Plugin } from 'dill-pixel';
import { ArcadePhysics } from 'arcade-physics/lib/physics/arcade/ArcadePhysics';
import { Entity } from './Entity';

export interface ArcadePhysicsPluginOptions {
    fps?: number;
    fixedStep?: boolean;
    timeScale?: number;
    gravity: {
        x: number;
        y: number;
    };
    y?: number;
    width: number;
    height: number;
    checkCollision?: boolean;
    tileBias?: number;
    forceX?: boolean;
    isPaused?: boolean;
    debug?: boolean;
    debugShowBody?: boolean;
    debugShowStaticBody?: boolean;
    debugShowVelocity?: boolean;
    debugBodyColor?: number;
    debugStaticBodyColor?: number;
    debugVelocityColor?: number;
    maxEntries?: number;
    useTree?: boolean;
    customUpdate?: boolean;
}
export declare class ArcadePhysicsPlugin extends Plugin {
    static ID: string;
    container: Container;
    readonly id = "ArcadePhysicsPlugin";
    options: ArcadePhysicsPluginOptions;
    physics: ArcadePhysics;
    private _gfx;
    private _debug;
    set debug(value: boolean);
    initialize(app: IApplication, options?: Partial<ArcadePhysicsPluginOptions>): Promise<void>;
    destroy(): void;
    addBody(entity: Entity): void;
    private _drawDebug;
}
//# sourceMappingURL=ArcadePhysicsPlugin.d.ts.map