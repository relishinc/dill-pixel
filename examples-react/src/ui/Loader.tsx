import { GREEN } from '@/utils/Constants.ts';
import { Container, Graphics, Text } from '@pixi/react';
import { IContainer, LoadingState, useStateAnimations } from 'dill-pixel/react';
import { gsap } from 'gsap';
import { TextStyle } from 'pixi.js';
import * as React from 'react';

export const Loader: LoadingState = ({
  size,
  isInitial,
  progress,
  animationState,
  onInAnimationComplete,
  onOutAnimationComplete,
}) => {
  const containerRef = React.useRef<IContainer>(null);
  const animateIn = React.useCallback(
    () =>
      gsap.to(containerRef.current, {
        alpha: 1,
        duration: 1,
        ease: 'sine.out',
      }),
    [containerRef.current],
  );

  const animateOut = React.useCallback(
    () =>
      gsap.to(containerRef.current, {
        alpha: 0,
        duration: 1,
        ease: 'sine.in',
      }),
    [containerRef.current],
  );

  useStateAnimations(animationState, animateIn, animateOut, onInAnimationComplete, onOutAnimationComplete);

  return (
    <Container ref={containerRef} alpha={isInitial ? 1 : 0}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(GREEN, 1);
          g.drawRect(0, 0, size.width, size.height);
          g.endFill();
        }}
      />
      <Text
        text={`Loading ${progress * 100}%`}
        x={size.width * 0.5}
        y={size.height * 0.5}
        anchor={[0.5, 0.5]}
        style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
      />
    </Container>
  );
};
