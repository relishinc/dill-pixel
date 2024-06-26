import { Bounds, Rectangle } from 'pixi.js';
import { checkCollision, Collision, Entity, Sensor, System } from '@dill-pixel/plugin-snap-physics';
import { DoorConfig } from '@/entities/snap/Door';
import { Signal } from 'dill-pixel';

const defaults: DoorConfig = {
  width: 75,
  height: 130,
  color: 0xfff000,
};

export type PortalEnterDetail = {
  entity: Entity;
  portal: Portal;
};

export class Portal extends Sensor<DoorConfig> {
  static onEnter: Signal<(detail: PortalEnterDetail) => void> = new Signal<(detail: PortalEnterDetail) => void>();
  debug = false;
  type = 'Portal';
  enabled: boolean = true;
  connectedPortal: Portal | null = null;
  entities: Set<Entity> = new Set();

  constructor(config: Partial<DoorConfig> = {}) {
    super({ ...defaults, ...config });
    this.initialize();
  }

  private _showingPartnerConnections: boolean;

  get showingPartnerConnections() {
    return this._showingPartnerConnections;
  }

  set showingPartnerConnections(value) {
    this._showingPartnerConnections = value;
    if (value) {
      this.view.tint = 0x00ff00;
    } else {
      if (!this._showingConnections) {
        this.view.tint = this.config.color;
      }
    }
  }

  private _showingConnections: boolean = false;

  get showingConnections() {
    return this._showingConnections;
  }

  set showingConnections(value) {
    this._showingConnections = value;
    if (value) {
      this.view.tint = 0x00ff00;
      if (this.connectedPortal) {
        this.connectedPortal.showingPartnerConnections = true;
      }
    } else {
      if (!this._showingPartnerConnections) {
        this.view.tint = this.config.color;
      }
      if (this.connectedPortal) {
        this.connectedPortal.showingPartnerConnections = false;
      }
    }
  }

  get collideables(): Entity[] {
    return System.getNearbyEntities(this, ['Player', 'FX', 'Platform', 'Wall']);
  }

  get hasOuterCollisions() {
    const outerCollideables = this.system.getNearbyEntities(this, ['Player']);
    const outerCollisions = this.getOuterCollisions(outerCollideables);
    return outerCollisions.length > 0;
  }

  getBoundingBox() {
    const rect = super.getBoundingBox() as Rectangle;
    rect.x += this.config.width * 0.35;
    rect.y += rect.height * 0.25;
    rect.width = rect.width * 0.3;
    rect.height = rect.height * 0.75;
    return rect;
  }

  preUpdate() {
    super.preUpdate();
    this.showingPartnerConnections = false;
  }

  update(deltaTime: number) {
    // Implement update logic
    super.update(deltaTime);

    this.moveY(System.gravity * deltaTime, null);

    if (this.entities.size) {
      for (const entity of this.entities) {
        // check if the entity is colliding with the portal
        if (!entity?.parent || !checkCollision(this.getOuterBoundingBox(), entity.getBoundingBox(), this, entity)) {
          this.entities.delete(entity);
        }
      }
    }

    this.showingConnections = this.hasOuterCollisions;
  }

  getOuterBoundingBox() {
    const bb = this.getWorldBounds() as Bounds;
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
      Portal.onEnter.emit({ entity, portal: this });
      this.connectedPortal.addEntity(entity);
    }
  }

  protected initialize() {
    const gfx = this.make
      .graphics()
      .ellipse(-this.config.width * 0.5, -this.config.height * 0.5, this.config.width * 0.5, this.config.height * 0.5)
      .fill({ color: this.config.color })
      .stroke({ color: 0x666666, width: 3, alignment: 0.5 });

    this.view = this.add.sprite({ asset: this.app.renderer.generateTexture(gfx), anchor: 0.5 });

    System.onCollision.connect(this._handleCollision);
  }

  private _handleCollision(collision: Collision) {
    switch (collision.type) {
      case 'Portal|Player':
      case 'Portal|FX':
        if ((collision.entity1 as Portal).connectedPortal && (collision.entity1 as Portal)?.connectedPortal?.enabled) {
          (collision.entity1 as Portal).passThrough(collision.entity2);
        }
        break;
    }
  }
}
