import {Point} from 'pixi.js';
import {ResizeManager} from './ResizeManager';

/**
 * Type definition for ResizeManager options.
 */
export type ResizeManagerOptions = {
  autoScroll: boolean;
  useAspectRatio: boolean;
  fixed: boolean;
  minSize: { width: number; height: number };
};

/**
 * Default options for Resizer module.
 */
const defaultOptions: ResizeManagerOptions = {
  autoScroll: false,
  useAspectRatio: false,
  fixed: false,
  minSize: { width: 0, height: 0 },
};

export class ResizeManagerNew extends ResizeManager {
  public readonly id = 'resizer';
  private _options: ResizeManagerOptions;
  private _size: Point = new Point();
  private _screenSize: Point = new Point();
  private _scale: number;

  get options(): ResizeManagerOptions {
    return this._options;
  }

  set options(value: ResizeManagerOptions) {
    this._options = value;
    window?.dispatchEvent(new Event('resize'));
  }

  get size() {
    return this._size;
  }

  get screenSize(): Point {
    return this._screenSize;
  }

  get scale() {
    return this._scale;
  }

  /**
   * Initializes the Resizer module.
   */
  async initialize(options: Partial<ResizeManagerOptions> = {}) {
    this._options = { ...defaultOptions, ...options };
    this.resize();
  }

  /**
   * Resizes the application based on window size and module options.
   */
  resize() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    const canvas = this.app.renderer.view as HTMLCanvasElement;
    const el = canvas?.parentElement;
    const bounds = el?.getBoundingClientRect();
    if (bounds) {
      screenWidth = Math.min(window.innerWidth, bounds.width);
      screenHeight = Math.min(window.innerHeight, bounds.height);
    }
    const minWidth = this._options.minSize.width;
    const minHeight = this._options.minSize.height;

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = screenWidth < minWidth ? minWidth / screenWidth : 1;
    const scaleY = screenHeight < minHeight ? minHeight / screenHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;

    this._scale = scale;
    const width = screenWidth * scale;
    const height = screenHeight * scale;

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    canvas.style.width = `${screenWidth}px`;
    canvas.style.height = `${screenHeight}px`;

    if (this._options.autoScroll) {
      window?.scrollTo(0, 0);
    }

    this._screenSize.x = screenWidth;
    this._screenSize.y = screenHeight;

    // Update renderer and navigation screens dimensions
    this.app.renderer.resize(width, height);

    this._size.x = width;
    this._size.y = height;
  }

  getSize(): Point {
    return this._size;
  }
}
