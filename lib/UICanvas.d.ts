import { Container as PIXIContainer, DisplayObject, IPoint } from 'pixi.js';
import { Container } from './gameobjects';
export type Edge = 'top right' | 'top left' | 'top center' | 'bottom right' | 'bottom left' | 'bottom center' | 'left top' | 'left bottom' | 'left center' | 'right top' | 'right bottom' | 'right center' | 'center';
interface UISettings {
    edge: Edge;
    padding: number;
}
export type UICanvasSettings = {
    debug: boolean;
    edge: Edge;
    padding: UICanvasPadding;
};
export type UICanvasProps = {
    debug: boolean;
    edge: Edge;
    padding: UICanvasPadding | {
        x: number;
        y: number;
    } | number;
};
export type UICanvasPadding = {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export declare class UICanvas extends Container {
    private _screenBounds;
    private settingsMap;
    private _settings;
    private _debugGraphics;
    constructor(settings?: Partial<UICanvasProps>);
    get bounds(): import("pixi.js").Bounds;
    onResize(_size: IPoint): void;
    update(): void;
    layout(): void;
    addElement(child: PIXIContainer<DisplayObject>, settings?: Partial<UISettings>): void;
    setPosition(): void;
    private __calculateBounds;
    private handleChildRemoved;
    private applySettings;
    private drawDebug;
}
export {};
//# sourceMappingURL=UICanvas.d.ts.map