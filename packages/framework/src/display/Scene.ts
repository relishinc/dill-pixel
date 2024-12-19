import { Ticker } from 'pixi.js';
import { Application } from '../Application';
import { AssetLoadingOptions, Logger, Size } from '../utils';
import type { IContainer } from './Container';
import { Container } from './Container';

export type SceneAssets = Omit<AssetLoadingOptions, 'manifest' | 'initOptions' | 'assetPreferences'>;

export interface IScene extends IContainer {
  id: string;
  assets?: SceneAssets;
  autoUnloadAssets?: boolean;

  enter(): Promise<any>;

  exit(): Promise<any>;

  initialize(): Promise<void> | void;

  start(): Promise<void> | void;
}

export interface SceneListItem {
  id: string;
  path: string;
  scene: () => Promise<new () => IScene> | IScene;
  debug?: {
    label?: string;
    group?: string;
  };
  assets?: string[];
  plugins?: string[];
  autoUnloadAssets: boolean;
}

export class Scene<T extends Application = Application> extends Container<T> implements IScene {
  public readonly id: string;
  public autoUnloadAssets: boolean = false;

  constructor() {
    super({ autoResize: true, autoUpdate: true, priority: 'highest' });
  }

  /**
   * The assets to load for the scene
   * @private
   * @type {AssetLoadingOptions}
   * @example
   * ```ts
   * assets: {
   *  preload: {
   *  assets: ['path/to/asset.png'],
   *  bundles: ['bundle1', 'bundle2'],
   *  },
   *  background: {
   *   assets: ['path/to/asset.png'],
   *   bundles: ['bundle1', 'bundle2'],
   *   },
   * }
   * ```
   */
  private _assets: AssetLoadingOptions;

  get assets(): AssetLoadingOptions {
    return this._assets;
  }

  set assets(value: AssetLoadingOptions) {
    this._assets = value;
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
    Logger.log('Scene.resize', this, size);
  }

  public destroy() {
    this.app.ticker.remove(this.update);
    super.destroy({ children: true });
  }
}
