import { Container, Point, Sprite } from "pixi.js";
import { Application } from "../Application";
export interface IPadding {
    top?: number | (() => number);
    left?: number | (() => number);
    bottom?: number | (() => number);
    right?: number | (() => number);
}
export declare enum AnchorPosition {
    TOP_LEFT = "top left",
    LEFT = "left",
    BOTTOM_LEFT = "bottom left",
    TOP = "top",
    TOP_RIGHT = "top right",
    RIGHT = "right",
    BOTTOM_RIGHT = "bottom right",
    BOTTOM = "bottom",
    CENTER = "center"
}
export interface IAnchorValue {
    anchorPosition: AnchorPosition;
    padding?: IPadding;
    container?: Container;
}
export declare class AnchorManager {
    private app;
    private container;
    width: number;
    height: number;
    _registry: Map<Sprite, IAnchorValue>;
    constructor(app: Application, container: Container);
    anchor(object: Sprite, anchorPosition: AnchorPosition, padding?: IPadding, container?: Container): void;
    setSize(size: Point): void;
    positionObject(object: Sprite, value: IAnchorValue): void;
    renderPadding(padding: number | (() => number) | undefined): number;
    private updatePositions;
}
//# sourceMappingURL=Anchor.d.ts.map