import { Container as PIXIContainer, DisplayObject, Graphics, Rectangle } from 'pixi.js';
import { Container } from '../gameobjects';
import { PointLike } from '../utils';
export type UICanvasEdge = 'top right' | 'top left' | 'top center' | 'top' | 'bottom right' | 'bottom left' | 'bottom center' | 'bottom' | 'left top' | 'left bottom' | 'left center' | 'left' | 'right top' | 'right bottom' | 'right center' | 'right' | 'center';
export interface UICanvasChildSettings {
    align: UICanvasEdge;
    padding: number;
}
export type UICanvasSettings = {
    debug: boolean;
    padding: UICanvasPadding;
    size: PointLike;
    isBoundToStage: boolean;
};
export type UICanvasProps = {
    debug: boolean;
    padding: Partial<UICanvasPadding> | {
        x: number;
        y: number;
    } | number;
    size?: PointLike;
};
export type UICanvasPadding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export declare class UICanvas extends Container {
    protected _outerBounds: Rectangle;
    protected _displayBounds: Rectangle;
    protected settingsMap: Map<PIXIContainer<DisplayObject>, UICanvasChildSettings>;
    protected _settings: UICanvasSettings;
    protected _childMap: Map<PIXIContainer<DisplayObject>, PIXIContainer<DisplayObject>>;
    protected _canvasChildren: DisplayObject[];
    protected _debugGraphics: Graphics;
    constructor(settings?: Partial<UICanvasProps>);
    get canvasChildren(): DisplayObject[];
    get bounds(): import("pixi.js").Bounds;
    set size(value: PointLike);
    set padding(value: Partial<UICanvasPadding> | {
        x: number;
        y: number;
    } | number);
    onResize(): void;
    update(): void;
    removeChildAt(index: number): DisplayObject;
    removeChild(...children: DisplayObject[]): DisplayObject;
    getChildAt(index: number): DisplayObject;
    layout(): void;
    addElement(child: PIXIContainer, settings?: Partial<UICanvasChildSettings>): PIXIContainer;
    reAlign(child: PIXIContainer<DisplayObject>, settings: Partial<UICanvasChildSettings> | UICanvasEdge): void;
    protected setPosition(): void;
    protected __calculateBounds(_size: PointLike): Rectangle;
    protected __calculateOuterBounds(_size: PointLike): Rectangle;
    protected handleChildRemoved(child: any): void;
    private applySettings;
    private drawDebug;
}
//# sourceMappingURL=UICanvas.d.ts.map