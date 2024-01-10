import { Spine } from 'pixi-spine';
import { Assets } from 'pixi.js';
import { resolvePointLike } from '../utils';
export class Make {
    static spine(settings) {
        const spineData = Assets.get(settings.name).spineData;
        const spine = new Spine(spineData);
        spine.skeleton.setToSetupPose();
        spine.update(0);
        spine.autoUpdate = settings.autoUpdate === true;
        const { visible, alpha, position, scale } = settings;
        if (alpha !== undefined) {
            spine.alpha = alpha;
        }
        if (position !== undefined) {
            const resolvedPosition = resolvePointLike(position);
            spine.position.set(resolvedPosition.x, resolvedPosition.y);
        }
        if (scale !== undefined) {
            const resolvedScale = resolvePointLike(scale);
            spine.scale.set(resolvedScale.x, resolvedScale.y);
        }
        spine.visible = visible !== false;
        return spine;
    }
}
//# sourceMappingURL=Make.js.map