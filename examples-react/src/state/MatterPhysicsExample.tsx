import { useBaseStateAnimations } from '@/hooks/useBaseStateAnimations';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { Text } from '@pixi/react';
import { Container, State } from 'dill-pixel/react';
import { TextStyle, Texture } from 'pixi.js';
import React, { Suspense } from 'react';
import { MatterPhysicsSprite } from '../gameobjects/MatterPhysicsSprite';
import { MatterWorld } from '../gameobjects/MatterWorld';

export const MatterPhysicsExample: State = ({
  size,
  animationState,
  onInAnimationComplete,
  onOutAnimationComplete,
}) => {
  const containerRef = useBaseStateAnimations(animationState, onInAnimationComplete, onOutAnimationComplete);

  return (
    <Suspense fallback={false}>
      <Container ref={containerRef}>
        <BasicStateBackground />
        <Text
          text={`Matter Physics Example`}
          x={60}
          y={30}
          anchor={0}
          style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
        />
        <MatterWorld>
          <MatterPhysicsSprite asset={'pickle'} position={[100, 200]} />
          <MatterPhysicsSprite
            isStatic
            texture={Texture.WHITE}
            x={0}
            y={-size.height * 0.5}
            width={50}
            height={size.height}
          />
          <MatterPhysicsSprite
            isStatic
            texture={Texture.WHITE}
            x={size.width}
            y={-size.height * 0.5}
            width={50}
            height={size.height}
          />
          <MatterPhysicsSprite
            isStatic
            texture={Texture.WHITE}
            x={size.width * 0.5}
            y={size.height}
            width={size.width}
            height={50}
          />
        </MatterWorld>
      </Container>
    </Suspense>
  );
};

MatterPhysicsExample.assets = [
  { srcs: '/assets/images/static/pickle@2x.png', name: 'pickle' },
  { srcs: '/assets/images/spritesheets/buildings@2x.json', name: 'buildings' },
];
MatterPhysicsExample.hasStateAnimations = true;
