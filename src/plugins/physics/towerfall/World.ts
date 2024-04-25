import { Container, Graphics } from 'pixi.js';
import { Signal } from '../../../signals';
import { Actor } from './Actor';
import { Sensor } from './Sensor';
import { Solid } from './Solid';
import { Collision, Side } from './types';
import { Wall } from './Wall';

export class World {
  private static gfx: Graphics;
  static debug: boolean = true;
  static actors: Actor[] = [];
  static solids: Solid[] = [];
  static sensors: Sensor[] = [];
  static enabled: boolean = true;
  static gravity: number = 10;
  static container: Container<any>;
  static onCollision: Signal<(collision: Collision) => void> = new Signal<(collision: Collision) => void>();

  static worldBounds: Wall[] = [];

  static addActor(actor: Actor) {
    World.actors.push(actor);
  }

  static addSolid(solid: Solid) {
    World.solids.push(solid);
  }

  static addSensor(sensor: Sensor) {
    World.sensors.push(sensor);
  }

  static removeActor(actor: Actor) {
    const index = World.actors.indexOf(actor);
    if (index !== -1) {
      World.actors.splice(index, 1);
    }
  }

  static removeSolid(solid: Solid) {
    const index = World.solids.indexOf(solid);
    if (index !== -1) {
      World.solids.splice(index, 1);
    }
  }

  static removeSensor(sensor: Sensor) {
    const index = World.sensors.indexOf(sensor);
    if (index !== -1) {
      World.sensors.splice(index, 1);
    }
  }

  static worldStep(deltaTime: number) {
    if (!World.enabled) {
      return;
    }
    // Implement world step logic
    World.solids.forEach((solid: Solid) => {
      solid.update(deltaTime);
    });

    World.actors.forEach((actor: Actor) => {
      actor.update(deltaTime);
    });

    World.sensors.forEach((sensor: Sensor) => {
      sensor.update(deltaTime);
    });

    if (World.debug) {
      World.drawDebug();
    }
  }

  static addWorldBounds(
    width: number,
    height: number,
    size: number = 10,
    padding: number = 5,
    sides: Side[] = ['top', 'bottom', 'left', 'right'],
  ) {
    if (!World.container) {
      throw new Error('World container not set. Set World.container before calling World.addWorldBounds().');
    }
    if (World.worldBounds.length > 0) {
      // World bounds already added
      // remove existing bounds
      World.worldBounds.forEach((wall: Wall) => {
        wall.parent.removeChild(wall);
        wall.destroy();
      });
      World.worldBounds = [];
    }
    const pos = World.container.getGlobalPosition();
    const container = World.container;
    let wall: Wall;

    if (sides.includes('bottom')) {
      wall = container.addChild(new Wall({ width, height: size }));
      wall.position.set(pos.x, pos.y + height * 0.5 + padding);
      World.worldBounds.push(wall);
    }

    if (sides.includes('top')) {
      wall = container.addChild(new Wall({ width, height: size }));
      wall.position.set(pos.x, pos.y - height * 0.5 - padding);
      World.worldBounds.push(wall);
    }

    if (sides.includes('left')) {
      wall = container.addChild(new Wall({ width: size, height }));
      wall.position.set(pos.x - width * 0.5 - padding, pos.y);
      World.worldBounds.push(wall);
    }

    if (sides.includes('right')) {
      wall = container.addChild(new Wall({ width: size, height }));
      wall.position.set(pos.x + width * 0.5 + padding, pos.y);
      World.worldBounds.push(wall);
    }
  }

  static collide(collision: Collision) {
    if (!collision.type && collision.entity1 && collision.entity2) {
      collision.type = `${collision.entity1.type}|${collision.entity2.type}`;
    }
    this.onCollision.emit(collision);
  }

  static drawDebug() {
    if (!World.gfx) {
      World.gfx = new Graphics();
      World.container.addChild(World.gfx);
    }
    // move to top
    World.container.setChildIndex(World.gfx, World.container.children.length - 1);
    World.gfx.clear();
    World.solids.forEach((solid: Solid) => {
      const bounds = solid.getBoundingBox();
      World.gfx
        .rect(bounds.x, bounds.y, bounds.width, bounds.height)
        .fill({
          color: 0xff0000,
          alpha: 0.25,
        })
        .stroke({ width: 1, color: 0xff0000 });
    });

    World.actors.forEach((actor: Actor) => {
      const bounds = actor.getBoundingBox();
      World.gfx
        .rect(bounds.x, bounds.y, bounds.width, bounds.height)
        .fill({
          color: 0xff0000,
          alpha: 0.25,
        })
        .stroke({ width: 1, color: 0xff0000, alignment: 0.5 });
    });
    World.sensors.forEach((actor: Actor) => {
      const bounds = actor.getBoundingBox();
      World.gfx
        .rect(bounds.x, bounds.y, bounds.width, bounds.height)
        .fill({
          color: 0xff0000,
          alpha: 0.25,
        })
        .stroke({ width: 1, color: 0xff0000, alignment: 0.5 });
    });
  }
}
