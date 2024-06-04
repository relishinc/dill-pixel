import type { Constructor } from '../utils';
import type { IAnimated } from './animated';

export function mixin<TBase extends Constructor<any>>(
  base: <TBase extends Constructor>(Base: TBase) => TBase & Constructor<IAnimated>,
  ...mixins: ((base: TBase) => Constructor)[]
) {
  // @ts-expect-error Argument of type 'TBase' is not assignable to parameter of type 'Constructor<{}>'.
  return mixins.reduce((accumulator, current) => current(accumulator), base);
}
