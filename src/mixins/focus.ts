import { Application } from 'dill-pixel';
import { FederatedEvent, PointerEvents } from 'pixi.js';
import { PIXIContainer } from '../pixi';
import { IFocusable } from '../plugins/focus/FocusManager';
import { Signal } from '../signals';
import { Constructor } from '../utils/types';

export function Focusable<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IFocusable> {
  return class extends Base implements IFocusable {
    _accessibleDiv: HTMLElement;
    isFocused = false;
    isKeyDown = false;
    focusEnabled = true;
    tabIndex = 0;
    // pixi accessibility options
    accessible = false;
    accessibleType: 'button' | 'div' | 'heading' = 'button';
    accessibleTitle = 'Focusable';
    accessibleHint = 'Press enter to focus';
    accessiblePointerEvents: PointerEvents = 'auto';
    accessibleChildren = true;
    // signals
    onFocus = new Signal<(focusable: IFocusable) => void>();
    onFocusIn = new Signal<(focusable: IFocusable) => void>();
    onFocusOut = new Signal<(focusable: IFocusable) => void>();
    onBlur = new Signal<(focusable: IFocusable) => void>();

    private _eventsDisabled: boolean = false;

    constructor(...args: any[]) {
      super(...args);
      this.eventMode = 'static';
      this.on('mouseover', this._onMouseOver);
      this.on('mousedown', this._onMouseDown);
      this.on('click', this._handleClick);
    }

    get app() {
      return Application.getInstance();
    }

    public focusIn() {
      if (this.app.focus.active) {
        // @ts-ignore
        this.emit('pointerover', { type: 'pointerover' });
      }
    }

    public blur() {
      if (!this.isKeyDown) {
        window.removeEventListener('keyup', this._handleKeyUp.bind(this));
      }
    }

    public focusOut() {
      if (!this.isKeyDown) {
        window.removeEventListener('keyup', this._handleKeyUp.bind(this));
      }
      if (this.app.focus.active) {
        //@ts-ignore
        this.emit('pointerout', { type: 'pointerout' });
      }
    }

    public click() {}

    public getFocusPosition() {
      return null;
    }

    public getFocusArea() {
      return this.getBounds();
    }

    protected _onMouseOver(e: FederatedEvent) {
      this.app.focus.setFocus(this);
    }

    protected _onMouseDown(e: FederatedEvent) {
      // @ts-ignore
      this._maybeEmit('pointerdown', e);
    }

    protected _handleClick(e: FederatedEvent) {
      this._maybeEmit('click', e);
      this.click();
    }

    protected _handleKeyUp(e: KeyboardEvent) {}

    private _maybeEmit(type: string, e: FederatedEvent) {
      if (this._eventsDisabled || e.type) {
        return;
      }
      this._eventsDisabled = true;
      this.emit(type, { type });
      this._eventsDisabled = false;
    }
  } as unknown as TBase & Constructor<IFocusable>;
}

Focusable.INITTED = false;
