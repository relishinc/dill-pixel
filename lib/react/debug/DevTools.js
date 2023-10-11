import { useApp } from '@pixi/react';
import React from 'react';
// adds support for PIXI DevTools
// usually just for local dev
export const DevTools = () => {
    const app = useApp();
    React.useEffect(() => {
        globalThis.__PIXI_APP__ = app;
    }, []);
    return null;
};
//# sourceMappingURL=DevTools.js.map