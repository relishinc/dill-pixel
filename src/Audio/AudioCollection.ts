import { Dictionary } from "typescript-collections";
import * as MathUtils from "../Utils/MathUtils";
import { IAudioTrack } from "./IAudioTrack";

export class AudioCollection {
    private _tracks: Dictionary<string, IAudioTrack>;
    private _volume: number;

    constructor() {
        this._tracks = new Dictionary<string, IAudioTrack>();
        this._volume = 1;
    }

    public get volume(): number {
        return this._volume;
    }

    public set volume(pValue: number) {
        this._volume = MathUtils.clamp(pValue, 0, 1);
    }

    public get tracks(): Dictionary<string, IAudioTrack> {
        return this._tracks;
    }
}
