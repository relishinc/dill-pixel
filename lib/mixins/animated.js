import { gsap } from 'gsap';
import { Signal } from '../signals';
export const Animated = (Base) => {
    return class extends Base {
        constructor() {
            super(...arguments);
            // signals for animation events
            this.onAnimationStart = new Signal();
            this.onAnimationUpdate = new Signal();
            this.onAnimationComplete = new Signal();
            // store active tweens / timelines
            this._activeTweens = [];
        }
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
        _onAnimationStart(animationEntity) {
            this.onAnimationStart.emit(animationEntity);
        }
        _onAnimationUpdate(animationEntity) {
            this.onAnimationUpdate.emit(animationEntity);
        }
        _onAnimationComplete(animationEntity) {
            this.onAnimationComplete.emit(animationEntity);
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
//# sourceMappingURL=animated.js.map