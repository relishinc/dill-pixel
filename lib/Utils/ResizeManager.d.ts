import { Point } from "pixi.js";
import { Application } from "../Application";
export declare class ResizeManager {
    private app;
    private _sizeMin;
    private _sizeMax;
    private _ratioMin;
    private _ratioMax;
    private _useAspectRatio;
    constructor(app: Application, pSizeMin?: Point | undefined, pSizeMax?: Point | undefined);
    get useAspectRatio(): boolean;
    set sizeMin(pSize: Point);
    set sizeMax(pSize: Point);
    private get windowAspectRatio();
    private get gameAspectRatio();
    getSize(): Point;
    getStageScale(): number;
    private updateRatio;
}
//# sourceMappingURL=ResizeManager.d.ts.map