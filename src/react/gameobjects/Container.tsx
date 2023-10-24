import { _ReactPixi, Container as ReactPIXIContainer, useApp } from '@pixi/react';
import React from 'react';
import { Editor, IEditableContainer } from '../../misc';
import { IContainer } from '../types';

export interface IContainerProps extends _ReactPixi.IContainer {
  children?: React.ReactNode;
  editMode?: boolean;
  editable?: boolean;
  childrenEditable?: boolean;
}

export const Container = React.forwardRef<IContainer, IContainerProps>(
  ({ editMode = false, editable = true, childrenEditable = true, ...props }, ref) => {
    const isEditable = React.useRef<boolean>(false);
    const internalRef = React.useRef<IContainer>(null);
    const editor = React.useRef<Editor | null>(null);
    const app = useApp();
    // ensure we can access the ref both internally and externally
    React.useImperativeHandle(ref, () => internalRef.current!);
    React.useEffect(() => {
      const container = internalRef.current as IEditableContainer;
      container.editable = editable;
      container.childrenEditable = childrenEditable;
      if (editMode && !isEditable.current) {
        editor.current = new Editor(container, app);
      } else if (!editMode && isEditable.current) {
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

    return <ReactPIXIContainer ref={internalRef} {...props} />;
  },
);
