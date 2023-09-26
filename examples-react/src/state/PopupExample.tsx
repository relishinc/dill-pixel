import { SpringPopup } from '@/popups/SpringPopup.tsx';
import { BasicStateBackground } from '@/ui/BasicStateBackground.tsx';
import { whiteTextStyle } from '@/utils/text.ts';
import { Container, Text } from '@pixi/react';
import { gsap } from 'gsap';
import { IContainer, State, useHLF, useStateAnimations } from 'html-living-framework/react';
import { TextStyle } from 'pixi.js';
import * as React from 'react';

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
    showPopup(SpringPopup);
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
        anchor={[1, 1]}
        x={size.width - 10}
        y={size.height - 10}
        style={whiteTextStyle(24)}
        eventMode={'static'}
        cursor={'pointer'}
        onclick={onShowPopup}
      />
    </Container>
  );
};

PopupExample.hasStateAnimations = true;
