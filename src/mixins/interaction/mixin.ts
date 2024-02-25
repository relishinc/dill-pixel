import { DestroyOptions, FederatedEvent } from 'pixi.js';
import { PIXIContainer } from '../../pixi';

// Step 1: Define the base interaction event names
import { Signal } from '../../signals';
import { Constructor } from '../../utils';

// Step 2: Map to prefixed signal properties
// Explicitly define an interface for all possible signals
export interface InteractionSignals {
  onPointerDown: Signal<(event: FederatedEvent) => void>;
  onPointerUp: Signal<(event: FederatedEvent) => void>;
  onPointerUpOutside: Signal<(event: FederatedEvent) => void>;
  onPointerMove: Signal<(event: FederatedEvent) => void>;
  onClick: Signal<(event: FederatedEvent) => void>;
  onRightClick: Signal<(event: FederatedEvent) => void>;
  onMouseDown: Signal<(event: FederatedEvent) => void>;
  onMouseUp: Signal<(event: FederatedEvent) => void>;
  onTap: Signal<(event: FederatedEvent) => void>;
}

enum signalMap {
  pointerdown = 'onPointerDown',
  pointerup = 'onPointerUp',
  pointerupoutside = 'onPointerUpOutside',
  pointermove = 'onPointerMove',
  click = 'onClick',
  rightclick = 'onRightClick',
  tap = 'onTap',
}

export function Interactive<TBase extends Constructor<PIXIContainer>>(
  Base: TBase,
  events: (keyof typeof signalMap)[] = Object.keys(signalMap) as (keyof typeof signalMap)[],
): TBase & Constructor<InteractionSignals> {
  return class extends Base implements InteractionSignals {
    onPointerDown = new Signal<(event: FederatedEvent) => void>();
    onPointerUp = new Signal<(event: FederatedEvent) => void>();
    onPointerUpOutside = new Signal<(event: FederatedEvent) => void>();
    onPointerMove = new Signal<(event: FederatedEvent) => void>();
    onClick = new Signal<(event: FederatedEvent) => void>();
    onRightClick = new Signal<(event: FederatedEvent) => void>();
    onMouseDown = new Signal<(event: FederatedEvent) => void>();
    onMouseUp = new Signal<(event: FederatedEvent) => void>();
    onTap = new Signal<(event: FederatedEvent) => void>();

    constructor(...args: any[]) {
      super(...args);

      this._emitSignal = this._emitSignal.bind(this);
      events.forEach((eventName) => {
        this.on(eventName, this._emitSignal);
      });
    }

    destroy(options: DestroyOptions): void {
      events.forEach((eventName) => {
        this.off(eventName, this._emitSignal);
      });
      super.destroy(options);
    }

    private _emitSignal(e: FederatedEvent) {
      const signalName = signalMap[e.type as keyof typeof signalMap];
      const signal = (this as any)[signalName];
      if (signal) {
        signal.emit(e);
      }
    }
  } as unknown as TBase & Constructor<InteractionSignals>;
}
