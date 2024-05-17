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
import { MeshAttachment, RegionAttachment } from '../spine-core';
const QUAD_TRIANGLES = [0, 1, 2, 2, 3, 0];
export class BatchableSpineSlot {
    indexStart;
    textureId;
    texture;
    location;
    batcher;
    batch;
    indexSize;
    vertexSize;
    roundPixels;
    renderable;
    slot;
    get blendMode() {
        return this.renderable.groupBlendMode;
    }
    packIndex(indexBuffer, index, indicesOffset) {
        const indices = this.slot.getAttachment().triangles ?? QUAD_TRIANGLES;
        for (let i = 0; i < indices.length; i++) {
            indexBuffer[index++] = indices[i] + indicesOffset;
        }
    }
    packAttributes(float32View, uint32View, index, textureId) {
        const slot = this.slot;
        const attachment = slot.getAttachment();
        if (attachment instanceof MeshAttachment) {
            attachment.computeWorldVertices(slot, 0, attachment.worldVerticesLength, float32View, index, 6);
        }
        else if (attachment instanceof RegionAttachment) {
            attachment.computeWorldVertices(slot, float32View, index, 6);
        }
        const vertexSize = this.vertexSize;
        const parentColor = this.renderable.groupColor; // BGR
        const parentAlpha = this.renderable.groupAlpha;
        const slotColor = slot.color;
        let abgr;
        const mixedA = slotColor.a * parentAlpha * 255;
        if (parentColor !== 0xffffff) {
            const parentB = (parentColor >> 16) & 0xff;
            const parentG = (parentColor >> 8) & 0xff;
            const parentR = parentColor & 0xff;
            const mixedR = slotColor.r * parentR * 255;
            const mixedG = slotColor.g * parentG * 255;
            const mixedB = slotColor.b * parentB * 255;
            abgr = (mixedA << 24) | (mixedB << 16) | (mixedG << 8) | mixedR;
        }
        else {
            abgr = (mixedA << 24) | ((slotColor.b * 255) << 16) | ((slotColor.g * 255) << 8) | (slotColor.r * 255);
        }
        const uvs = attachment.uvs;
        const matrix = this.renderable.groupTransform;
        const a = matrix.a;
        const b = matrix.b;
        const c = matrix.c;
        const d = matrix.d;
        const tx = matrix.tx;
        const ty = matrix.ty;
        const textureIdAndRound = (textureId << 16) | (this.roundPixels & 0xffff);
        for (let i = 0; i < vertexSize; i++) {
            // index++;
            // float32View[index++] *= -1;
            const x = float32View[index];
            const y = -float32View[index + 1];
            float32View[index++] = a * x + c * y + tx;
            float32View[index++] = b * x + d * y + ty;
            // uv
            float32View[index++] = uvs[i * 2];
            float32View[index++] = uvs[i * 2 + 1];
            // color
            uint32View[index++] = abgr;
            // texture id
            uint32View[index++] = textureIdAndRound;
        }
    }
    reset() {
        this.renderable = null;
        this.texture = null;
        this.batcher = null;
        this.batch = null;
    }
    setSlot(slot) {
        this.slot = slot;
        const attachment = slot.getAttachment();
        if (attachment instanceof RegionAttachment) {
            this.vertexSize = 4;
            this.indexSize = 6;
        }
        else if (attachment instanceof MeshAttachment) {
            this.vertexSize = attachment.worldVerticesLength / 2;
            this.indexSize = attachment.triangles.length;
        }
    }
}
