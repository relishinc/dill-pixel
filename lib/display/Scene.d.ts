import { Ticker } from 'pixi.js';
import { Application } from '../Application';
import { AssetLoadingOptions, Size } from '../utils';
import { IContainer, Container } from './Container';

export type SceneAssets = string | string[] | null;
export type SceneBundles = string | string[] | null;
export interface IScene extends IContainer {
    id: string;
    enter: () => Promise<any>;
    exit: () => Promise<any>;
    initialize: () => Promise<void> | void;
    start: () => Promise<void> | void;
    assets?: AssetLoadingOptions;
    autoUnloadAssets?: boolean;
}
export declare class Scene<T extends Application = Application> extends Container<T> implements IScene {
    readonly id: string;
    autoUnloadAssets: boolean;
    constructor();
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
    private _assets;
    get assets(): AssetLoadingOptions;
    set assets(value: AssetLoadingOptions);
    /**
     * Called to initialize the scene
     * Called before the scene is added to the stage
     * and before the scene is animated in
     * @returns {Promise<void> | void}
     */
    initialize(): Promise<void> | void;
    /**
     * Called to animate the scene in
     * @returns {Promise<void>}
     */
    enter(): Promise<any>;
    /**
     * Called to animate the scene out
     * @returns {Promise<void>}
     */
    exit(): Promise<any>;
    /**
     * Called after the enter resolves
     * If enter doesn't return a promise, this is called immediately after enter
     * @returns {Promise<void> | void}
     */
    start(): Promise<void> | void;
    /**
     * Called every frame
     * @param {Ticker} ticker
     */
    update(ticker?: Ticker): void;
    /**
     * Called when the window is resized
     * @param {Size} size
     * @override
     */
    resize(size?: Size): void;
}
//# sourceMappingURL=Scene.d.ts.map