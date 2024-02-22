import { IExtendedContainer, IFactoryMethods } from './index';
export declare function Factory<T extends IFactoryMethods = IFactoryMethods>(extensions: Partial<T>): new () => IExtendedContainer<T>;
//# sourceMappingURL=mixin.d.ts.map