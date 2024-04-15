import { Point } from 'pixi.js';
import { ResizeManager } from './ResizeManager';
/**
 * Type definition for ResizeManager options.
 */
export type ResizeManagerOptions = {
    autoScroll: boolean;
    useAspectRatio: boolean;
    fixed: boolean;
    minSize: {
        width: number;
        height: number;
    };
};
export declare class ResizeManagerNew extends ResizeManager {
    readonly id = "resizer";
    private _options;
    private _size;
    private _screenSize;
    private _scale;
    get options(): ResizeManagerOptions;
    set options(value: ResizeManagerOptions);
    get size(): Point;
    get screenSize(): Point;
    get scale(): number;
    /**
     * Initializes the Resizer module.
     */
    initialize(options?: Partial<ResizeManagerOptions>): Promise<void>;
    /**
     * Resizes the application based on window size and module options.
     */
    resize(): void;
    getSize(): Point;
}
//# sourceMappingURL=ResizeManagerNew.d.ts.map