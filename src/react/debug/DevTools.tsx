import {useApp} from '@pixi/react';
import React from 'react';

// adds support for PIXI DevTools
// usually just for local dev

export const DevTools = (): null => {
  const app = useApp();
  React.useEffect(() => {
    (globalThis as any).__PIXI_APP__ = app;
  }, []);

  return null;
};
