import { Container, Graphics, Point } from 'pixi.js';
import { PIXIContainer } from '../../../pixi';
import { Signal } from '../../../signals';
import { Logger } from '../../../utils/console/Logger';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import { SpatialHashGrid } from './SpatialHashGrid';
import { Collision, EntityType, Side, SpatialHashGridFilter } from './types';
import { Wall } from './Wall';

type SystemBoundary = {
  width: number;
  height: number;
  padding: number;
};

type TowerFallPhysicsBoundaryOptions = {
  width: number;
  height: number;
  thickness: number;
  padding: number;
  sides: Side[];
};
type OptionalTowerFallPhysicsBoundaryOptions = Partial<TowerFallPhysicsBoundaryOptions>;
type RequiredWidthAndHeight = Required<Pick<TowerFallPhysicsBoundaryOptions, 'width' | 'height'>>;
type CustomTowerFallPhysicsBoundaryOptions = OptionalTowerFallPhysicsBoundaryOptions & RequiredWidthAndHeight;

type TowerFallPhysicsSystemOptions = {
  gravity: number;
  container: PIXIContainer;
  debug: boolean;
  boundary: CustomTowerFallPhysicsBoundaryOptions;
  collisionResolver: (collision: Collision) => boolean;
};

export class System {
  public static container: Container<any>;
  public static grid: SpatialHashGrid | null;
  public static fps: number;
  //
  static debug: boolean = true;
  static typeMap: Map<EntityType, Entity[]> = new Map();
  static actors: Actor[] = [];
  static solids: Solid[] = [];
  static sensors: Sensor[] = [];
  static enabled: boolean = true;
  static gravity: number = 10;
  static onCollision: Signal<(collision: Collision) => void> = new Signal<(collision: Collision) => void>();
  static worldBounds: Wall[] = [];
  static boundary: SystemBoundary;
  private static gfx: Graphics;

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
    return [...System.actors, ...System.solids];
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

  static getNearbyEntities(entity: Entity, onlyTypes?: string[]): Entity[];

  static getNearbyEntities(entity: Entity, filter?: SpatialHashGridFilter): Entity[];

  static getNearbyEntities(entity: Entity, filter?: SpatialHashGridFilter | string[]): Entity[] {
    if (System.grid) {
      const bounds = entity.getBoundingBox();
      return System.grid.query(bounds, filter);
    }
    return System.all.filter((e: Entity) => {
      if (filter) {
        if (Array.isArray(filter)) {
          return filter.includes(e.type);
        } else {
          return filter(e);
        }
      }
      return true;
    });
  }

  static update(deltaTime: number) {
    if (!System.enabled) {
      return;
    }
    if (!System.container) {
      Logger.error('TowerFallPhysicsPlugin: World container not set!');
    }
    // Implement world step logic

    System.solids.forEach((solid: Solid) => {
      solid.update(deltaTime);
    });
    System.sensors.forEach((sensor: Sensor) => {
      sensor.update(deltaTime);
    });
    System.actors.forEach((actor: Actor) => {
      actor.update(deltaTime);
    });

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

  static setContainer(container: PIXIContainer) {
    System.container = container;
  }

  static initialize(opts: Partial<TowerFallPhysicsSystemOptions>) {
    if (opts.gravity) {
      System.gravity = opts.gravity;
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
        Logger.error('TowerFallPhysicsPlugin System.initialize: Boundary width and height required.');
      }
    }
  }

  static updateEntity(entity: Entity) {
    if (System.grid) {
      System.grid.updateEntity(entity);
    }
  }
}
