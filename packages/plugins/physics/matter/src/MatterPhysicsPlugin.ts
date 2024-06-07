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
    createWalls?: { thickness: number, top?: boolean, bottom?: boolean, left?: boolean, right?: boolean }
    engine: Partial<IEngineDefinition>,
    runner: Partial<IRunnerOptions>,
}

const defaultOptions = {
    debug: false,
    autoInit: false,
    engine: {
    },
    runner: {
        delta: 1000 / 60,
        isFixed: false,
        enabled: true,
    }
}

export class MatterPhysicsPlugin extends Plugin implements IMatterPhysicPlugin { 
    private _options: MatterPhysicsPluginOptions;
    initialize(_app: IApplication, options?: Partial<MatterPhysicsPluginOptions>): void | Promise<void> {
        this._options = {
            ...defaultOptions, ...options, runner: { ...defaultOptions.runner, ...options?.runner }, engine: { ...defaultOptions.engine, ...options?.engine }
        }
        if (this._options.autoInit) {
            System.initialize(this._options);
        }
    }

    get system(): typeof System {
        return System;
    }
}


