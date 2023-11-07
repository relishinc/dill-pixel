import { jsx as _jsx } from "react/jsx-runtime";
import { Container } from '@pixi/react-animated';
import * as React from 'react';
export const FlexContainer = React.forwardRef((props, ref) => {
    const { width = 0, height = 0, gap = 0, flexDirection = 'row', flexWrap = 'nowrap', alignItems = 'flex-start', justifyContent = 'flex-start', children, } = props;
    const childRefs = React.useRef([]);
    const [layoutProps, setLayoutProps] = React.useState([]);
    React.useEffect(() => {
        let x = 0;
        let y = 0;
        let rowHeight = 0;
        let columnWidth = 0;
        let nextRowY = 0; // y-coordinate of the next row
        let nextColumnX = 0; // x-coordinate of the next column
        const newLayoutProps = [];
        const items = childRefs.current.filter(Boolean);
        let lineItems = [];
        let lineStart = 0;
        const shouldWrap = (childRef, x, y) => {
            if ((flexDirection === 'row' && flexWrap === 'nowrap') || (flexDirection === 'column' && flexWrap === 'nowrap')) {
                return false;
            }
            return ((flexDirection === 'row' && x + childRef.width + gap > width) ||
                (flexDirection === 'column' && y + childRef.height + gap > height));
        };
        const handleWrap = () => {
            if (flexDirection === 'row') {
                nextRowY += rowHeight + gap;
            }
            else {
                nextColumnX += columnWidth + gap;
            }
            x = 0;
            y = 0;
            rowHeight = 0;
            columnWidth = 0;
        };
        const updateLayoutVariables = (childRef) => {
            if (flexDirection === 'row') {
                x += childRef.width + gap;
                rowHeight = Math.max(rowHeight, childRef.height);
            }
            else {
                y += childRef.height + gap;
                columnWidth = Math.max(columnWidth, childRef.width);
            }
        };
        const getNextX = (currentX) => (flexDirection === 'row' ? currentX : nextColumnX);
        const getNextY = (currentY) => (flexDirection === 'column' ? currentY : nextRowY);
        const handleJustification = (lineItems, lineStart, lineEnd, direction) => {
            const extraSpace = (direction === 'row' ? width : height) - (lineEnd - lineStart);
            lineItems.forEach(({ index, width, height }, i) => {
                let offset = 0;
                switch (justifyContent) {
                    case 'flex-start':
                        break; // Do nothing
                    case 'flex-end':
                        offset = extraSpace;
                        break;
                    case 'center':
                        offset = extraSpace / 2;
                        break;
                    case 'space-between':
                        offset = lineItems.length > 1 ? i * (extraSpace / (lineItems.length - 1)) : 0;
                        break;
                    case 'space-around':
                        offset = (extraSpace / lineItems.length) * i + extraSpace / (2 * lineItems.length);
                        break;
                    case 'space-evenly':
                        offset = (extraSpace / (lineItems.length + 1)) * (i + 1);
                        break;
                }
                if (direction === 'row') {
                    newLayoutProps[index].x += offset;
                }
                else {
                    newLayoutProps[index].y += offset;
                }
            });
        };
        const handleAlignment = (newLayoutProps, items) => {
            newLayoutProps.forEach((props, index) => {
                const childRef = items[index];
                if (!childRef)
                    return;
                if (flexDirection === 'row') {
                    switch (alignItems) {
                        case 'flex-start':
                            break;
                        case 'flex-end':
                            props.y += rowHeight - childRef.height;
                            break;
                        case 'center':
                            props.y += (rowHeight - childRef.height) / 2;
                            break;
                        case 'stretch':
                            childRef.height = rowHeight;
                            break;
                        // Handle 'baseline' as needed
                    }
                }
                else {
                    switch (alignItems) {
                        case 'flex-start':
                            break;
                        case 'flex-end':
                            props.x += (width || columnWidth) - childRef.width;
                            break;
                        case 'center':
                            props.x += ((width || columnWidth) - childRef.width) / 2;
                            break;
                        case 'stretch':
                            childRef.width = columnWidth;
                            break;
                        // Handle 'baseline' as needed
                    }
                }
            });
        };
        items.forEach((childRef, index) => {
            if (!childRef)
                return;
            // Check for wrapping
            if (flexWrap === 'wrap' && shouldWrap(childRef, x, y)) {
                handleJustification(lineItems, lineStart, flexDirection === 'column' ? y - gap : x - gap, flexDirection);
                handleWrap();
                lineItems = [];
                lineStart = x;
            }
            lineItems.push({ index, width: childRef.width, height: childRef.height });
            // Position child
            newLayoutProps[index] = { x: getNextX(x), y: getNextY(y) };
            // Update layout variables
            updateLayoutVariables(childRef);
        });
        // Justify the last line
        handleJustification(lineItems, lineStart, flexDirection === 'column' ? y - gap : x - gap, flexDirection);
        handleAlignment(newLayoutProps, items);
        setLayoutProps(newLayoutProps);
    }, [children, flexDirection, flexWrap, alignItems, justifyContent, width, height, gap]);
    return (_jsx(Container, { ref: ref, x: props.x ?? 0, y: props.y ?? 0, children: React.Children.map(children, (child, index) => {
            const { x, y } = layoutProps[index] || { x: 0, y: 0 };
            return React.cloneElement(child, {
                x,
                y,
                ref: (ref) => {
                    childRefs.current[index] = ref;
                },
            });
        }) }));
});
export default FlexContainer;
//# sourceMappingURL=FlexContainer.js.map