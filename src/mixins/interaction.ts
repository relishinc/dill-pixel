import { AllFederatedEventMap, DestroyOptions, FederatedEvent } from 'pixi.js';
import { PIXIContainer } from '../pixi';

import { Signal } from '../signals';
import { Constructor } from '../utils/types';

// gets all the event names from the PIXI event map
type InteractionEventName = keyof AllFederatedEventMap;

type InteractionSignal = Signal<(event: FederatedEvent) => void>;

export interface IInteractive {
  onInteraction: (eventName: InteractionEventName) => InteractionSignal;
}

export function Interactive<TBase extends Constructor<PIXIContainer>>(Base: TBase): TBase & Constructor<IInteractive> {
  return class extends Base implements IInteractive {
    private _signals: Map<InteractionEventName, InteractionSignal> = new Map();

    constructor(...args: any[]) {
      super(...args);
      this._emitSignal = this._emitSignal.bind(this);
    }

    public onInteraction(eventName: InteractionEventName) {
      if (!this._signals.has(eventName)) {
        const signal = new Signal<(event: FederatedEvent) => void>();
        this._signals.set(eventName, signal);
        this.on(eventName, this._emitSignal);
      }
      return this._signals.get(eventName) as InteractionSignal;
    }

    public destroy(options: DestroyOptions): void {
      for (const eventName of this._signals.keys()) {
        this.off(eventName, this._emitSignal);
      }
      this._signals.clear();
      super.destroy(options);
    }

    private _emitSignal(event: FederatedEvent) {
      const signalName = event.type as InteractionEventName;
      const signal = this._signals.get(signalName);

      if (signal) {
        signal.emit(event);
      }
    }
  } as unknown as TBase & Constructor<IInteractive>;
}
