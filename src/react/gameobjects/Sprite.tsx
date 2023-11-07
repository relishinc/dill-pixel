import { _ReactPixi, PixiRef, Sprite as ReactPIXISprite } from '@pixi/react';
import React from 'react';
import { Make } from '../../utils/factory';

type ISprite = PixiRef<typeof ReactPIXISprite>;

export interface ISpriteProps extends _ReactPixi.ISprite {
  asset?: string;
  sheet?: string;
  editable?: boolean;
}

export const Sprite = React.forwardRef<ISprite, ISpriteProps>(({ asset, sheet, ...props }, ref) => {
  const [texture, setTexture] = React.useState(
    props.texture ? props.texture : asset ? Make.texture(asset!, sheet) : null,
  );

  React.useEffect(() => {
    setTexture(props.texture ? props.texture : asset ? Make.texture(asset, sheet) : null);
  }, [props?.texture, asset, sheet]);

  return <ReactPIXISprite ref={ref} {...props} texture={texture || undefined} />;
});
