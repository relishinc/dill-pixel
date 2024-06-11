import { Container, Rectangle } from 'pixi.js';
import { IApplication, IPlugin, Plugin } from 'dill-pixel';
import { IEngineDefinition, IRunnerOptions } from 'matter-js';
import { System } from './System';

export interface IMatterPhysicPlugin extends IPlugin {
}
export type MatterPhysicsPluginOptions = {
    debug: boolean;
    autoInit: boolean;
    container?: Container;
    worldBounds?: Rectangle;
    createWalls?: {
        thickness: number;
        top?: boolean;
        bottom?: boolean;
        left?: boolean;
        right?: boolean;
    };
    engine: Partial<IEngineDefinition>;
    runner: Partial<IRunnerOptions>;
};
export declare class MatterPhysicsPlugin extends Plugin implements IMatterPhysicPlugin {
    private _options;
    initialize(_app: IApplication, options?: Partial<MatterPhysicsPluginOptions>): void | Promise<void>;
    get system(): typeof System;
}
//# sourceMappingURL=MatterPhysicsPlugin.d.ts.map