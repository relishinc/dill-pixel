import { jsx as _jsx } from "react/jsx-runtime";
import { Sprite as ReactPIXISprite } from '@pixi/react';
import React from 'react';
import { Make } from '../../utils/factory';
export const Sprite = React.forwardRef(({ asset, sheet, ...props }, ref) => {
    const [texture, setTexture] = React.useState(asset ? Make.texture(asset, sheet) : null);
    React.useEffect(() => {
        if (!asset) {
            return;
        }
        setTexture(Make.texture(asset, sheet));
    }, [asset, sheet]);
    return _jsx(ReactPIXISprite, { ref: ref, ...props, texture: texture || undefined });
});
//# sourceMappingURL=Sprite.js.map