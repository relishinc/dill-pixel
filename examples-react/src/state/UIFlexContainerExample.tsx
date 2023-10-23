import { useBaseStateAnimations } from '@/hooks/useBaseStateAnimations';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { whiteTextStyle } from '@/utils/text';
import { Container, Text } from '@pixi/react';
import { FlexContainer, State } from 'dill-pixel/react';
import { TextStyle } from 'pixi.js';
import * as React from 'react';

export const UIFlexContainerExample: State = ({
  size,
  animationState,
  onInAnimationComplete,
  onOutAnimationComplete,
}) => {
  const containerRef = useBaseStateAnimations(animationState, onInAnimationComplete, onOutAnimationComplete);

  return (
    <>
      <Container ref={containerRef}>
        <BasicStateBackground />
        <Text
          text={`UI Flex Container`}
          x={30}
          y={30}
          anchor={0}
          style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
        />
        <FlexContainer
          x={30}
          y={200}
          width={size.width - 60}
          flexDirection={'row'}
          gap={100}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text text={`Item 1`} style={whiteTextStyle(72)} />
          <Text text={`Item 2`} style={whiteTextStyle(72)} />
          <Text text={`Item 3`} style={whiteTextStyle(72)} />
          <Text text={`Item 4`} style={whiteTextStyle(72)} />
          <Text text={`Item 5`} style={whiteTextStyle(72)} />
          <Text text={`Item 6`} style={whiteTextStyle(72)} />
          <Text text={`Item 7`} style={whiteTextStyle(72)} />
        </FlexContainer>
      </Container>
    </>
  );
};

UIFlexContainerExample.hasStateAnimations = true;
