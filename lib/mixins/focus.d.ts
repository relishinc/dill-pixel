import { IFocusable } from '../modules/focus/FocusManager';
import { PIXIContainer } from '../pixi';
import { Constructor } from '../utils/types';
export declare function Focusable<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IFocusable>;
export declare namespace Focusable {
    var INITTED: boolean;
}
//# sourceMappingURL=focus.d.ts.map