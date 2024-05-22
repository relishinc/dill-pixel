import { Spine } from './Spine';
import { Slot } from '../spine-core';
import { Batch, BatchableObject, Batcher, IndexBufferArray, Texture } from 'pixi.js';

export declare class BatchableSpineSlot implements BatchableObject {
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
    roundPixels: 0 | 1;
    get blendMode(): import('pixi.js').BLEND_MODES;
    reset(): void;
    setSlot(slot: Slot): void;
    packIndex(indexBuffer: IndexBufferArray, index: number, indicesOffset: number): void;
    packAttributes(float32View: Float32Array, uint32View: Uint32Array, index: number, textureId: number): void;
}
//# sourceMappingURL=BatchableSpineSlot.d.ts.map