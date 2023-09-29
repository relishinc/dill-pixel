import { Dictionary } from 'typescript-collections';
import * as MathUtils from '../utils/MathUtils';
export class AudioCollection {
    constructor() {
        this._tracks = new Dictionary();
        this._volume = 1;
    }
    get volume() {
        return this._volume;
    }
    set volume(pValue) {
        this._volume = MathUtils.clamp(pValue, 0, 1);
    }
    get tracks() {
        return this._tracks;
    }
}
//# sourceMappingURL=AudioCollection.js.map