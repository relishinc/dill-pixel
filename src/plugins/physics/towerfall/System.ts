import { Container, Graphics } from 'pixi.js';
import { PIXIContainer } from '../../../pixi';
import { Signal } from '../../../signals';
import { Logger } from '../../../utils/console/Logger';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import { Collision, EntityType, Side } from './types';
import { Wall } from './Wall';

export class System {
  private static gfx: Graphics;
  private static container: Container<any>;
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

  static addEntity(entity: Entity) {
    if (!System.typeMap.has(entity.type)) {
      System.typeMap.set(entity.type, []);
    }
    System.typeMap.get(entity.type)!.push(entity);
  }

  static removeEntity(entity: Entity) {
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

    System.actors.forEach((actor: Actor) => {
      actor.update(deltaTime);
    });

    System.sensors.forEach((sensor: Sensor) => {
      sensor.update(deltaTime);
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
    const pos = System.container.getGlobalPosition();
    const container = System.container;
    let wall: Wall;

    if (sides.includes('bottom')) {
      wall = container.addChild(new Wall({ width, height: size }));
      wall.position.set(pos.x, pos.y + height * 0.5 + padding);
      System.worldBounds.push(wall);
    }

    if (sides.includes('top')) {
      wall = container.addChild(new Wall({ width, height: size }));
      wall.position.set(pos.x, pos.y - height * 0.5 - padding);
      System.worldBounds.push(wall);
    }

    if (sides.includes('left')) {
      wall = container.addChild(new Wall({ width: size, height }));
      wall.position.set(pos.x - width * 0.5 - padding, pos.y);
      System.worldBounds.push(wall);
    }

    if (sides.includes('right')) {
      wall = container.addChild(new Wall({ width: size, height }));
      wall.position.set(pos.x + width * 0.5 + padding, pos.y);
      System.worldBounds.push(wall);
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
    if (opts.boundary) {
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
}

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
};
