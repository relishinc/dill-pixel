import { Ticker } from 'pixi.js';
import { Size } from '../utils';
import type { IContainer } from './Container';
import { Container } from './Container';

export interface IScene extends IContainer {
  id: string;
  enter: () => Promise<any>;
  exit: () => Promise<any>;
  initialize: () => Promise<void> | void;
  start: () => Promise<void> | void;
}

export class Scene extends Container implements IScene {
  public readonly id: string;

  constructor() {
    super({ autoResize: true, autoUpdate: true, priority: -9999 });
  }

  /**
   * Called to initialize the scene
   * Called before the scene is added to the stage
   * and before the scene is animated in
   * @returns {Promise<void> | void}
   */
  public initialize(): Promise<void> | void;
  public async initialize(): Promise<void> {}

  /**
   * Called to animate the scene in
   * @returns {Promise<void>}
   */
  public enter(): Promise<any> {
    return Promise.resolve();
  }

  /**
   * Called to animate the scene out
   * @returns {Promise<void>}
   */
  public exit(): Promise<any> {
    return Promise.resolve();
  }

  /**
   * Called after the enter resolves
   * If enter doesn't return a promise, this is called immediately after enter
   * @returns {Promise<void> | void}
   */
  public start(): Promise<void> | void;

  public async start(): Promise<void> {}

  /**
   * Called every frame
   * @param {Ticker} ticker
   */
  public update(ticker: Ticker) {}

  /**
   * Called when the window is resized
   * @param {Size} size
   */
  public resize(size: Size): void {}
}
