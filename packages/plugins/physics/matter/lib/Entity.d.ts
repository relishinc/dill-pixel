import { Container, Size } from 'dill-pixel';
import { IMatterPhysicsObject } from './interfaces';
import { Container as PIXIContainer } from 'pixi.js';
import { PhysicsBodyType } from './constants';
import { System } from './System';

export type EntityConfig = {
    bodyType?: PhysicsBodyType;
    size?: Size;
    view?: PIXIContainer;
};
export declare class Entity extends Container implements IMatterPhysicsObject {
    config: Partial<EntityConfig>;
    static readonly DEFAULT_DEBUG_COLOR: number;
    body: Matter.Body;
    view: PIXIContainer;
    bodyType: PhysicsBodyType;
    constructor(config?: Partial<EntityConfig>);
    get debugColor(): number;
    get system(): typeof System;
    added(): void;
    onRemoved(): void;
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=Entity.d.ts.map