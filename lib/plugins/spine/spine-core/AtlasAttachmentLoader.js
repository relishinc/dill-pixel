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
import { BoundingBoxAttachment, ClippingAttachment, MeshAttachment, PathAttachment, PointAttachment, RegionAttachment, } from './attachments';
/** An {@link AttachmentLoader} that configures attachments using texture regions from an {@link TextureAtlas}.
 *
 * See [Loading skeleton data](http://esotericsoftware.com/spine-loading-skeleton-data#JSON-and-binary-data) in the
 * Spine Runtimes Guide. */
export class AtlasAttachmentLoader {
    atlas;
    constructor(atlas) {
        this.atlas = atlas;
    }
    newRegionAttachment(skin, name, path, sequence) {
        const attachment = new RegionAttachment(name, path);
        if (sequence != null) {
            this.loadSequence(name, path, sequence);
        }
        else {
            const region = this.atlas.findRegion(path);
            if (!region)
                throw new Error('Region not found in atlas: ' + path + ' (region attachment: ' + name + ')');
            attachment.region = region;
        }
        return attachment;
    }
    newMeshAttachment(skin, name, path, sequence) {
        const attachment = new MeshAttachment(name, path);
        if (sequence != null) {
            this.loadSequence(name, path, sequence);
        }
        else {
            const region = this.atlas.findRegion(path);
            if (!region)
                throw new Error('Region not found in atlas: ' + path + ' (mesh attachment: ' + name + ')');
            attachment.region = region;
        }
        return attachment;
    }
    newBoundingBoxAttachment(skin, name) {
        return new BoundingBoxAttachment(name);
    }
    newPathAttachment(skin, name) {
        return new PathAttachment(name);
    }
    newPointAttachment(skin, name) {
        return new PointAttachment(name);
    }
    newClippingAttachment(skin, name) {
        return new ClippingAttachment(name);
    }
    loadSequence(name, basePath, sequence) {
        const regions = sequence.regions;
        for (let i = 0, n = regions.length; i < n; i++) {
            const path = sequence.getPath(basePath, i);
            const region = this.atlas.findRegion(path);
            if (region == null)
                throw new Error('Region not found in atlas: ' + path + ' (sequence: ' + name + ')');
            regions[i] = region;
        }
    }
}