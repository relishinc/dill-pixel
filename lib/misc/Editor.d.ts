import { Application as PIXIApplication, Container as PIXIContainer, DisplayObject, FederatedPointerEvent, Graphics, HTMLText } from 'pixi.js';
import { Application } from '../core';
export interface IEditableContainer extends PIXIContainer {
    editable?: boolean;
    childrenEditable?: boolean;
}
export declare class Editor {
    container: IEditableContainer;
    application?: PIXIApplication<import("pixi.js").ICanvas> | undefined;
    _childStore: Set<{
        child: any;
        data: any;
    }>;
    _data: any;
    _children: DisplayObject[];
    _storedStageData: any;
    _isDragging: boolean;
    _selectedChild: DisplayObject | null;
    _offset: {
        x: number;
        y: number;
    };
    _gfx: Graphics;
    _text: HTMLText;
    protected stage: PIXIContainer | null;
    get app(): Application;
    constructor(container: IEditableContainer, application?: PIXIApplication<import("pixi.js").ICanvas> | undefined);
    init(): void;
    destroy(): void;
    remove(child: any): void;
    addChildListeners(child: DisplayObject): void;
    onContainerChildAdded(child: DisplayObject): void;
    onChildPointerOver(event: FederatedPointerEvent): void;
    onChildPointerOut(event: FederatedPointerEvent): void;
    drawBounds(target: any): void;
    setText(data: {
        [prop: string]: number;
    }): void;
    onChildPointerDown(event: FederatedPointerEvent): void;
    onStagePointerMove(event: FederatedPointerEvent): void;
    onStagePointerUp(): void;
    protected clear(): void;
    findChildren(container: PIXIContainer): void;
    getName(object: any): string;
    outputJSON(): void;
}
//# sourceMappingURL=Editor.d.ts.map