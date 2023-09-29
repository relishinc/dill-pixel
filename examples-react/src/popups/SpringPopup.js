import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { usePopupAnimations } from '@/hooks/usePopupAnimations.ts';
import { GREEN } from '@/utils/Constants.ts';
import { Text } from '@pixi/react';
import { Container, Graphics } from '@pixi/react-animated';
import { useHLF } from 'html-living-framework/react';
import { TextStyle } from 'pixi.js';
import React from 'react';
export const SpringPopup = ({ id, animationState, size, onInAnimationComplete, onOutAnimationComplete }) => {
    const hidePopup = useHLF((globalState) => globalState.hidePopup);
    const onClose = React.useCallback(() => {
        hidePopup(id);
    }, [id]);
    const [backingAnimations, animations] = usePopupAnimations(animationState, onOutAnimationComplete);
    return (_jsxs(Container, { ...backingAnimations.springs, children: [_jsx(Graphics, { draw: (g) => {
                    g.clear();
                    g.beginFill(0x000000, 0.5);
                    g.drawRect(0, 0, size.width, size.height);
                    g.endFill();
                } }), _jsxs(Container, { ...animations.springs, children: [_jsx(Graphics, { anchor: 0.5, x: size.width * 0.5, y: size.height * 0.5, cacheAsBitmap: true, draw: (g) => {
                            g.clear();
                            g.beginFill(GREEN, 0.9);
                            g.drawRoundedRect(-450, -200, 900, 400, 20);
                            g.endFill();
                        } }), _jsx(Text, { anchor: 0.5, x: size.width * 0.5, y: size.height * 0.5, text: `Popup: ${id}`, style: new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 }) }), _jsx(Text, { anchor: [1, 0], x: size.width * 0.5 + 400, y: size.height * 0.5 - 170, text: `Close X`, style: new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 32 }), cursor: 'pointer', eventMode: 'static', onclick: onClose })] })] }));
};
//# sourceMappingURL=SpringPopup.js.map