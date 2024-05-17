/******************************************************************************
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
import { ClippingAttachment } from './attachments/ClippingAttachment';
import { Slot } from './Slot';
import { Color, NumberArrayLike } from './Utils';
export declare class SkeletonClipping {
    clippedVertices: number[];
    clippedTriangles: number[];
    private triangulator;
    private clippingPolygon;
    private clipOutput;
    private scratch;
    private clipAttachment;
    private clippingPolygons;
    static makeClockwise(polygon: NumberArrayLike): void;
    clipStart(slot: Slot, clip: ClippingAttachment): number;
    clipEndWithSlot(slot: Slot): void;
    clipEnd(): void;
    isClipping(): boolean;
    clipTriangles(vertices: NumberArrayLike, verticesLength: number, triangles: NumberArrayLike, trianglesLength: number, uvs: NumberArrayLike, light: Color, dark: Color, twoColor: boolean): void;
    /** Clips the input triangle against the convex, clockwise clipping area. If the triangle lies entirely within the clipping
     * area, false is returned. The clipping area must duplicate the first vertex at the end of the vertices list. */
    clip(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, clippingArea: Array<number>, output: Array<number>): boolean;
}
