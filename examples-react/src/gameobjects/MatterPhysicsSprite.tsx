import { useMatterPhysics } from '@/hooks/useMatterPhysics';
import { Graphics, useTick } from '@pixi/react';
import { Container, IContainer, ISprite, ISpriteProps, Sprite } from 'dill-pixel/react';
import React from 'react';

interface MatterPhysicsSpriteProps extends ISpriteProps {
  isStatic?: boolean;
}

export const MatterPhysicsSprite = (props: MatterPhysicsSpriteProps) => {
  const { isStatic = false, texture, asset, sheet, width, height, ...rest } = props;
  const containerRef = React.useRef<IContainer>(null);
  const spriteRef = React.useRef<ISprite>(null);
  const { engine, Matter } = useMatterPhysics();
  const body = React.useRef<Matter.Body | null>();
  React.useEffect(() => {
    if (!Matter) {
      return;
    }
    const spr = spriteRef.current!;
    body.current = Matter!.Bodies.rectangle(spr.x + spr.width / 2, spr.y + spr.height / 2, spr.width, spr.height, {
      isStatic,
    });
    // const pos = resolvePointLike(rest.position || { x: 0, y: 0 });
    // containerRef.current!.position.set(pos.x, pos.y);
    Matter!.World.add(engine!.world, body.current);
  }, [spriteRef.current, Matter, isStatic]);

  useTick((delta) => {
    if (containerRef.current && body.current) {
      containerRef.current!.position.set(body.current!.position.x, body.current!.position.y);
    }
  });

  console.log({ rest });
  return (
    <Container ref={containerRef} {...rest}>
      <Sprite
        ref={spriteRef}
        texture={texture}
        asset={asset}
        sheet={sheet}
        width={width}
        height={height}
        anchor={[0.5, 0.5]}
      />
      <Graphics
        draw={(g) => {
          if (!spriteRef.current) {
            return;
          }
          g.clear();
          g.beginFill(0xff0000, 0.25);
          g.drawRect(
            -spriteRef.current!.width * 0.5,
            -spriteRef.current!.height * 0.5,
            spriteRef.current!.width,
            spriteRef.current!.height,
          );
          g.endFill();
        }}
      />
    </Container>
  );
};
