import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GREEN } from '@/utils/Constants.ts';
import { Container, Graphics, Text } from '@pixi/react';
import { gsap } from 'gsap';
import { useHLF, useStateAnimations } from 'html-living-framework/react';
import { TextStyle } from 'pixi.js';
import React from 'react';
export const ExamplePopup = ({ id, animationState, size, onInAnimationComplete, onOutAnimationComplete }) => {
    const hidePopup = useHLF((globalState) => globalState.hidePopup);
    const containerRef = React.useRef(null);
    const textRef = React.useRef(null);
    const closeRef = React.useRef(null);
    const animateIn = React.useCallback(() => {
        const timeline = gsap.timeline();
        timeline.fromTo(containerRef.current, { alpha: 0, y: '+=20' }, { alpha: 1, duration: 0.5, y: 0 });
        timeline.fromTo([textRef.current, closeRef.current], { alpha: 0 }, { alpha: 1, duration: 0.4 });
        return timeline;
    }, [containerRef, textRef, closeRef]);
    const animateOut = React.useCallback(() => {
        const timeline = gsap.timeline();
        timeline.to(containerRef.current, { alpha: 0, y: '-=20', duration: 0.3 });
        return timeline;
    }, [containerRef]);
    useStateAnimations(animationState, animateIn, animateOut, onInAnimationComplete, onOutAnimationComplete);
    const onClose = React.useCallback(() => {
        hidePopup(id);
    }, [id]);
    return (_jsxs(Container, { ref: containerRef, children: [_jsx(Graphics, { draw: (g) => {
                    g.clear();
                    g.beginFill(0x000000, 0.5);
                    g.drawRect(0, 0, size.width, size.height);
                    g.endFill();
                } }), _jsx(Graphics, { anchor: 0.5, x: size.width * 0.5, y: size.height * 0.5, draw: (g) => {
                    g.clear();
                    g.beginFill(GREEN, 0.9);
                    g.drawRoundedRect(-450, -200, 900, 400, 20);
                    g.endFill();
                } }), _jsx(Text, { ref: textRef, anchor: 0.5, x: size.width * 0.5, y: size.height * 0.5, text: `Popup: ${id}`, style: new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 }) }), _jsx(Text, { ref: closeRef, anchor: [1, 0], x: size.width * 0.5 + 400, y: size.height * 0.5 - 170, text: `Close X`, style: new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 32 }), cursor: 'pointer', eventMode: 'static', onclick: onClose })] }));
};
//# sourceMappingURL=ExamplePopup.js.map