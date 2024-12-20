import { IContainer, useStateAnimations } from 'dill-pixel/react';
import { gsap } from 'gsap';
import * as React from 'react';

export const useBaseStateAnimations = (
  animationState: 'in' | 'out' | 'idle',
  onInAnimationComplete: (() => void) | undefined,
  onOutAnimationComplete: (() => void) | undefined,
) => {
  const containerRef = React.useRef<IContainer>(null);
  const animateIn = React.useCallback(
    () =>
      gsap.fromTo(
        containerRef.current,
        { alpha: 0 },
        {
          alpha: 1,
          duration: 0.4,
          ease: 'sine.out',
        },
      ),
    [containerRef.current],
  );

  const animateOut = React.useCallback(
    () =>
      gsap.to(containerRef.current, {
        alpha: 0,
        duration: 0.3,
        ease: 'sine.in',
      }),
    [containerRef.current],
  );

  useStateAnimations(animationState, animateIn, animateOut, onInAnimationComplete, onOutAnimationComplete);

  return containerRef;
};
