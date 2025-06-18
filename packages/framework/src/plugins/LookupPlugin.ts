import { Container as PIXIContainer } from 'pixi.js';
import { IPlugin, Plugin } from '.';
import { Container } from '../display';

/**
 * Interface for the LookupPlugin providing fast container lookup functionality.
 * Enables O(1) lookups of PIXI containers using hierarchical path strings.
 */
export interface ILookupPlugin extends IPlugin {
  /**
   * Retrieves a container at the specified hierarchical path.
   * @param path - Slash-separated path like 'Parent/Child/GrandChild'
   * @returns The container at the path, or undefined if not found
   * @example
   * ```typescript
   * const button = lookupPlugin.getChildAtPath('UI/Menu/StartButton');
   * ```
   */
  getChildAtPath(path: string): PIXIContainer | undefined;

  /**
   * Gets the hierarchical path for a given container.
   * @param container - The PIXI container to get the path for
   * @returns The hierarchical path string, or empty string if not tracked
   * @example
   * ```typescript
   * const path = lookupPlugin.getPathForChild(myContainer); // 'Parent/Child'
   * ```
   */
  getPathForChild(container: PIXIContainer): string;

  /**
   * Batch retrieval of containers at multiple paths.
   * @param paths - Array of hierarchical paths to look up
   * @returns Array of containers found at the specified paths (undefined entries filtered out)
   * @example
   * ```typescript
   * const [ui, player] = lookupPlugin.getChildrenAtPaths('UI/HUD', 'Game/Player');
   * ```
   */
  getChildrenAtPaths(...paths: string[]): PIXIContainer[];

  /**
   * Batch retrieval of paths for multiple containers.
   * @param containers - Array of PIXI containers to get paths for
   * @returns Array of hierarchical paths for the containers
   * @example
   * ```typescript
   * const paths = lookupPlugin.getPathsForChildren(container1, container2);
   * ```
   */
  getPathsForChildren(...containers: PIXIContainer[]): string[];

  /**
   * Gets all currently tracked hierarchical paths.
   * @returns Array of all path strings in the lookup system
   * @example
   * ```typescript
   * const allPaths = lookupPlugin.getAllPaths(); // ['UI/Menu', 'Game/Player', ...]
   * ```
   */
  getAllPaths(): string[];
}

/**
 * High-performance container lookup plugin for PIXI.js applications.
 *
 * Provides O(1) lookup of containers using hierarchical path strings by maintaining
 * bidirectional maps between paths and containers. Automatically tracks container
 * hierarchy changes through global Container events.
 *
 * @example
 * ```typescript
 * // Access containers by path
 * const player = app.lookup.getChildAtPath('Game/Entities/Player');
 * const menuButton = app.lookup.getChildAtPath('UI/MainMenu/StartButton');
 *
 * // Get paths for containers
 * const playerPath = app.lookup.getPathForChild(playerSprite); // 'Game/Entities/Player'
 * ```
 *
 * @remarks
 * - Paths are built using container labels in hierarchical order
 * - Only containers with labels are included in paths
 * - Automatically handles container addition/removal through event listeners
 * - Uses Map data structures for optimal performance
 */
export class LookupPlugin extends Plugin implements ILookupPlugin {
  public name = 'lookup';

  /** Fast O(1) lookup map: hierarchical path -> container reference */
  private pathToContainer = new Map<string, PIXIContainer>();

  /** Reverse lookup for efficient path updates: container reference -> hierarchical path */
  private containerToPath = new Map<PIXIContainer, string>();

  /**
   * Core function names exposed by this plugin for framework integration.
   */
  get coreFunctions(): string[] {
    return ['getChildAtPath', 'getPathForChild', 'getChildrenAtPaths', 'getPathsForChildren', 'getAllPaths'];
  }

  /**
   * Initializes the lookup plugin by connecting to global container events.
   * Sets up automatic tracking of container hierarchy changes.
   */
  public async initialize() {
    Container.onGlobalChildAdded.connect(this.onChildAdded);
    Container.onGlobalChildRemoved.connect(this.onChildRemoved);
  }

  /**
   * Fast O(1) lookup of container by hierarchical path.
   *
   * @param path - Slash-separated path like 'Parent/Child/GrandChild'
   * @returns The container at the specified path, or undefined if not found
   *
   * @example
   * ```typescript
   * // Get a specific UI element
   * const healthBar = lookup.getChildAtPath('UI/HUD/HealthBar');
   * if (healthBar) {
   *   // Update health display
   *   healthBar.visible = true;
   * }
   * ```
   */
  public getChildAtPath(path: string): PIXIContainer | undefined {
    return this.pathToContainer.get(path);
  }

  /**
   * Batch retrieval of containers at multiple paths.
   * Filters out undefined results for convenience.
   *
   * @param paths - Variable number of hierarchical paths to look up
   * @returns Array of found containers (undefined entries filtered out)
   *
   * @example
   * ```typescript
   * // Get multiple UI elements at once
   * const [menu, hud, inventory] = lookup.getChildrenAtPaths(
   *   'UI/MainMenu',
   *   'UI/HUD',
   *   'UI/Inventory'
   * );
   * ```
   */
  public getChildrenAtPaths(...paths: string[]): PIXIContainer[] {
    return paths.map((path) => this.getChildAtPath(path)).filter((container) => container !== undefined);
  }

  /**
   * Get the hierarchical path for a given container.
   *
   * @param container - The container to get the path for
   * @returns The hierarchical path or empty string if not tracked
   *
   * @example
   * ```typescript
   * // Get path for debugging or logging
   * const containerPath = lookup.getPathForChild(someSprite);
   * console.log(`Container is at: ${containerPath}`);
   * ```
   */
  public getPathForChild(container: PIXIContainer): string {
    return this.containerToPath.get(container) || '';
  }

  /**
   * Batch retrieval of paths for multiple containers.
   *
   * @param containers - Variable number of PIXI containers to get paths for
   * @returns Array of hierarchical paths for the containers
   *
   * @example
   * ```typescript
   * // Get paths for multiple containers for debugging
   * const paths = lookup.getPathsForChildren(sprite1, sprite2, sprite3);
   * console.log('Container paths:', paths);
   * ```
   */
  public getPathsForChildren(...containers: PIXIContainer[]): string[] {
    return containers.map((container) => this.getPathForChild(container));
  }

  /**
   * Gets all currently tracked hierarchical paths.
   * Useful for debugging, serialization, or introspection.
   *
   * @returns Array of all path strings in the lookup system
   *
   * @example
   * ```typescript
   * // Debug all tracked containers
   * const allPaths = lookup.getAllPaths();
   * console.log('All tracked containers:', allPaths);
   * ```
   */
  public getAllPaths(): string[] {
    return Array.from(this.pathToContainer.keys());
  }

  /**
   * Gets all currently tracked containers.
   * Useful for bulk operations or debugging.
   *
   * @returns Array of all container references in the lookup system
   */
  public getAllChildren(): PIXIContainer[] {
    return Array.from(this.pathToContainer.values());
  }

  /**
   * Event handler for when a child is added to any container.
   * Automatically adds the new container to the lookup system.
   *
   * @param child - The newly added container
   */
  private onChildAdded(child: PIXIContainer) {
    this.addToLookup(child);
  }

  /**
   * Event handler for when a child is removed from any container.
   * Automatically removes the container from the lookup system.
   *
   * @param child - The removed container
   */
  private onChildRemoved(child: PIXIContainer) {
    this.removeFromLookup(child);
  }

  /**
   * Add a container and all its descendants to the lookup system.
   * Recursively processes the entire subtree to maintain lookup integrity.
   *
   * @param container - The container to add (along with all its children)
   */
  private addToLookup(container: PIXIContainer): void {
    const path = this.buildPath(container);

    if (path) {
      this.pathToContainer.set(path, container);
      this.containerToPath.set(container, path);
    }

    // Recursively add all children to maintain lookup integrity
    if (container.children) {
      for (const child of container.children) {
        this.addToLookup(child as PIXIContainer);
      }
    }
  }

  /**
   * Remove a container and all its descendants from the lookup system.
   * Recursively processes the entire subtree to prevent memory leaks.
   *
   * @param container - The container to remove (along with all its children)
   */
  private removeFromLookup(container: PIXIContainer): void {
    // Remove all descendants first
    if (container.children) {
      for (const child of container.children) {
        this.removeFromLookup(child as PIXIContainer);
      }
    }

    // Remove this container from lookup
    const path = this.containerToPath.get(container);
    if (path) {
      this.pathToContainer.delete(path);
      this.containerToPath.delete(container);
    }
  }

  /**
   * Build the hierarchical path for a container by traversing up the parent chain.
   * Only includes containers with labels in the path, stopping at 'Stage'.
   *
   * @param container - The container to build a path for
   * @returns The hierarchical path string, or empty string if no labeled ancestors
   *
   * @example
   * ```typescript
   * // For a container structure: Stage -> Game -> Player -> HealthBar
   * // Where each has a label, this would return: 'Game/Player/HealthBar'
   * ```
   */
  private buildPath(container: PIXIContainer): string {
    const pathSegments: string[] = [];
    let current: PIXIContainer | null = container;

    // Traverse up the parent chain to build path segments
    while (current && current.label) {
      pathSegments.unshift(current.label);
      current = current.parent as PIXIContainer;
      if (current?.label === 'Stage') {
        break;
      }
    }

    // Only return a path if we have at least one labeled segment
    return pathSegments.length > 0 ? pathSegments.join('/') : '';
  }
}
