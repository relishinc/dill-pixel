import { IApplication } from '../../../core/Application';
import { Plugin } from '../../Plugin';
import { System } from './System';
type TowerFallPhysicsPluginOptions = {
    gridCellSize: number;
    fps: number;
};
export declare class TowerFallPhysicsPlugin extends Plugin {
    readonly id = "TowerFallPhysicsPlugin";
    options: TowerFallPhysicsPluginOptions;
    get system(): typeof System;
    initialize(app: IApplication, options?: Partial<TowerFallPhysicsPluginOptions>): Promise<void>;
}
export {};
