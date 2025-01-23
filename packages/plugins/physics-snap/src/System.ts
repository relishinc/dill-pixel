import { IApplication, ICamera, Logger, Signal } from 'dill-pixel';
import { Circle, Container, Graphics, Point, Rectangle } from 'pixi.js';
import { Collision, EntityType, Side, SpatialHashGridFilter } from './types';

import { Actor } from './Actor';
import { Entity } from './Entity';
import { Sensor } from './Sensor';
import { SnapPhysicsPlugin } from './SnapPhysicsPlugin';
import { Solid } from './Solid';
import { SpatialHashGrid } from './SpatialHashGrid';
import { Wall } from './Wall';
import {
  getCircleToCircleIntersectionArea,
  getRectToCircleIntersectionArea,
  getRectToRectIntersectionArea,
} from './utils';

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

export class System {
  public static DEFAULT_COLLISION_THRESHOLD: number = 0;
  public static plugin: SnapPhysicsPlugin;
  public static app: IApplication;
  public static container: Container<any>;
  public static grid: SpatialHashGrid | null;
  public static fps: number = 60;
  //
  static debug: boolean = true;
  static typeMap: Map<EntityType, Entity[]> = new Map();
  static actors: Actor[] = [];
  static solids: Solid[] = [];
  static sensors: Sensor[] = [];
  static gravity: number = 10;
  static onCollision: Signal<(collision: Collision) => void> = new Signal<(collision: Collision) => void>();
  static worldBounds: Wall[] = [];
  static boundary: SystemBoundary;
  static camera?: ICamera;
  static collisionThreshold = 8;
  static updateHooks: Set<(deltaTime: number) => void> = new Set();

  private static _cleaningUp: boolean = false;
  private static gfx: Graphics;
  private static _enabled: boolean = false;
  private static _fixedTimeStep: number = 1000 / System.fps; // Default 60 FPS
  private static _fixedUpdateInterval: any = null;

  public static onSystemEnabledChanged: Signal<(enabled: boolean) => void> = new Signal<(enabled: boolean) => void>();

  static get enabled() {
    return System._enabled;
  }

  static set enabled(value: boolean) {
    if (!System._cleaningUp && value === System._enabled) return;
    System._enabled = value;

    // clear the interval if we are disabling
    if (System._enabled) {
      // Start fixed update loop
      System._fixedUpdateInterval = setInterval(() => {
        System.fixedUpdate(System._fixedTimeStep / 1000);
      }, System._fixedTimeStep);
    } else {
      // Stop fixed update loop
      if (System._fixedUpdateInterval) {
        clearInterval(System._fixedUpdateInterval);
        System._fixedUpdateInterval = null;
      }
    }

    if (!System._cleaningUp) {
      // don't send the signal if we are cleaning up
      return;
    }

    System.onSystemEnabledChanged.emit(value);
  }

  private static _collisionResolver: ((collision: Collision) => boolean) | null = null;

  static set collisionResolver(collisionResolverMethod: (collision: Collision) => boolean) {
    System._collisionResolver = collisionResolverMethod;
  }

  static get worldWidth() {
    return System.boundary?.width ? System.boundary.width + (System.boundary.padding ?? 0) : System.container.width;
  }

  static get worldHeight() {
    return System.boundary?.height ? System.boundary.height + (System.boundary.padding ?? 0) : System.container.height;
  }

  static get all(): Entity[] {
    return [...System.actors, ...System.solids, ...System.sensors];
  }

  static get totalEntities(): number {
    return System.actors.length + System.solids.length + System.sensors.length;
  }

  static useSpatialHashGrid(cellSize: number) {
    if (System.grid) {
      System.grid.cellSize = cellSize;
    } else {
      System.grid = new SpatialHashGrid(cellSize, true);
    }
    System.plugin.options.useSpatialHashGrid = true;
  }

  static removeSpatialHashGrid() {
    if (System.grid) {
      System.grid.destroy();
      System.grid = null;
    }
  }

  static resolveCollision(collision: Collision) {
    // Implement collision resolution logic
    return System._collisionResolver ? System._collisionResolver(collision) : true;
  }

  static addEntity(entity: Entity) {
    if (!System.typeMap.has(entity.type)) {
      System.typeMap.set(entity.type, []);
    }
    System.typeMap.get(entity.type)!.push(entity);

    if (System.grid) {
      System.grid.insert(entity);
    }
  }

  static removeEntity(entity: Entity) {
    if (System.grid) {
      System.grid.remove(entity);
    }
    if (System.typeMap.has(entity.type)) {
      const entities = System.typeMap.get(entity.type)!;
      const index = entities.indexOf(entity);
      if (index !== -1) {
        entities.splice(index, 1);
      }
    }
  }

  static getEntitiesByType<T extends Entity = Entity>(...type: EntityType[]): T[] {
    if (type.length === 0) {
      return (System.typeMap.get(type[0]) as T[]) || [];
    }
    return type.reduce((acc: T[], t: EntityType) => {
      const entities = System.typeMap.get(t) as T[];
      if (entities?.length) {
        return [...acc, ...entities];
      }
      return acc;
    }, []);
  }

  static addActor(actor: Actor) {
    System.actors.push(actor);
    System.addEntity(actor);
  }

  static addSolid(solid: Solid) {
    System.solids.push(solid);
    System.addEntity(solid);
  }

  static addSensor(sensor: Sensor) {
    System.sensors.push(sensor);
    System.addEntity(sensor);
  }

  static removeActor(actor: Actor) {
    System.removeEntity(actor);
    const index = System.actors.indexOf(actor);
    if (index !== -1) {
      System.actors.splice(index, 1);
    }
  }

  static removeSolid(solid: Solid) {
    System.removeEntity(solid);
    const index = System.solids.indexOf(solid);
    if (index !== -1) {
      System.solids.splice(index, 1);
    }
  }

  static removeSensor(sensor: Sensor) {
    System.removeEntity(sensor);
    const index = System.sensors.indexOf(sensor);
    if (index !== -1) {
      System.sensors.splice(index, 1);
    }
  }

  static getNearbyEntities<T extends Entity = Entity>(
    entity: Entity,
    filter?: SpatialHashGridFilter,
    dx: number = 0,
    dy: number = 0,
    debug?: boolean,
  ): Set<T> {
    if (System.grid) {
      const bounds = entity.boundingRect;
      return System.grid.query<T>(bounds, filter, dx, dy, entity, debug);
    }
    const filtered = System.all.filter((e: Entity) => {
      if (e.uid === entity.uid) {
        return false;
      }
      if (filter) {
        switch (typeof filter) {
          case 'string':
            return (
              filter === e.type ||
              (filter === 'solid' && e.isSolid) ||
              (filter === 'actor' && e.isActor) ||
              (filter === 'sensor' && e.isSensor)
            );
          case 'object':
            return Array.isArray(filter) && filter.includes(e.type);
          case 'function':
            return filter(e);
          default:
            return false;
        }
      }
      return true;
    });

    return new Set<T>(filtered as T[]);
  }

  static roundBoundingBox(bb: Rectangle) {
    // round everything
    bb.x = Math.round(bb.x);
    bb.y = Math.round(bb.y);
    bb.width = Math.round(bb.width);
    bb.height = Math.round(bb.height);

    return bb;
  }

  /**
   * @param entity1
   * @param entity2
   * @param dx
   * @param dy
   */
  static getRectangleIntersection(entity1: Entity, entity2: Entity, dx: number, dy: number): boolean {
    const bounds1 = entity1.getBoundingBox() as Rectangle;
    const bounds2 = entity2.getBoundingBox().clone() as Rectangle;
    bounds2.x += dx;
    bounds2.y += dy;
    const intersection = getRectToRectIntersectionArea(bounds1, bounds2);
    return intersection.area > 0 && intersection.area > System.collisionThreshold;
  }

  /**
   * @param entity1
   * @param entity2
   * @param dx
   * @param dy
   */
  static getCircleToCircleIntersection(entity1: Entity, entity2: Entity, dx: number, dy: number): boolean {
    const bounds1 = entity1.getBoundingBox() as Circle;
    const bounds2 = entity2.getBoundingBox().clone() as Circle;
    bounds2.x += dx;
    bounds2.y += dy;
    const intersection = getCircleToCircleIntersectionArea(bounds1, bounds2);
    return intersection.area > 0 && intersection.area > System.collisionThreshold;
  }

  /**
   * @param entity1
   * @param entity2
   * @param dx
   * @param dy
   */
  static getRectToCircletIntersection(entity1: Entity, entity2: Entity, dx: number, dy: number): boolean {
    const bounds1 = entity1.getBoundingBox() as Rectangle;
    const bounds2 = entity2.getBoundingBox().clone() as Circle;
    bounds2.x += dx;
    bounds2.y += dy;
    const intersection = getRectToCircleIntersectionArea(bounds1, bounds2);
    return intersection.area > 0 && intersection.area > System.collisionThreshold;
  }

  static fixedUpdate(deltaTime: number) {
    if (!System.enabled) {
      return;
    }

    if (!System.container) {
      Logger.error('SnapPhysicsPlugin: World container not set!');
    }
    // pre-update phase
    System.all.forEach((entity: Entity) => {
      entity.preFixedUpdate();
    });

    // update hooks
    if (System.updateHooks) {
      System.updateHooks.forEach((hook) => hook(deltaTime));
    }
    // Fixed update phases
    System.solids.forEach((solid: Solid) => {
      solid.fixedUpdate(deltaTime);
    });

    System.sensors.forEach((sensor: Sensor) => {
      sensor.fixedUpdate(deltaTime);
    });

    System.actors.forEach((actor: Actor) => {
      actor.fixedUpdate(deltaTime);
    });

    System.all.forEach((entity: Entity) => {
      entity.postFixedUpdate();
    });

    if (System.camera) {
      System.camera.update();
    }

    if (System.debug) {
      System.drawDebug();
    } else {
      if (System.gfx) {
        System.gfx.clear();
      }
    }
  }

  static addBoundary(
    width: number,
    height: number,
    size: number = 10,
    padding: number = 5,
    sides: Side[] = ['top', 'bottom', 'left', 'right'],
  ) {
    if (!System.container) {
      throw new Error('System container not set. Set World.container before calling System.addBoundary().');
    }
    if (System.worldBounds.length > 0) {
      // World bounds already added
      // remove existing bounds
      System.worldBounds.forEach((wall: Wall) => {
        wall.parent.removeChild(wall);
        wall.destroy();
      });
      System.worldBounds = [];
    }
    const pos = new Point(0, 0);
    const container = System.container;
    let wall: Wall;
    if (sides.includes('bottom')) {
      wall = container.addChild(new Wall({ width, height: size }));
      wall.position.set(pos.x + width * 0.5, pos.y + height + size * 0.5 - padding);
      System.worldBounds.push(wall);
    }
    if (sides.includes('top')) {
      wall = container.addChild(new Wall({ width, height: size }));
      wall.position.set(pos.x + width * 0.5, pos.y - size * 0.5 + padding);
      System.worldBounds.push(wall);
    }

    if (sides.includes('left')) {
      wall = container.addChild(new Wall({ width: size, height }));
      wall.position.set(pos.x - size * 0.5 + padding, pos.y + height * 0.5);
      System.worldBounds.push(wall);
    }

    if (sides.includes('right')) {
      wall = container.addChild(new Wall({ width: size, height }));
      wall.position.set(pos.x + width - padding + size * 0.5, pos.y + height * 0.5);
      System.worldBounds.push(wall);
    }

    if (System.grid) {
      System.worldBounds.forEach((wall: Wall) => {
        System.grid?.remove(wall);
        System.grid?.insert(wall);
      });
    }
  }

  static collide(collision: Collision) {
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
    [...System.actors, ...System.solids, ...System.sensors].forEach((entity: Entity) => {
      const bounds = entity.getBoundingBox();
      const outerBounds = entity.getOuterBoundingBox();
      if (entity.isCircle) {
        const circBounds = bounds as Circle;
        System.gfx
          .circle(circBounds.x, circBounds.y, circBounds.radius)
          .stroke({ width: 1, color: entity.debugColors.bounds, alignment: 0.5, pixelLine: true });

        if (outerBounds) {
          const outerCircBounds = outerBounds as Circle;
          System.gfx
            .circle(
              outerCircBounds.x + outerCircBounds.radius,
              outerCircBounds.y + outerCircBounds.radius,
              outerCircBounds.radius,
            )
            .stroke({ width: 1, color: entity.debugColors.outerBounds, alignment: 0.5, pixelLine: true });
        }
      } else {
        const rectBounds = bounds as Rectangle;
        System.gfx
          .rect(rectBounds.x, rectBounds.y, rectBounds.width, rectBounds.height)
          .stroke({ width: 1, color: entity.debugColors.bounds, alignment: 0.5 });

        if (outerBounds) {
          const outerRectBounds = outerBounds as Rectangle;
          System.gfx
            .rect(outerRectBounds.x, outerRectBounds.y, outerRectBounds.width, outerRectBounds.height)
            .stroke({ width: 1, color: entity.debugColors.outerBounds, alignment: 0.5, pixelLine: true });
        }
      }
    });

    if (System.grid) {
      System.grid.draw(System.gfx);
    }
  }

  static setContainer(container: Container) {
    System.container = container;
  }

  static initialize(opts: Partial<SnapPhysicsSystemOptions>) {
    if (opts.gravity) {
      System.gravity = opts.gravity;
    }
    if (opts.fps) {
      System.fps = opts.fps;
      System._fixedTimeStep = 1000 / opts.fps;
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
        System.addBoundary(
          opts.boundary.width,
          opts.boundary.height,
          opts.boundary.thickness,
          opts.boundary.padding,
          opts.boundary.sides,
        );
      } else {
        Logger.error('SnapPhysicsPlugin System.initialize: Boundary width and height required.');
      }
    }

    if (opts.useSpatialHashGrid) {
      System.useSpatialHashGrid(opts.cellSize ?? 100);
    }
  }

  static updateEntity(entity: Entity) {
    if (System.grid) {
      System.grid.updateEntity(entity);
    }
  }

  static cleanup() {
    System._cleaningUp = true;
    if (System.worldBounds) {
      System.worldBounds.forEach((wall: Wall) => {
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

    System.enabled = false; // This will clear the interval
    System.solids = [];
    System.actors = [];
    System.sensors = [];
    System.typeMap.clear();
    System.worldBounds = [];

    System._cleaningUp = false;
  }
}
