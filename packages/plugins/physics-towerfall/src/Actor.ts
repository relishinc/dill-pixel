import { Container } from 'pixi.js';
import { Circle, CollisionShape, PhysicsBodyConfig, PhysicsObject, Rectangle, Vector2 } from './types';

export class Actor implements PhysicsObject {
  public velocity: Vector2 = { x: 0, y: 0 };
  public onCollideX?: (direction: number) => void;
  public onCollideY?: (direction: number) => void;
  public view?: Container;
  public shape: CollisionShape;
  public radius?: number;
  public width: number;
  public height: number;

  constructor(
    public x: number,
    public y: number,
    bodyConfig: PhysicsBodyConfig,
    view?: Container,
  ) {
    this.shape = bodyConfig.shape;

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

  public setView(view: Container): void {
    this.view = view;
    this.updateView();
  }

  public updateView(): void {
    if (this.view) {
      this.view.position.set(this.x, this.y);
    }
  }

  public getBounds(): Rectangle {
    if (this.shape === 'circle') {
      return {
        x: this.x - this.radius!,
        y: this.y - this.radius!,
        width: this.radius! * 2,
        height: this.radius! * 2,
      };
    }
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  public getCircle(): Circle {
    if (this.shape === 'circle') {
      return {
        x: this.x,
        y: this.y,
        radius: this.radius!,
      };
    }
    // For rectangular bodies, return a circle that encompasses the rectangle
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
      radius: Math.sqrt((this.width * this.width + this.height * this.height) / 4),
    };
  }
}
