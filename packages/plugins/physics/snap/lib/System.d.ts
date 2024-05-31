import { Container, Ticker } from 'pixi.js';
import { IApplication, ICamera, Signal } from 'dill-pixel';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import { SpatialHashGrid } from './SpatialHashGrid';
import { Collision, EntityType, Side, SpatialHashGridFilter } from './types';
import { Wall } from './Wall';
import { SnapPhysicsPlugin } from './SnapPhysicsPlugin';

type SystemBoundary = {
    width: number;
    height: number;
    padding: number;
};
type SnapPhysicsBoundaryOptions = {
    width: number;
    height: number;
    thickness: number;
    padding: number;
    sides: Side[];
};
type OptionalSnapPhysicsBoundaryOptions = Partial<SnapPhysicsBoundaryOptions>;
type RequiredWidthAndHeight = Required<Pick<SnapPhysicsBoundaryOptions, 'width' | 'height'>>;
type CustomSnapPhysicsBoundaryOptions = OptionalSnapPhysicsBoundaryOptions & RequiredWidthAndHeight;
type SnapPhysicsSystemOptions = {
    gravity: number;
    fps: number;
    container: Container;
    debug: boolean;
    boundary: CustomSnapPhysicsBoundaryOptions;
    collisionResolver: (collision: Collision) => boolean;
    useSpatialHashGrid: boolean;
    cellSize: number;
};
export declare class System {
    static DEFAULT_COLLISION_THRESHOLD: number;
    static plugin: SnapPhysicsPlugin;
    static app: IApplication;
    static container: Container<any>;
    static grid: SpatialHashGrid | null;
    static fps: number;
    static debug: boolean;
    static typeMap: Map<EntityType, Entity[]>;
    static actors: Actor[];
    static solids: Solid[];
    static sensors: Sensor[];
    static gravity: number;
    static onCollision: Signal<(collision: Collision) => void>;
    static worldBounds: Wall[];
    static boundary: SystemBoundary;
    static camera?: ICamera;
    static collisionThreshold: number;
    static updateHooks: Set<(deltaTime: number) => void>;
    static preUpdateHooks: Set<(deltaTime: number) => void>;
    static postUpdateHooks: Set<(deltaTime: number) => void>;
    private static gfx;
    private static _ticker;
    private static _enabled;
    static get enabled(): boolean;
    static set enabled(value: boolean);
    private static _collisionResolver;
    static set collisionResolver(collisionResolverMethod: (collision: Collision) => boolean);
    static get worldWidth(): number;
    static get worldHeight(): number;
    static get all(): Entity[];
    static get totalEntities(): number;
    static useSpatialHashGrid(cellSize: number): void;
    static removeSpatialHashGrid(): void;
    static resolveCollision(collision: Collision): boolean;
    static addEntity(entity: Entity): void;
    static removeEntity(entity: Entity): void;
    static getEntitiesByType<T extends Entity = Entity>(...type: EntityType[]): T[];
    static addActor(actor: Actor): void;
    static addSolid(solid: Solid): void;
    static addSensor(sensor: Sensor): void;
    static removeActor(actor: Actor): void;
    static removeSolid(solid: Solid): void;
    static removeSensor(sensor: Sensor): void;
    static getNearbyEntities(entity: Entity, onlyTypes?: string[]): Entity[];
    static getNearbyEntities(entity: Entity, filter?: SpatialHashGridFilter): Entity[];
    /**
     * @param entity1
     * @param entity2
     * @param dx
     * @param dy
     */
    static getRectangleIntersection(entity1: Entity, entity2: Entity, dx: number, dy: number): boolean;
    static update(ticker: Ticker): void;
    static addBoundary(width: number, height: number, size?: number, padding?: number, sides?: Side[]): void;
    static collide(collision: Collision): void;
    static drawDebug(): void;
    static setContainer(container: Container): void;
    static initialize(opts: Partial<SnapPhysicsSystemOptions>): void;
    static updateEntity(entity: Entity): void;
    static cleanup(): void;
}
export {};
//# sourceMappingURL=System.d.ts.map