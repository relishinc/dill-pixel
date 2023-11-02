import { IDestroyOptions, IPoint } from 'pixi.js';
import { Signal } from 'typed-signals';
import { PointLike } from '../utils';
import { Container } from './Container';
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
    private _layoutTimeout;
    set gap(value: number);
    get gap(): number;
    set flexWrap(value: 'wrap' | 'nowrap');
    get flexWrap(): 'wrap' | 'nowrap';
    set flexDirection(value: 'row' | 'column');
    get flexDirection(): 'row' | 'column';
    set alignItems(value: 'center' | 'flex-start' | 'flex-end');
    get alignItems(): 'center' | 'flex-start' | 'flex-end';
    set justifyContent(value: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end');
    get justifyContent(): 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
    set containerHeight(value: number);
    get containerHeight(): number;
    set containerWidth(value: number);
    get containerWidth(): number;
    set size(size: PointLike);
    get size(): {
        width: number;
        height: number;
    };
    constructor(settings?: Partial<FlexContainerSettings>);
    handleChildAdded(child: any): void;
    handleChildRemoved(child: any): void;
    destroy(_options?: IDestroyOptions | boolean): void;
    onResize(_size: IPoint): void;
    layout(immediate?: boolean): void;
    private _layout;
}
//# sourceMappingURL=FlexContainer.d.ts.map