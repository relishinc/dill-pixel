import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBaseStateAnimations } from '@/hooks/useBaseStateAnimations';
import { BasicStateBackground } from '@/ui/BasicStateBackground';
import { List } from '@/ui/List';
import { whiteTextStyle } from '@/utils/text.ts';
import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
export const UIListExample = ({ size, animationState, onInAnimationComplete, onOutAnimationComplete }) => {
    const containerRef = useBaseStateAnimations(animationState, onInAnimationComplete, onOutAnimationComplete);
    return (_jsxs(Container, { ref: containerRef, children: [_jsx(BasicStateBackground, {}), _jsx(Text, { text: `UI List`, x: 30, y: 30, anchor: 0, style: new TextStyle({ fontFamily: 'Arial', fontWeight: 'bold', fill: 0xffffff, fontSize: 48 }) }), _jsxs(List, { type: 'horizontal', elementsMargin: 50, horPadding: 40, x: size.width * 0.5, y: size.height * 0.5, anchor: [0.5, 0.5], children: [_jsx(Text, { text: `Item 1`, style: whiteTextStyle(24) }), _jsx(Text, { text: `Item 2`, style: whiteTextStyle(24) }), _jsx(Text, { text: `Item 3`, style: whiteTextStyle(24) }), _jsx(Text, { text: `Item 4`, style: whiteTextStyle(24) })] })] }));
};
UIListExample.hasStateAnimations = true;
//# sourceMappingURL=UIListExample.js.map