import { jsx as _jsx } from "react/jsx-runtime";
import { Sprite as ReactPIXISprite } from '@pixi/react';
import React from 'react';
import { Make } from '../../utils/factory';
export const Sprite = React.forwardRef(({ asset, sheet, ...props }, ref) => {
    const [texture, setTexture] = React.useState(props.texture ? props.texture : asset ? Make.texture(asset, sheet) : null);
    React.useEffect(() => {
        setTexture(props.texture ? props.texture : asset ? Make.texture(asset, sheet) : null);
    }, [props?.texture, asset, sheet]);
    return _jsx(ReactPIXISprite, { ref: ref, ...props, texture: texture || undefined });
});
//# sourceMappingURL=Sprite.js.map