import { Engine, Runner } from 'matter-js';
import { Container, Rectangle } from 'pixi.js';
import { IMatterPhysicsObject } from './interfaces';
import { MatterBodyLike } from './types';
import { MatterPhysicsPluginOptions } from './MatterPhysicsPlugin';

export declare class System {
    static pluginOptions: Partial<MatterPhysicsPluginOptions>;
    static container: Container;
    private static _options;
    private static _debug;
    private static _enabled;
    private static _runner;
    private static _engine;
    private static _bounds;
    private static _objects;
    private static _debugGraphics;
    private static get app();
    static set enabled(value: boolean);
    static get enabled(): boolean;
    static set debug(value: boolean);
    static get debug(): boolean;
    static get engine(): Engine;
    static get runner(): Runner;
    static get bounds(): Rectangle;
    static set bounds(bounds: Rectangle);
    static initialize(options: Partial<MatterPhysicsPluginOptions>): void;
    static addToWorld(...objects: (IMatterPhysicsObject | MatterBodyLike)[]): void;
    static removeFromWorld(...objects: (IMatterPhysicsObject | MatterBodyLike)[]): void;
    private static update;
    static drawDebug(): void;
}
//# sourceMappingURL=System.d.ts.map