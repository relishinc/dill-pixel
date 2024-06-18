import { Graphics, Point } from 'pixi.js';

import { Container } from '../display';
import type { IApplication } from '../core';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';
import type { Size } from '../utils';

/**
 * Interface for Resizer module.
 */
export interface IResizerPlugin extends IPlugin {
  readonly size: Size;
  readonly scale: number;
  resize(): void;
}

/**
 * Type definition for Resizer options.
 */
export type ResizerPluginOptions = {
  autoScroll: boolean;
  useAspectRatio: boolean;
  fixed: boolean;
  minSize: { width: number; height: number };
  maxSize: { width: number; height: number };
  debug: boolean;
};

/**
 * Default options for Resizer module.
 */
const defaultOptions: ResizerPluginOptions = {
  autoScroll: false,
  useAspectRatio: false,
  fixed: false,
  minSize: { width: 0, height: 0 },
  maxSize: { width: 0, height: 0 },
  debug: false,
};

export class ResizerPlugin extends Plugin implements IResizerPlugin {
  public readonly id = 'resizer';
  private _options: ResizerPluginOptions;
  private _debugContainer: Container;
  private _gfx: Graphics;
  private _size: Size;
  private _scale: number;

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

  /**
   * Resizes the application based on window size and module options.
   */

  resize() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    const el = this.app.renderer.canvas?.parentElement;
    const bounds = el?.getBoundingClientRect();

    if (bounds) {
      screenWidth = bounds.width;
      screenHeight = bounds.height;
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
    this.app.renderer.canvas.style.width = `${screenWidth}px`;
    this.app.renderer.canvas.style.height = `${screenHeight}px`;

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
