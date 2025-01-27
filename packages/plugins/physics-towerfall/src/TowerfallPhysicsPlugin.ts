import { Application, Plugin } from 'dill-pixel';

import { Container as PIXIContainer, Ticker } from 'pixi.js';
import { Actor } from './Actor';
import { TowerfallPhysicsOptions } from './interfaces';
import { Solid } from './Solid';
import { System } from './System';
import { PhysicsEntityConfig, PhysicsEntityView } from './types';

export default class TowerfallPhysicsPlugin extends Plugin {
  public system: System;
  public container: PIXIContainer;

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
      boundary: options.boundary,
      shouldCull: options.shouldCull,
      plugin: this,
    });

    if (debug) {
      this.system.debug = true;
    }

    // Register update loop
    app.ticker.add(this.update);
  }

  public destroy(): void {
    this.app.ticker.remove(this.update);
    this.system.destroy();
    super.destroy();
  }

  private update(_ticker: Ticker) {
    this.system.update(_ticker.deltaTime);
  }

  /**
   * Create a new physics actor
   */
  public createActor(config: PhysicsEntityConfig, view: PhysicsEntityView): Actor {
    return this.system.createActor(config, view);
  }

  /**
   * Create a new solid obstacle
   */
  public createSolid(config: PhysicsEntityConfig, view: PhysicsEntityView): Solid {
    return this.system.createSolid(config, view);
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
