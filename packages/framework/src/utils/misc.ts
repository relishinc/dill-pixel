import { Point } from 'pixi.js';
import type { Size, SizeLike } from './types';

export function resolveSizeLike(size?: SizeLike): Size {
  if (size === undefined) {
    return { width: 0, height: 0 };
  }
  if (Array.isArray(size)) {
    return { width: size[0], height: size[1] === undefined ? size[0] : size[1] };
  } else if (size instanceof Point) {
    return { width: size.x, height: size.y };
  } else if (typeof size === 'object') {
    // cast as an object
    const obj = size as { width: number; height: number };
    return { width: obj.width || 0, height: obj.height || 0 };
  } else {
    return { width: size ?? 0, height: size ?? 0 };
  }
}

type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

/**
 * Debounce a function
 * @param func - function to debounce
 * @param wait - time in milliseconds
 * @example const debounced = debounce(() => console.log('debounced'), 1000);
 * @example window.addEventListener('resize', debounced);
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): DebouncedFunction<T> {
  let timeoutId: any;
  return function (...args: Parameters<T>) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
