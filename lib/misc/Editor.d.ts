import { Container as PIXIContainer, DisplayObject, FederatedPointerEvent, Graphics, HTMLText } from 'pixi.js';
import { Application } from '../core';
import { Container } from '../gameobjects';
export declare class Editor {
    container: Container;
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
    get app(): Application;
    constructor(container: Container);
    init(): void;
    destroy(): void;
    remove(child: any): void;
    addChildListeners(child: DisplayObject): void;
    onContainerChildAdded(child: DisplayObject): void;
    onChildPointerOver(event: FederatedPointerEvent): void;
    drawBounds(target: any): void;
    setText(data: {
        [prop: string]: number;
    }): void;
    onChildPointerDown(event: FederatedPointerEvent): void;
    onStagePointerMove(event: FederatedPointerEvent): void;
    onStagePointerUp(): void;
    findChildren(container: PIXIContainer): void;
    getName(object: any): string;
    outputJSON(): void;
}
//# sourceMappingURL=Editor.d.ts.map