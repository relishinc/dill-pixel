import { Container as PIXIContainer } from 'pixi.js';
import { IPlugin, Plugin } from '.';
import { Container } from '../display';

export interface ILookupPlugin extends IPlugin {
  getChildAtPath(path: string): PIXIContainer | undefined;
  getPathForChild(container: PIXIContainer): string;
  getChildrenAtPaths(...paths: string[]): PIXIContainer[];
  getPathsForChildren(...containers: PIXIContainer[]): string[];
  getAllPaths(): string[];
}

export class LookupPlugin extends Plugin implements ILookupPlugin {
  public name = 'lookup';

  // Fast O(1) lookup map: path -> container
  private pathToContainer = new Map<string, PIXIContainer>();
  // Reverse lookup for efficient path updates: container -> path
  private containerToPath = new Map<PIXIContainer, string>();

  get coreFunctions(): string[] {
    return ['getChildAtPath', 'getPathForChild', 'getChildrenAtPaths', 'getPathsForChildren', 'getAllPaths'];
  }

  public async initialize() {
    Container.onGlobalChildAdded.connect(this.onChildAdded);
    Container.onGlobalChildRemoved.connect(this.onChildRemoved);
  }

  /**
   * Fast O(1) lookup of container by hierarchical path
   * @param path - Slash-separated path like 'Parent/Child/GrandChild'
   * @returns The container at the specified path, or undefined if not found
   */
  public getChildAtPath(path: string): PIXIContainer | undefined {
    return this.pathToContainer.get(path);
  }

  public getChildrenAtPaths(...paths: string[]): PIXIContainer[] {
    return paths.map((path) => this.getChildAtPath(path)).filter((container) => container !== undefined);
  }

  /**
   * Get the hierarchical path for a given container
   * @param container - The container to get the path for
   * @returns The hierarchical path or empty string if not tracked
   */
  public getPathForChild(container: PIXIContainer): string {
    return this.containerToPath.get(container) || '';
  }

  public getPathsForChildren(...containers: PIXIContainer[]): string[] {
    return containers.map((container) => this.getPathForChild(container));
  }

  public getAllPaths(): string[] {
    return Array.from(this.pathToContainer.keys());
  }

  public getAllChildren(): PIXIContainer[] {
    return Array.from(this.pathToContainer.values());
  }

  private onChildAdded(child: PIXIContainer) {
    this.addToLookup(child);
  }

  private onChildRemoved(child: PIXIContainer) {
    this.removeFromLookup(child);
  }

  /**
   * Add a container and all its descendants to the lookup
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
   * Remove a container and all its descendants from the lookup
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
   * Build the hierarchical path for a container by traversing up the parent chain
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
