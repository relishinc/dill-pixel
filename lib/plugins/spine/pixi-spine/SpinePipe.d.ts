import { ExtensionType, Renderer, RenderPipe } from 'pixi.js';
import { Spine } from './Spine';

export declare class SpinePipe implements RenderPipe<Spine> {
    /** @ignore */
    static extension: {
        readonly type: readonly [ExtensionType.WebGLPipes, ExtensionType.WebGPUPipes, ExtensionType.CanvasPipes];
        readonly name: "spine";
    };
    renderer: Renderer;
    private readonly activeBatchableSpineSlots;
    constructor(renderer: Renderer);
    validateRenderable(_renderable: Spine): boolean;
    buildStart(): void;
    addRenderable(spine: Spine): void;
    updateRenderable(_renderable: Spine): void;
    destroyRenderable(_renderable: Spine): void;
    destroy(): void;
    private _returnActiveBatches;
}
//# sourceMappingURL=SpinePipe.d.ts.map