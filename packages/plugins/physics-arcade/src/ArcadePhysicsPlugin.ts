import { Container, IApplication, Logger, Plugin } from 'dill-pixel';

import { ArcadePhysics } from 'arcade-physics/lib/physics/arcade/ArcadePhysics';
import { Body } from './Body';
import { Entity } from './Entity';
import { Graphics } from 'pixi.js';

export interface ArcadePhysicsPluginOptions {
  fps?: number;
  fixedStep?: boolean;
  timeScale?: number;
  gravity: { x: number; y: number };
  y?: number;
  width: number;
  height: number;
  checkCollision?: boolean;
  tileBias?: number;
  forceX?: boolean;
  isPaused?: boolean;
  debug?: boolean;
  debugShowBody?: boolean;
  debugShowStaticBody?: boolean;
  debugShowVelocity?: boolean;
  debugBodyColor?: number;
  debugStaticBodyColor?: number;
  debugVelocityColor?: number;
  maxEntries?: number;
  useTree?: boolean;
  customUpdate?: boolean;
}

const defaultOptions = {
  debug: false,
  gravity: { x: 0, y: 300 },
};

export class ArcadePhysicsPlugin extends Plugin {
  public static ID = 'ArcadePhysicsPlugin';
  public container: Container;
  public readonly id = 'ArcadePhysicsPlugin';
  public options: ArcadePhysicsPluginOptions;
  public physics: ArcadePhysics;
  private _gfx: Graphics | null;

  private _debug: boolean;

  set debug(value: boolean) {
    this._debug = value;
    if (value) {
      this.app.ticker.add(this._drawDebug);
    } else {
      this._gfx?.destroy();
      this._gfx = null;
      this.app.ticker.remove(this._drawDebug);
    }
  }

  public async initialize(app: IApplication, options?: Partial<ArcadePhysicsPluginOptions>) {
    ArcadePhysicsPlugin.ID = this.id;
    this.options = { ...defaultOptions, width: app.size.width, height: app.size.height, ...options, debug: false };

    Logger.log('ArcadePhysicsPlugin', 'initialize', this.options);
    this.physics = new ArcadePhysics(this.options);

    if (options?.debug) {
      this.debug = true;
    }
  }

  destroy() {
    if (this._gfx) {
      this._gfx.parent.removeChild(this._gfx);
      this._gfx.destroy();
    }
    this.app.ticker.remove(this._drawDebug);

    // destroy physics
    this.physics.shutdown();
    this.physics.destroy();

    // @ts-expect-error can't be null
    this.physics = null;

    this._gfx = null;
    this.debug = false;
    super.destroy();
  }

  addBody(entity: Entity) {
    if (!entity.body) {
      Logger.error('ArcadePhysicsPlugin', 'addBody', 'Entity does not have a body');
      return;
    }
    entity.body.entity = entity;
  }

  private _drawDebug() {
    if (!this.container) {
      return;
    }
    if (!this._gfx) {
      this._gfx = new Graphics();
      this.container.addChild(this._gfx);
    }
    this._gfx.clear();
    if (!this.physics.world) {
      return;
    }
    this.physics.world.bodies.forEach((body) => {
      const entity = (body as Body).entity;
      if (entity) {
        const pos = entity.bodyPosition;
        if (body.isCircle) {
          this._gfx?.circle(pos.x + body.width * 0.5, pos.y + body.width * 0.5, body.width * 0.5);
        } else {
          this._gfx?.rect(pos.x, pos.y, body.width, body.height);
        }
      }
    });
    this._gfx.stroke({ width: 1, color: 0xff0000, alignment: 0.5 });
    this.physics.world.staticBodies.forEach((body) => {
      if (body.isCircle) {
        this._gfx?.circle(body.x + body.width * 0.5, body.y + body.width * 0.5, body.width * 0.5);
      } else {
        this._gfx?.rect(body.x, body.y, body.width, body.height);
      }
    });
    this._gfx.stroke({ width: 1, color: 0x00ff00, alignment: 0.5 });

    this._gfx.rect(
      this.physics.world.bounds.x,
      this.physics.world.bounds.y,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height,
    );
    this._gfx.stroke({ width: 1, color: 0xff0000, alignment: 0.5 });
  }
}
