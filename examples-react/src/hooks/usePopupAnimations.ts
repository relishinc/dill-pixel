import React from 'react';
import { Controller, easings } from 'react-spring';

export const usePopupAnimations = (animationState: 'in' | 'out' | 'idle', onOutAnimationComplete?: () => void) => {
  const [animations] = React.useState(new Controller({ alpha: 0, y: -10 }));
  const [backingAnimations] = React.useState(new Controller({ alpha: 0 }));

  React.useEffect(() => {
    const animate = async () => {
      const isIn = animationState === 'in';
      backingAnimations.start({ alpha: isIn ? 1 : 0 });
      await animations.start({
        alpha: isIn ? 1 : 0,
        y: isIn ? 0 : 20,
        config: {
          clamp: true,
          duration: isIn ? 400 : 300,
          easing: isIn ? easings.easeOutSine : easings.easeInSine,
        },
      });
      if (animationState === 'out' && onOutAnimationComplete) {
        onOutAnimationComplete();
      }
    };
    animate();
  }, [animationState]);

  return [backingAnimations, animations];
};
