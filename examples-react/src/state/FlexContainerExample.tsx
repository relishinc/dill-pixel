import { useBaseStateAnimations } from '@/hooks/useBaseStateAnimations';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { whiteTextStyle } from '@/utils/text';
import { Container, Graphics, Text } from '@pixi/react';
import { MathUtils } from 'dill-pixel';
import { FlexContainer, IFlexContainer, State } from 'dill-pixel/react';
import { useControls } from 'leva';
import { Graphics as PIXIGraphics, TextStyle } from 'pixi.js';
import * as React from 'react';

const controlsSchema = {
  width: { value: 800, min: 0, max: 1000, step: 1 },
  height: { value: 600, min: 0, max: 1000, step: 1 },
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
};

export const FlexContainerExample: State = ({
  size,
  animationState,
  onInAnimationComplete,
  onOutAnimationComplete,
}) => {
  const { numItems, width, height, varySizes, gap, flexDirection, flexWrap, alignItems, justifyContent } =
    useControls(controlsSchema);

  const items = React.useMemo(() => {
    return Array.from({ length: numItems }).map((_, i) => (
      <Text
        key={`item-${i}`}
        text={`Item ${i + 1}`}
        style={whiteTextStyle(varySizes ? MathUtils.clamp(Math.random() * 48 + 24, 24, 72) : 48)}
      />
    ));
  }, [numItems, varySizes]);

  const stateContainerRef = useBaseStateAnimations(animationState, onInAnimationComplete, onOutAnimationComplete);
  const containerRef = React.useRef<IFlexContainer>(null);
  const drawBacking = React.useCallback(
    (g: PIXIGraphics) => {
      g.clear().beginFill(0x0, 0.25).drawRect(0, 0, width, height).endFill();
    },
    [flexDirection, width, height, gap, alignItems, justifyContent, flexWrap, items, containerRef.current],
  );

  return (
    <>
      <Container ref={stateContainerRef}>
        <BasicStateBackground />
        <Text
          text={`Flex Container`}
          x={30}
          y={30}
          anchor={0}
          style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
        />
        <Graphics x={30} y={200} draw={drawBacking} />
        <FlexContainer
          ref={containerRef}
          x={30}
          y={200}
          width={width}
          height={height}
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

FlexContainerExample.hasStateAnimations = true;
