type StateAnimationFunc = Promise<void> | gsap.core.Tween | gsap.core.Timeline;
export declare const useStateAnimations: (animationState: 'in' | 'out' | 'idle', animateIn: () => StateAnimationFunc, animateOut: () => StateAnimationFunc, onInAnimationComplete: () => void, onOutAnimationComplete: () => void) => void;
export {};
//# sourceMappingURL=useStateAnimations.d.ts.map