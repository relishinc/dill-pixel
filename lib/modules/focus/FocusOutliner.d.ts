import { Container, DestroyOptions, PointLike } from 'pixi.js';
import { IFocusable } from './FocusManager';
export type FocusOutlinerConfig = {
    color: number;
    shape: 'rectangle' | 'rounded rectangle';
    lineWidth?: number;
    radius?: number;
};
export interface IFocusOutliner {
    position: PointLike;
    draw(focusTarget: IFocusable): void;
    clear(): void;
    destroy(args?: DestroyOptions): void;
}
export declare class FocusOutliner extends Container implements IFocusOutliner {
    private _config;
    private _graphics;
    private _focusTarget;
    constructor(conig?: Partial<FocusOutlinerConfig>);
    draw(focusTarget: IFocusable): void;
    clear(): void;
    destroy(options?: DestroyOptions): void;
    private _updatePosition;
}
//# sourceMappingURL=FocusOutliner.d.ts.map