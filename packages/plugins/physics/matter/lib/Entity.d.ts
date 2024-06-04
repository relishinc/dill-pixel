import { IBodyDefinition } from 'matter-js';
import { Container, Size } from 'dill-pixel';
import { IMatterPhysicsObject } from './interfaces';
import { MatterBodyType } from './types';
import { Container as PIXIContainer } from 'pixi.js';
import { System } from './System';

export type EntityConfig = {
    bodyType?: MatterBodyType;
    size?: Size;
    view?: PIXIContainer;
    bodyDefinition?: Partial<IBodyDefinition>;
};
export declare class Entity extends Container implements IMatterPhysicsObject {
    config: Partial<EntityConfig>;
    static readonly DEFAULT_DEBUG_COLOR: number;
    body: Matter.Body;
    view: PIXIContainer;
    bodyType: MatterBodyType;
    bodyDefinition: Partial<IBodyDefinition>;
    constructor(config?: Partial<EntityConfig>);
    get debugColor(): number;
    get system(): typeof System;
    added(): void;
    onRemoved(): void;
    createBody(): void;
    update(): void;
}
//# sourceMappingURL=Entity.d.ts.map