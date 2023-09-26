import React from 'react';

export type PopupProps = {
  id: string;
  animationState: 'in' | 'out' | 'idle';
  size: { width: number; height: number };
  onInAnimationComplete?: () => void;
  onOutAnimationComplete?: () => void;
  children?: React.ReactNode;
};

// create a @pixi/react component
export type Popup = React.FC<PopupProps>;
