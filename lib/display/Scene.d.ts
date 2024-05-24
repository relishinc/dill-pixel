import { Ticker } from 'pixi.js';
import { Application } from '../Application';
import { Size } from '../utils';
import { IContainer, Container } from './Container';

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
export declare class Scene<T extends Application = Application> extends Container<T> implements IScene {
    readonly id: string;
    autoUnloadAssets: boolean;
    constructor();
    private _assets;
    get assets(): SceneAssets;
    set assets(value: SceneAssets);
    private _bundles;
    get bundles(): SceneBundles;
    set bundles(value: string | string[] | null);
    private _backgroundAssets;
    get backgroundAssets(): SceneAssets;
    set backgroundAssets(value: SceneAssets);
    private _backgroundBundles;
    get backgroundBundles(): SceneBundles;
    set backgroundBundles(value: string | string[] | null);
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