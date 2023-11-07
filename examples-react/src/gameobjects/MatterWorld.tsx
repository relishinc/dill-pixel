import { useMatterPhysics } from '@/hooks/useMatterPhysics';
import { useTick } from '@pixi/react';
import { Container, IContainer, IContainerProps, ISprite } from 'dill-pixel/react';
import { IEngineDefinition } from 'matter-js';
import React from 'react';

interface WorldProps extends IContainerProps {
  engineDefinition?: Partial<IEngineDefinition>;
}

export type IWorld = {
  container: IContainer;
  engineDefinition: IEngineDefinition;
};

export const MatterWorld = React.forwardRef<IWorld, WorldProps>((props, ref) => {
  const worldRef = React.useRef<ISprite>(null);
  React.useImperativeHandle(ref, () => ({
    engineDefinition: props.engineDefinition || {},
    container: worldRef.current!,
  }));
  const { Matter, engine } = useMatterPhysics(props.engineDefinition);
  useTick((delta) => {
    if (Matter) {
      Matter.Engine.update(engine, 16.666666666666668, 1);
    }
  });

  if (!Matter) {
    return null;
  }
  return <Container ref={worldRef} {...props} />;
});
