import { Application, bindAllMethods } from 'dill-pixel';
import { Actor } from './Actor';
import { System } from './System';
import TowerfallPhysicsPlugin from './TowerfallPhysicsPlugin';
import { PhysicsEntityConfig, PhysicsEntityView, Rectangle } from './types';
import { resolveEntityPosition, resolveEntitySize } from './utils';

export class Entity<A extends Application = Application> {
  public type!: string;
  public shouldRemoveOnCull: boolean = true;
  protected _isCulled: boolean = false;
  protected _isDestroyed: boolean = false;

  protected _xRemainder: number = 0;
  protected _yRemainder: number = 0;
  protected _x: number = 0;
  protected _y: number = 0;
  width: number = 0;
  height: number = 0;
  view!: PhysicsEntityView;

  setPosition(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this._xRemainder = 0;
    this._yRemainder = 0;
    this.updateView();
  }

  moveTo(x: number, y: number): void {
    this.setPosition(x, y);
  }

  get x(): number {
    return Math.round(this._x);
  }
  set x(value: number) {
    this._x = value;
  }

  get y(): number {
    return Math.round(this._y);
  }

  set y(value: number) {
    this._y = value;
  }

  get isCulled(): boolean {
    return this._isCulled;
  }

  get isDestroyed(): boolean {
    return this._isDestroyed;
  }

  get app(): A {
    return Application.getInstance() as A;
  }

  get physics(): TowerfallPhysicsPlugin {
    return this.app.getPlugin('towerfall-physics') as TowerfallPhysicsPlugin;
  }

  constructor(config?: PhysicsEntityConfig) {
    bindAllMethods(this);

    if (config) {
      this.init(config);
    }

    this.initialize();
  }

  protected initialize() {
    // Override in subclass
  }
  /**
   * Initialize the entity with new configuration data
   * Called by Pool when retrieving from pool
   * @param config Configuration data for the entity
   */
  public init(config: PhysicsEntityConfig): void {
    if (config.type) {
      this.type = config.type;
    }

    // Reset state flags
    this._isCulled = false;
    this._isDestroyed = false;

    // Set position and size
    const { x, y } = resolveEntityPosition(config);
    const { width, height } = resolveEntitySize(config);

    this._x = Math.round(x);
    this._y = Math.round(y);
    this.width = Math.round(width);
    this.height = Math.round(height);

    // Reset physics properties
    this._xRemainder = 0;
    this._yRemainder = 0;

    // Show and update view if it exists
    if (this.view) {
      this.view.visible = true;
      this.updateView();
    }
  }

  /**
   * Reset the entity to its initial state for reuse in object pool
   * Override this to handle custom reset logic
   * @param config New configuration to apply
   */
  public reset(): void {
    // Reset culling state
    this._isCulled = false;
    this._isDestroyed = false;

    // Reset remainders
    this._xRemainder = 0;
    this._yRemainder = 0;
  }

  get system(): System {
    return this.physics.system;
  }

  /**
   * Called when the entity is culled (goes out of bounds)
   * Override this to handle culling differently (e.g., hide instead of destroy)
   */
  public onCull(): void {
    this._isCulled = true;
    // Default behavior: hide the view
    if (this.view) {
      this.view.visible = false;
    }
  }

  /**
   * Called when the entity is brought back after being culled
   * Override this to handle unculling differently
   */
  public onUncull(): void {
    this._isCulled = false;
    // Default behavior: show the view
    if (this.view) {
      this.view.visible = true;
    }
  }

  /**
   * Prepare the entity for removal/recycling
   * Override this to handle custom cleanup
   */
  public destroy(): void {
    if (this._isDestroyed) return;

    this._isDestroyed = true;
    this._isCulled = false;

    // Remove from physics system if it exists
    if (this.system) {
      this.system.removeActor(this as unknown as Actor);
    }

    // Don't destroy the view - it will be reused
    if (this.view) {
      this.view.visible = false;
    }
  }

  public onRemoved(): void {
    // Override in subclass
    this.destroy();
  }

  public setView(view: PhysicsEntityView): void {
    this.view = view;
    this.updateView();
  }

  public updateView(): void {
    if (this.view) {
      this.view.position.set(this.x, this.y);
    }
  }

  public getBounds(): Rectangle {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }
}
