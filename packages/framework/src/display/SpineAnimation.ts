import { type AnimationStateListener, type Event, type TrackEntry } from '@esotericsoftware/spine-core';
import { Application } from '../core/Application';
import type { SpineProps } from '../mixins';
import { Factory, WithSignals } from '../mixins';
import { Signal } from '../signals';
import { bindAllMethods, Spine } from '../utils';

const _SpineAnimation = WithSignals(Factory());

export interface ISpineAnimation<ANames extends string = string, A extends Application = Application>
  extends InstanceType<typeof _SpineAnimation> {
  readonly spine: Spine;
  readonly animationNames: ANames[];
  readonly app: A;
  readonly onAnimationComplete: Signal<(entry: TrackEntry) => void>;
  readonly onAnimationStart: Signal<(entry: TrackEntry) => void>;
  readonly onAnimationInterrupt: Signal<(entry: TrackEntry) => void>;
  readonly onAnimationDispose: Signal<(entry: TrackEntry) => void>;
  readonly onAnimationEnd: Signal<(entry: TrackEntry) => void>;
  readonly onAnimationEvent: Signal<(entry: TrackEntry, event: Event) => void>;
  readonly onPaused: Signal<(entry: TrackEntry | null) => void>;
  readonly onResumed: Signal<(entry: TrackEntry | null) => void>;
  setAnimation(name: ANames, loop?: boolean, tracklndex?: number): void;
  getCurrentAnimation(tracklndex?: number): ANames;
  pause(): void;
  resume(): void;
  togglePause(): void;
}

export class SpineAnimation<
  ANames extends string = string,
  A extends Application = Application,
> extends _SpineAnimation {
  spine: Spine;
  paused: boolean;

  onAnimationComplete: Signal<(entry: TrackEntry) => void> = new Signal();
  onAnimationStart: Signal<(entry: TrackEntry) => void> = new Signal();
  onAnimationInterrupt: Signal<(entry: TrackEntry) => void> = new Signal();
  onAnimationDispose: Signal<(entry: TrackEntry) => void> = new Signal();
  onAnimationEnd: Signal<(entry: TrackEntry) => void> = new Signal();
  onAnimationEvent: Signal<(entry: TrackEntry, event: Event) => void> = new Signal();

  onPaused: Signal<(entry: TrackEntry | null) => void> = new Signal();
  onResumed: Signal<(entry: TrackEntry | null) => void> = new Signal();

  protected _stateListener: AnimationStateListener;

  get app(): A {
    return Application.getInstance() as A;
  }

  get animationNames(): ANames[] {
    return this.spine.state.data.skeletonData.animations.map((a) => a.name) as ANames[];
  }

  get currentEntry() {
    return this.spine.state.getCurrent(0);
  }

  get elapsedAnimationTime() {
    if (this.currentEntry) {
      return this.currentEntry.trackTime;
    }
    return -1;
  }

  public constructor(props?: Partial<SpineProps>) {
    super();
    bindAllMethods(this);
    let data = props?.data;
    let spineData: { skeleton: string; atlas: string } | string = '';
    if (typeof data === 'string') {
      // get the spine data from cache
      // check if '.json' is the last part of the asset string, and add it if not
      let ext = data.slice(-5);
      if (ext !== '.json' && ext !== '.skel') {
        ext = '.json';
      } else {
        data = data.substring(0, data.length - 5);
      }
      spineData = { skeleton: data + ext, atlas: data + '.atlas' };
    }
    this.spine = (window as any).Spine.from(spineData);
    this.add.existing(this.spine);

    if (props) {
      if (props.autoUpdate !== undefined) this.spine.autoUpdate = props.autoUpdate;
      if (props.animationName) this.setAnimation(props.animationName as ANames, props.loop, props.trackIndex ?? 0);
    }

    this.addSignalConnection(this.app.actions('toggle_pause').connect(this.togglePause));

    if (props?.paused) {
      this.pause();
    }

    this._stateListener = {
      start: this._handleAnimationStart,
      interrupt: this._handleAnimationInterrupt,
      dispose: this._handleAnimationDispose,
      end: this._handleAnimationEnd,
      event: this._handleAnimationEvent,
      complete: this._handleAnimationComplete,
    };

    this.spine.state.addListener(this._stateListener);
  }

  destroy() {
    this.spine.state.removeListener(this._stateListener);
    super.destroy();
  }

  getCurrentAnimation(trackIndex: number = 0): ANames {
    return (this.spine.state.getCurrent(trackIndex)?.animation?.name as ANames) || ('' as ANames);
  }

  setAnimation(name: ANames, loop = false, tracklndex: number = 0) {
    this.spine.state.setAnimation(tracklndex, name, loop);
  }

  pause() {
    this.paused = true;
    this.spine.autoUpdate = false;

    if (this.currentEntry) {
      this.currentEntry.timeScale = 0;
    }
    this.onPaused.emit(this.currentEntry);
  }

  resume() {
    this.paused = false;
    this.spine.autoUpdate = true;
    if (this.currentEntry) {
      this.currentEntry.timeScale = 1;
    }
    this.onResumed.emit(this.currentEntry);
  }

  togglePause() {
    if (this.paused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  // protected methods
  protected _handleAnimationComplete(entry: TrackEntry) {
    this.onAnimationComplete.emit(entry);
  }

  protected _handleAnimationStart(entry: TrackEntry) {
    this.onAnimationStart.emit(entry);
  }

  protected _handleAnimationInterrupt(entry: TrackEntry) {
    this.onAnimationInterrupt.emit(entry);
  }

  protected _handleAnimationDispose(entry: TrackEntry) {
    this.onAnimationDispose.emit(entry);
  }

  protected _handleAnimationEnd(entry: TrackEntry) {
    this.onAnimationEnd.emit(entry);
  }

  protected _handleAnimationEvent(entry: TrackEntry, event: Event) {
    this.onAnimationEvent.emit(entry, event);
  }
}
