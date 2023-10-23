import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from '@pixi/react';
import React from 'react';
function toPointLike(ptToConvert) {
    if (Array.isArray(ptToConvert)) {
        return { x: ptToConvert[0], y: ptToConvert[1] ?? 0 };
    }
    else if (typeof ptToConvert === 'number') {
        return { x: ptToConvert, y: ptToConvert };
    }
    else {
        return ptToConvert;
    }
}
export const useContainerAnchor = (anchor, dimensions, vertPadding, horPadding, ...deps) => {
    return React.useMemo(() => {
        if (!anchor || !dimensions || dimensions?.width === 0 || dimensions?.height === 0) {
            return { x: 0, y: 0 };
        }
        const pivot = toPointLike(anchor ?? 0);
        pivot.x *= dimensions.width;
        pivot.y *= dimensions.height;
        return pivot;
    }, [anchor, dimensions, vertPadding, horPadding, ...deps]);
};
export const List = ({ children, type, elementsMargin, vertPadding, horPadding, anchor, ...props }) => {
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
    const [accumulatedWidths, setAccumulatedWidths] = React.useState([]);
    const [accumulatedHeights, setAccumulatedHeights] = React.useState([]);
    const [totalWidth, setTotalWidth] = React.useState(0);
    const [totalHeight, setTotalHeight] = React.useState(0);
    const containerRef = React.useRef(null);
    const childRefs = React.useRef([]);
    React.useEffect(() => {
        const newAccumulatedWidths = [];
        const newAccumulatedHeights = [];
        let currentWidth = 0;
        let currentHeight = 0;
        childRefs.current.forEach((child, index) => {
            const isLast = index === childRefs.current.length - 1;
            if (child) {
                newAccumulatedWidths[index] = currentWidth;
                newAccumulatedHeights[index] = currentHeight;
                currentWidth += child.width + (isLast ? 0 : elementsMargin ?? 0);
                currentHeight += child.height + (isLast ? 0 : elementsMargin ?? 0);
            }
        });
        setAccumulatedWidths(newAccumulatedWidths);
        setAccumulatedHeights(newAccumulatedHeights);
        setTotalWidth(currentWidth);
        setTotalHeight(currentHeight);
    }, [children, elementsMargin, vertPadding, horPadding]);
    React.useEffect(() => {
        setTimeout(() => {
            if (containerRef.current) {
                setDimensions({
                    width: (containerRef.current.width ?? 0) + (horPadding ?? 0) * 2,
                    height: (containerRef.current.height ?? 0) + (vertPadding ?? 0) * 2,
                });
            }
        }, 0);
    }, [children, totalWidth, totalHeight]);
    const pivot = useContainerAnchor(anchor ?? { x: 0, y: 0 }, dimensions, vertPadding, horPadding, children);
    return (_jsx(Container, { ...props, pivot: pivot, children: _jsx(Container, { ref: containerRef, x: horPadding, y: vertPadding, children: React.Children.map(children, (child, index) => {
                const xPosition = accumulatedWidths[index] || 0;
                const yPosition = accumulatedHeights[index] || 0;
                return React.cloneElement(child, {
                    x: type === 'horizontal' ? xPosition : 0,
                    y: type === 'vertical' ? yPosition : 0,
                    ref: (ref) => {
                        childRefs.current[index] = ref;
                    },
                });
            }) }) }));
};
//# sourceMappingURL=List.js.map