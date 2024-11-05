import { Container, Size } from 'dill-pixel';
import { Bodies, IBodyDefinition } from 'matter-js';

import { Container as PIXIContainer } from 'pixi.js';
import { IMatterPhysicsObject } from './interfaces';
import { System } from './System';
import { MatterBodyType } from './types';

export type EntityConfig = {
  bodyType?: MatterBodyType;
  size?: Size;
  view?: PIXIContainer;
  bodyDefinition?: Partial<IBodyDefinition>;
};

export class Entity extends Container implements IMatterPhysicsObject {
  public static readonly DEFAULT_DEBUG_COLOR: number = 0x29c5f6;
  body: Matter.Body;
  public view: PIXIContainer;
  public bodyType: MatterBodyType;
  public bodyDefinition: Partial<IBodyDefinition> = {};

  constructor(public config: Partial<EntityConfig> = {}) {
    super();
    if (config.view) {
      this.view = this.add.existing(config.view);
    }
    if (config.bodyType) {
      this.bodyType = config.bodyType;
    }
    if (config.bodyDefinition) {
      this.bodyDefinition = config.bodyDefinition;
    }
  }

  public get debugColor(): number {
    return Entity.DEFAULT_DEBUG_COLOR;
  }

  public get system(): typeof System {
    return System;
  }

  added() {
    this.createBody();
    this.system.addToWorld(this);
  }

  onRemoved(): void {
    this.system.removeFromWorld(this.body);
  }

  createBody() {
    const w = this.config.size?.width || this.view.width;
    const h = this.config.size?.height || this.view.height;

    switch (this.bodyType) {
      case 'rectangle':
        this.body = Bodies.rectangle(this.x, this.y, w, h, this.bodyDefinition);
        break;
      case 'circle':
        this.body = Bodies.circle(this.x, this.y, w * 0.5, this.bodyDefinition);
        break;
      case 'convex':
        // this.body = Bodies.fromVertices(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
        break;
      case 'trapezoid':
        this.body = Bodies.trapezoid(this.x, this.y, w, h, 0.5, this.bodyDefinition);
        break;
    }
  }

  update() {
    if (this.view && this.body) {
      this.x = this.body.position.x;
      this.y = this.body.position.y;
      this.rotation = this.body.angle;
    }
  }
}
