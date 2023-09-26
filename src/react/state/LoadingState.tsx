import * as React from 'react';

export type LoadingStateProps = {
	children?: React.ReactNode;
	size: { width: number, height: number };
	progress: number,
	isInitial: boolean;
	animationState: 'in' | 'out' | 'idle';
	onInAnimationComplete?: () => void;
	onOutAnimationComplete: () => void;
}

export type LoadingState = React.FC<LoadingStateProps>;
