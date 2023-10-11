import { IDestroyOptions } from 'pixi.js';
import { Signal } from 'typed-signals';
import { Container } from './Container';
export type ContainerLike = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export interface FlexContainerSettings {
    width?: number;
    height?: number;
    bindTo?: ContainerLike;
    bindToAppSize?: boolean;
    gap?: number;
    flexWrap?: 'wrap' | 'nowrap';
    flexDirection?: 'row' | 'column';
    alignItems?: 'center' | 'flex-start' | 'flex-end';
    justifyContent?: 'center' | 'space-between' | 'space-around' | 'flex-start' | 'flex-end';
}
export declare class FlexContainer extends Container {
    onLayoutComplete: Signal<() => void>;
    debug: boolean;
    protected _settings: FlexContainerSettings;
    constructor(settings?: Partial<FlexContainerSettings>);
    handleChildAdded(child: any): void;
    handleChildRemoved(child: any): void;
    destroy(_options?: IDestroyOptions | boolean): void;
    protected layoutChildren(): void;
    private layoutRowOrColumn;
}
//# sourceMappingURL=FlexContainer.d.ts.map