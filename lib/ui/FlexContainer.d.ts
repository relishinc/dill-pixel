import { Container as PIXIContainer, DisplayObject, IDestroyOptions, IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { Container } from '../gameobjects';
import { PointLike } from '../utils';
export type ContainerLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export interface FlexContainerSettings {
    width: number;
    height: number;
    bindTo: ContainerLike;
    bindToAppSize: boolean;
    gap: number;
    flexWrap: 'wrap' | 'nowrap';
    flexDirection: 'row' | 'column';
    alignItems: 'center' | 'flex-start' | 'flex-end';
    justifyContent: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
}
export declare class FlexContainer extends Container {
    onLayoutComplete: Signal<() => void>;
    debug: boolean;
    protected paddingLeft: number;
    protected paddingRight: number;
    protected paddingTop: number;
    protected paddingBottom: number;
    protected _settings: FlexContainerSettings;
    protected _childMap: Map<PIXIContainer<DisplayObject>, PIXIContainer<DisplayObject>>;
    protected _flexChildren: DisplayObject[];
    private _reparentAddedChild;
    constructor(settings?: Partial<FlexContainerSettings>);
    get gap(): number;
    set gap(value: number);
    get flexWrap(): 'wrap' | 'nowrap';
    set flexWrap(value: 'wrap' | 'nowrap');
    get flexDirection(): 'row' | 'column';
    set flexDirection(value: 'row' | 'column');
    get alignItems(): 'center' | 'flex-start' | 'flex-end';
    set alignItems(value: 'center' | 'flex-start' | 'flex-end');
    get justifyContent(): 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
    set justifyContent(value: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end');
    get containerHeight(): number;
    set containerHeight(value: number);
    get containerWidth(): number;
    set containerWidth(value: number);
    get size(): {
        width: number;
        height: number;
    };
    set size(size: PointLike);
    get flexChildren(): DisplayObject[];
    destroy(_options?: IDestroyOptions | boolean): void;
    onResize(_size: IPoint): void;
    removeChildAt(index: number): DisplayObject;
    removeChild(...children: DisplayObject[]): DisplayObject;
    addChildAt<U extends DisplayObject = DisplayObject>(child: DisplayObject, index: number): U;
    setChildIndex(child: DisplayObject, index: number): void;
    getChildIndex(child: DisplayObject): number;
    getChildAt(index: number): DisplayObject;
    layout(): void;
    protected handleChildRemoved(child: DisplayObject): void;
    protected deleteChild(child: DisplayObject): boolean;
    protected setFlexChildren(): void;
    protected handleChildAdded(child: any): void;
    private _layout;
}
//# sourceMappingURL=FlexContainer.d.ts.map