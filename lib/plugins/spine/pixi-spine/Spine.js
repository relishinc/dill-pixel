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
import { Assets, Bounds, Cache, Container, Ticker } from 'pixi.js';
import { AnimationState, AnimationStateData, AtlasAttachmentLoader, Skeleton, SkeletonBinary, SkeletonBounds, SkeletonData, SkeletonJson, Vector2, } from '../spine-core';
import { getSkeletonBounds } from './getSkeletonBounds';
const vectorAux = new Vector2();
export class Spine extends Container {
    // Pixi properties
    batched = true;
    renderPipeId = 'spine';
    _roundPixels;
    buildId = 0;
    _didSpineUpdate = false;
    _boundsDirty = true;
    // Spine properties
    skeleton;
    state;
    skeletonBounds;
    _bounds = new Bounds();
    _debug = undefined;
    autoUpdateWarned = false;
    _autoUpdate = true;
    static from({ skeleton, atlas, scale = 1 }) {
        const cacheKey = `${skeleton}-${atlas}`;
        if (Cache.has(cacheKey)) {
            return new Spine(Cache.get(cacheKey));
        }
        const skeletonAsset = Assets.get(skeleton);
        const atlasAsset = Assets.get(atlas);
        const attachmentLoader = new AtlasAttachmentLoader(atlasAsset);
        // eslint-disable-next-line max-len
        const parser = skeletonAsset instanceof Uint8Array ? new SkeletonBinary(attachmentLoader) : new SkeletonJson(attachmentLoader);
        // TODO scale?
        parser.scale = scale;
        console.log({ skeletonAsset });
        const skeletonData = parser.readSkeletonData(skeletonAsset);
        Cache.set(cacheKey, skeletonData);
        return new Spine({
            skeletonData,
        });
    }
    constructor(options) {
        if (options instanceof SkeletonData) {
            options = {
                skeletonData: options,
            };
        }
        super();
        const skeletonData = options instanceof SkeletonData ? options : options.skeletonData;
        this.skeleton = new Skeleton(skeletonData);
        this.state = new AnimationState(new AnimationStateData(skeletonData));
        this.autoUpdate = options?.autoUpdate ?? true;
    }
    get bounds() {
        if (this._boundsDirty) {
            this.updateBounds();
        }
        return this._bounds;
    }
    /** Whether or not to round the x/y position of the sprite. */
    get roundPixels() {
        return !!this._roundPixels;
    }
    set roundPixels(value) {
        this._roundPixels = value ? 1 : 0;
    }
    get debug() {
        return this._debug;
    }
    set debug(value) {
        if (this._debug) {
            this._debug.unregisterSpine(this);
        }
        if (value) {
            value.registerSpine(this);
        }
        this._debug = value;
    }
    get autoUpdate() {
        return this._autoUpdate;
    }
    set autoUpdate(value) {
        if (value) {
            Ticker.shared.add(this.internalUpdate, this);
            this.autoUpdateWarned = false;
        }
        else {
            Ticker.shared.remove(this.internalUpdate, this);
        }
        this._autoUpdate = value;
    }
    addBounds(bounds) {
        bounds.addBounds(this.bounds);
    }
    // passed local space..
    containsPoint(_point) {
        return false;
    }
    /**
     * Destroys this sprite renderable and optionally its texture.
     * @param options - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
     * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
     */
    destroy(options = false) {
        super.destroy(options);
        Ticker.shared.remove(this.internalUpdate, this);
        this.state.clearListeners();
        this.debug = undefined;
        this.skeleton = null;
        this.state = null;
    }
    update(dt) {
        if (this.autoUpdate && !this.autoUpdateWarned) {
            // eslint-disable-next-line max-len
            console.warn('You are calling update on a Spine instance that has autoUpdate set to true. This is probably not what you want.');
            this.autoUpdateWarned = true;
        }
        this.internalUpdate(0, dt);
    }
    setBonePosition(bone, position) {
        const boneAux = bone;
        if (typeof bone === 'string') {
            bone = this.skeleton.findBone(bone);
        }
        if (!bone)
            throw Error(`Cant set bone position, bone ${String(boneAux)} not found`);
        vectorAux.set(position.x, position.y);
        if (bone.parent) {
            const aux = bone.parent.worldToLocal(vectorAux);
            bone.x = aux.x;
            bone.y = aux.y;
        }
        else {
            bone.x = vectorAux.x;
            bone.y = vectorAux.y;
        }
    }
    getBonePosition(bone, outPos) {
        const boneAux = bone;
        if (typeof bone === 'string') {
            bone = this.skeleton.findBone(bone);
        }
        if (!bone) {
            console.error(`Cant set bone position! Bone ${String(boneAux)} not found`);
            return outPos;
        }
        if (!outPos) {
            outPos = { x: 0, y: 0 };
        }
        outPos.x = bone.worldX;
        outPos.y = bone.worldY;
        return outPos;
    }
    updateState(dt) {
        this.state.update(dt);
        this._boundsDirty = true;
        this.onViewUpdate();
    }
    onViewUpdate() {
        // increment from the 12th bit!
        this._didChangeId += 1 << 12;
        this._didSpineUpdate = true;
        this._didSpineUpdate = true;
        this._boundsDirty = true;
        if (this.didViewUpdate)
            return;
        this.didViewUpdate = true;
        if (this.renderGroup) {
            this.renderGroup.onChildViewUpdate(this);
        }
        this.debug?.renderDebug(this);
    }
    updateBounds() {
        this._boundsDirty = false;
        this.skeletonBounds ||= new SkeletonBounds();
        const skeletonBounds = this.skeletonBounds;
        skeletonBounds.update(this.skeleton, true);
        if (skeletonBounds.minX === Infinity) {
            this.state.apply(this.skeleton);
            // now region bounding attachments..
            getSkeletonBounds(this.skeleton, this._bounds);
        }
        else {
            this._bounds.minX = skeletonBounds.minX;
            this._bounds.minY = skeletonBounds.minY;
            this._bounds.maxX = skeletonBounds.maxX;
            this._bounds.maxY = skeletonBounds.maxY;
        }
    }
    internalUpdate(_deltaFrame, deltaSeconds) {
        // Because reasons, pixi uses deltaFrames at 60fps.
        // We ignore the default deltaFrames and use the deltaSeconds from pixi ticker.
        this.updateState(deltaSeconds ?? Ticker.shared.deltaMS / 1000);
    }
}
