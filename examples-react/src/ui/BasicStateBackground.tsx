import { COLOR_DARK_GREEN } from '@/utils/Constants';
import { Graphics } from '@pixi/react';
import { useHLF } from 'dill-pixel/react';
import * as React from 'react';

export const BasicStateBackground = ({
  color = COLOR_DARK_GREEN,
  editable = false,
}: {
  color?: number;
  editable?: boolean;
}) => {
  const size = useHLF((globalState) => globalState.size);
  return (
    <Graphics
      draw={(g) => {
        g.clear();
        g.beginFill(color, 1);
        g.drawRect(0, 0, size.width, size.height);
        g.endFill();
      }}
    />
  );
};
