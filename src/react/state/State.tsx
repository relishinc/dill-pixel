import {gsap} from 'gsap';
import * as React from 'react';

// define a props interface for the State Component
export type StateProps = {
  size: { width: number; height: number };
  onInAnimationComplete?: () => void;
  onOutAnimationComplete?: () => void;
  animationState: 'in' | 'out' | 'idle';
  children?: React.ReactNode[];
};

type StateAnimationFunc = Promise<void> | gsap.core.Tween | gsap.core.Timeline;

export const useStateAnimations = (
  animationState: 'in' | 'out' | 'idle',
  animateIn: () => StateAnimationFunc,
  animateOut: () => StateAnimationFunc,
  onInAnimationComplete: () => void,
  onOutAnimationComplete: () => void,
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

// create a @pixi/react component extension of dill-pixel/State.ts
export type State = React.FC<StateProps> & {
  hasStateAnimations?: boolean;
  assets?: any;
};
