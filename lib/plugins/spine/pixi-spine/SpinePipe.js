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
import { BigPool, extensions, ExtensionType, Texture } from 'pixi.js';
import { ClippingAttachment, Color, MeshAttachment, RegionAttachment, SkeletonClipping } from '../spine-core';
import { BatchableClippedSpineSlot } from './BatchableClippedSpineSlot';
import { BatchableSpineSlot } from './BatchableSpineSlot';
const QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
const QUAD_VERTS = new Float32Array(8);
const lightColor = new Color();
const darkColor = new Color();
// eslint-disable-next-line max-len
export class SpinePipe {
    /** @ignore */
    static extension = {
        type: [ExtensionType.WebGLPipes, ExtensionType.WebGPUPipes, ExtensionType.CanvasPipes],
        name: 'spine',
    };
    renderer;
    activeBatchableSpineSlots = [];
    constructor(renderer) {
        this.renderer = renderer;
        renderer.runners.prerender.add({
            prerender: () => {
                this.buildStart();
            },
        });
    }
    validateRenderable(_renderable) {
        return true;
    }
    addRenderable(spine) {
        const batcher = this.renderer.renderPipes.batch;
        const rootBone = spine.skeleton.getRootBone();
        rootBone.x = 0;
        rootBone.y = 0;
        rootBone.scaleX = 1;
        rootBone.scaleY = 1;
        rootBone.rotation = 0;
        spine.state.apply(spine.skeleton);
        spine.skeleton.updateWorldTransform();
        const drawOrder = spine.skeleton.drawOrder;
        const activeBatchableSpineSlot = this.activeBatchableSpineSlots;
        const clipper = new SkeletonClipping();
        for (let i = 0, n = drawOrder.length; i < n; i++) {
            const slot = drawOrder[i];
            const attachment = slot.getAttachment();
            if (attachment instanceof RegionAttachment || attachment instanceof MeshAttachment) {
                if (clipper?.isClipping()) {
                    if (attachment instanceof RegionAttachment) {
                        const temp = QUAD_VERTS;
                        attachment.computeWorldVertices(slot, temp, 0, 2);
                        // TODO this function could be optimised.. no need to write colors for us!
                        clipper.clipTriangles(QUAD_VERTS, QUAD_VERTS.length, QUAD_TRIANGLES, QUAD_TRIANGLES.length, attachment.uvs, lightColor, darkColor, false);
                        // unwind it!
                        if (clipper.clippedVertices.length > 0) {
                            const batchableSpineSlot = BigPool.get(BatchableClippedSpineSlot);
                            activeBatchableSpineSlot.push(batchableSpineSlot);
                            batchableSpineSlot.texture = attachment.region?.texture.texture || Texture.WHITE;
                            batchableSpineSlot.roundPixels = (this.renderer._roundPixels | spine._roundPixels);
                            batchableSpineSlot.setClipper(clipper);
                            batchableSpineSlot.renderable = spine;
                            batcher.addToBatch(batchableSpineSlot);
                        }
                    }
                }
                else {
                    const batchableSpineSlot = BigPool.get(BatchableSpineSlot);
                    activeBatchableSpineSlot.push(batchableSpineSlot);
                    batchableSpineSlot.renderable = spine;
                    batchableSpineSlot.setSlot(slot);
                    batchableSpineSlot.texture = attachment.region?.texture.texture || Texture.EMPTY;
                    batchableSpineSlot.roundPixels = (this.renderer._roundPixels | spine._roundPixels);
                    batcher.addToBatch(batchableSpineSlot);
                }
            }
            else if (attachment instanceof ClippingAttachment) {
                clipper.clipStart(slot, attachment);
            }
            else {
                clipper.clipEndWithSlot(slot);
            }
        }
        clipper.clipEnd();
    }
    updateRenderable(_renderable) {
        // this does not happen.. yet!
        // we assume that spine will always change its verts size..
    }
    destroyRenderable(_renderable) {
        this._returnActiveBatches();
    }
    buildStart() {
        this._returnActiveBatches();
    }
    destroy() {
        this._returnActiveBatches();
        this.renderer = null;
    }
    _returnActiveBatches() {
        const activeBatchableSpineSlots = this.activeBatchableSpineSlots;
        for (let i = 0; i < activeBatchableSpineSlots.length; i++) {
            BigPool.return(activeBatchableSpineSlots[i]);
        }
        // TODO this can be optimised
        activeBatchableSpineSlots.length = 0;
    }
}
extensions.add(SpinePipe);
