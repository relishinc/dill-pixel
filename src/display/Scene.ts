import { Ticker } from 'pixi.js';
import { Application } from '../Application';
import type { Size } from '../utils';
import type { IContainer } from './Container';
import { Container } from './Container';

export type SceneAssets = string | string[] | null;
export type SceneBundles = string | string[] | null;

export interface IScene extends IContainer {
  id: string;
  enter: () => Promise<any>;
  exit: () => Promise<any>;
  initialize: () => Promise<void> | void;
  start: () => Promise<void> | void;
  assets?: SceneAssets;
  bundles?: SceneBundles;
  backgroundAssets?: SceneAssets;
  backgroundBundles?: SceneBundles;
  autoUnloadAssets?: boolean;
}

export class Scene<T extends Application = Application> extends Container<T> implements IScene {
  public readonly id: string;
  autoUnloadAssets: boolean = false;

  constructor() {
    super({ autoResize: true, autoUpdate: true, priority: -9999 });
  }

  private _assets: SceneAssets = null;

  get assets(): SceneAssets {
    return this._assets;
  }

  set assets(value: SceneAssets) {
    this._assets = value;
  }

  private _bundles: SceneBundles = null;

  get bundles(): SceneBundles {
    return this._bundles;
  }

  set bundles(value: string | string[] | null) {
    this._bundles = value;
  }

  //
  private _backgroundAssets: SceneAssets = null;

  get backgroundAssets(): SceneAssets {
    return this._backgroundAssets;
  }

  set backgroundAssets(value: SceneAssets) {
    this._backgroundAssets = value;
  }

  private _backgroundBundles: SceneBundles = null;

  get backgroundBundles(): SceneBundles {
    return this._backgroundBundles;
  }

  set backgroundBundles(value: string | string[] | null) {
    this._backgroundBundles = value;
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
  public update(ticker?: Ticker) {
    void ticker;
  }

  /**
   * Called when the window is resized
   * @param {Size} size
   * @override
   */
  public resize(size?: Size): void {
    void size;
  }
}
