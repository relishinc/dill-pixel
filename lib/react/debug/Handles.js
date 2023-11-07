import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// TODO: finish logic for handles
// a component that wraps another component and displays handles that can transform its scale, rotation, and position
import { Container, Graphics, useApp } from '@pixi/react';
import React from 'react';
export const Handle = React.forwardRef((props, ref) => {
    const { color = 0x00ff00, ...rest } = props;
    // just draws a circle
    const draw = React.useCallback((g) => {
        g.clear();
        g.beginFill(color).drawCircle(0, 0, 10).endFill();
    }, [color, rest]);
    return _jsx(Graphics, { eventMode: 'static', cursor: 'grab', ref: ref, draw: draw, ...props });
});
export const Dragger = React.forwardRef((props, ref) => {
    // just draws a circle
    const draw = React.useCallback((g) => {
        g.clear();
        g.beginFill(0xff0000, 0.25).drawRect(0, 0, props.width, props.height).endFill();
    }, [props]);
    return _jsx(Graphics, { eventMode: 'static', cursor: 'grab', ref: ref, draw: draw, ...props });
});
export const Handles = React.forwardRef((props, ref) => {
    const { stage } = useApp();
    const { children, ...rest } = props;
    const containerRef = React.useRef(null);
    const handlesContainerRef = React.useRef(null);
    React.useImperativeHandle(ref, () => containerRef.current);
    // check if there are more than one child, and if so, throw an error
    if (React.Children.count(children) > 1) {
        throw new Error('Handles can only have one child.');
    }
    // get the child's props
    const child = React.Children.only(children);
    const childProps = child.props;
    const propsList = ['x', 'y', 'position', 'scale', 'rotation', 'angle'];
    // check childProps for any of the props in propsList and add them to a new props object
    const propsFromChild = propsList.reduce((acc, prop) => {
        if (childProps[prop]) {
            // @ts-ignore
            acc[prop] = childProps[prop];
        }
        return acc;
    }, {});
    // the properties we want to be able to adjust on the child component
    // bind them to the original props from the child component to start
    const [scale, setScale] = React.useState(propsFromChild?.scale || { x: 1, y: 1 });
    const [rotation, setRotation] = React.useState(propsFromChild?.rotation || 0);
    const [position, setPosition] = React.useState(propsFromChild?.position || { x: 0, y: 0 });
    // dragging logic
    const target = React.useRef(null);
    const isDragging = React.useRef(false);
    const draggingMode = React.useRef('none');
    const mouseOffset = React.useRef({ x: 0, y: 0 });
    const initialMousePos = React.useRef({ x: 0, y: 0 });
    const initialScale = React.useRef({ x: 0, y: 0 });
    const mousePos = React.useRef({ x: 0, y: 0 });
    const handlePointerMove = React.useCallback((e) => {
        mousePos.current = containerRef.current.parent.parent.toLocal(e.global);
        mousePos.current.x -= mouseOffset.current.x;
        mousePos.current.y -= mouseOffset.current.y;
        const dist = {
            x: Math.abs(mousePos.current.x - initialMousePos.current.x),
            y: Math.abs(mousePos.current.y - initialMousePos.current.y),
        };
        const newScale = {
            x: initialScale.current.x + dist.x / containerRef.current.width,
            y: initialScale.current.y + dist.y / containerRef.current.height,
        };
        switch (draggingMode.current) {
            case 'position':
                setPosition({ x: mousePos.current.x, y: mousePos.current.y });
                break;
            case 'scale':
                setScale(newScale);
                break;
        }
    }, [containerRef.current, setPosition, setScale, draggingMode.current, mousePos.current]);
    const handlePointerDown = React.useCallback((e) => {
        if (isDragging.current) {
            return;
        }
        // @ts-ignore
        target.current = e.target;
        const name = target.current.name;
        const localPos = containerRef.current.toLocal(e.global) || { x: 0, y: 0 };
        mouseOffset.current = {
            x: localPos.x * scale.x,
            y: localPos.y * scale.y,
        };
        initialMousePos.current = handlesContainerRef.current.parent.parent.toLocal(e.global);
        initialScale.current = { x: handlesContainerRef.current.scale.x, y: handlesContainerRef.current.scale.y };
        isDragging.current = true;
        switch (name) {
            case 'dragger':
                draggingMode.current = 'position';
                break;
            case 'scaleHandle':
                draggingMode.current = 'scale';
                break;
            case 'rotationHandle':
                draggingMode.current = 'rotation';
                break;
        }
        stage.eventMode = 'static';
        stage.on('pointermove', handlePointerMove);
        stage.on('pointerup', handlePointerUp);
        stage.on('pointerupoutside', handlePointerUp);
    }, [stage, scale, containerRef.current]);
    const handlePointerUp = React.useCallback((e) => {
        isDragging.current = false;
        stage.eventMode = 'auto';
        stage.off('pointermove', handlePointerMove);
        stage.off('pointerup', handlePointerUp);
        stage.off('pointerupoutside', handlePointerUp);
    }, [stage]);
    return (_jsxs(Container, { ref: handlesContainerRef, position: position, scale: scale, rotation: rotation, children: [_jsx(Container, { ref: containerRef, children: React.cloneElement(child, { x: 0, y: 0, position: 0, scale: 1, rotation: 0, angle: 0 }) }), _jsx(Dragger, { name: 'dragger', eventMode: 'static', cursor: 'pointer', onpointerdown: handlePointerDown, width: containerRef?.current?.width || 0, height: containerRef?.current?.height || 0 }), _jsx(Handle, { onpointerdown: handlePointerDown, name: 'rotationHandle', color: 0x00fff0, position: [containerRef?.current?.width ? containerRef.current.width * 0.5 : 0, -10] }), _jsx(Handle, { onpointerdown: handlePointerDown, name: 'scaleHandle', position: [0, 0] }), _jsx(Handle, { onpointerdown: handlePointerDown, name: 'scaleHandle', position: [containerRef?.current?.width || 0, 0] }), _jsx(Handle, { onpointerdown: handlePointerDown, name: 'scaleHandle', position: [containerRef?.current?.width || 0, containerRef?.current?.height || 0] }), _jsx(Handle, { onpointerdown: handlePointerDown, name: 'scaleHandle', position: [0, containerRef?.current?.height || 0] })] }));
});
//# sourceMappingURL=Handles.js.map