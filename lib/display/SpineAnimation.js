import { FactoryContainer } from '../mixins/factory';
import { WithSignals } from '../mixins/signals';
const _SpineAnimation = WithSignals(FactoryContainer());
export class SpineAnimation extends _SpineAnimation {
    spine;
    constructor(props) {
        super();
        let data = props?.data;
        if (typeof data === 'string') {
            // get the spine data from cache
            // check if '.json' is the last part of the asset string, and add it if not
            if (data.slice(-5) !== '.json') {
                data = { skeleton: data + '.json', atlas: data + '.atlas' };
            }
        }
        this.spine = window.Spine.from(data);
        this.add.existing(this.spine);
        if (props) {
            if (props.autoUpdate !== undefined)
                this.spine.autoUpdate = props.autoUpdate;
            if (props.animationName)
                this.setAnimation(props.animationName, props.loop, props.trackIndex ?? 0);
        }
        // this.spine.position.set(-this.spine.width * 0.5, -this.spine.height * 0.5);
    }
    get animationNames() {
        return this.spine.state.data.skeletonData.animations.map((a) => a.name);
    }
    getCurrentAnimation(trackIndex = 0) {
        return this.spine.state.getCurrent(trackIndex)?.animation?.name || '';
    }
    setAnimation(name, loop = false, tracklndex = 0) {
        this.spine.state.setAnimation(tracklndex, name, loop);
    }
}
