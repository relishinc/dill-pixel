import { resolvePointLike, resolveSizeLike } from 'dill-pixel';
import { PhysicsEntityConfig } from './types';

export function resolveEntityPosition(config: PhysicsEntityConfig): { x: number; y: number } {
  const { x, y } =
    config.position !== undefined ? resolvePointLike(config.position) : { x: config?.x ?? 0, y: config?.y ?? 0 };

  return { x, y };
}

export function resolveEntitySize(config: PhysicsEntityConfig): { width: number; height: number } {
  const { width, height } =
    config.size !== undefined
      ? resolveSizeLike(config.size)
      : { width: config?.width ?? 0, height: config?.height ?? 0 };

  return { width, height };
}
