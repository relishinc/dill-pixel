import { Slot } from '../Slot';
import { TextureRegion } from '../Texture';
import { HasTextureRegion } from './HasTextureRegion';

export declare class Sequence {
    private static _nextID;
    id: number;
    regions: TextureRegion[];
    start: number;
    digits: number;
    /** The index of the region to show for the setup pose. */
    setupIndex: number;
    private static nextID;
    constructor(count: number);
    copy(): Sequence;
    apply(slot: Slot, attachment: HasTextureRegion): void;
    getPath(basePath: string, index: number): string;
}
export declare enum SequenceMode {
    hold = 0,
    once = 1,
    loop = 2,
    pingpong = 3,
    onceReverse = 4,
    loopReverse = 5,
    pingpongReverse = 6
}
export declare const SequenceModeValues: SequenceMode[];
//# sourceMappingURL=Sequence.d.ts.map