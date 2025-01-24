import { Solid } from './Solid';
import { CollisionShape, PhysicsBodyConfig, PhysicsObject, PhysicsObjectView, Vector2 } from './types';

export class Actor extends PhysicsObject {
  public velocity: Vector2 = { x: 0, y: 0 };
  public onCollideX?: (direction: number, normal?: Vector2, penetration?: number) => void;
  public onCollideY?: (direction: number, normal?: Vector2, penetration?: number) => void;
  public view?: PhysicsObjectView;
  public shape: CollisionShape;
  public radius?: number;
  public width: number;
  public height: number;
  public restitution: number = 0;

  constructor(
    public x: number,
    public y: number,
    bodyConfig: PhysicsBodyConfig,
    view?: PhysicsObjectView,
  ) {
    super();
    this._x = x;
    this._y = y;
    this.shape = bodyConfig.shape;
    this.restitution = bodyConfig.restitution ?? 0;

    if (this.shape === 'circle') {
      if (!bodyConfig.radius) throw new Error('Radius is required for circular bodies');
      this.radius = bodyConfig.radius;
      this.width = this.height = this.radius * 2;
    } else {
      if (!bodyConfig.width || !bodyConfig.height)
        throw new Error('Width and height are required for rectangular bodies');
      this.width = bodyConfig.width;
      this.height = bodyConfig.height;
    }

    if (view) {
      this.setView(view);
    }
  }

  /**
   * Check if this actor is riding the given solid
   * By default, an actor is riding if it's directly above the solid
   */
  public isRiding(solid: Solid): boolean {
    // Must be directly above the solid (within 1 pixel)
    const actorBottom = this.y + this.height;
    const onTop = Math.abs(actorBottom - solid.y) <= 1;

    // Must be horizontally overlapping
    const overlap = this.x + this.width > solid.x && this.x < solid.x + solid.width;

    return onTop && overlap;
  }

  /**
   * Called when the actor is squeezed between solids
   * By default, just stops movement
   */
  public squish(): void {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
}
