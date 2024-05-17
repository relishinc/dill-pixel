import { Graphics, Point } from 'pixi.js';
import { Signal } from '../../../signals';
import { Logger } from '../../../utils/console/Logger';
import { SpatialHashGrid } from './SpatialHashGrid';
import { Wall } from './Wall';
import { getIntersectionArea } from './utils';
import { Application } from '../../../core/Application';
export class System {
    static DEFAULT_COLLISION_THRESHOLD = 2;
    static container;
    static grid;
    static fps;
    //
    static debug = true;
    static typeMap = new Map();
    static actors = [];
    static solids = [];
    static sensors = [];
    static enabled = true;
    static gravity = 10;
    static onCollision = new Signal();
    static worldBounds = [];
    static boundary;
    static camera;
    static collisionThreshold = 8;
    static gfx;
    static _collisionResolver = null;
    static set collisionResolver(collisionResolverMethod) {
        System._collisionResolver = collisionResolverMethod;
    }
    static get worldWidth() {
        return System.boundary?.width ? System.boundary.width + (System.boundary.padding ?? 0) : System.container.width;
    }
    static get worldHeight() {
        return System.boundary?.height ? System.boundary.height + (System.boundary.padding ?? 0) : System.container.height;
    }
    static get all() {
        return [...System.actors, ...System.solids];
    }
    static get totalEntities() {
        return System.actors.length + System.solids.length + System.sensors.length;
    }
    static useSpatialHashGrid(cellSize) {
        if (System.grid) {
            System.grid.cellSize = cellSize;
        }
        else {
            System.grid = new SpatialHashGrid(cellSize, true);
        }
    }
    static removeSpatialHashGrid() {
        if (System.grid) {
            System.grid.destroy();
            System.grid = null;
        }
    }
    static resolveCollision(collision) {
        // Implement collision resolution logic
        return System._collisionResolver ? System._collisionResolver(collision) : true;
    }
    static addEntity(entity) {
        if (!System.typeMap.has(entity.type)) {
            System.typeMap.set(entity.type, []);
        }
        System.typeMap.get(entity.type).push(entity);
        if (System.grid) {
            System.grid.insert(entity);
        }
    }
    static removeEntity(entity) {
        if (System.grid) {
            System.grid.remove(entity);
        }
        if (System.typeMap.has(entity.type)) {
            const entities = System.typeMap.get(entity.type);
            const index = entities.indexOf(entity);
            if (index !== -1) {
                entities.splice(index, 1);
            }
        }
    }
    static getEntitiesByType(...type) {
        if (type.length === 0) {
            return System.typeMap.get(type[0]) || [];
        }
        return type.reduce((acc, t) => {
            const entities = System.typeMap.get(t);
            if (entities?.length) {
                return [...acc, ...entities];
            }
            return acc;
        }, []);
    }
    static addActor(actor) {
        System.actors.push(actor);
        System.addEntity(actor);
    }
    static addSolid(solid) {
        System.solids.push(solid);
        System.addEntity(solid);
    }
    static addSensor(sensor) {
        System.sensors.push(sensor);
        System.addEntity(sensor);
    }
    static removeActor(actor) {
        System.removeEntity(actor);
        const index = System.actors.indexOf(actor);
        if (index !== -1) {
            System.actors.splice(index, 1);
        }
    }
    static removeSolid(solid) {
        System.removeEntity(solid);
        const index = System.solids.indexOf(solid);
        if (index !== -1) {
            System.solids.splice(index, 1);
        }
    }
    static removeSensor(sensor) {
        System.removeEntity(sensor);
        const index = System.sensors.indexOf(sensor);
        if (index !== -1) {
            System.sensors.splice(index, 1);
        }
    }
    static getNearbyEntities(entity, filter) {
        if (System.grid) {
            const bounds = entity.getBoundingBox();
            return System.grid.query(bounds, filter);
        }
        return System.all.filter((e) => {
            if (filter) {
                if (Array.isArray(filter)) {
                    return filter.includes(e.type);
                }
                else {
                    return filter(e);
                }
            }
            return true;
        });
    }
    /**
     * @param entity1
     * @param entity2
     * @param dx
     * @param dy
     */
    static getRectangleIntersection(entity1, entity2, dx, dy) {
        const bounds1 = entity1.getBoundingBox();
        const bounds2 = entity2.getBoundingBox().clone();
        bounds2.x += dx;
        bounds2.y += dy;
        const intersection = getIntersectionArea(bounds1, bounds2);
        return intersection.area > 0 && intersection.area > System.collisionThreshold;
    }
    static update(deltaTime) {
        if (!System.enabled) {
            return;
        }
        if (!System.container) {
            Logger.error('SnapPhysicsPlugin: World container not set!');
        }
        // Implement world step logic
        System.solids.forEach((solid) => {
            solid.update(deltaTime);
        });
        System.sensors.forEach((sensor) => {
            sensor.update(deltaTime);
        });
        System.actors.forEach((actor) => {
            actor.update(deltaTime);
        });
        if (System.debug) {
            System.drawDebug();
        }
        else {
            if (System.gfx) {
                System.gfx.clear();
            }
        }
        if (System.camera) {
            System.camera.update();
        }
    }
    static addBoundary(width, height, size = 10, padding = 5, sides = ['top', 'bottom', 'left', 'right']) {
        if (!System.container) {
            throw new Error('System container not set. Set World.container before calling System.addBoundary().');
        }
        if (System.worldBounds.length > 0) {
            // World bounds already added
            // remove existing bounds
            System.worldBounds.forEach((wall) => {
                wall.parent.removeChild(wall);
                wall.destroy();
            });
            System.worldBounds = [];
        }
        const pos = new Point(0, 0);
        const container = System.container;
        let wall;
        if (sides.includes('bottom')) {
            wall = container.addChild(new Wall({ width, height: size }));
            wall.position.set(pos.x + width * 0.5, pos.y + height + padding);
            System.worldBounds.push(wall);
        }
        if (sides.includes('top')) {
            wall = container.addChild(new Wall({ width, height: size }));
            wall.position.set(pos.x + width * 0.5, pos.y + size * 0.5);
            System.worldBounds.push(wall);
        }
        if (sides.includes('left')) {
            wall = container.addChild(new Wall({ width: size, height }));
            wall.position.set(pos.x - size * 0.5 - padding, pos.y + height * 0.5 + size * 0.5);
            System.worldBounds.push(wall);
        }
        if (sides.includes('right')) {
            wall = container.addChild(new Wall({ width: size, height }));
            wall.position.set(pos.x + width + padding + size * 0.5, pos.y + height * 0.5);
            System.worldBounds.push(wall);
        }
        if (System.grid) {
            System.worldBounds.forEach((wall) => {
                System.grid?.remove(wall);
                System.grid?.insert(wall);
            });
        }
    }
    static collide(collision) {
        if (!collision.type && collision.entity1 && collision.entity2) {
            collision.type = `${collision.entity1.type}|${collision.entity2.type}`;
        }
        this.onCollision.emit(collision);
    }
    static drawDebug() {
        if (!System.container) {
            return;
        }
        if (!System.gfx) {
            System.gfx = new Graphics();
            System.container.addChild(System.gfx);
        }
        // move to top
        System.container.setChildIndex(System.gfx, System.container.children.length - 1);
        System.gfx.clear();
        [...System.actors, ...System.solids, ...System.sensors].forEach((entity) => {
            const bounds = entity.getBoundingBox();
            const outerBounds = entity.getOuterBoundingBox();
            System.gfx
                .rect(bounds.x, bounds.y, bounds.width, bounds.height)
                .stroke({ width: 1, color: entity.debugColors.bounds, alignment: 0.5 });
            if (outerBounds) {
                System.gfx
                    .rect(outerBounds.x, outerBounds.y, outerBounds.width, outerBounds.height)
                    .stroke({ width: 1, color: entity.debugColors.outerBounds, alignment: 0.5 });
            }
        });
        if (System.grid) {
            System.grid.draw(System.gfx);
        }
    }
    static setContainer(container) {
        System.container = container;
    }
    static initialize(opts) {
        console.log('SYSTEM INITIALIZED');
        System.enabled = true;
        if (opts.gravity) {
            System.gravity = opts.gravity;
        }
        if (opts.fps) {
            System.fps = opts.fps;
            Application.getInstance().ticker.maxFPS = opts.fps;
        }
        if (opts.container) {
            System.setContainer(opts.container);
        }
        if (opts.debug !== undefined) {
            System.debug = opts.debug;
        }
        if (opts.collisionResolver) {
            System.collisionResolver = opts.collisionResolver;
        }
        if (opts.boundary) {
            System.boundary = {
                width: opts.boundary.width,
                height: opts.boundary.height,
                padding: opts.boundary.padding ?? 0,
            };
            if (opts.boundary.width && opts.boundary.height) {
                System.addBoundary(opts.boundary.width, opts.boundary.height, opts.boundary.thickness, opts.boundary.padding, opts.boundary.sides);
            }
            else {
                Logger.error('SnapPhysicsPlugin System.initialize: Boundary width and height required.');
            }
        }
        if (opts.useSpatialHashGrid) {
            System.useSpatialHashGrid(opts.cellSize ?? 100);
        }
    }
    static updateEntity(entity) {
        if (System.grid) {
            System.grid.updateEntity(entity);
        }
    }
    static cleanup() {
        console.log('SYSTEM CLEANUP');
        if (System.worldBounds) {
            System.worldBounds.forEach((wall) => {
                wall.parent.removeChild(wall);
                wall.destroy();
            });
            System.worldBounds = [];
        }
        if (System.container) {
            System.container.removeChildren();
            // @ts-expect-error container can't be null
            System.container = null;
        }
        if (System.gfx) {
            System.gfx.clear();
            // @ts-expect-error GFX can't be null
            System.gfx = null;
        }
        if (System.grid) {
            System.grid.destroy();
            System.grid = null;
        }
        if (System.camera) {
            // @ts-expect-error camera can't be null
            System.camera = null;
        }
        this.solids = [];
        this.actors = [];
        this.sensors = [];
        this.typeMap.clear();
        this.worldBounds = [];
    }
}
