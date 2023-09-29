import { jsx as _jsx } from "react/jsx-runtime";
import { Container, Graphics, useTick } from '@pixi/react';
import React from 'react';
export const Platform = React.forwardRef((props, ref) => {
    const innerRef = React.useRef(null);
    const [color, setColor] = React.useState(0x000000);
    React.useImperativeHandle(ref, () => {
        return {
            initialColor: 0x0,
            setColor,
            container: innerRef.current,
        };
    });
    return (_jsx(Container, { ref: innerRef, x: props.x, y: props.y, children: _jsx(Graphics, { draw: (g) => {
                g.clear();
                g.beginFill(color);
                g.drawRect(0, 0, props.width, props.height);
                g.endFill();
            } }) }));
});
export const MovingPlatform = React.forwardRef((props, ref) => {
    const innerRef = React.useRef(null);
    const [movementThreshold, setMovementThreshold] = React.useState(props.threshold ?? 200);
    const [currentPosition, setCurrentPosition] = React.useState({ x: props.x, y: props.y });
    const [direction, setDirection] = React.useState('down');
    const [color, setColor] = React.useState(0x00fff0);
    useTick((delta) => {
        const newPosition = { ...currentPosition };
        if (direction === 'down') {
            newPosition.y += props?.speed ?? 1;
        }
        else {
            newPosition.y -= props?.speed ?? 1;
        }
        setCurrentPosition(newPosition);
        // if we've reached the bottom, start going up
        if (newPosition.y >= props.y + movementThreshold) {
            setDirection('up');
        }
        else if (newPosition.y <= props.y - movementThreshold) {
            setDirection('down');
        }
    });
    // reset the current position if the props change
    React.useEffect(() => {
        setCurrentPosition({ x: props.x, y: props.y });
    }, [props.x, props.y]);
    React.useImperativeHandle(ref, () => {
        return {
            initialColor: 0x00fff0,
            setColor,
            container: innerRef.current,
        };
    });
    return (_jsx(Container, { ref: innerRef, x: currentPosition.x, y: currentPosition.y, children: _jsx(Graphics, { draw: (g) => {
                g.clear();
                g.beginFill(color);
                g.drawRect(0, 0, props.width, props.height);
                g.endFill();
            } }) }));
});
//# sourceMappingURL=Platform.js.map