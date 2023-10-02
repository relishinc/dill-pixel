import { SpringPopup } from '@/popups/SpringPopup';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { whiteTextStyle } from '@/utils/text';
import { Container, Text } from '@pixi/react';
import { IContainer, State, useHLF, useStateAnimations } from 'dill-pixel/react';
import { gsap } from 'gsap';
import { TextStyle } from 'pixi.js';
import React from 'react';
import { ExamplePopup } from '../popups/ExamplePopup';

export const PopupExample: State = ({ size, animationState, onInAnimationComplete, onOutAnimationComplete }) => {
  const showPopup = useHLF((globalState) => globalState.showPopup);
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

  const onShowPopup = React.useCallback(() => {
    // make sure both types of popups work
    showPopup(Math.random() > 0.5 ? ExamplePopup : SpringPopup);
  }, [showPopup]);

  return (
    <Container ref={containerRef}>
      <BasicStateBackground />
      <Text
        text={`Popups`}
        x={30}
        y={30}
        anchor={0}
        style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
      />
      <Text
        text={`Show popup`}
        anchor={[0.5, 0.5]}
        x={size.width * 0.5}
        y={size.height - 100}
        style={whiteTextStyle(24)}
        eventMode={'static'}
        cursor={'pointer'}
        onclick={onShowPopup}
        zIndex={9999}
      />
    </Container>
  );
};

PopupExample.hasStateAnimations = true;
