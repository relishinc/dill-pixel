import { gsap } from 'gsap';
import { Signal } from '../signals';
import { Constructor } from '../utils';
export interface GSAPAnimationConfigExtended extends gsap.TweenVars {
}
type GSAPEntity = gsap.core.Tween | gsap.core.Timeline;
export declare const Animated: <TBase extends Constructor<any>>(Base: TBase) => {
    new (...args: any[]): {
        [x: string]: any;
        onAnimationStart: Signal<(entity: GSAPEntity) => void>;
        onAnimationUpdate: Signal<(entity: GSAPEntity) => void>;
        onAnimationComplete: Signal<(entity: GSAPEntity) => void>;
        _activeTweens: gsap.core.Tween[];
        _activeTimeline?: gsap.core.Timeline | undefined;
        animate(animationProps: GSAPAnimationConfigExtended, instance?: any): gsap.core.Tween;
        animateSequence(sequences: GSAPAnimationConfigExtended[], instance?: any): gsap.core.Timeline;
        playAnimation(): void;
        pauseAnimation(): void;
        resumeAnimation(): void;
        reverseAnimation(): void;
        restartAnimation(): void;
        clearAnimations(): void;
        _onAnimationStart(animationEntity: GSAPEntity | undefined): void;
        _onAnimationUpdate(animationEntity: GSAPEntity | undefined): void;
        _onAnimationComplete(animationEntity: GSAPEntity | undefined): void;
    };
} & TBase;
export {};
//# sourceMappingURL=animated.d.ts.map