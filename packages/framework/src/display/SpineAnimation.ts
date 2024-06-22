import type { SpineProps } from '../mixins';
import { Factory, WithSignals } from '../mixins';
import { bindAllMethods, Spine } from '../utils';
import { Application } from '../Application';
import { IApplication } from '../core';

const _SpineAnimation = WithSignals(Factory());

export interface ISpineAnimation extends InstanceType<typeof _SpineAnimation> {
  spine: Spine;
  animationNames: string[];

  setAnimation(name: string, loop?: boolean, tracklndex?: number): void;

  getCurrentAnimation(tracklndex?: number): string;
}

export class SpineAnimation extends _SpineAnimation {
  spine: Spine;
  paused: boolean;

  public constructor(props?: Partial<SpineProps>) {
    super();
    bindAllMethods(this);
    let data = props?.data;
    this.paused = props?.paused === true;
    if (typeof data === 'string') {
      // get the spine data from cache
      // check if '.json' is the last part of the asset string, and add it if not
      let ext = data.slice(-5);
      if (ext !== '.json' && ext !== '.skel') {
        ext = '.json';
      } else {
        data = data.substring(0, data.length - 5);
      }
      data = { skeleton: data + ext, atlas: data + '.atlas' };
    }
    this.spine = (window as any).Spine.from(data);
    this.add.existing(this.spine);
    if (props) {
      if (props.autoUpdate !== undefined) this.spine.autoUpdate = props.autoUpdate;
      if (props.animationName) this.setAnimation(props.animationName, props.loop, props.trackIndex ?? 0);
    }

    this.addSignalConnection(this.app.actions('toggle_pause').connect(this.togglePause));
  }

  get app(): IApplication {
    return Application.getInstance();
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

  protected togglePause() {
    this.paused = !this.paused;
    this.spine.autoUpdate = !this.paused;
  }
}
