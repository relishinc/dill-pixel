import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { Text } from '@pixi/react';
import { Container, IContainer, List, Sprite, State, useStateAnimations } from 'dill-pixel/react';
import { gsap } from 'gsap';
import { TextStyle } from 'pixi.js';
import * as React from 'react';

export const SpriteExample: State = ({ size, animationState, onInAnimationComplete, onOutAnimationComplete }) => {
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
        text={`Sprites`}
        x={30}
        y={30}
        anchor={0}
        style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
      />
      <List
        type={'horizontal'}
        elementsMargin={10}
        anchor={[0.5, 0.5]}
        x={size.width * 0.5}
        y={size.height * 0.55}
        editMode={true}
      >
        <Sprite asset={'pickle'} />
        <Sprite asset={'lab'} sheet={'buildings'} />
      </List>
    </Container>
  );
};

SpriteExample.assets = [
  { srcs: '/assets/images/static/pickle@2x.png', name: 'pickle' },
  { srcs: '/assets/images/spritesheets/buildings@2x.json', name: 'buildings' },
];
SpriteExample.hasStateAnimations = true;
