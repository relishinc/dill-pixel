import { Point } from 'pixi.js';
import { ResizeManagerOptions } from './ResizeManagerNew';

export interface IResizeManager {
  options?: Partial<ResizeManagerOptions>;
  useAspectRatio: boolean;
  size: Point;
  screenSize: Point;
  scale: number;

  initialize(options: Partial<ResizeManagerOptions>): void;

  resize(): void;

  getSize(): Point;
}
