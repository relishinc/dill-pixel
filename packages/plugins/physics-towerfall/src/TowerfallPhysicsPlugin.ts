import { Application, Container, Plugin } from 'dill-pixel';

import { Container as PIXIContainer, Ticker } from 'pixi.js';
import { Actor } from './Actor';
import { Solid } from './Solid';
import { PhysicsSystem } from './System';
import { PhysicsBodyConfig, PhysicsObjectView } from './types';

export interface TowerfallPhysicsOptions {
  container: PIXIContainer;
  /** Grid cell size in pixels */
  gridSize?: number;
  /** Gravity strength */
  gravity?: number;
  /** Maximum velocity */
  maxVelocity?: number;
  /** Whether to enable debug rendering */
  debug?: boolean;
}

export class TowerfallPhysicsPlugin extends Plugin {
  private system: PhysicsSystem;
  private debugContainer?: Container;
  private container: PIXIContainer;

  constructor() {
    super('towerfall-physics');
  }

  public async initialize(
    app: Application,
    options: Partial<TowerfallPhysicsOptions> = { container: app.stage },
  ): Promise<void> {
    const { gridSize = 8, gravity = 900, maxVelocity = 400, debug = false } = options;

    this.container = options.container!;

    this.system = new PhysicsSystem({
      gridSize,
      gravity,
      maxVelocity,
    });

    if (debug) {
      this.debugContainer = this.container.addChild(new Container());
    }

    // Register update loop
    app.ticker.add(this.update);
  }

  public destroy(): void {
    this.app.ticker.remove(this.update);
    this.debugContainer?.destroy();
    super.destroy();
  }

  private update = (_ticker: Ticker) => {
    this.system.update(_ticker.deltaTime);

    if (this.debugContainer) {
      this.system.debugRender(this.debugContainer);
    }
  };

  /**
   * Create a new physics actor
   */
  public createActor(x: number, y: number, bodyConfig: PhysicsBodyConfig, view?: PhysicsObjectView): Actor {
    return this.system.createActor(x, y, bodyConfig, view);
  }

  /**
   * Create a new solid obstacle
   */
  public createSolid(x: number, y: number, bodyConfig: PhysicsBodyConfig, view?: PhysicsObjectView): Solid {
    return this.system.createSolid(x, y, bodyConfig, view);
  }

  /**
   * Remove an actor from the physics system
   */
  public removeActor(actor: Actor): void {
    this.system.removeActor(actor);
  }

  /**
   * Remove a solid from the physics system
   */
  public removeSolid(solid: Solid): void {
    this.system.removeSolid(solid);
  }
}
