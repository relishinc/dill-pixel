import { FederatedEvent, PointerEvents } from 'pixi.js';
import { Application } from '../Application';
import { PIXIContainer } from '../pixi';
import type { IFocusable } from '../plugins';
import { Signal } from '../signals';
import type { Constructor, PointLike } from '../utils';

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
      this.on('tap', this._handleClick);
    }

    get app() {
      return Application.getInstance();
    }

    public focusIn() {
      if (this.app.focus.active) {
        // @ts-expect-error Argument of type { type: string; } is not assignable to parameter of type FederatedPointerEvent
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
        // @ts-expect-error Argument of type { type: string; } is not assignable to parameter of type FederatedPointerEvent
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

    public getFocusSize(): PointLike | null {
      return [this.getFocusArea().width, this.getFocusArea().height];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _onMouseOver(_e: MouseEvent) {
      this.app.focus.setFocus(this);
    }

    protected _onMouseDown(e: FederatedEvent) {
      this._maybeEmit('pointerdown', e);
    }

    protected _handleClick(e: FederatedEvent) {
      this._maybeEmit('click', e);
      this.click();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _handleKeyUp(_e: KeyboardEvent) {}

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
