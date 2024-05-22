import { Spine } from './Spine';
import { Batch, BatchableObject, Batcher, IndexBufferArray, Texture } from 'pixi.js';
import { SkeletonClipping, Slot } from '../spine-core';

export declare class BatchableClippedSpineSlot implements BatchableObject {
    indexStart: number;
    textureId: number;
    texture: Texture;
    location: number;
    batcher: Batcher;
    batch: Batch;
    renderable: Spine;
    slot: Slot;
    indexSize: number;
    vertexSize: number;
    clippedVertices: number[];
    clippedTriangles: number[];
    roundPixels: 0 | 1;
    get blendMode(): import('pixi.js').BLEND_MODES;
    reset(): void;
    setClipper(clipper: SkeletonClipping): void;
    packIndex(indexBuffer: IndexBufferArray, index: number, indicesOffset: number): void;
    packAttributes(float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number): void;
}
//# sourceMappingURL=BatchableClippedSpineSlot.d.ts.map