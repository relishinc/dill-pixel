import { Module } from './Module';
export class SpineModule extends Module {
    constructor() {
        super(...arguments);
        this.id = 'SpineModule';
    }
    async initialize(app) {
        await import('@pixi/spine-pixi').then((module) => {
            globalThis.Spine = module.Spine;
        });
    }
}
//# sourceMappingURL=SpineModule.js.map