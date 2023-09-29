import * as AudioCategory from "./AudioCategory";
export class AudioToken {
    constructor(pId, pVolume = 1, pLoop = false, pCategory = AudioCategory.DEFAULT) {
        this.id = pId;
        this.volume = pVolume;
        this.loop = pLoop;
        this.category = pCategory;
    }
}
//# sourceMappingURL=AudioToken.js.map