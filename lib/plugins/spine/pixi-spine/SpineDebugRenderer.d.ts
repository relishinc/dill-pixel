import { Container, Graphics } from 'pixi.js';
import { Spine } from './Spine';
import { AnimationStateListener } from '../spine-core';

/**
 * Make a class that extends from this interface to create your own debug renderer.
 * @public
 */
export interface ISpineDebugRenderer {
    /**
     * This will be called every frame, after the spine has been updated.
     */
    renderDebug: (spine: Spine) => void;
    /**
     *  This is called when the `spine.debug` object is set to null or when the spine is destroyed.
     */
    unregisterSpine: (spine: Spine) => void;
    /**
     * This is called when the `spine.debug` object is set to a new instance of a debug renderer.
     */
    registerSpine: (spine: Spine) => void;
}
type DebugDisplayObjects = {
    bones: Container;
    skeletonXY: Graphics;
    regionAttachmentsShape: Graphics;
    meshTrianglesLine: Graphics;
    meshHullLine: Graphics;
    clippingPolygon: Graphics;
    boundingBoxesRect: Graphics;
    boundingBoxesCircle: Graphics;
    boundingBoxesPolygon: Graphics;
    pathsCurve: Graphics;
    pathsLine: Graphics;
    parentDebugContainer: Container;
    eventText: Container;
    eventCallback: AnimationStateListener;
};
/**
 * This is a debug renderer that uses PixiJS Graphics under the hood.
 * @public
 */
export declare class SpineDebugRenderer implements ISpineDebugRenderer {
    drawMeshHull: boolean;
    drawMeshTriangles: boolean;
    drawBones: boolean;
    drawPaths: boolean;
    drawBoundingBoxes: boolean;
    drawClipping: boolean;
    drawRegionAttachments: boolean;
    drawEvents: boolean;
    lineWidth: number;
    regionAttachmentsColor: number;
    meshHullColor: number;
    meshTrianglesColor: number;
    clippingPolygonColor: number;
    boundingBoxesRectColor: number;
    boundingBoxesPolygonColor: number;
    boundingBoxesCircleColor: number;
    pathsCurveColor: number;
    pathsLineColor: number;
    skeletonXYColor: number;
    bonesColor: number;
    eventFontSize: number;
    eventFontColor: number;
    private readonly registeredSpines;
    /**
     * The debug is attached by force to each spine object.
     * So we need to create it inside the spine when we get the first update
     */
    registerSpine(spine: Spine): void;
    renderDebug(spine: Spine): void;
    drawClippingFunc(spine: Spine, debugDisplayObjects: DebugDisplayObjects, lineWidth: number): void;
    drawBoundingBoxesFunc(spine: Spine, debugDisplayObjects: DebugDisplayObjects, lineWidth: number): void;
    unregisterSpine(spine: Spine): void;
    private drawBonesFunc;
    private drawRegionAttachmentsFunc;
    private drawMeshHullAndMeshTriangles;
    private drawPathsFunc;
}
export {};
//# sourceMappingURL=SpineDebugRenderer.d.ts.map