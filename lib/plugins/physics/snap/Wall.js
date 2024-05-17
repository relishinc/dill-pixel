import { Texture } from 'pixi.js';
import { Solid as SnapSolid } from './Solid';
const defaults = {
    width: 10,
    height: 10,
    debugColor: 0x00ffff,
};
export class Wall extends SnapSolid {
    type = 'Wall';
    constructor(config = {}) {
        super({ ...defaults, ...config });
        this.initialize();
    }
    initialize() {
        this.view = this.add.sprite({
            asset: Texture.WHITE,
            width: this.config.width,
            height: this.config.height,
            tint: this.config.debugColor,
            anchor: 0.5,
        });
    }
}
