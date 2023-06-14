import * as AudioCategory from "./AudioCategory";

export class AudioToken {
    public id: string;
    public volume: number;
    public loop: boolean;
    public category: string;

    constructor(pId: string, pVolume: number = 1, pLoop: boolean = false,
                pCategory: string = AudioCategory.DEFAULT) {
        this.id = pId;
        this.volume = pVolume;
        this.loop = pLoop;
        this.category = pCategory;
    }
}
