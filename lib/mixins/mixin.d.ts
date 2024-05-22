import { Constructor } from '../utils/types';
import { IAnimated } from './animated';

export declare function mixin<TBase extends Constructor<any>>(base: <TBase extends Constructor>(Base: TBase) => TBase & Constructor<IAnimated>, ...mixins: ((base: TBase) => Constructor)[]): (base: TBase) => Constructor;
//# sourceMappingURL=mixin.d.ts.map