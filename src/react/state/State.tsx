import * as React from 'react';

// define a props interface for the State Component
export type StateProps = {
  size: { width: number; height: number };
  onInAnimationComplete?: () => void | undefined;
  onOutAnimationComplete?: () => void | undefined;
  animationState: 'in' | 'out' | 'idle';
  children?: React.ReactNode[];
};

// create a @pixi/react component extension of dill-pixel/State.ts
export type State = React.FC<StateProps> & {
  hasStateAnimations?: boolean;
  assets?: any;
};
