import { FactoryContainer } from '../mixins/factory';
import type { SpineProps } from '../mixins/factory/props';
import { WithSignals } from '../mixins';
import type { Spine } from '../utils';

const _SpineAnimation = WithSignals(FactoryContainer());

export interface ISpineAnimation extends InstanceType<typeof _SpineAnimation> {
  spine: Spine;
  animationNames: string[];

  setAnimation(name: string, loop?: boolean, tracklndex?: number): void;

  getCurrentAnimation(tracklndex?: number): string;
}

export class SpineAnimation extends _SpineAnimation {
  spine: Spine;

  public constructor(props?: Partial<SpineProps>) {
    super();
    let data = props?.data;
    if (typeof data === 'string') {
      // get the spine data from cache
      // check if '.json' is the last part of the asset string, and add it if not
      if (data.slice(-5) !== '.json') {
        data = { skeleton: data + '.json', atlas: data + '.atlas' };
      }
    }
    this.spine = (window as any).Spine.from(data);
    this.add.existing(this.spine);
    if (props) {
      if (props.autoUpdate !== undefined) this.spine.autoUpdate = props.autoUpdate;
      if (props.animationName) this.setAnimation(props.animationName, props.loop, props.trackIndex ?? 0);
    }
  }

  get animationNames() {
    return this.spine.state.data.skeletonData.animations.map((a) => a.name);
  }

  getCurrentAnimation(trackIndex: number = 0): string {
    return this.spine.state.getCurrent(trackIndex)?.animation?.name || '';
  }

  setAnimation(name: string, loop = false, tracklndex: number = 0) {
    this.spine.state.setAnimation(tracklndex, name, loop);
  }
}
