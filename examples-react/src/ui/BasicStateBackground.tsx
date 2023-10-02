import { DARK_GREEN } from '@/utils/Constants.ts';
import { Graphics } from '@pixi/react';
import { useHLF } from 'dill-pixel/react';
import * as React from 'react';

export const BasicStateBackground = ({ color = DARK_GREEN }: { color?: number }) => {
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
