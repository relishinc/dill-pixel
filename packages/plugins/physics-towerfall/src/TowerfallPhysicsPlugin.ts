import { Application, Container, Plugin, PointLike } from 'dill-pixel';

import { Container as PIXIContainer, Ticker } from 'pixi.js';
import { Actor } from './Actor';
import { TowerfallPhysicsOptions } from './interfaces';
import { Solid } from './Solid';
import { System } from './System';
import { PhysicsBodyConfig, PhysicsObjectView } from './types';

export default class TowerfallPhysicsPlugin extends Plugin {
  public system: System;
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

    this.system = new System({
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
  public createActor(position: PointLike, bodyConfig: PhysicsBodyConfig, view: PhysicsObjectView): Actor {
    return this.system.createActor(position, bodyConfig, view);
  }

  /**
   * Create a new solid obstacle
   */
  public createSolid(position: PointLike, bodyConfig: PhysicsBodyConfig, view: PhysicsObjectView): Solid {
    return this.system.createSolid(position, bodyConfig, view);
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

  public updateSolidPosition(solid: Solid, x: number, y: number): void {
    solid.x = x;
    solid.y = y;
  }
}
