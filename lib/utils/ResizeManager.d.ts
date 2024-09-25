import { Point } from 'pixi.js';
import { Application } from '../core';
import { IResizeManager } from './IResizeManager';
import { ResizeManagerOptions } from './ResizeManagerNew';
export declare class ResizeManager implements IResizeManager {
    protected app: Application;
    private _sizeMin;
    private _sizeMax;
    private _ratioMin;
    private _ratioMax;
    private _useAspectRatio;
    private _desiredSizeConfig;
    constructor(app: Application, pSizeMin?: Point | undefined, pSizeMax?: Point | undefined);
    get options(): ResizeManagerOptions;
    set options(value: ResizeManagerOptions);
    get size(): Point;
    get screenSize(): Point;
    get scale(): number;
    get scaleX(): number;
    get scaleY(): number;
    get useAspectRatio(): boolean;
    set sizeMin(pSize: Point);
    set sizeMax(pSize: Point);
    private get windowAspectRatio();
    private get gameAspectRatio();
    initialize(): void;
    resize(): void;
    getSize(): Point;
    setDesiredSize(desiredSize: Point, maxFactor?: number): void;
    getScaleRatio(size?: Point): number;
    getStageScale(): number;
    private updateRatio;
}
//# sourceMappingURL=ResizeManager.d.ts.map