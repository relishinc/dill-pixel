import { Bounds, Container, DestroyOptions, Graphics, PointLike } from 'pixi.js';
import { IFocusable } from './FocusManagerPlugin';

export type FocusOutlinerConfig = {
    color: number;
    shape: 'rectangle' | 'rounded rectangle';
    lineWidth?: number;
    radius?: number;
};
export interface IFocusOutliner {
    position: PointLike;
    focusBounds: Bounds;
    draw(focusTarget: IFocusable): void;
    clear(): void;
    destroy(args?: DestroyOptions): void;
    setFocusTarget(focusTarget: IFocusable): void;
    clearFocusTarget(): void;
    updatePosition(): void;
}
export declare class FocusOutliner extends Container implements IFocusOutliner {
    focusBounds: Bounds;
    focusTarget: IFocusable | null;
    protected _config: FocusOutlinerConfig;
    protected _graphics: Graphics;
    constructor(config?: Partial<FocusOutlinerConfig>);
    draw(focusTarget: IFocusable): void;
    clear(): void;
    destroy(options?: DestroyOptions): void;
    setFocusTarget(focusTarget: IFocusable): void;
    clearFocusTarget(): void;
    updatePosition(): void;
}
//# sourceMappingURL=FocusOutliner.d.ts.map