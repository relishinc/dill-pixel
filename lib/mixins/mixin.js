export function mixin(base, ...mixins) {
    // @ts-expect-error Argument of type 'TBase' is not assignable to parameter of type 'Constructor<{}>'.
    return mixins.reduce((accumulator, current) => current(accumulator), base);
}
