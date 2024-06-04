import { Constructor } from 'dill-pixel';
import { Entity } from './Entity';

export declare const HasEntity: <TBase extends Constructor>(Base: TBase) => {
    new (...args: any[]): {
        _entity: Entity;
        entity: Entity;
    };
} & TBase;
//# sourceMappingURL=mixins.d.ts.map