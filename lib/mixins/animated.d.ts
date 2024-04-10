import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { Constructor } from '../utils/types';
/**
 * Extended GSAP animation configuration interface.
 */
export interface GSAPAnimationConfigExtended extends gsap.TweenVars {
}
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
    animateFromTo(fromProps: GSAPAnimationConfigExtended, toProps: GSAPAnimationConfigExtended, instance?: any): gsap.core.Tween;
    animateSequence(sequences: GSAPAnimationConfigExtended[], instance?: any): gsap.core.Timeline;
    pauseAnimations(): void;
    resumeAnimations(): void;
    clearAnimations(): void;
    reverseAnimation(): void;
    isAnimationPlaying(): boolean;
    shake(config?: {
        duration?: number;
        intensity?: number;
        times?: number;
    }, instance?: any): gsap.core.Tween;
    pulse(config?: {
        duration?: number;
        intensity?: number;
        times?: number;
    }, instance?: any): gsap.core.Tween;
    bob(config?: {
        duration?: number;
        intensity?: number;
    }, instance?: any): gsap.core.Tween;
}
/**
 * Animated mixin function.
 * @param Base - Base class to extend.
 * @returns Class that extends the base class and implements IAnimated.
 */
export declare function Animated<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IAnimated>;
export {};
//# sourceMappingURL=animated.d.ts.map