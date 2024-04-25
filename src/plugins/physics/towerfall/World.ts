import { Bounds, Container, Graphics } from 'pixi.js';
import { Actor } from './Actor';
import { Entity } from './Entity';
import { Solid } from './Solid';

export class World {
  private static gfx: Graphics;
  static debug: boolean = true;
  static actors: Actor[] = [];
  static solids: Solid[] = [];
  static enabled: boolean = true;
  static gravity: number = 10;
  static container: Container<any>;

  static getEntityBounds(entity: Entity) {
    const pos = entity.getGlobalPosition();
    const localPos = World.container.toLocal(pos);
    const entityBounds = entity.getBounds();
    const bounds = new Bounds(
      localPos.x + entity.offset.x,
      localPos.y + entity.offset.y,
      localPos.x + entityBounds.width + entity.offset.x,
      localPos.y + entityBounds.height + entity.offset.y,
    );

    return bounds;
  }

  static addActor(actor: Actor) {
    World.actors.push(actor);
  }

  static addSolid(solid: Solid) {
    World.solids.push(solid);
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

    if (World.debug) {
      World.drawDebug();
    }
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
      const bounds = World.getEntityBounds(solid);
      World.gfx
        .rect(bounds.x, bounds.y, bounds.width, bounds.height)
        .fill({
          color: 0xff0000,
          alpha: 0.25,
        })
        .stroke({ width: 1, color: 0xff0000 });
    });

    World.actors.forEach((actor: Actor) => {
      const bounds = World.getEntityBounds(actor);
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
