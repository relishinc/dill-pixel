import { gsap } from 'gsap';
import { Circle, Point, Rectangle } from 'pixi.js';
import { Entity } from './Entity';
import { System } from './System';
import { Collision, EntityType } from './types';
import { checkCollision } from './utils';

export class Actor<T = any> extends Entity<T> {
  type = 'Actor';
  isActor = true;
  passThroughTypes: EntityType[] = [];
  passingThrough: Set<Entity> = new Set();
  riding: Set<Entity> = new Set();
  mostRiding: Entity | null = null;

  protected _animations: Set<gsap.core.Tween | gsap.core.Timeline> = new Set<gsap.core.Tween | gsap.core.Timeline>();
  protected _activeCollisions: Collision[];

  // Add new properties for animation tracking
  protected _animationTargets: Map<
    'x' | 'y',
    {
      target: number;
      duration: number;
      elapsed: number;
      start: number;
      ease: gsap.EaseString;
      repeat: number;
      yoyo: boolean;
      repeatDelay: number;
      delayRemaining: number;
      iteration: number;
      isReversed: boolean;
    }
  > = new Map();

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

  animateX(target: number, vars: gsap.TweenVars = {}): gsap.core.Tween {
    return this.animateTo('x', target, vars);
  }

  animateY(target: number, vars: gsap.TweenVars = {}): gsap.core.Tween {
    return this.animateTo('y', target, vars);
  }

  postFixedUpdate() {
    this.setAllRiding();
  }

  animateTo(prop: 'x' | 'y', target: number, vars: gsap.TweenVars = {}): gsap.core.Tween {
    // Store animation data for physics update
    const duration = (vars.duration as number) || 1;
    const ease = (vars.ease?.toString() || 'linear.none') as gsap.EaseString;
    const repeat = (vars.repeat as number) || 0;
    const yoyo = vars.yoyo || false;
    const repeatDelay = (vars.repeatDelay as number) || 0;
    const start = this[prop];

    this._animationTargets.set(prop, {
      target,
      duration,
      elapsed: 0,
      start,
      ease,
      repeat,
      yoyo,
      repeatDelay,
      delayRemaining: 0,
      iteration: 0,
      isReversed: false,
    });

    // Create a dummy tween for compatibility
    const tween = gsap.to({}, { duration, ...vars });
    this._animations.add(tween);
    return tween;
  }

  fixedUpdate(deltaTime: number) {
    super.fixedUpdate(deltaTime);

    // Update animations in sync with physics
    for (const [prop, anim] of this._animationTargets.entries()) {
      // Handle repeat delay
      if (anim.delayRemaining > 0) {
        anim.delayRemaining -= deltaTime;
        continue;
      }

      anim.elapsed += deltaTime;
      const progress = Math.min(anim.elapsed / anim.duration, 1);

      // Calculate the new position using GSAP's easing
      const easedProgress = gsap.parseEase(anim.ease)(anim.isReversed ? 1 - progress : progress);
      const newValue = anim.start + (anim.target - anim.start) * easedProgress;

      // Apply movement through physics system
      const delta = newValue - this[prop];
      if (prop === 'x') {
        this.moveX(delta, null, null);
      } else {
        this.moveY(delta, null, null);
      }

      // Handle completion of current iteration
      if (progress >= 1) {
        // Reset elapsed time
        anim.elapsed = 0;

        // Handle repeat logic
        if (anim.repeat === -1 || anim.iteration < anim.repeat) {
          anim.iteration++;

          // Handle yoyo
          if (anim.yoyo) {
            anim.isReversed = !anim.isReversed;
          }

          // Apply repeat delay
          if (anim.repeatDelay > 0) {
            anim.delayRemaining = anim.repeatDelay;
          }
        } else {
          // Animation complete
          this._animationTargets.delete(prop);
        }
      }
    }
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
        this.xRemainder = 0;
        break;
      } else {
        this.x = nextX;
        move -= sign;
        this.xRemainder -= sign;
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
