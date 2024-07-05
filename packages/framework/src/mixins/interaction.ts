import type { AllFederatedEventMap, DestroyOptions } from 'pixi.js';
import { Container, FederatedEvent } from 'pixi.js';
import { Signal } from '../signals';

import { type Constructor } from '../utils';

// gets all the event names from the PIXI event map
type InteractionEventName = keyof AllFederatedEventMap;

export type InteractionSignal = Signal<(event: FederatedEvent) => void>;

/**
 * Represents an interactive element.
 */
export interface IInteractive {
  onInteraction: (eventName: InteractionEventName) => InteractionSignal;
}

/**
 * Adds interactive functionality to a container.
 *
 * @param {Constructor<Container>} Base - The base container class.
 * @returns {Constructor<IInteractive>} - The extended container class with interactive functionality.
 */
export function Interactive<TBase extends Constructor<Container>>(Base: TBase): TBase & Constructor<IInteractive> {
  return class extends Base implements IInteractive {
    private _signals: Map<InteractionEventName, InteractionSignal> = new Map();

    constructor(...args: any[]) {
      super(...args);
      this._emitSignal = this._emitSignal.bind(this);
      this.eventMode = 'static';
    }

    /**
     * Handles interaction events and returns the corresponding signal.
     *
     * @param {InteractionEventName} eventName - The name of the interaction event.
     * @return {InteractionSignal} The signal associated with the interaction event.
     */
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

    /**
     * Emits a signal with the given event.
     *
     * @param {FederatedEvent} event - The event to emit.
     *
     * @return {void}
     */
    private _emitSignal(event: FederatedEvent) {
      const signalName = event.type as InteractionEventName;
      const signal = this._signals.get(signalName);

      if (signal) {
        signal.emit(event);
      }
    }
  } as unknown as TBase & Constructor<IInteractive>;
}
