import { Constructor } from "dill-pixel";
import { Entity } from "./Entity";

// mixin to add data accessor to bodies

export const HasEntity = <TBase extends Constructor>(Base: TBase) => {
    return class extends Base {
        _entity: Entity;

        get entity(): Entity {
            return this._entity;
        }

        set entity(value: Entity) {
            this._entity = value;
        }

        constructor(...args: any[]) {
            super(...args);
        }
    };
};