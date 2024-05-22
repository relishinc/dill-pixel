import { IApplication, Plugin } from 'dill-pixel';
import { System } from './System';

type SnapPhysicsPluginOptions = {
    useSpatialHashGrid: boolean;
    gridCellSize: number;
    fps: number;
};
export declare class SnapPhysicsPlugin extends Plugin {
    readonly id = "SnapPhysicsPlugin";
    options: SnapPhysicsPluginOptions;
    get gridCellSize(): number;
    set gridCellSize(value: number);
    get useSpatialHashGrid(): boolean;
    set useSpatialHashGrid(value: boolean);
    set fps(value: number);
    get system(): typeof System;
    destroy(): void;
    initialize(app: IApplication, options?: Partial<SnapPhysicsPluginOptions>): Promise<void>;
}
export {};
//# sourceMappingURL=SnapPhysicsPlugin.d.ts.map