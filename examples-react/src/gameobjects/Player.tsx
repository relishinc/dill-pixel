import { Container, Graphics, Sprite } from '@pixi/react';
import { IContainer, ISprite } from 'html-living-framework/react';
import { Rectangle } from 'pixi.js';
import * as React from 'react';

interface PlayerProps extends React.ComponentProps<typeof Sprite> {
  x: number;
  y: number;
  direction: 'left' | 'right';
  debug?: boolean;
}

export const Player = React.forwardRef<IContainer, PlayerProps>((props: PlayerProps, ref) => {
  const internalRef = React.useRef<ISprite>(null);
  // ensure we can access the ref both internally and externally
  React.useImperativeHandle(ref, () => internalRef.current!);

  const hitArea = React.useMemo(() => {
    if (!internalRef.current) {
      return new Rectangle(0, 0, 0, 0);
    }
    return new Rectangle(
      -internalRef.current.width * 0.5 + internalRef.current.width * 0.325,
      -internalRef.current.height * 0.5 + internalRef.current.height * 0.14,
      internalRef.current.width * 0.375,
      internalRef.current.height * 0.75,
    );
  }, [internalRef.current]);

  return (
    <Container ref={internalRef} x={props.x} y={props.y} hitArea={hitArea}>
      <Sprite image="pickle" anchor={[0.5, 0.5]} scale={[props?.direction === 'right' ? 1 : -1, 1]}>
        {props?.debug && (
          <Graphics
            draw={(g) => {
              g.clear();
              g.beginFill(0xff0000, 0.5);
              g.drawRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
              g.endFill();
            }}
          />
        )}
      </Sprite>
    </Container>
  );
});
