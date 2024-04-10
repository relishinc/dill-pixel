import { IApplication } from '../core/Application';
import { AppSize, Size } from '../utils/types';
import { IModule, Module } from './Module';
/**
 * Interface for Resizer module.
 */
export interface IResizer extends IModule {
    size: AppSize;
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
export declare class Resizer extends Module {
    readonly id = "resizer";
    private _options;
    private _size;
    private _debugContainer;
    private _gfx;
    get size(): Size;
    /**
     * Initializes the Resizer module.
     */
    initialize(app: IApplication, options?: Partial<ResizerOptions>): Promise<void>;
    /**
     * Post-initialization of the Resizer module.
     * when this is called, the renderer is already created, and the dom element has been appended
     * @param app - The application instance.
     */
    postInitialize(app: IApplication): Promise<void>;
    /**
     * Resizes the application based on window size and module options.
     */
    resize(): void;
    /**
     * Draws debug information if debug option is enabled.
     */
    private _drawDebug;
}
//# sourceMappingURL=Resizer.d.ts.map