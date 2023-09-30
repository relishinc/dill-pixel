import { Dictionary } from 'typescript-collections';
import { IAudioTrack } from './IAudioTrack';
export declare class AudioCollection {
    private _tracks;
    private _volume;
    constructor();
    get volume(): number;
    set volume(pValue: number);
    get tracks(): Dictionary<string, IAudioTrack>;
}
//# sourceMappingURL=AudioCollection.d.ts.map