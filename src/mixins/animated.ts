import { gsap } from 'gsap';
import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { Constructor } from '../utils';

export interface GSAPAnimationConfigExtended extends gsap.TweenVars {}

type GSAPEntity = gsap.core.Tween | gsap.core.Timeline;

export interface IAnimated {
  onAnimationStart: Signal<(entity: GSAPEntity) => void>;
  onAnimationUpdate: Signal<(entity: GSAPEntity) => void>;
  onAnimationComplete: Signal<(entity: GSAPEntity) => void>;

  animate(animationProps: GSAPAnimationConfigExtended, instance?: any): gsap.core.Tween;

  animateSequence(sequences: GSAPAnimationConfigExtended[], instance?: any): gsap.core.Timeline;

  pauseAnimations(): void;

  resumeAnimations(): void;

  clearAnimations(): void;
}

export function Animated<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IAnimated> {
  return class extends Base implements IAnimated {
    // signals for animation events
    onAnimationStart = new Signal<(entity: GSAPEntity) => void>();
    onAnimationUpdate = new Signal<(entity: GSAPEntity) => void>();
    onAnimationComplete = new Signal<(entity: GSAPEntity) => void>();

    // store active tweens / timelines
    _activeTweens: gsap.core.Tween[] = [];
    _activeTimeline?: gsap.core.Timeline;

    public animate(animationProps: GSAPAnimationConfigExtended, instance: any = this) {
      const tween = gsap.to(instance, {
        ...animationProps,
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

    public animateSequence(sequences: GSAPAnimationConfigExtended[], instance: any = this): gsap.core.Timeline {
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
        this._activeTimeline?.to(instance, sequence);
      });

      return this._activeTimeline;
    }

    public clearAnimations() {
      this._activeTweens.forEach((tween) => tween.kill());
      this._activeTweens = [];
      this._activeTimeline?.clear();
      this._activeTimeline = undefined;
    }

    // some animation utility methods
    public pauseAnimations() {
      this._activeTweens.forEach((tween) => tween.pause());
      this._activeTimeline?.pause();
    }

    public resumeAnimations() {
      this._activeTweens.forEach((tween) => tween.play());
      this._activeTimeline?.play();
    }

    private _onAnimationStart(animationEntity: GSAPEntity | undefined) {
      this.onAnimationStart.emit(animationEntity as GSAPEntity);
    }

    private _onAnimationUpdate(animationEntity: GSAPEntity | undefined) {
      this.onAnimationUpdate.emit(animationEntity as GSAPEntity);
    }

    private _onAnimationComplete(animationEntity: GSAPEntity | undefined) {
      this.onAnimationComplete.emit(animationEntity as GSAPEntity);
    }
  } as unknown as TBase & Constructor<IAnimated>;
}


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
