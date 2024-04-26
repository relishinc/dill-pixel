import { checkCollision, Entity, EntityType, System } from '../../../../src/plugins/physics/towerfall';
import { Door, DoorConfig } from './Door';

const defaults: DoorConfig = {
  width: 75,
  height: 130,
  color: 0xfff000,
};

export class Portal extends Door {
  debug = true;
  passThroughTypes: EntityType[] = [];
  type = 'Portal';
  enabled: boolean = true;
  connectedPortal: Portal | null = null;
  entities: Set<Entity> = new Set();

  constructor(config: Partial<DoorConfig> = {}) {
    super({ ...defaults, ...config });
    this.initialize();
  }

  get collideables(): Entity[] {
    return System.getEntitiesByType('Player', 'Platform');
  }

  getBoundingBox() {
    const rect = super.getBoundingBox();
    rect.y -= rect.height * 0.25;
    rect.width = rect.width * 0.3;
    rect.height = rect.height * 0.75;
    rect.x -= this.config.width * 0.15;
    return rect;
  }

  protected initialize() {
    this.view = this.add
      .graphics()
      .ellipse(0, 0, this.config.width * 0.5, this.config.height * 0.5)
      .fill({ color: this.config.color });
  }

  update(deltaTime: number) {
    // Implement update logic
    this.moveY(System.gravity * 10 * deltaTime, null);

    if (this.entities.size) {
      for (const entity of this.entities) {
        // check if the entity is colliding with the portal
        if (!checkCollision(this.getOuterBoundingBox(), entity.getBoundingBox(), this, entity)) {
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
    const bb = this.getWorldBounds();
    bb.x -= this.config.width * 0.5;
    bb.y -= this.config.height * 0.5;
    return bb.rectangle;
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
