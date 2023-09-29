import { _ReactPixi, PixiRef, Sprite as ReactPIXISprite } from '@pixi/react';
import React from 'react';
import { Make } from '../../utils/factory';

type ISprite = PixiRef<typeof ReactPIXISprite>;

interface ISpriteProps extends _ReactPixi.ISprite {
  asset?: string;
  sheet?: string;
}

export const Sprite = React.forwardRef<ISprite, ISpriteProps>(({ asset, sheet, ...props }, ref) => {
  const [texture, setTexture] = React.useState(asset ? Make.texture(asset, sheet) : null);

  React.useEffect(() => {
    if (!asset) {
      return;
    }
    setTexture(Make.texture(asset, sheet));
  }, [asset, sheet]);

  return <ReactPIXISprite ref={ref} {...props} texture={texture || undefined} />;
});
