import { PIXIContainer } from '../pixi';
import { IFocusable } from '../plugins/focus/FocusManagerPlugin';
import { Constructor } from '../utils/types';

export declare function Focusable<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IFocusable>;
export declare namespace Focusable {
    var INITTED: boolean;
}
//# sourceMappingURL=focus.d.ts.map