import { resolvePointLike, resolveSizeLike } from 'dill-pixel';
import { PhysicsEntityConfig } from './types';

/**
 * Utility functions for resolving entity positions and sizes from various input formats.
 * These functions handle the conversion of different coordinate and size specifications
 * into standardized formats used by the physics system.
 */

/**
 * Resolves an entity's position from various input formats.
 * Supports direct x/y values or a position object/array.
 *
 * @param config - Entity configuration containing position information
 * @returns Resolved {x, y} coordinates
 *
 * @example
 * ```typescript
 * // Using direct x/y values
 * resolveEntityPosition({ x: 100, y: 200 })
 * // → { x: 100, y: 200 }
 *
 * // Using position array
 * resolveEntityPosition({ position: [100, 200] })
 * // → { x: 100, y: 200 }
 *
 * // Using position object
 * resolveEntityPosition({ position: { x: 100, y: 200 } })
 * // → { x: 100, y: 200 }
 * ```
 */
export function resolveEntityPosition(config: PhysicsEntityConfig): { x: number; y: number } {
  const { x, y } =
    config.position !== undefined ? resolvePointLike(config.position) : { x: config?.x ?? 0, y: config?.y ?? 0 };

  return { x, y };
}

/**
 * Resolves an entity's size from various input formats.
 * Supports direct width/height values or a size object/array.
 *
 * @param config - Entity configuration containing size information
 * @returns Resolved {width, height} dimensions
 *
 * @example
 * ```typescript
 * // Using direct width/height values
 * resolveEntitySize({ width: 100, height: 200 })
 * // → { width: 100, height: 200 }
 *
 * // Using size array
 * resolveEntitySize({ size: [100, 200] })
 * // → { width: 100, height: 200 }
 *
 * // Using size object
 * resolveEntitySize({ size: { width: 100, height: 200 } })
 * // → { width: 100, height: 200 }
 *
 * // Using defaults
 * resolveEntitySize({})
 * // → { width: 32, height: 32 }
 * ```
 */
export function resolveEntitySize(config: PhysicsEntityConfig): { width: number; height: number } {
  const { width, height } =
    config.size !== undefined
      ? resolveSizeLike(config.size)
      : { width: config?.width ?? 32, height: config?.height ?? 32 };

  return { width, height };
}
