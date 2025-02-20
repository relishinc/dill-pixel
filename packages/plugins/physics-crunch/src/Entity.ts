import {
  Application,
  bindAllMethods,
  defaultFactoryMethods,
  PointLike,
  resolvePointLike,
  SignalConnection,
  SignalConnections,
} from 'dill-pixel';
import CrunchPhysicsPlugin from './CrunchPhysicsPlugin';
import { Group } from './Group';
import { System } from './System';
import { EntityData, PhysicsEntityConfig, PhysicsEntityType, PhysicsEntityView, Rectangle } from './types';
import { resolveEntityPosition, resolveEntitySize } from './utils';

/**
 * Base class for all physics entities in the Crunch physics system.
 * Provides common functionality for position, size, view management, and lifecycle.
 *
 * Entity is the foundation for:
 * - Actors (dynamic objects)
 * - Solids (static objects)
 * - Sensors (trigger zones)
 *
 * It handles:
 * - Position and size management
 * - View (sprite) management and updates
 * - Group membership and relative positioning
 * - Culling and lifecycle states
 * - Signal connections for event handling
 *
 * @typeParam A - Application type, defaults to base Application
 * @typeParam D - Entity data type, defaults to base EntityData
 *
 * @example
 * ```typescript
 * // Create a custom entity
 * class CustomEntity extends Entity {
 *   constructor() {
 *     super({
 *       type: 'Custom',
 *       position: [100, 100],
 *       size: [32, 32],
 *       view: sprite
 *     });
 *   }
 *
 *   // Override update for custom behavior
 *   update(dt: number) {
 *     super.update(dt);
 *     // Custom update logic
 *   }
 * }
 * ```
 */
export class Entity<A extends Application = Application, D extends EntityData = EntityData> {
  public readonly entityType: PhysicsEntityType;
  protected _id: string;

  /** Unique type identifier for this entity */
  public type!: string;

  /** Set of entity types this entity should not collide with */
  get excludedCollisionTypes(): Set<PhysicsEntityType> {
    const exclusions = this.system.getCollisionExclusions(this);
    return exclusions || new Set();
  }

  /** Color to use when rendering debug visuals */
  public debugColor: number;

  /** Whether the entity should be removed when culled (out of bounds) */
  public shouldRemoveOnCull: boolean;

  /** Entity width in pixels */
  public width: number;

  /** Entity height in pixels */
  public height: number;

  /** Visual representation (sprite/graphics) of this entity */
  public view!: PhysicsEntityView;

  /** Whether this entity is active and should be updated */
  public active: boolean = true;

  protected _data: Partial<D>;
  protected _group: Group | null;
  protected _isCulled: boolean;
  protected _isDestroyed: boolean;
  protected _isInitialized: boolean;
  protected _xRemainder: number;
  protected _yRemainder: number;
  protected _x: number;
  protected _y: number;
  protected signalConnections: SignalConnections;
  protected _following: Entity | null;
  protected _followOffset: { x: number; y: number };

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id || this.type;
  }

  get make(): typeof defaultFactoryMethods {
    return this.app.make;
  }

  /**
   * Custom data associated with this entity
   */
  set data(value: Partial<D>) {
    this._data = value;
  }

  get data(): Partial<D> {
    return this._data;
  }

  setFollowing(entityToFollow: Entity | null, offset: PointLike = { x: 0, y: 0 }) {
    this._followOffset = resolvePointLike(offset);
    if (this._following) {
      this.system.removeFollower(this);
    }
    if (entityToFollow) {
      this._following = entityToFollow;
      this.system.addFollower(entityToFollow, this);
    }
  }

  get followOffset(): { x: number; y: number } {
    return this._followOffset || { x: 0, y: 0 };
  }

  get following(): Entity | null {
    return this._following;
  }

  get followers(): Entity[] {
    return this.system.getFollowersOf(this);
  }

  /**
   * The group this entity belongs to, if any.
   * Groups allow for collective movement and management of entities.
   */
  get group(): Group | null {
    return this._group;
  }

  set group(value: Group | null) {
    this._group = value;
    if (this._group) {
      this.onAddedToGroup();
    } else {
      this.onRemovedFromGroup();
    }
    this.updatePosition();
  }

  set position(value: PointLike) {
    const { x, y } = resolvePointLike(value);
    this.setPosition(x, y);
  }

  get position(): PointLike {
    return { x: this.x, y: this.y };
  }

  /**
   * Entity's X position in world space.
   * If the entity belongs to a group, returns position relative to group.
   */
  set x(value: number) {
    this._x = value;
  }

  get x(): number {
    if (this._group) {
      return Math.round(this._x + this._group.getChildOffset(this).x); // Return world position
    }
    return Math.round(this._x);
  }

  /**
   * Entity's Y position in world space.
   * If the entity belongs to a group, returns position relative to group.
   */
  set y(value: number) {
    this._y = value;
  }

  get y(): number {
    if (this._group) {
      return Math.round(this._y + this._group.getChildOffset(this).y); // Return world position
    }
    return Math.round(this._y);
  }

  /** Whether this entity is currently culled (out of bounds) */
  get isCulled(): boolean {
    return this._isCulled;
  }

  /** Whether this entity has been destroyed */
  get isDestroyed(): boolean {
    return this._isDestroyed;
  }

  /** Reference to the main application instance */
  get app(): A {
    return Application.getInstance() as A;
  }

  /** Reference to the physics plugin */
  get physics(): CrunchPhysicsPlugin {
    return this.app.getPlugin('crunch-physics') as CrunchPhysicsPlugin;
  }

  /**
   * Creates a new Entity instance.
   *
   * @param config - Optional configuration for the entity
   */
  constructor(config?: PhysicsEntityConfig<D>) {
    bindAllMethods(this);

    this.signalConnections = new SignalConnections();
    this.shouldRemoveOnCull = false;
    this.width = 0;
    this.height = 0;

    this._data = {};
    this._group = null;
    this._isCulled = false;
    this._isDestroyed = false;
    this._isInitialized = false;
    this._xRemainder = 0;
    this._yRemainder = 0;

    this._x = 0;
    this._y = 0;

    if (config) {
      this.init(config);
    }

    this.initialize();
    this.addView();
  }

  /**
   * Called after construction to perform additional initialization.
   * Override this in subclasses to add custom initialization logic.
   */
  protected initialize() {
    // Override in subclass
  }

  /**
   * Called before update to prepare for the next frame.
   * Override this in subclasses to add pre-update logic.
   */
  public preUpdate(): void {
    // Override in subclass
  }

  /**
   * Called every frame to update the entity's state.
   * Override this in subclasses to add update logic.
   *
   * @param dt - Delta time in seconds since last update
   */
  public update(dt: number): void {
    // Override in subclass
    void dt;
  }

  /**
   * Called after update to finalize the frame.
   * Override this in subclasses to add post-update logic.
   */
  public postUpdate(): void {
    // Override in subclass
  }

  /**
   * Exclude collision types from this entity
   * @param types
   */
  excludeCollisionType(...types: PhysicsEntityType[]) {
    this.system.excludeCollisionTypes(this, ...types);
  }

  /**
   * Include collision types for this entity
   * @param types
   */
  includeCollisionType(...types: PhysicsEntityType[]) {
    this.system.includeCollisionTypes(this, ...types);
  }

  /**
   * Alias for excludeCollisionType
   * @param types
   */
  removeCollisionType(...types: PhysicsEntityType[]) {
    this.excludeCollisionType(...types);
  }

  /**
   * Alias for includeCollisionType
   * @param types
   */
  addCollisionType(...types: PhysicsEntityType[]) {
    this.includeCollisionType(...types);
  }

  /**
   * Check if this entity can collide with another entity
   * @param type
   * @returns
   */
  canCollideWith(type: PhysicsEntityType): boolean {
    return this.system.canCollideWith(this, type);
  }

  /**
   * Adds the entity's view to the physics container and updates its position.
   */
  protected addView() {
    if (this.view) {
      this.view.visible = true;
      this.view.label = this.id || this.type;
      this.system.container.addChild(this.view);
      this.updateView();
    }
  }

  /**
   * Initializes or reinitializes the entity with new configuration.
   * Used by object pools when recycling entities.
   *
   * @param config - New configuration to apply
   */
  public init(config: PhysicsEntityConfig): void {
    if (config.id) {
      this._id = config.id;
    }

    if (config.type) {
      this.type = config.type;
    }

    if (config.data) {
      this._data = config.data as Partial<D>;
    }

    if (config.position !== undefined || (config.x !== undefined && config.y !== undefined)) {
      const { x, y } = resolveEntityPosition(config);
      this._x = Math.round(x);
      this._y = Math.round(y);
    }

    if (config.size !== undefined || (config.width !== undefined && config.height !== undefined)) {
      const { width, height } = resolveEntitySize(config);
      this.width = Math.round(width);
      this.height = Math.round(height);
    }

    // Reset physics properties
    this._xRemainder = 0;
    this._yRemainder = 0;

    if (config.view) {
      this.view = config.view;
    }
    // Show and update view if it exists
    this.addView();
  }

  /**
   * Resets the entity to its initial state for reuse in object pools.
   * Override this to handle custom reset logic.
   */
  public reset(): void {
    // Reset culling state
    this._isCulled = false;
    this._isDestroyed = false;

    // Reset remainders
    this._xRemainder = 0;
    this._yRemainder = 0;

    this._data = {};
  }

  /** Reference to the physics system */
  get system(): System {
    return this.physics.system;
  }

  /**
   * Called when the entity is added to a group.
   * Override this to handle custom group addition logic.
   */
  public onAddedToGroup(): void {
    // Override in subclass
  }

  /**
   * Called when the entity is removed from a group.
   * Override this to handle custom group removal logic.
   */
  public onRemovedFromGroup(): void {
    // Override in subclass
  }

  /**
   * Updates the entity's position and view.
   */
  public updatePosition(): void {
    this.x = this._x;
    this.y = this._y;
    this.updateView();
  }

  /**
   * Called when the entity is culled (goes out of bounds).
   * Override this to handle culling differently.
   */
  public onCull(): void {
    this._isCulled = true;
    // Default behavior: hide the view
    if (this.view) {
      this.view.visible = false;
    }
  }

  /**
   * Called when the entity is brought back after being culled.
   * Override this to handle unculling differently.
   */
  public onUncull(): void {
    this._isCulled = false;
    // Default behavior: show the view
    if (this.view) {
      this.view.visible = true;
    }
  }

  /**
   * Prepares the entity for removal/recycling.
   * Override this to handle custom cleanup.
   */
  public destroy(): void {
    if (this._isDestroyed) return;

    this._isDestroyed = true;
    this._isCulled = false;

    this.signalConnections.disconnectAll();

    // Don't destroy the view - it will be reused
    if (this.view) {
      this.view.visible = false;
      this.view.removeFromParent();
    }

    this.system.removeFollower(this);
  }

  /**
   * Called when the entity is removed from the physics system.
   * Override this to handle custom removal logic.
   */
  public onRemoved(): void {
    // Override in subclass
    this.destroy();
  }

  /**
   * Sets a new view for the entity and updates its position.
   *
   * @param view - The new view to use
   */
  public setView(view: PhysicsEntityView): void {
    this.view = view;
    this.updateView();
  }

  /**
   * Updates the view's position to match the entity's position.
   */
  public updateView(): void {
    if (this.view && this.view.visible && this.view.position) {
      this.view.position.set(this.x, this.y);
    }
  }

  /**
   * Gets the entity's bounding rectangle.
   *
   * @returns Rectangle representing the entity's bounds
   */
  public getBounds(): Rectangle {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  /**
   * Sets the entity's position, resetting any movement remainders.
   *
   * @param x - New X position
   * @param y - New Y position
   */
  public setPosition(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this._xRemainder = 0;
    this._yRemainder = 0;
    this.updateView();
  }

  /**
   * Alias for setPosition.
   *
   * @param x - New X position
   * @param y - New Y position
   */
  public moveTo(x: number, y: number): void {
    this.setPosition(x, y);
  }

  /**
   * Adds signal connections to the entity.
   *
   * @param args - Signal connections to add
   */
  public addSignalConnection(...args: SignalConnection[]) {
    for (const connection of args) {
      this.signalConnections.add(connection);
    }
  }

  /**
   * Alias for addSignalConnection.
   *
   * @param args - Signal connections to add
   */
  public connectSignal(...args: SignalConnection[]) {
    for (const connection of args) {
      this.signalConnections.add(connection);
    }
  }

  /**
   * Alias for addSignalConnection, specifically for action signals.
   *
   * @param args - Action signal connections to add
   */
  public connectAction(...args: SignalConnection[]) {
    for (const connection of args) {
      this.signalConnections.add(connection);
    }
  }
}
