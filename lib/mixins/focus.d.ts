import { Container } from 'pixi.js';
import { IFocusable } from '../plugins';
import { Constructor } from '../utils';

export declare function Focusable<TBase extends Constructor<Container>>(Base: TBase): TBase & Constructor<IFocusable>;
export declare namespace Focusable {
    var INITTED: boolean;
}
//# sourceMappingURL=focus.d.ts.map