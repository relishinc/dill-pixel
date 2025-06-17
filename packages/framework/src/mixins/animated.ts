import { gsap } from 'gsap';
import { Signal } from '../signals';
import type { Constructor } from '../utils';

/**
 * Extended GSAP animation configuration interface.
 */
export interface GSAPAnimationConfigExtended extends gsap.TweenVars {}

/**
 * Type for GSAP entity.
 */
type GSAPEntity = gsap.core.Tween | gsap.core.Timeline;

/**
 * Interface for animated entities.
 */
export interface IAnimated {
  onAnimationStart: Signal<(entity: GSAPEntity) => void>;
  onAnimationUpdate: Signal<(entity: GSAPEntity) => void>;
  onAnimationComplete: Signal<(entity: GSAPEntity) => void>;

  animate(animationProps: GSAPAnimationConfigExtended, instance?: any): gsap.core.Tween;

  animateFrom(animationProps: GSAPAnimationConfigExtended, instance?: any): gsap.core.Tween;

  animateFromTo(
    fromProps: GSAPAnimationConfigExtended,
    toProps: GSAPAnimationConfigExtended,
    instance?: any,
  ): gsap.core.Tween;

  animateSequence(sequences: GSAPAnimationConfigExtended[], instance?: any): gsap.core.Timeline;

  pauseAnimations(): void;

  resumeAnimations(): void;

  destroyAnimations(): void;

  reverseAnimation(): void;

  isAnimationPlaying(): boolean;

  //utility
  shake(config?: { duration?: number; intensity?: number; times?: number }, instance?: any): gsap.core.Tween;

  pulse(config?: { duration?: number; intensity?: number; times?: number }, instance?: any): gsap.core.Tween;

  bob(config?: { duration?: number; intensity?: number }, instance?: any): gsap.core.Tween;
}

/**
 * Animated mixin function.
 * @param Base - Base class to extend.
 * @returns Class that extends the base class and implements IAnimated.
 */
export function Animated<TBase extends Constructor>(Base: TBase): TBase & Constructor<IAnimated> {
  return class extends Base implements IAnimated {
    // signals for animation events
    onAnimationStart = new Signal<(entity: GSAPEntity) => void>();
    onAnimationUpdate = new Signal<(entity: GSAPEntity) => void>();
    onAnimationComplete = new Signal<(entity: GSAPEntity) => void>();

    // store active tweens / timelines
    _activeTweens: gsap.core.Tween[] = [];
    _activeTimeline?: gsap.core.Timeline;

    /**
     * Animate method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
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

    /**
     * Animate from method.
     * @param animationProps - Animation properties.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    public animateFrom(animationProps: GSAPAnimationConfigExtended, instance: any = this) {
      const tween = gsap.from(instance, {
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

    /**
     * Animate sequence method.
     * @param sequences - Array of animation sequences.
     * @param instance - Instance to animate.
     * @returns GSAP Timeline instance.
     */
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

    /**
     * Clear animations method.
     */
    public destroyAnimations() {
      this._activeTweens.forEach((tween) => tween.kill());
      this._activeTweens = [];
      this._activeTimeline?.clear();
      this._activeTimeline = undefined;
    }

    /**
     * Pause animations method.
     */
    public pauseAnimations() {
      this._activeTweens.forEach((tween) => tween.pause());
      this._activeTimeline?.pause();
    }

    /**
     * Resume animations method.
     */
    public resumeAnimations() {
      this._activeTweens.forEach((tween) => tween.play());
      this._activeTimeline?.play();
    }

    /**
     * Animate from-to method.
     * @param fromProps - Animation properties for the start state.
     * @param toProps - Animation properties for the end state.
     * @param instance - Instance to animate.
     * @returns GSAP Tween instance.
     */
    public animateFromTo(
      fromProps: GSAPAnimationConfigExtended,
      toProps: GSAPAnimationConfigExtended,
      instance: any = this,
    ) {
      const tween = gsap.fromTo(
        instance,
        {
          ...fromProps,
        },
        {
          ...toProps,
        },
      );
      tween.eventCallback('onStart', () => {
        this._onAnimationStart(tween);
      });
      tween.eventCallback('onUpdate', () => {
        this._onAnimationUpdate(tween);
      });
      tween.eventCallback('onComplete', () => {
        this._onAnimationComplete(tween);
        this._activeTweens = this._activeTweens.filter((t) => t !== tween);
      });

      this._activeTweens.push(tween);
      return tween;
    }

    /**
     * Reverses animations.
     */
    public reverseAnimation(): void {
      this._activeTweens.forEach((tween) => tween.reverse());
      this._activeTimeline?.reverse();
    }

    public isAnimationPlaying(): boolean {
      return (
        this._activeTweens?.some((tween) => !tween.paused()) ||
        (this._activeTimeline && !this._activeTimeline.paused()) ||
        false
      );
    }

    // utility animations
    /**
     * Shake animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    public shake(
      config: {
        duration?: number;
        intensity?: number;
        times?: number;
      } = {},
      instance: any = this,
    ): gsap.core.Tween {
      const { duration = 0.05, intensity = 12, times = 41 } = config;
      const obj = { x: instance.x, y: instance.y };
      const origX = obj.x;

      const repeat = times % 2 === 0 ? times + 1 : times;

      const tween = gsap.to(instance, {
        x: origX + gsap.utils.random(-Math.max(intensity, 2), Math.max(intensity, 2)),
        repeat,
        yoyo: true,
        duration: duration,
      });
      this._activeTweens.push(tween);
      return tween;
    }

    /**
     * Pulse animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    public pulse(
      config: {
        duration?: number;
        intensity?: number;
        times?: number;
      } = {},
      instance: any = this,
    ): gsap.core.Tween {
      const { duration = 0.5, intensity = 1.2, times = 1 } = config;
      const repeat = times * 2 - 1;
      const tween = gsap.to(instance?.scale, {
        x: intensity,
        y: intensity,
        repeat,
        yoyo: true,
        duration: duration,
      });
      this._activeTweens.push(tween);
      return tween;
    }

    /**
     * Bob animation.
     * @param config - Configuration object.
     * @param instance
     * @returns GSAP Tween instance.
     */
    public bob(
      config: {
        duration?: number;
        intensity?: number;
      } = {},
      instance: any = this,
    ): gsap.core.Tween {
      const { duration = 0.5, intensity = 10 } = config;
      const tween = gsap.to(instance, {
        y: `-=${intensity}`,
        repeat: -1,
        yoyo: true,
        duration: duration,
      });
      this._activeTweens.push(tween);
      return tween;
    }

    /**
     * Private method for handling animation start event.
     * @param animationEntity - Animation entity.
     */
    private _onAnimationStart(animationEntity: GSAPEntity | undefined) {
      this.onAnimationStart.emit(animationEntity as GSAPEntity);
    }

    /**
     * Private method for handling animation update event.
     * @param animationEntity - Animation entity.
     */
    private _onAnimationUpdate(animationEntity: GSAPEntity | undefined) {
      this.onAnimationUpdate.emit(animationEntity as GSAPEntity);
    }

    /**
     * Private method for handling animation complete event.
     * @param animationEntity - Animation entity.
     */
    private _onAnimationComplete(animationEntity: GSAPEntity | undefined) {
      this.onAnimationComplete.emit(animationEntity as GSAPEntity);
    }
  } as unknown as TBase & Constructor<IAnimated>;
}
