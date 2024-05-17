import {Point} from 'pixi.js';
import {ResizeManagerOptions} from './ResizeManagerNew';

/**
 * Interface for managing resizing.
 */
export interface IResizeManager {
  /**
   * Options for the ResizeManager.
   */
  options?: Partial<ResizeManagerOptions>;

  /**
   * Whether to use aspect ratio for resizing.
   */
  useAspectRatio: boolean;

  /**
   * The size of the ResizeManager.
   */
  size: Point;

  /**
   * The screen size of the ResizeManager.
   */
  screenSize: Point;

  /**
   * The scale of the ResizeManager.
   */
  scale: number;

  /**
   * Initializes the ResizeManager with given options.
   * @param {Partial<ResizeManagerOptions>} options - The options for the ResizeManager.
   */
  initialize(options: Partial<ResizeManagerOptions>): void;

  /**
   * Resizes the ResizeManager.
   */
  resize(): void;

  /**
   * Gets the size of the ResizeManager.
   * @returns {Point} - The size of the ResizeManager.
   */
  getSize(): Point;
}
