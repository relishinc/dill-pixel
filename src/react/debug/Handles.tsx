// TODO: finish logic for handles
// a component that wraps another component and displays handles that can transform its scale, rotation, and position

import { Container, Graphics, useApp } from '@pixi/react';
import { Container as PIXIContainer, FederatedPointerEvent, Graphics as PIXIGraphics } from 'pixi.js';
import React from 'react';
import { IContainer } from '../types';

interface HandlesProps extends React.ComponentProps<typeof Container> {
  children: React.ReactNode;
}

interface HandleProps extends React.ComponentProps<typeof Graphics> {
  color?: number;
}

interface DraggerProps extends React.ComponentProps<typeof Graphics> {
  width: number;
  height: number;
}

export const Handle: React.FC<HandleProps> = React.forwardRef((props, ref) => {
  const { color = 0x00ff00, ...rest } = props;
  // just draws a circle
  const draw = React.useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.beginFill(color).drawCircle(0, 0, 10).endFill();
    },
    [color, rest],
  );
  return <Graphics eventMode={'static'} cursor={'grab'} ref={ref} draw={draw} {...props} />;
});

export const Dragger: React.FC<DraggerProps> = React.forwardRef((props, ref) => {
  // just draws a circle
  const draw = React.useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.beginFill(0xff0000, 0.25).drawRect(0, 0, props.width, props.height).endFill();
    },
    [props],
  );
  return <Graphics eventMode={'static'} cursor={'grab'} ref={ref} draw={draw} {...props} />;
});

export const Handles: React.FC<HandlesProps> = React.forwardRef((props, ref) => {
  const { stage } = useApp();
  const { children, ...rest } = props;
  const containerRef = React.useRef<IContainer>(null);
  const handlesContainerRef = React.useRef<IContainer>(null);
  React.useImperativeHandle(ref, () => containerRef.current!);

  // check if there are more than one child, and if so, throw an error
  if (React.Children.count(children) > 1) {
    throw new Error('Handles can only have one child.');
  }

  // get the child's props
  const child = React.Children.only(children)! as React.ReactElement;
  const childProps = child.props as any;
  const propsList = ['x', 'y', 'position', 'scale', 'rotation', 'angle'];

  // check childProps for any of the props in propsList and add them to a new props object
  const propsFromChild: any = propsList.reduce((acc, prop: string) => {
    if (childProps[prop]) {
      // @ts-ignore
      acc[prop] = childProps[prop];
    }
    return acc;
  }, {});

  // the properties we want to be able to adjust on the child component
  // bind them to the original props from the child component to start
  const [scale, setScale] = React.useState(propsFromChild?.scale || { x: 1, y: 1 });
  const [rotation, setRotation] = React.useState(propsFromChild?.rotation || 0);
  const [position, setPosition] = React.useState(propsFromChild?.position || { x: 0, y: 0 });

  // dragging logic
  const target = React.useRef<PIXIContainer>(null);
  const isDragging = React.useRef(false);
  const draggingMode = React.useRef<'none' | 'scale' | 'rotation' | 'position'>('none');
  const mouseOffset = React.useRef({ x: 0, y: 0 });
  const initialMousePos = React.useRef({ x: 0, y: 0 });
  const initialScale = React.useRef({ x: 0, y: 0 });
  const mousePos = React.useRef({ x: 0, y: 0 });

  const handlePointerMove = React.useCallback(
    (e: FederatedPointerEvent) => {
      mousePos.current = containerRef.current!.parent.parent.toLocal(e.global);
      mousePos.current.x -= mouseOffset.current.x;
      mousePos.current.y -= mouseOffset.current.y;
      const dist = {
        x: Math.abs(mousePos.current.x - initialMousePos.current.x),
        y: Math.abs(mousePos.current.y - initialMousePos.current.y),
      };
      const newScale = {
        x: initialScale.current.x + dist.x / containerRef.current!.width,
        y: initialScale.current.y + dist.y / containerRef.current!.height,
      };
      switch (draggingMode.current) {
        case 'position':
          setPosition({ x: mousePos.current.x, y: mousePos.current.y });
          break;
        case 'scale':
          setScale(newScale);
          break;
      }
    },
    [containerRef.current, setPosition, setScale, draggingMode.current, mousePos.current],
  );

  const handlePointerDown = React.useCallback(
    (e: FederatedPointerEvent) => {
      if (isDragging.current) {
        return;
      }
      // @ts-ignore
      target.current = e.target as PIXIContainer;
      const name = target.current.name;
      const localPos = containerRef.current!.toLocal(e.global) || { x: 0, y: 0 };
      mouseOffset.current = {
        x: localPos.x * scale.x,
        y: localPos.y * scale.y,
      };
      initialMousePos.current = handlesContainerRef.current!.parent.parent.toLocal(e.global);
      initialScale.current = { x: handlesContainerRef.current!.scale.x, y: handlesContainerRef.current!.scale.y };
      isDragging.current = true;

      switch (name) {
        case 'dragger':
          draggingMode.current = 'position';
          break;
        case 'scaleHandle':
          draggingMode.current = 'scale';
          break;
        case 'rotationHandle':
          draggingMode.current = 'rotation';
          break;
      }

      stage.eventMode = 'static';
      stage.on('pointermove', handlePointerMove);
      stage.on('pointerup', handlePointerUp);
      stage.on('pointerupoutside', handlePointerUp);
    },
    [stage, scale, containerRef.current],
  );

  const handlePointerUp = React.useCallback(
    (e: FederatedPointerEvent) => {
      isDragging.current = false;
      stage.eventMode = 'auto';
      stage.off('pointermove', handlePointerMove);
      stage.off('pointerup', handlePointerUp);
      stage.off('pointerupoutside', handlePointerUp);
    },
    [stage],
  );

  return (
    <Container ref={handlesContainerRef} position={position} scale={scale} rotation={rotation}>
      <Container ref={containerRef}>
        {React.cloneElement(child as React.ReactElement, { x: 0, y: 0, position: 0, scale: 1, rotation: 0, angle: 0 })}
      </Container>
      {/* for dragging */}
      <Dragger
        name={'dragger'}
        eventMode={'static'}
        cursor={'pointer'}
        onpointerdown={handlePointerDown}
        width={containerRef?.current?.width || 0}
        height={containerRef?.current?.height || 0}
      />
      {/* for rotation */}
      <Handle
        onpointerdown={handlePointerDown}
        name={'rotationHandle'}
        color={0x00fff0}
        position={[containerRef?.current?.width ? containerRef.current.width * 0.5 : 0, -10]}
      />
      {/* for scale */}
      <Handle onpointerdown={handlePointerDown} name={'scaleHandle'} position={[0, 0]} />
      <Handle
        onpointerdown={handlePointerDown}
        name={'scaleHandle'}
        position={[containerRef?.current?.width || 0, 0]}
      />
      <Handle
        onpointerdown={handlePointerDown}
        name={'scaleHandle'}
        position={[containerRef?.current?.width || 0, containerRef?.current?.height || 0]}
      />
      <Handle
        onpointerdown={handlePointerDown}
        name={'scaleHandle'}
        position={[0, containerRef?.current?.height || 0]}
      />
    </Container>
  );
});
