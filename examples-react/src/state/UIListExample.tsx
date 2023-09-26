import { useBaseStateAnimations } from '@/hooks/useBaseStateAnimations';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { List } from '@/ui/List';
import { whiteTextStyle } from '@/utils/text.ts';
import { Container, Text } from '@pixi/react';
import { State } from 'html-living-framework/react';
import { TextStyle } from 'pixi.js';
import * as React from 'react';

export const UIListExample: State = ({ size, animationState, onInAnimationComplete, onOutAnimationComplete }) => {
  const containerRef = useBaseStateAnimations(animationState, onInAnimationComplete, onOutAnimationComplete);

  return (
    <Container ref={containerRef}>
      <BasicStateBackground />
      <Text
        text={`UI List`}
        x={30}
        y={30}
        anchor={0}
        style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
      />
      <List
        type={'horizontal'}
        elementsMargin={50}
        horPadding={40}
        x={size.width * 0.5}
        y={size.height * 0.5}
        anchor={[0.5, 0.5]}
      >
        <Text text={`Item 1`} style={whiteTextStyle(24)} />
        <Text text={`Item 2`} style={whiteTextStyle(24)} />
        <Text text={`Item 3`} style={whiteTextStyle(24)} />
        <Text text={`Item 4`} style={whiteTextStyle(24)} />
      </List>
    </Container>
  );
};

UIListExample.hasStateAnimations = true;
