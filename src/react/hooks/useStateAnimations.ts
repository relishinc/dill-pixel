import * as React from 'react';

type StateAnimationFunc = Promise<void> | PromiseLike<T>;

export const useStateAnimations = (
	animationState: 'in' | 'out' | 'idle',
	animateIn: () => StateAnimationFunc,
	animateOut: () => StateAnimationFunc,
	onInAnimationComplete: () => void,
	onOutAnimationComplete: () => void
) => {
	const animation = React.useRef('idle');
	const handleAnimation = async () => {
		if (animation.current !== animationState) {
			animation.current = animationState;
			if (animationState === 'in') {
				if (animateIn) {
					setTimeout(async () => {
						await animateIn();
						if (onInAnimationComplete) {
							onInAnimationComplete();
						}
					}, 0);
				}
			}
			if (animationState === 'out') {
				if (animateOut) {
					setTimeout(async () => {
						await animateOut();
						if (onOutAnimationComplete) {
							onOutAnimationComplete();
						}
					}, 0);
				}
			}
		}
	};
	handleAnimation().then((r) => r);
};
