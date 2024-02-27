import { DestroyOptions, PointerEvents } from 'pixi.js';
import { IFocusable } from '../modules';
import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { Constructor } from '../utils';

export function Focusable<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IFocusable> {
  return class extends Base implements IFocusable {
    // pixi accessibility options
    accessible = false;
    accessibleType: 'button' | 'div' | 'heading' = 'button';
    accessibleTitle = 'Focusable';
    accessibleHint = 'Press enter to focus';
    accessiblePointerEvents: PointerEvents = 'auto';
    tabIndex = 0;
    accessibleChildren = false;
    onFocus = new Signal<(focusable: IFocusable) => void>();
    // signals
    onFocusIn = new Signal<(focusable: IFocusable) => void>();
    onFocusOut = new Signal<(focusable: IFocusable) => void>();
    onBlur = new Signal<(focusable: IFocusable) => void>();

    constructor(...args: any[]) {
      super(...args);
    }

    focus() {}

    focusIn() {}

    blur() {}

    focusOut() {}

    public destroy(options: DestroyOptions): void {
      super.destroy(options);
    }
  } as unknown as TBase & Constructor<IFocusable>;
}
