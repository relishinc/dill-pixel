import { Body, StaticBody } from './Body';
import { Bounds, Container as PIXIContainer, Point } from 'pixi.js';

import { ArcadePhysics } from 'arcade-physics/lib/physics/arcade/ArcadePhysics';
import { ArcadePhysicsPlugin } from './ArcadePhysicsPlugin';
import { Container } from 'dill-pixel';
import { World } from 'arcade-physics/lib/physics/arcade/World';

export interface IEntity {
  readonly physics: ArcadePhysics;
  readonly world: World;
  body: Body | StaticBody;
}

export type EntityType = 'actor' | 'solid';

export class Entity extends Container implements IEntity {
  static pluginName: string = 'ArcadePhysicsPlugin';
  type: EntityType = 'actor';
  bodyType: 'circle' | 'rectangle' = 'rectangle';
  body: Body | StaticBody;
  bodyPosition: Point = new Point();
  public offset: Point = new Point();
  protected _cachedBounds: Bounds;

  constructor() {
    super({ autoUpdate: true, priority: 0, autoResize: false });
  }

  protected _view: PIXIContainer;

  get view(): PIXIContainer {
    return this._view;
  }

  set view(value: PIXIContainer) {
    this._view = value;
    this.updateBody();
  }

  get world(): World {
    return this.physics.world;
  }

  get physics(): ArcadePhysics {
    return this.app.getPlugin<ArcadePhysicsPlugin>(ArcadePhysicsPlugin.ID).physics;
  }

  get plugin(): ArcadePhysicsPlugin {
    return this.app.getPlugin<ArcadePhysicsPlugin>(ArcadePhysicsPlugin.ID);
  }

  added() {
    this.create();
    this.postCreate();
  }

  public updateBody() {
    if (!this.body) {
      const bounds = this.getBoundingBox();
      if (this.type === 'solid') {
        this.body = this.physics.add.staticBody(
          this.x + bounds.left,
          this.y + bounds.top,
          bounds.width,
          bounds.height,
        ) as StaticBody;
      } else {
        this.body = this.physics.add.body(
          this.x + bounds.left,
          this.y + bounds.top,
          bounds.width,
          bounds.height,
        ) as Body;
      }
      if (this.bodyType === 'circle') {
        this.body.setCircle(bounds.width * 0.5, 0, 0);
      }
    }
  }

  getBoundingBox() {
    if (!this._cachedBounds) {
      this._cachedBounds = this.getLocalBounds();
      this._cachedBounds.scale(1 / this.plugin.container.worldTransform.d);
    }
    return this._cachedBounds;
  }

  update() {
    if (!this.body || !this.view) {
      return;
    }

    this.bodyPosition.x = this.body.x;
    this.bodyPosition.y = this.body.y;

    this.x = this.bodyPosition.x + this.getBoundingBox().width * 0.5 + this.offset.x;
    this.y = this.bodyPosition.y + this.getBoundingBox().height * 0.5 + this.offset.y;

    if (this.body instanceof Body) {
      this.angle = this.body.rotation;
    }
  }

  protected create() {
    // create your body
  }

  protected postCreate() {
    // add bodies to map
    if (this.body) {
      this.plugin.addBody(this);
    }
  }
}
