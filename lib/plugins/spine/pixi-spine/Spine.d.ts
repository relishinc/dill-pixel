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
import { Bounds, Container, ContainerOptions, DestroyOptions, PointData, View } from 'pixi.js';
import { AnimationState, Bone, Skeleton, SkeletonBounds, SkeletonData, TrackEntry } from '../spine-core';
import { ISpineDebugRenderer } from './SpineDebugRenderer';
export type SpineFromOptions = {
    skeleton: string;
    atlas: string;
    scale?: number;
};
export interface SpineOptions extends ContainerOptions {
    skeletonData: SkeletonData;
    autoUpdate?: boolean;
}
export interface SpineEvents {
    complete: [trackEntry: TrackEntry];
    dispose: [trackEntry: TrackEntry];
    end: [trackEntry: TrackEntry];
    event: [trackEntry: TrackEntry, event: Event];
    interrupt: [trackEntry: TrackEntry];
    start: [trackEntry: TrackEntry];
}
export declare class Spine extends Container implements View {
    batched: boolean;
    readonly renderPipeId = "spine";
    buildId: number;
    _didSpineUpdate: boolean;
    _boundsDirty: boolean;
    skeleton: Skeleton;
    state: AnimationState;
    skeletonBounds: SkeletonBounds;
    private autoUpdateWarned;
    constructor(options: SpineOptions | SkeletonData);
    _roundPixels: 0 | 1;
    /** Whether or not to round the x/y position of the sprite. */
    get roundPixels(): boolean;
    set roundPixels(value: boolean);
    private _bounds;
    get bounds(): Bounds;
    private _debug?;
    get debug(): ISpineDebugRenderer | undefined;
    set debug(value: ISpineDebugRenderer | undefined);
    private _autoUpdate;
    get autoUpdate(): boolean;
    set autoUpdate(value: boolean);
    static from({ skeleton, atlas, scale }: SpineFromOptions): Spine;
    addBounds(bounds: Bounds): void;
    containsPoint(_point: PointData): boolean;
    /**
     * Destroys this sprite renderable and optionally its texture.
     * @param options - Options parameter. A boolean will act as if all options
     *  have been set to that value
     * @param {boolean} [options.texture=false] - Should it destroy the current texture of the renderable as well
     * @param {boolean} [options.textureSource=false] - Should it destroy the textureSource of the renderable as well
     */
    destroy(options?: DestroyOptions): void;
    update(dt: number): void;
    setBonePosition(bone: string | Bone, position: PointData): void;
    getBonePosition(bone: string | Bone, outPos?: PointData): PointData | undefined;
    updateState(dt: number): void;
    onViewUpdate(): void;
    updateBounds(): void;
    protected internalUpdate(_deltaFrame: any, deltaSeconds?: number): void;
}
