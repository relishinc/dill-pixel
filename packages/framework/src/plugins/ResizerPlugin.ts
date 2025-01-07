import { Graphics } from 'pixi.js';

import type { IApplication } from '../core';
import { Container } from '../display';
import type { Size } from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

/**
 * Interface for Resizer module.
 */
export interface IResizerPlugin extends IPlugin {
  readonly size: Size;
  readonly scale: number;
  resize(): void;
}

/**
 * Configuration options for the Resizer plugin
 */
export type ResizerPluginOptions = {
  /** Whether to scroll the window to the top when resizing */
  autoScroll: boolean;
  /** The minimum width at which the renderer will resize. Also controls aspect ratio in letterbox mode */
  minWidth: number;
  /** The minimum height of the canvas. Also controls aspect ratio in letterbox mode */
  minHeight: number;
  /** Whether to letterbox the canvas to maintain aspect ratio */
  letterbox: boolean;
  /** Whether to center the canvas (particularly useful in letterbox mode) */
  center: boolean;
  /** Whether to draw debug information for visualizing canvas bounds */
  debug: boolean;
};

/**
 * Default options for Resizer module.
 */
const defaultOptions: ResizerPluginOptions = {
  autoScroll: false,
  minWidth: 0,
  minHeight: 0,
  letterbox: false,
  center: false,
  debug: false,
};

export class ResizerPlugin extends Plugin implements IResizerPlugin {
  public readonly id = 'resizer';
  private _options: ResizerPluginOptions;
  private _debugContainer: Container;
  private _gfx: Graphics;
  private _size: Size;
  private _scale: number;
  private _resizeId: number | null;

  get size(): Size {
    return this._size;
  }

  get scale(): number {
    return this._scale;
  }

  /**
   * Initializes the Resizer module.
   */
  async initialize(_app: IApplication, options: Partial<ResizerPluginOptions> = {}) {
    this._options = { ...defaultOptions, ...options };
  }

  /**
   * Post-initialization of the Resizer module.
   * when this is called, the renderer is already created, and the dom element has been appended
   */
  async postInitialize() {
    this.resize();
  }

  async resize() {
    this._cancelResize!();
    return new Promise((resolve) => {
      this._resizeId = requestAnimationFrame(() => {
        this._resize();
        resolve(this._size);
      });
    });
  }

  _cancelResize = (): void => {
    if (this._resizeId) {
      cancelAnimationFrame(this._resizeId);
      this._resizeId = null;
    }
  };

  _resizeInternal(w: number, h: number, minWidth: number, minHeight: number, letterbox: boolean) {
    const aspectRatio = minWidth / minHeight;
    let canvasWidth = w;
    let canvasHeight = h;

    if (letterbox) {
      if (minWidth < minHeight) {
        canvasWidth = canvasHeight * aspectRatio;
      } else {
        canvasHeight = canvasWidth / aspectRatio;
      }
    }

    const scaleX = canvasWidth < minWidth ? minWidth / canvasWidth : 1;
    const scaleY = canvasHeight < minHeight ? minHeight / canvasHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = Math.floor(canvasWidth * scale);
    const height = Math.floor(canvasHeight * scale);

    return { width, height, aspectRatio };
  }
  /**
   * Resizes the application based on window size and module options.
   */

  _resize() {
    const minWidth = this._options.minWidth;
    const minHeight = this._options.minHeight;
    const letterbox = this._options.letterbox;
    const center = this._options.center;

    let canvasWidth = minWidth;
    let canvasHeight = minHeight;

    if (this.app.config.resizeToContainer) {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;

      const el = this.app.renderer.canvas?.parentElement;
      const bounds = el?.getBoundingClientRect();

      if (bounds) {
        canvasWidth = bounds.width;
        canvasHeight = bounds.height;
      }
    }
    const { width, height, aspectRatio } = this._resizeInternal(
      canvasWidth,
      canvasHeight,
      minWidth,
      minHeight,
      letterbox,
    );

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = canvasWidth < minWidth ? minWidth / canvasWidth : 1;
    const scaleY = canvasHeight < minHeight ? minHeight / canvasHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;

    this._scale = scale;

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    if (letterbox) {
      if (canvasWidth > canvasHeight) {
        // Calculate dimensions based on width
        let styleWidth = canvasWidth;
        let styleHeight = canvasWidth / aspectRatio;

        // Constrain height if it exceeds container
        if (styleHeight > canvasHeight) {
          styleHeight = canvasHeight;
          styleWidth = styleHeight * aspectRatio;
        }

        this.app.renderer.canvas.style.width = `${styleWidth}px`;
        this.app.renderer.canvas.style.height = `${styleHeight}px`;
      } else {
        // Calculate dimensions based on height
        let styleHeight = canvasHeight;
        let styleWidth = canvasHeight * aspectRatio;

        // Constrain width if it exceeds container
        if (styleWidth > canvasWidth) {
          styleWidth = canvasWidth;
          styleHeight = styleWidth / aspectRatio;
        }

        this.app.renderer.canvas.style.height = `${styleHeight}px`;
        this.app.renderer.canvas.style.width = `${styleWidth}px`;
      }
      if (center) {
        this.app.renderer.canvas.style.position = 'absolute';
        this.app.renderer.canvas.style.left = '50%';
        this.app.renderer.canvas.style.top = '50%';
        this.app.renderer.canvas.style.transform = `translate3d(-50%, -50%, 0)`;
      }
    } else {
      this.app.renderer.canvas.style.width = `${canvasWidth}px`;
      this.app.renderer.canvas.style.height = `${canvasHeight}px`;
    }

    if (this._options.autoScroll) {
      window?.scrollTo(0, 0);
    }

    // Update renderer and navigation screens dimensions
    this.app.renderer.resize(width, height);
    this._size = { width, height };

    if (this._options.debug) {
      this._drawDebug();
    }
  }

  /**
   * Draws debug information if debug option is enabled.
   */
  private _drawDebug() {
    if (!this._debugContainer) {
      this._debugContainer = this.app.stage.addChild(new Container());
      this._gfx = this._debugContainer.add.graphics();
    }

    this._gfx.clear();
    this._gfx.rect(0, 0, this._size.width, this._size.height);
    this._gfx.stroke({ width: 4, color: 0x000fff });
  }
}
