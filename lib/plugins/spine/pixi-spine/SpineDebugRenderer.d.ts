/** ****************************************************************************
 * Spine Runtimes License Agreement
 * Last updated July 28, 2023. Replaces all prior versions.
 *
 * Copyright (c) 2013-2023, Esoteric Software LLC
 *
 * Integration of the Spine Runtimes into software or otherwise creating
 * derivative works of the Spine Runtimes is permitted under the terms and
 * conditions of Section 2 of the Spine Editor License Agreement:
 * http://esotericsoftware.com/spine-editor-license
 *
 * Otherwise, it is permitted to integrate the Spine Runtimes into software or
 * otherwise create derivative works of the Spine Runtimes (collectively,
 * "Products"), provided that each user of the Products must obtain their own
 * Spine Editor license and redistribution of the Products in any form must
 * include this license and copyright notice.
 *
 * THE SPINE RUNTIMES ARE PROVIDED BY ESOTERIC SOFTWARE LLC "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL ESOTERIC SOFTWARE LLC BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES,
 * BUSINESS INTERRUPTION, OR LOSS OF USE, DATA, OR PROFITS) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE
 * SPINE RUNTIMES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *****************************************************************************/
import { Container, Graphics } from 'pixi.js';
import type { AnimationStateListener } from '../spine-core';
import { Spine } from './Spine';
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
    unregisterSpine(spine: Spine): void;
    drawClippingFunc(spine: Spine, debugDisplayObjects: DebugDisplayObjects, lineWidth: number): void;
    drawBoundingBoxesFunc(spine: Spine, debugDisplayObjects: DebugDisplayObjects, lineWidth: number): void;
    private drawBonesFunc;
    private drawRegionAttachmentsFunc;
    private drawMeshHullAndMeshTriangles;
    private drawPathsFunc;
}
export {};
