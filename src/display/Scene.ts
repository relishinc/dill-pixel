import { Ticker } from 'pixi.js';
import { Size } from '../utils';
import type { IContainer } from './Container';
import { Container } from './Container';

export interface IScene extends IContainer {
  id: string;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  start: () => Promise<void> | void;
}

export class Scene extends Container implements IScene {
  public readonly id: string;

  constructor() {
    super(true, true, -9999);
  }

  enter(): Promise<void> {
    return Promise.resolve();
  }

  exit(): Promise<void> {
    return Promise.resolve();
  }

  onResize(size: Size): void {}

  update(ticker: Ticker) {}

  start(): Promise<void> | void;

  async start(): Promise<void> {
    // override me to set up application specific stuff
  }
}
