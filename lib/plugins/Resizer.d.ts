import { IApplication } from '../core/Application';
import { Size } from '../utils/types';
import { IPlugin, Plugin } from './Plugin';
/**
 * Interface for Resizer module.
 */
export interface IResizer extends IPlugin {
    size: Size;
    resize(): void;
}
/**
 * Type definition for Resizer options.
 */
export type ResizerOptions = {
    autoScroll: boolean;
    useAspectRatio: boolean;
    fixed: boolean;
    minSize: {
        width: number;
        height: number;
    };
    maxSize: {
        width: number;
        height: number;
    };
    debug: boolean;
};
export declare class Resizer extends Plugin {
    readonly id = "resizer";
    private _options;
    private _debugContainer;
    private _gfx;
    private _size;
    get size(): Size;
    /**
     * Initializes the Resizer module.
     */
    initialize(_app: IApplication, options?: Partial<ResizerOptions>): Promise<void>;
    /**
     * Post-initialization of the Resizer module.
     * when this is called, the renderer is already created, and the dom element has been appended
     */
    postInitialize(): Promise<void>;
    /**
     * Resizes the application based on window size and module options.
     */
    resize(): void;
    /**
     * Draws debug information if debug option is enabled.
     */
    private _drawDebug;
}