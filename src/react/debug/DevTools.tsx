import { useApp } from '@pixi/react';
import React from 'react';

export const DevTools = (): null => {
  const app = useApp();
  React.useEffect(() => {
    (globalThis as any).__PIXI_APP__ = app;
  }, []);

  return null;
};
