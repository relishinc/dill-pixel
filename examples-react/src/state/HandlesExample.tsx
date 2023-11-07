import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { Text } from '@pixi/react';
import { Container, Handles, IContainer, Sprite, State, useStateAnimations } from 'dill-pixel/react';
import { gsap } from 'gsap';
import { TextStyle } from 'pixi.js';
import * as React from 'react';

export const HandlesExample: State = ({ size, animationState, onInAnimationComplete, onOutAnimationComplete }) => {
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

  return (
    <Container ref={containerRef}>
      <BasicStateBackground />
      <Text
        text={`Handles`}
        x={30}
        y={30}
        anchor={0}
        style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
      />

      <Handles>
        <Sprite asset={'pickle'} position={[200, 200]} />
      </Handles>
    </Container>
  );
};

HandlesExample.assets = [
  { srcs: '/assets/images/static/pickle@2x.png', name: 'pickle' },
  { srcs: '/assets/images/spritesheets/buildings@2x.json', name: 'buildings' },
];
HandlesExample.hasStateAnimations = true;
