import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BasicStateBackground } from '@/ui/BasicStateBackground.tsx';
import { List } from '@/ui/List.tsx';
import { Container, Text } from '@pixi/react';
import { gsap } from 'gsap';
import { useStateAnimations } from 'html-living-framework/react';
import { Sprite } from 'html-living-framework/react/gameobjects/Sprite.tsx';
import { TextStyle } from 'pixi.js';
import * as React from 'react';
export const SpriteExample = ({ size, animationState, onInAnimationComplete, onOutAnimationComplete }) => {
    const containerRef = React.useRef(null);
    const animateIn = React.useCallback(() => gsap.fromTo(containerRef.current, { alpha: 0 }, {
        alpha: 1,
        duration: 0.4,
        ease: 'sine.out',
    }), [containerRef.current]);
    const animateOut = React.useCallback(() => gsap.to(containerRef.current, {
        alpha: 0,
        duration: 0.3,
        ease: 'sine.in',
    }), [containerRef.current]);
    useStateAnimations(animationState, animateIn, animateOut, onInAnimationComplete, onOutAnimationComplete);
    return (_jsxs(Container, { ref: containerRef, children: [_jsx(BasicStateBackground, {}), _jsx(Text, { text: `Sprites`, x: 30, y: 30, anchor: 0, style: new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 }) }), _jsxs(List, { type: 'horizontal', elementsMargin: 10, anchor: [0.5, 0.5], x: size.width * 0.5, y: size.height * 0.55, children: [_jsx(Sprite, { asset: 'pickle' }), _jsx(Sprite, { asset: 'lab', sheet: 'buildings' })] })] }));
};
SpriteExample.assets = [
    { srcs: '/assets/images/static/pickle@2x.png', name: 'pickle' },
    { srcs: '/assets/images/spritesheets/buildings@2x.json', name: 'buildings' },
];
SpriteExample.hasStateAnimations = true;
//# sourceMappingURL=SpriteExample.js.map