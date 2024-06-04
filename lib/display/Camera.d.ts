import { Container, Point } from 'pixi.js';
import { ContainerLike, PointLike } from '../utils';
import { Signal } from '../signals';
import { IApplication } from '../core';

type CameraConfig = {
    container: Container;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    viewportWidth: number;
    viewportHeight: number;
    worldWidth: number;
    worldHeight: number;
    target: ContainerLike | null;
    targetPivot: Point;
    lerp: number;
};
type OptionalCameraConfig = Partial<CameraConfig>;
type RequiredCameraConfig = Required<Pick<CameraConfig, 'container'>>;
type CustomCameraConfig = OptionalCameraConfig & RequiredCameraConfig;
export interface ICamera {
    onZoom: Signal<(camera?: ICamera) => void>;
    onZoomComplete: Signal<(camera?: ICamera) => void>;
    container: Container;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    viewportWidth: number;
    viewportHeight: number;
    worldWidth: number;
    worldHeight: number;
    readonly targetPivot: Point;
    readonly targetScale: Point;
    readonly zooming: boolean;
    readonly zoomLerp: number;
    readonly lerp: number;
    readonly target: ContainerLike | null;
    readonly followOffset: Point;
    app: IApplication;
    follow(target: ContainerLike, offset: PointLike): void;
    pan(deltaX: number, deltaY: number): void;
    zoom(scale: number, lerp?: number): void;
    update(): void;
}
export declare class Camera extends Container implements ICamera {
    config: CustomCameraConfig;
    onZoom: Signal<(camera?: ICamera) => void>;
    onZoomComplete: Signal<(camera?: ICamera) => void>;
    container: Container;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    viewportWidth: number;
    viewportHeight: number;
    worldWidth: number;
    worldHeight: number;
    constructor(config: CustomCameraConfig);
    protected _zooming: boolean;
    get zooming(): boolean;
    protected _zoomLerp: number;
    get zoomLerp(): number;
    protected _targetPivot: Point;
    get targetPivot(): Point;
    protected _targetScale: Point;
    get targetScale(): Point;
    private _lerp;
    get lerp(): number;
    set lerp(value: number);
    protected _target: ContainerLike | null;
    get target(): ContainerLike | null;
    set target(value: ContainerLike | null);
    protected _followOffset: Point;
    get followOffset(): Point;
    set followOffset(value: PointLike);
    get app(): IApplication;
    follow(target: ContainerLike, offset?: PointLike): void;
    pan(deltaX: number, deltaY: number): void;
    zoom(scale: number, lerp?: number): void;
    update(): void;
    private focusOn;
    private updateZoom;
    private updatePosition;
}
export declare class CameraController {
    camera: Camera;
    interactiveArea: Container;
    private dragging;
    private previousPointerPosition;
    constructor(camera: Camera, interactiveArea: Container);
    get app(): IApplication;
    destroy(): void;
    private handleKeyDown;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
    private getEventPosition;
}
export {};
//# sourceMappingURL=Camera.d.ts.map