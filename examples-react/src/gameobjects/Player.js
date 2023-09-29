import { jsx as _jsx } from "react/jsx-runtime";
import { Container, Graphics, Sprite } from '@pixi/react';
import { Rectangle } from 'pixi.js';
import * as React from 'react';
export const Player = React.forwardRef((props, ref) => {
    const internalRef = React.useRef(null);
    // ensure we can access the ref both internally and externally
    React.useImperativeHandle(ref, () => internalRef.current);
    const hitArea = React.useMemo(() => {
        if (!internalRef.current) {
            return new Rectangle(0, 0, 0, 0);
        }
        return new Rectangle(-internalRef.current.width * 0.5 + internalRef.current.width * 0.325, -internalRef.current.height * 0.5 + internalRef.current.height * 0.14, internalRef.current.width * 0.375, internalRef.current.height * 0.75);
    }, [internalRef.current]);
    return (_jsx(Container, { ref: internalRef, x: props.x, y: props.y, hitArea: hitArea, children: _jsx(Sprite, { image: "pickle", anchor: [0.5, 0.5], scale: [props?.direction === 'right' ? 1 : -1, 1], children: props?.debug && (_jsx(Graphics, { draw: (g) => {
                    g.clear();
                    g.beginFill(0xff0000, 0.5);
                    g.drawRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
                    g.endFill();
                } })) }) }));
});
//# sourceMappingURL=Player.js.map