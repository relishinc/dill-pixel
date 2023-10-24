import { useBaseStateAnimations } from '@/hooks/useBaseStateAnimations';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { whiteTextStyle } from '@/utils/text';
import { Container, Text } from '@pixi/react';
import { MathUtils } from 'dill-pixel';
import { FlexContainer, State } from 'dill-pixel/react';
import { useControls } from 'leva';
import { TextStyle } from 'pixi.js';
import * as React from 'react';

export const UIFlexContainerExample: State = ({
  size,
  animationState,
  onInAnimationComplete,
  onOutAnimationComplete,
}) => {
  const { numItems, varySizes, gap, flexDirection, flexWrap, alignItems, justifyContent } = useControls({
    numItems: { label: '# of items', value: 4, min: 1, max: 40, step: 1 },
    varySizes: false,
    gap: { value: 0, min: 0, max: 200, step: 1 },
    flexWrap: { options: { nowrap: 'nowrap', wrap: 'wrap' } },
    flexDirection: { options: { row: 'row', column: 'column' } },
    alignItems: {
      options: {
        'flex-start': 'flex-start',
        center: 'center',
        'flex-end': 'flex-end',
      },
    },
    justifyContent: {
      options: {
        'flex-start': 'flex-start',
        center: 'center',
        'flex-end': 'flex-end',
        'space-between': 'space-between',
        'space-around': 'space-around',
        'space-evenly': 'space-evenly',
      },
    },
  });

  const items = React.useMemo(() => {
    return Array.from({ length: numItems }).map((_, i) => (
      <Text
        key={`item-${i}`}
        text={`Item ${i + 1}`}
        style={whiteTextStyle(varySizes ? MathUtils.clamp(Math.random() * 48 + 24, 24, 72) : 48)}
      />
    ));
  }, [numItems, varySizes]);

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
          height={flexDirection === 'column' ? size.height - 230 : undefined}
          gap={gap}
          flexWrap={flexWrap as 'nowrap' | 'wrap'}
          flexDirection={flexDirection as 'row' | 'column'}
          alignItems={alignItems as 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'}
          justifyContent={
            justifyContent as 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
          }
        >
          {items}
        </FlexContainer>
      </Container>
    </>
  );
};

UIFlexContainerExample.hasStateAnimations = true;
