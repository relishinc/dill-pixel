import { IApplication } from '../core/Application';
import { CoreModule } from '../core/decorators';
import { AppSize, Size } from '../utils/types';
import { IModule, Module } from './Module';

export interface IResizer extends IModule {
  size: AppSize;

  resize(size: Size): void;
}

/**
 * Type definition for i18n options.
 */
export type ResizerOptions = {
  autoScroll: boolean;
  useAspectRatio: boolean;
  fixed: boolean;
  minSize: { width: number; height: number };
  maxSize: { width: number; height: number };
};

/**
 * Default options for i18n module.
 */
const defaultOptions: ResizerOptions = {
  autoScroll: false,
  useAspectRatio: false,
  fixed: false,
  minSize: { width: 0, height: 0 },
  maxSize: { width: 0, height: 0 },
};

@CoreModule
export class Resizer extends Module {
  public readonly id = 'resizer';
  private _options: ResizerOptions;
  private _size: AppSize;

  get size() {
    return this._size;
  }

  async initialize(app: IApplication, options: Partial<ResizerOptions> = {}) {
    this._options = { ...defaultOptions, ...options };
  }

  resize() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    if (this.app.resizeTo !== document.body) {
      if ((this.app.resizeTo as HTMLElement)?.getBoundingClientRect) {
        const el = this.app.resizeTo as HTMLElement;
        screenWidth = el.getBoundingClientRect().width;
        screenHeight = el.getBoundingClientRect().height;
      }
    }
    const minWidth = this._options.minSize.width;
    const minHeight = this._options.minSize.height;

    // Calculate renderer and canvas sizes based on current dimensions
    const scaleX = screenWidth < minWidth ? minWidth / screenWidth : 1;
    const scaleY = screenHeight < minHeight ? minHeight / screenHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
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
    this._size = { width, height, screenWidth, screenHeight };
  }
}
