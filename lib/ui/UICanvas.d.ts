import { Container as PIXIContainer, DisplayObject } from 'pixi.js';
import { Container } from '../gameobjects';
import { PointLike } from '../utils';
export type UICanvasEdge = 'top right' | 'top left' | 'top center' | 'bottom right' | 'bottom left' | 'bottom center' | 'left top' | 'left bottom' | 'left center' | 'right top' | 'right bottom' | 'right center' | 'center';
export interface UISettings {
    edge: UICanvasEdge;
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
    private _displayBounds;
    private settingsMap;
    private _settings;
    private _debugGraphics;
    constructor(settings?: Partial<UICanvasProps>);
    get bounds(): import("pixi.js").Bounds;
    set size(value: PointLike);
    onResize(): void;
    update(): void;
    layout(): void;
    addElement(child: PIXIContainer<DisplayObject>, settings?: Partial<UISettings>): void;
    setPosition(): void;
    private __calculateBounds;
    private handleChildRemoved;
    private applySettings;
    private drawDebug;
}
//# sourceMappingURL=UICanvas.d.ts.map