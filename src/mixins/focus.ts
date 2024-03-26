import { PointerEvents } from 'pixi.js';
import { IFocusable } from '../modules/default/focus/FocusManager';
import { PIXIContainer } from '../pixi';
import { Signal } from '../signals';
import { Constructor } from '../utils/types';

export function Focusable<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IFocusable> {
  return class extends Base implements IFocusable {
    isFocused = false;
    isKeyDown = false;
    focusEnabled = true;

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
      this.eventMode = 'static';
    }

    public focus() {
      if (!this.isKeyDown) {
        this.isKeyDown = true;
        // @ts-ignore
        this.emit('pointerdown', { type: 'pointerdown' });
        window.removeEventListener('keyup', this._handleKeyUp.bind(this));
        window.addEventListener('keyup', this._handleKeyUp.bind(this));
      }
    }

    public focusIn() {
      //@ts-ignore
      this.emit('pointerover', { type: 'pointerover' });
    }

    public blur() {
      if (!this.isKeyDown) {
        window.removeEventListener('keyup', this._handleKeyUp.bind(this));
      }
    }

    public focusOut() {
      if (!this.isKeyDown) {
        window.removeEventListener('keyup', this._handleKeyUp.bind(this));
        //@ts-ignore
        this.emit('pointerout', { type: 'pointerout' });
      }
    }

    public getFocusPosition() {
      return null;
    }

    public getFocusArea() {
      return this.getBounds();
    }

    protected _handleKeyUp(e: KeyboardEvent) {
      if (this.isFocused && (e.key === 'Enter' || e.key === ' ')) {
        console.log(this, 'handlekeyup', this.isKeyDown, this.label);
        if (!this.isKeyDown) {
          return;
        }
        window.removeEventListener('keyup', this._handleKeyUp.bind(this));
        // @ts-ignore
        this.emit('click', { type: 'click' });
        this.isKeyDown = false;
      }
    }
  } as unknown as TBase & Constructor<IFocusable>;
}
