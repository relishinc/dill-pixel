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
    destroy(_options?: IDestroyOptions | boolean): void;
    onResize(_size: IPoint): void;
    handleChildAdded(child: any): void;
    handleChildRemoved(): void;
    layout(immediate?: boolean): void;
    private _layout;
}
//# sourceMappingURL=FlexContainer.d.ts.map