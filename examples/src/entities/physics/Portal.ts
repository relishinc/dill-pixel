import { Texture } from 'pixi.js';
import { Entity, World } from '../../../../src/plugins/physics/towerfall';
import { checkCollision } from '../../../../src/plugins/physics/towerfall/utils.ts';
import { Door, DoorConfig } from './Door';

const defaults: DoorConfig = {
  width: 75,
  height: 130,
  color: 0xfff000,
};

export class Portal extends Door {
  type = 'Portal';
  enabled: boolean = true;
  connectedPortal: Portal | null = null;
  entities: Set<Entity> = new Set();

  constructor(config: Partial<DoorConfig> = {}) {
    super({ ...defaults, ...config });
    this.initialize();
  }

  get collideables(): Entity[] {
    return [...World.actors, ...World.solids];
  }

  getBoundingBox() {
    const rect = super.getBoundingBox();
    rect.y += rect.height * 0.25;
    rect.width = rect.width * 0.5;
    rect.height = rect.height * 0.75;
    rect.x += rect.width * 0.5;
    return rect;
  }

  protected initialize() {
    this.view = this.add.sprite({
      asset: Texture.WHITE,
      width: this.config.width,
      height: this.config.height,
      tint: this.config.color,
      anchor: 0.5,
    });
  }

  update(deltaTime: number) {
    // Implement update logic
    this.moveY(World.gravity * deltaTime, null);

    if (this.entities.size) {
      for (const entity of this.entities) {
        // check if the entity is colliding with the portal
        if (!checkCollision(this.getOuterBoundingBox(), entity.getBoundingBox())) {
          this.entities.delete(entity);
        }
      }
    }
  }

  protected handleCollisionChange(isColliding: boolean) {
    if (isColliding) {
      this.view.tint = 0x0;
    } else {
      this.view.tint = this.config.color;
    }
  }

  getOuterBoundingBox() {
    return super.getBoundingBox();
  }

  addEntity(entity: Entity) {
    if (!this.has(entity)) {
      this.entities.add(entity);
      entity.x = this.x;
      entity.y = this.y;
    }
  }

  has(entity: Entity) {
    return this.entities.has(entity);
  }

  connect(portal: Portal) {
    this.connectedPortal = portal;
  }

  passThrough(entity: Entity) {
    if (!this.has(entity) && this.connectedPortal) {
      this.connectedPortal.addEntity(entity);
    }
  }
}
