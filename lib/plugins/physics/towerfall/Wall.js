import { Texture } from 'pixi.js';
import { Solid as TowerFallSolid } from './Solid';
const defaults = {
    width: 10,
    height: 10,
    // debug neon blue
    debugColor: 0x00ffff,
};
export class Wall extends TowerFallSolid {
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
