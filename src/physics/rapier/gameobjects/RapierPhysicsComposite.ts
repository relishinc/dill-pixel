import type {
  ActiveCollisionTypes,
  ActiveEvents,
  ActiveHooks,
  Collider,
  ColliderDesc,
  RigidBody,
  World,
} from '@dimforge/rapier2d';
import { Container, DisplayObject, Sprite } from 'pixi.js';
import { Application } from '../../../core';
import { resolvePointLike } from '../../../utils';
import { IPhysicsObject, PhysicsBodyType } from '../../index';
import { RapierPhysics } from '../RapierPhysics';

export class RapierPhysicsComposite extends Container implements IPhysicsObject {
  visual: Sprite;
  visuals: Sprite[] = [];
  body: RigidBody;
  public static readonly DEFAULT_DEBUG_COLOR: number = 0x29c5f6;
  bodies: RigidBody[] = [];
  collider: Collider;
  colliders: Collider[] = [];
  colliderRef: { collider: Collider; visual: DisplayObject; data?: any }[] = [];

  constructor() {
    super();
    this.onAdded = this.onAdded.bind(this);

    this.on('added', this.onAdded);
    this.on('removed', this.onRemoved);
  }

  get physics(): RapierPhysics {
    return this.app.physics as unknown as RapierPhysics;
  }

  get app(): Application {
    return Application.instance;
  }

  get world(): World {
    return (this.app.physics as RapierPhysics).world;
  }

  get activeCollisionTypes(): ActiveCollisionTypes {
    // tslint:disable-next-line:no-bitwise
    return RAPIER.ActiveCollisionTypes.DEFAULT | RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED;
  }

  get activeEvents(): ActiveEvents {
    // tslint:disable-next-line:no-bitwise
    return RAPIER.ActiveEvents.COLLISION_EVENTS;
  }

  get activeHooks(): ActiveHooks {
    return RAPIER.ActiveHooks.FILTER_CONTACT_PAIRS;
  }

  get debugColor(): number {
    return 0xff0000;
  }

  addVisual(
    color: number,
    size: [number, number],
    position: [number, number] = [0, 0],
    type: PhysicsBodyType = PhysicsBodyType.RECTANGLE,
  ): Sprite {
    const visual = this.app.make.coloredSprite(color, size, type === PhysicsBodyType.CIRCLE ? 'circle' : 'rectangle');
    visual.position = resolvePointLike(position);
    visual.anchor.set(0.5, 0.5);
    this.addChild(visual);
    return visual;
  }

  onAdded() {
    this.physics.addToWorld(this);
  }

  onRemoved(): void {
    this.physics.removeFromWorld(this.body);
  }

  createCollider(visual: Sprite, body: RigidBody, type: PhysicsBodyType = PhysicsBodyType.RECTANGLE): Collider {
    let colliderDesc: ColliderDesc;
    switch (type) {
      case PhysicsBodyType.CIRCLE:
        colliderDesc = RAPIER.ColliderDesc.ball(visual.width / 2)
          .setDensity(visual.width * visual.width)
          .setTranslation(0, 0);
        break;
      case PhysicsBodyType.RECTANGLE:
      default:
        colliderDesc = RAPIER.ColliderDesc.cuboid(visual.width / 2, visual.height / 2)
          .setDensity(visual.width * visual.height)
          .setTranslation(0, 0);
        break;
    }

    let collider: Collider;

    if (colliderDesc) {
      // tslint:disable-next-line:no-bitwise
      colliderDesc.setActiveEvents(this.activeEvents);
      colliderDesc.setActiveCollisionTypes(this.activeCollisionTypes);
      colliderDesc.setActiveHooks(this.activeHooks);
      collider = this.world.createCollider(colliderDesc, body);
    }

    return collider!;
  }

  createPiece(
    color: number,
    size: [number, number],
    position: [number, number] = [0, 0],
    angle: number = 0,
    type: PhysicsBodyType = PhysicsBodyType.RECTANGLE,
    data?: any,
  ): {
    visual: Sprite;
    body: RigidBody;
    collider: Collider;
  } {
    const visual = this.addVisual(color, size, position, type);
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(this.x + position[0], this.y + position[1])
      .setRotation(this.angle + angle);

    const body = this.world.createRigidBody(bodyDesc);
    const collider = this.createCollider(visual, body, type);

    this.visuals.push(visual);
    this.bodies.push(body);
    this.colliders.push(collider);
    this.colliderRef.push({ collider, visual, data });

    return { visual, body, collider };
  }

  update() {
    if (this.visuals && this.body) {
      this.colliderRef.forEach(({ collider, visual, data }) => {
        visual.rotation = collider.rotation();
        if (data?.isMain) {
          this.x = collider.translation().x;
          this.y = collider.translation().y;
        } else {
          visual.x = collider.translation().x - this.x;
          visual.y = collider.translation().y - this.y;
        }
      });
    }
  }
}
