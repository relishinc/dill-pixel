import { gsap } from 'gsap';
import { Signal } from '../../signals';

export interface GSAPAnimationConfigExtended extends gsap.TweenVars {}

type GSAPEntity = gsap.core.Tween | gsap.core.Timeline;
type Constructor<T> = new (...args: any[]) => T;

export const Animated = <TBase extends Constructor<any>>(Base: TBase) => {
  return class extends Base {
    // signals for animation events
    public onAnimationStart = new Signal<(entity: GSAPEntity) => void>();
    public onAnimationUpdate = new Signal<(entity: GSAPEntity) => void>();
    public onAnimationComplete = new Signal<(entity: GSAPEntity) => void>();

    // store active tweens / timelines
    public _activeTweens: gsap.core.Tween[] = [];
    public _activeTimeline?: gsap.core.Timeline;

    animateTo(animationConfig: GSAPAnimationConfigExtended) {
      const tween = gsap.to(this, {
        ...animationConfig,
        onStart: () => {
          this._onAnimationStart(tween);
        },
        onUpdate: () => {
          this._onAnimationUpdate(tween);
        },
        onComplete: () => {
          this._onAnimationComplete(tween);
          this._activeTweens = this._activeTweens.filter((t) => t !== tween);
        },
      });
      this._activeTweens.push(tween);
      return tween;
    }

    createAnimationSequence(sequences: GSAPAnimationConfigExtended[]): gsap.core.Timeline {
      if (!this._activeTimeline) {
        this._activeTimeline = gsap.timeline({
          onStart: () => this._onAnimationStart(this._activeTimeline),
          onUpdate: () => this._onAnimationUpdate(this._activeTimeline),
          onComplete: () => {
            this._onAnimationComplete(this._activeTimeline);
            this._activeTimeline = undefined;
          },
        });
      }

      sequences.forEach((sequence) => {
        this._activeTimeline?.to(this, sequence);
      });

      return this._activeTimeline;
    }

    playAnimation() {
      this._activeTimeline?.play();
    }

    pauseAnimation() {
      this._activeTimeline?.pause();
    }

    resumeAnimation() {
      this._activeTimeline?.resume();
    }

    reverseAnimation() {
      this._activeTimeline?.reverse();
    }

    restartAnimation() {
      this._activeTimeline?.restart();
    }

    clearAnimations() {
      this._activeTweens.forEach((tween) => tween.kill());
      this._activeTweens = [];
      this._activeTimeline?.clear();
      this._activeTimeline = undefined;
    }

    _onAnimationStart(animationEntity: GSAPEntity | undefined) {
      this.onAnimationStart.emit(animationEntity as GSAPEntity);
    }

    _onAnimationUpdate(animationEntity: GSAPEntity | undefined) {
      this.onAnimationUpdate.emit(animationEntity as GSAPEntity);
    }

    _onAnimationComplete(animationEntity: GSAPEntity | undefined) {
      this.onAnimationComplete.emit(animationEntity as GSAPEntity);
    }
  };
};

// Example usage below
/*
const AnimatedContainer = Animated(Container);
class MyAnimatedClass extends AnimatedContainer{
  constructor() {
    super();
  }
  init(){
    this.animateTo({x: 100, y: 100, duration: 1});
  }
}
*/
