import { Application } from '../../core/Application';
import { PhysicsBase } from '../PhysicsBase';
import { PointObjectLike } from '../rapier';
import { Factory } from './factory/Factory';
import { IMatterPhysicsObject } from './interfaces';
import { MatterBodyLike } from './types';

export class MatterPhysics extends PhysicsBase {
  private _updateables: IMatterPhysicsObject[] = [];
  private _engine: Matter.Engine;

  private _bounds: PointObjectLike = { x: 0, y: 0 };
  private _isRunning: boolean = false;

  constructor(protected app: Application) {
    super(app);
    this._factory = new Factory();
  }

  public get engine() {
    return this._engine;
  }

  destroy() {
    Matter.World.clear(this._engine.world, false);
    Matter.Engine.clear(this._engine);
    this._updateables = [];
    this._isRunning = false;
    super.destroy();
  }

  async init(
    pAutoStart: boolean = false,
    pDebug: boolean = false,
    autoCreateBounds: boolean = true,
    pEngineOptions: Matter.IEngineDefinition = {},
  ) {
    await import('matter-js').then((module) => {
      (globalThis as any).Matter = module;
    });

    const opts = pEngineOptions || {};

    this._debug = pDebug;
    this._engine = Matter.Engine.create(opts);

    if (autoCreateBounds) {
      this.createWorldBounds();
    }

    if (pAutoStart) {
      this.start();
    }
  }

  addToWorld(...objects: (IMatterPhysicsObject | MatterBodyLike)[]) {
    objects.forEach((obj) => {
      let body: MatterBodyLike;
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty('body')) {
        body = (obj as IMatterPhysicsObject).body;
        this._updateables.push(obj as IMatterPhysicsObject);
      } else {
        body = obj as MatterBodyLike;
      }
      Matter.World.add(this._engine.world, body);
    });
  }

  removeFromWorld(...bodies: MatterBodyLike[]) {
    bodies.forEach((body) => {
      Matter.World.remove(this._engine.world, body);
    });
  }

  public update(_deltaTime: number) {
    if (!this._isRunning) {
      return;
    }
    if (typeof Matter === 'undefined' || !this._engine) {
      return;
    }
    if (this._engine) {
      this._updateables.forEach((obj) => {
        obj.update();
      });
      if (this._debug) {
        this.drawDebug();
      }
      Matter.Engine.update(this._engine, 16.666666666666668, 1);
    }
  }

  public createWorldBounds(useStage: boolean = true) {
    const thickness = 50; // or however thick you want the boundaries to be
    const width = useStage ? this.app.size.x : this._bounds.x;
    const height = useStage ? this.app.size.y : this._bounds.y;

    // Top boundary
    const top = Matter.Bodies.rectangle(-thickness / 2, -height / 2 - thickness / 2, width + thickness, thickness, {
      isStatic: true,
    });

    // Bottom boundary
    const bottom = Matter.Bodies.rectangle(-thickness / 2, height / 2 + thickness / 2, width + thickness, thickness, {
      isStatic: true,
    });

    // Left boundary
    const left = Matter.Bodies.rectangle(-width / 2 - thickness / 2, -thickness / 2, thickness, height + thickness, {
      isStatic: true,
    });

    // Right boundary
    const right = Matter.Bodies.rectangle(width / 2 + thickness / 2, -thickness / 2, thickness, height + thickness, {
      isStatic: true,
    });

    // Add these bodies to the world
    this.addToWorld(top, bottom, left, right);
  }

  public start() {
    this._isRunning = true;
  }

  public stop() {
    this._isRunning = false;
  }

  drawDebug() {
    this._debugGraphics.clear();

    for (let i = 0; i < this._updateables.length; i++) {
      const updateable = this._updateables[i];
      const body = this._updateables[i].body as Matter.Body;
      const color = updateable?.debugColor || 0x29c5f6;
      const vertices = body.vertices;

      this._debugGraphics.lineStyle(1, 0x00ff00, 1);
      this._debugGraphics.beginFill(color, 0.5);
      this._debugGraphics.moveTo(vertices[0].x, vertices[0].y);

      for (let j = 1; j < vertices.length; j++) {
        this._debugGraphics.lineTo(vertices[j].x, vertices[j].y);
      }

      this._debugGraphics.lineTo(vertices[0].x, vertices[0].y);
      this._debugGraphics.endFill();
    }
  }
}
