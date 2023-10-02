import { IMovingPlatform, IPlatform, MovingPlatform, Platform } from '@/gameobjects/Platform';
import { Player } from '@/gameobjects/Player';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { GREEN } from '@/utils/Constants';
import { Container, Text, useTick } from '@pixi/react';
import { ISprite, State } from 'dill-pixel/react';
import { Rectangle, TextStyle } from 'pixi.js';
import * as React from 'react';
import { RefObject } from 'react';

type RectangleLike = {
  x: number;
  y: number;
  width: number;
  height: number;
};
type CollisionDirection = 'top' | 'bottom' | 'left' | 'right' | 'none';

interface CollisionResult {
  isColliding: boolean;
  direction: CollisionDirection;
}

const checkAABBCollision = (rect1: RectangleLike, rect2: RectangleLike): CollisionResult => {
  const dx = rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2);
  const dy = rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2);
  const width = (rect1.width + rect2.width) / 2;
  const height = (rect1.height + rect2.height) / 2;
  const crossWidth = width * dy;
  const crossHeight = height * dx;

  if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
    if (crossWidth > crossHeight) {
      return {
        isColliding: true,
        direction: crossWidth > -crossHeight ? 'bottom' : 'left',
      };
    } else {
      return {
        isColliding: true,
        direction: crossWidth > -crossHeight ? 'right' : 'top',
      };
    }
  }

  return { isColliding: false, direction: 'none' };
};

const usePlayerMovement = (
  x: number,
  y: number,
  gravity: number,
  player: ISprite | null,
  ...platforms: RefObject<IMovingPlatform | IPlatform>[]
) => {
  // reference for which keys are pressed
  const keyRef = React.useRef<{
    [keyName: string]: boolean;
  }>({});

  // player position
  const movementRef = React.useRef({ x: 0, y: 0 });
  const [playerPosition, setPlayerPosition] = React.useState({ x, y, dir: 'right' });

  // jumping
  const jumpTimer = React.useRef(0);
  const [isJumping, setIsJumping] = React.useState(false);
  const [jumpingDisabled, setJumpingDisabled] = React.useState(false);
  const [canJump, setCanJump] = React.useState(false);

  // Player move function
  const movePlayer = React.useCallback(
    (dx: number, dy: number) => {
      if (!player) {
        return;
      }
      const hitArea = player.hitArea as Rectangle;
      const pos = player.toGlobal(hitArea);

      const newPosition = {
        x: playerPosition.x + dx,
        y: playerPosition.y + dy,
        dir: dx > 0 ? 'right' : dx < 0 ? 'left' : playerPosition.dir,
      };

      const collisionBox = new Rectangle(pos.x + dx, pos.y - 10 + dy, hitArea.width, hitArea.height);

      for (const platform of platforms) {
        if (!platform.current) {
          continue;
        }
        const platformInstance = platform.current as IPlatform;
        const instance = platformInstance.container;
        const collision = checkAABBCollision(collisionBox, {
          x: instance.x,
          y: instance.y,
          width: instance.width,
          height: instance.height,
        });

        if (collision.isColliding) {
          platformInstance.setColor(GREEN);
          if (collision.direction === 'top') {
            newPosition.y = instance.y - hitArea.height * 0.5;
            setJumpingDisabled(false);
            setCanJump(true);
          }
          if (collision.direction === 'bottom') {
            newPosition.y = instance.y + instance.height + hitArea.height * 0.5;
          }
          if (collision.direction === 'left') {
            newPosition.x = instance.x - hitArea.width * 0.5;
          }
          if (collision.direction === 'right') {
            newPosition.x = instance.x + instance.width + hitArea.width * 0.5;
          }
        } else {
          platformInstance.setColor(platformInstance.initialColor);
        }
      }

      setPlayerPosition(newPosition);
      return newPosition;
    },
    [playerPosition, player, setPlayerPosition],
  );

  // Integrated PlayerControls functionality
  React.useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      keyRef.current[e.code] = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keyRef.current[e.code] = false;
    };

    window.addEventListener('keydown', onKeyPress);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyPress);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [movePlayer]);

  useTick((delta) => {
    movementRef.current = { x: 0, y: 0 };

    if (canJump && !jumpingDisabled && keyRef.current.ArrowUp && !isJumping && jumpTimer.current === 0) {
      setIsJumping(true);
    }

    if (keyRef.current.ArrowLeft) {
      movementRef.current.x -= 4;
    }
    if (keyRef.current.ArrowRight) {
      movementRef.current.x += 4;
    }
    if (isJumping) {
      movementRef.current.y -= gravity * 3;
    } else {
      movementRef.current.y += gravity;
    }

    if (isJumping && jumpTimer.current < 10) {
      jumpTimer.current += delta;
    } else if (isJumping && jumpTimer.current >= 10) {
      jumpTimer.current = 0;
      setIsJumping(false);
      setJumpingDisabled(true);
    }

    movementRef.current.y += gravity;
    const lastMovement = movePlayer(movementRef.current.x, movementRef.current.y);
    if (lastMovement && lastMovement.y > playerPosition.y) {
      setCanJump(false);
    }
  });

  return playerPosition;
};

const level = {
  name: 'Level 1',
  platforms: [
    { type: 'static', x: 10, y: 400, width: 250, height: 50, threshold: 100, speed: 0.25 },
    { type: 'static', x: 350, y: 300, width: 300, height: 50 },
    { type: 'static', x: 800, y: 800, width: 450, height: 50 },
    { type: 'moving', x: 1400, y: 400, width: 300, height: 50, threshold: 300, speed: 0.5 },
  ],
};

export const PlatformerExample: State = ({ size }) => {
  // const level = Cache.get('level');
  const playerRef = React.useRef<ISprite>(null);

  const wallRefs = React.useRef<RefObject<IPlatform>[]>(Array.from({ length: 3 }, () => React.createRef<IPlatform>()));

  const platformRefs = React.useRef<RefObject<IPlatform | IMovingPlatform>[]>([]);

  const platforms = level?.platforms?.map((platform, idx) => {
    platformRefs.current[idx] =
      platform.type === 'moving' ? React.createRef<IMovingPlatform>() : React.createRef<IPlatform>();
    switch (platform.type) {
      case 'moving':
        return (
          <MovingPlatform
            ref={platformRefs.current[idx]}
            key={idx}
            x={platform.x}
            y={platform.y}
            width={platform.width}
            height={platform.height}
            threshold={platform.threshold ?? 200}
            speed={platform.speed ?? 0.5}
          />
        );
      case 'static':
      default:
        return (
          <Platform
            ref={platformRefs.current[idx]}
            key={idx}
            x={platform.x}
            y={platform.y}
            width={platform.width}
            height={platform.height}
          />
        );
    }
  });

  const playerPosition: {
    x: number;
    y: number;
    dir: string;
  } = usePlayerMovement(100, -200, 4, playerRef.current, ...wallRefs.current, ...platformRefs.current);

  return (
    <Container>
      <BasicStateBackground />
      <Text
        text={`Platformer`}
        x={30}
        y={30}
        anchor={0}
        style={new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 })}
      />
      {/* Walls & Floor */}
      <Platform ref={wallRefs.current[0]} x={-90} y={0} width={100} height={size.height} />
      <Platform ref={wallRefs.current[1]} x={size.width - 10} y={0} width={100} height={size.height} />
      <Platform ref={wallRefs.current[2]} x={0} y={size.height - 10} width={size.width} height={100} />
      {/* Obstacles */}
      {platforms}
      {/* Player */}
      <Player
        ref={playerRef}
        x={playerPosition.x}
        y={playerPosition.y}
        direction={playerPosition.dir as 'left' | 'right'}
      />
    </Container>
  );
};

PlatformerExample.assets = [{ srcs: '/assets/images/static/pickle@2x.png', name: 'pickle' }];
