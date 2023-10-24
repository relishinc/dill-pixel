import { _ReactPixi } from '@pixi/react';
import React from 'react';
export interface IContainerProps extends _ReactPixi.IContainer {
    children?: React.ReactNode;
    editMode?: boolean;
    editable?: boolean;
    childrenEditable?: boolean;
}
export declare const Container: React.ForwardRefExoticComponent<Omit<IContainerProps, "ref"> & React.RefAttributes<import("pixi.js").Container<import("pixi.js").DisplayObject>>>;
//# sourceMappingURL=Container.d.ts.map