import { Bounds, Container, ContainerOptions, DestroyOptions, PointData, View } from 'pixi.js';
import { ISpineDebugRenderer } from './SpineDebugRenderer';
import { AnimationState, Bone, Skeleton, SkeletonBounds, SkeletonData, TrackEntry } from '../spine-core';

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
    buildId: number;
    readonly renderPipeId = "spine";
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
    update(dt: number): void;
    setBonePosition(bone: string | Bone, position: PointData): void;
    getBonePosition(bone: string | Bone, outPos?: PointData): PointData | undefined;
    updateState(dt: number): void;
    onViewUpdate(): void;
    updateBounds(): void;
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
    protected internalUpdate(_deltaFrame: any, deltaSeconds?: number): void;
}
//# sourceMappingURL=Spine.d.ts.map