import { Application, Container, PointLike, resolvePointLike, resolveSizeLike, Size, SizeLike } from 'dill-pixel';
import Matter, { Bodies, Body, IBodyDefinition, Vector } from 'matter-js';

import { Container as PIXIContainer } from 'pixi.js';
import { IMatterPhysicsObject } from './interfaces';
import { System } from './System';
import { MatterBodyType } from './types';

export type CollisionCallback = (other: Matter.Body) => void;

export type PartConfig = {
  type: MatterBodyType;
  x: number;
  y: number;
  width: number;
  height: number;
  bodyDefinition?: Partial<IBodyDefinition>;
};

export type EntityConfig = {
  bodyType?: MatterBodyType;
  size?: Size;
  view?: PIXIContainer;
  bodyDefinition?: Partial<IBodyDefinition>;
  debugColor?: number;
  parts?: PartConfig[];
  rotationBehavior?: 'none' | 'follow' | 'firstPart';
};

export class Entity<T extends Application = Application> extends Container<T> implements IMatterPhysicsObject {
  public static readonly DEFAULT_DEBUG_COLOR: number = 0x29c5f6;
  body: Matter.Body;
  public view: PIXIContainer;
  public bodyType: MatterBodyType;
  public bodyDefinition: Partial<IBodyDefinition> = {};
  public debugColor: number;
  protected _isDestroyed: boolean = false;
  protected isGrounded: boolean = false;
  protected onLandCallbacks: CollisionCallback[] = [];
  protected groundSensorHeight: number = 2; // Height of the ground detection sensor
  protected rotationBehavior: 'none' | 'follow' | 'firstPart' = 'follow';

  public get system(): typeof System {
    return System;
  }

  public get velocity(): Vector {
    return this.body.velocity;
  }

  public get matter(): typeof Matter {
    return Matter;
  }

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

    if (config.debugColor) {
      this.debugColor = config.debugColor;
    }
    if (config.rotationBehavior) {
      this.rotationBehavior = config.rotationBehavior;
    }
  }

  added() {
    this.createBody();
    this.system.addToWorld(this);
    this.setupCollisionDetection();
  }

  onRemoved(): void {
    this.system.removeFromWorld(this.body);
  }

  destroy() {
    this._isDestroyed = true;
    this.system.removeFromWorld(this.body);
    super.destroy();
  }

  setSize(width: number, height: number) {
    this.size = [width, height];
  }

  set size(size: SizeLike) {
    const s = resolveSizeLike(size);
    this.config.size = { width: s.width, height: s.height };
    this.createBody();
  }

  createBody() {
    if (this.config.parts && this.config.parts.length > 0) {
      // Create compound body from parts
      const parts = this.config.parts.map((part) => {
        switch (part.type) {
          case 'rectangle':
            return Bodies.rectangle(this.x + part.x, this.y + part.y, part.width, part.height, part.bodyDefinition);
          case 'circle':
            return Bodies.circle(this.x + part.x, this.y + part.y, part.width * 0.5, part.bodyDefinition);
          case 'trapezoid':
            return Bodies.trapezoid(
              this.x + part.x,
              this.y + part.y,
              part.width,
              part.height,
              0.5,
              part.bodyDefinition,
            );
          default:
            return Bodies.rectangle(this.x + part.x, this.y + part.y, part.width, part.height, part.bodyDefinition);
        }
      });

      this.body = Body.create({
        parts,
        ...this.bodyDefinition,
      });
    } else {
      // Create single body as before
      const w = this.config.size?.width || this.view.width;
      const h = this.config.size?.height || this.view.height;

      switch (this.bodyType) {
        case 'rectangle':
          this.body = Bodies.rectangle(this.x, this.y, w, h, {
            ...this.bodyDefinition,
          });
          break;
        case 'circle':
          this.body = Bodies.circle(this.x, this.y, w * 0.5, {
            ...this.bodyDefinition,
          });
          break;
        case 'convex':
          // this.body = Bodies.fromVertices(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);
          break;
        case 'trapezoid':
          this.body = Bodies.trapezoid(this.x, this.y, w, h, 0.5, {
            ...this.bodyDefinition,
          });
          break;
      }
    }
  }

  public setVelocity(v: PointLike) {
    const velocity = resolvePointLike(v);
    Matter.Body.setVelocity(this.body, velocity);
  }

  public setVelocityX(x: number) {
    Matter.Body.setVelocity(this.body, { x, y: this.body.velocity.y });
  }

  public setVelocityY(y: number) {
    Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y });
  }

  /**
   * Sets up collision detection for the entity
   */
  protected setupCollisionDetection() {
    Matter.Events.on(this.system.engine, 'collisionStart', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA === this.body || pair.bodyB === this.body) {
          const otherBody = pair.bodyA === this.body ? pair.bodyB : pair.bodyA;
          this.handleCollisionStart(otherBody, pair);
        }
      });
    });

    Matter.Events.on(this.system.engine, 'collisionEnd', (event) => {
      event.pairs.forEach((pair) => {
        if (pair.bodyA === this.body || pair.bodyB === this.body) {
          const otherBody = pair.bodyA === this.body ? pair.bodyB : pair.bodyA;
          this.handleCollisionEnd(otherBody, pair);
        }
      });
    });
  }

  /**
   * Handles the start of a collision
   */
  protected handleCollisionStart(otherBody: Matter.Body, pair: Matter.Pair) {
    // Get collision normal
    const collision = pair.collision;
    const normal = collision.normal;

    // Determine if we need to flip the normal based on which body we are
    const normalY = pair.bodyA === this.body ? normal.y : -normal.y;

    // Consider it a ground collision if the normal is pointing mostly upward relative to us
    if (normalY < -0.5) {
      this.isGrounded = true;
      this.onLandCallbacks.forEach((callback) => callback(otherBody));
    }
  }

  /**
   * Handles the end of a collision
   */
  protected handleCollisionEnd(otherBody: Matter.Body, pair: Matter.Pair) {
    const collision = pair.collision;
    const normal = collision.normal;

    // Determine if we need to flip the normal based on which body we are
    const normalY = pair.bodyA === this.body ? normal.y : -normal.y;

    // Only unset grounded if we're ending a ground collision
    if (normalY < -0.5) {
      this.isGrounded = false;
    }
  }

  /**
   * Register a callback for when the entity lands
   */
  public onLand(callback: CollisionCallback) {
    this.onLandCallbacks.push(callback);
  }

  /**
   * Returns whether the entity is currently on the ground
   */
  public getIsGrounded(): boolean {
    return this.isGrounded;
  }

  /**
   * Locks the rotation of the physics body, keeping it upright
   */
  public lockRotation() {
    if (this.body) {
      Matter.Body.setInertia(this.body, Infinity);
      Matter.Body.setAngularVelocity(this.body, 0);
    }
  }

  update() {
    if (this._isDestroyed) return;
    if (this.view && this.body) {
      this.x = this.body.position.x;
      this.y = this.body.position.y;

      // Handle rotation based on configuration
      if (this.rotationBehavior !== 'none') {
        if (this.config.parts && this.config.parts.length > 0) {
          if (this.rotationBehavior === 'firstPart') {
            // Use the first part's rotation if it exists
            this.rotation = this.body.parts[1]?.angle || 0; // parts[0] is the compound body itself
          } else {
            // Use the compound body's overall rotation
            this.rotation = this.body.angle;
          }
        } else {
          // Single body behavior remains unchanged
          this.rotation = this.body.angle;
        }
      }
    }
  }
}
