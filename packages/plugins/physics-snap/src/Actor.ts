import { Circle, Point, Rectangle } from 'pixi.js';
import { Application } from 'dill-pixel';
import { Entity } from './Entity';
import { System } from './System';
import { Collision, EntityType } from './types';
import { checkCollision } from './utils';
import { gsap } from 'gsap';

export class Actor<T = any, A extends Application = Application> extends Entity<T, A> {
  type = 'Actor';
  isActor = true;
  passThroughTypes: EntityType[] = [];
  passingThrough: Set<Entity> = new Set();
  riding: Set<Entity> = new Set();
  mostRiding: Entity | null = null;

  protected _animations: Set<gsap.core.Tween | gsap.core.Timeline> = new Set<gsap.core.Tween | gsap.core.Timeline>();
  protected _activeCollisions: Collision[];

  get activeCollisions() {
    return this._activeCollisions;
  }

  set activeCollisions(value) {
    this._activeCollisions = value;
  }

  get ridingAllowed(): boolean {
    return true;
  }

  getCollideables<T extends Entity = Entity>(dx: number = 0, dy: number = 0): Set<T> {
    return System.getNearbyEntities<T>(this, 'solid', dx, dy) as Set<T>;
  }

  added() {
    System.addActor(this);
  }

  removed() {
    if (this._animations) {
      this._animations.forEach((animation) => animation?.kill());
    }
    System.removeActor(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  squish(_collision?: Collision, _pushingEntity?: Entity, _direction?: Point) {}

  animateX(target: number, vars: gsap.TweenVars = {}, validationMethod?: (delta?: number) => boolean): gsap.core.Tween {
    return this.animateTo('x', target, vars, validationMethod);
  }

  animateY(target: number, vars: gsap.TweenVars = {}, validationMethod?: (delta?: number) => boolean): gsap.core.Tween {
    return this.animateTo('y', target, vars, validationMethod);
  }

  postUpdate() {
    this.setAllRiding();
  }

  animateTo(
    prop: 'x' | 'y',
    target: number,
    vars: gsap.TweenVars = {},
    validationMethod?: (delta?: number) => boolean,
  ): gsap.core.Tween {
    const pos = this.position.clone();
    const initialPosition = { [prop]: Math.round(pos[prop]) };
    const tweenVars = Object.assign({ duration: 1, ease: 'linear.none' }, vars);
    const result = gsap.to(initialPosition, {
      [prop]: Math.round(target),
      ...tweenVars,
      onUpdate: () => {
        const delta = initialPosition[prop] - this.position[prop];
        if (validationMethod !== undefined && !validationMethod(delta)) {
          return;
        }
        if (delta) {
          if (prop === 'x') {
            this.moveX(delta, null, null);
          } else if (prop === 'y') {
            this.moveY(delta, null, null);
          }
        }
      },
    });
    this._animations.add(result);
    return result;
  }

  moveX(
    amount: number,
    onCollide?: ((collision: Collision, pushingEntity?: Entity, direction?: Point) => void) | null,
    onNoCollisions?: (() => void) | null,
    pushingEntity?: Entity,
  ): void {
    this.xRemainder += amount;
    let move = Math.round(this.xRemainder);
    const sign = Math.sign(move);
    if (pushingEntity) {
      pushingEntity.isCollideable = false;
    }
    while (move !== 0) {
      const nextX = this.x + (move ? sign : 0); // Predict the next X position
      const collisions: Collision[] | false = this.collideAt(nextX - this.x, 0, this.getBoundingBox(), [
        'left',
        'right',
      ]);
      if (collisions) {
        if (onCollide) {
          collisions.forEach((collision) => {
            onCollide(collision, pushingEntity, new Point(nextX - this.x, 0));
          });
        }
        for (const collision of collisions) {
          if (!this.isRiding(collision.entity2)) {
            this.xRemainder = 0;
          }
        }
        break;
      } else {
        this.x = nextX;
        move -= sign;
        this.xRemainder -= sign;
        if (onNoCollisions) {
          onNoCollisions();
        }
      }
    }
    System.updateEntity(this);
    if (pushingEntity) {
      pushingEntity.isCollideable = true;
    }
  }

  moveY(
    amount: number,
    onCollide?: ((collision: Collision, pushingEntity?: Entity, direction?: Point) => void) | null,
    onNoCollisions?: (() => void) | null,
    pushingEntity?: Entity,
  ): void {
    this.yRemainder += amount;
    let move = Math.round(this.yRemainder);
    const sign = Math.sign(move);
    if (pushingEntity) {
      pushingEntity.isCollideable = false;
    }

    while (move !== 0) {
      const nextY = this.y + (move ? sign : 0); // Predict the next Y position
      const collisions: Collision[] | false = this.collideAt(0, nextY - this.y, this.getBoundingBox(), [
        'top',
        'bottom',
      ]);
      if (collisions) {
        if (onCollide) {
          collisions.forEach((collision) => onCollide(collision, pushingEntity, new Point(0, nextY - this.y)));
        }
        this.yRemainder = 0;
        break;
      } else {
        this.y = nextY;
        move -= sign;
        this.yRemainder -= sign;
        if (onNoCollisions) {
          onNoCollisions();
        }
      }
      System.updateEntity(this);
    }

    if (pushingEntity) {
      pushingEntity.isCollideable = true;
    }
  }

  // Simple bounding box collision check
  collideAt(
    x: number,
    y: number,
    box: Rectangle | Circle,
    sides?: ('top' | 'right' | 'bottom' | 'left')[],
  ): Collision[] | false {
    const nextPosition = this.isCircle
      ? new Circle(box.x + x, box.y + y, (box as Circle).radius)
      : new Rectangle(box.x + x, box.y + y, (box as Rectangle).width, (box as Rectangle).height);

    const collisions = [];
    // Iterate through all solids in the level to check for collisions
    for (const entity of this.getCollideables()) {
      if (!entity.isCollideable || this.passThroughTypes.includes(entity.type)) {
        continue;
      }

      const solidBounds = entity.getBoundingBox();
      let collisionResult = checkCollision(nextPosition, solidBounds, this, entity);
      if (sides?.length && collisionResult) {
        // check to be sure collision includes all sides
        const collisionSides = sides.filter((side) => (collisionResult as Collision)[side]);
        if (!collisionSides.length) {
          collisionResult = false;
        }
      }
      if (collisionResult) {
        System.collide(collisionResult);
        // if the collision resolver returns true,
        // we should stop and return this collision
        // this will stop actor movement if returned
        if (System.resolveCollision(collisionResult)) {
          collisions.push(collisionResult);
        }
      }
    }
    return collisions.length ? collisions : false;
  }

  isRiding(solid: Entity, dx: number = 0, dy: number = 0): boolean {
    const thisBounds = this.boundingRect;
    const solidBounds = solid.boundingRect;
    const withinTolerance =
      thisBounds.bottom <= solidBounds.top + dy + 1 && Math.abs(thisBounds.bottom - solidBounds.top + dy) <= 1;
    return withinTolerance && thisBounds.left < solidBounds.right + dx && thisBounds.right > solidBounds.left + dx;
  }

  setPassingThrough(entity: Entity) {
    this.passingThrough.add(entity);
  }

  removePassingThrough(entity: Entity) {
    this.passingThrough.delete(entity);
  }

  isPassingThrough(entity: Entity) {
    return this.passingThrough.has(entity);
  }

  private clearAllRiding() {
    this.mostRiding = null;
    // this.riding.forEach((entity) => {
    //   (entity as Solid).riding.delete(this);
    // });
    this.riding.clear();
  }

  private setAllRiding(dx: number = 0, dy: number = 0) {
    this.clearAllRiding();
    this.getCollideables(dx, dy).forEach((entity) => {
      if (this.isRiding(entity)) {
        this.riding.add(entity);
      }
    });
    let mostAmount = 0;
    for (const entity of this.riding) {
      // Check how much the actor is riding the entity
      if (this.right > entity.left && this.left < entity.right) {
        this.mostRiding = entity;
        break;
      }
      let amount = 0;
      if (this.right > entity.left && this.left < entity.left) {
        // left edge
        amount = this.right - entity.left;
        if (amount > mostAmount) {
          mostAmount = amount;
          this.mostRiding = entity;
        }
      } else if (this.left < entity.right && this.right > entity.right) {
        // right edge
        amount = entity.right - this.left;
        if (amount > mostAmount) {
          mostAmount = amount;
          this.mostRiding = entity;
        }
      }
    }
  }
}
