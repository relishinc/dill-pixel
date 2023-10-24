import { jsx as _jsx } from "react/jsx-runtime";
import { Container as ReactPIXIContainer, useApp } from '@pixi/react';
import React from 'react';
import { Editor } from '../../misc';
export const Container = React.forwardRef(({ editMode = false, editable = true, childrenEditable = true, ...props }, ref) => {
    const isEditable = React.useRef(false);
    const internalRef = React.useRef(null);
    const editor = React.useRef(null);
    const app = useApp();
    // ensure we can access the ref both internally and externally
    React.useImperativeHandle(ref, () => internalRef.current);
    React.useEffect(() => {
        const container = internalRef.current;
        container.editable = editable;
        container.childrenEditable = childrenEditable;
        if (editMode && !isEditable.current) {
            editor.current = new Editor(container, app);
        }
        else if (!editMode && isEditable.current) {
            if (editor.current) {
                editor.current.destroy();
            }
        }
        return () => {
            if (editor.current) {
                editor.current.destroy();
            }
        };
    }, [editMode, editable]);
    return _jsx(ReactPIXIContainer, { ref: internalRef, ...props });
});
//# sourceMappingURL=Container.js.map