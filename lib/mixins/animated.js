import { gsap } from 'gsap';
import { Signal } from '../signals';
/**
 * Animated mixin function.
 * @param Base - Base class to extend.
 * @returns Class that extends the base class and implements IAnimated.
 */
export function Animated(Base) {
    return class extends Base {
        // signals for animation events
        onAnimationStart = new Signal();
        onAnimationUpdate = new Signal();
        onAnimationComplete = new Signal();
        // store active tweens / timelines
        _activeTweens = [];
        _activeTimeline;
        /**
         * Animate method.
         * @param animationProps - Animation properties.
         * @param instance - Instance to animate.
         * @returns GSAP Tween instance.
         */
        animate(animationProps, instance = this) {
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
        animateFrom(animationProps, instance = this) {
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
        animateSequence(sequences, instance = this) {
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
        clearAnimations() {
            this._activeTweens.forEach((tween) => tween.kill());
            this._activeTweens = [];
            this._activeTimeline?.clear();
            this._activeTimeline = undefined;
        }
        /**
         * Pause animations method.
         */
        pauseAnimations() {
            this._activeTweens.forEach((tween) => tween.pause());
            this._activeTimeline?.pause();
        }
        /**
         * Resume animations method.
         */
        resumeAnimations() {
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
        animateFromTo(fromProps, toProps, instance = this) {
            const tween = gsap.fromTo(instance, {
                ...fromProps,
            }, {
                ...toProps,
            });
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
        reverseAnimation() {
            this._activeTweens.forEach((tween) => tween.reverse());
            this._activeTimeline?.reverse();
        }
        isAnimationPlaying() {
            return (this._activeTweens?.some((tween) => !tween.paused()) ||
                (this._activeTimeline && !this._activeTimeline.paused()) ||
                false);
        }
        // utility animations
        /**
         * Shake animation.
         * @param config - Configuration object.
         * @param instance
         * @returns GSAP Tween instance.
         */
        shake(config = {}, instance = this) {
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
        pulse(config = {}, instance = this) {
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
        bob(config = {}, instance = this) {
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
        _onAnimationStart(animationEntity) {
            this.onAnimationStart.emit(animationEntity);
        }
        /**
         * Private method for handling animation update event.
         * @param animationEntity - Animation entity.
         */
        _onAnimationUpdate(animationEntity) {
            this.onAnimationUpdate.emit(animationEntity);
        }
        /**
         * Private method for handling animation complete event.
         * @param animationEntity - Animation entity.
         */
        _onAnimationComplete(animationEntity) {
            this.onAnimationComplete.emit(animationEntity);
        }
    };
}
