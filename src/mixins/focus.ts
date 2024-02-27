import { DestroyOptions } from 'pixi.js';
import { IFocusable } from '../modules';
import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { Constructor } from '../utils';

export function Focusable<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IFocusable> {
  return class extends Base implements IFocusable {
    onFocusBegin = new Signal<(focusable: IFocusable) => void>();
    onFocusEnd = new Signal<(focusable: IFocusable) => void>();
    onFocus = new Signal<(focusable: IFocusable) => void>();

    constructor(...args: any[]) {
      super(...args);
    }

    focusBegin() {}

    focusEnd() {}

    focus() {}

    public destroy(options: DestroyOptions): void {
      super.destroy(options);
    }
  } as unknown as TBase & Constructor<IFocusable>;
}
