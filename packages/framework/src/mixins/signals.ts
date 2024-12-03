import { DestroyOptions } from 'pixi.js';
import { SignalConnection, SignalConnections } from '../signals';
import type { Constructor } from '../utils';

/**
 * Interface for animated entities.
 */
export interface ISignalContainer {
  signalConnections: SignalConnections;

  destroy(options?: DestroyOptions): void;

  addSignalConnection(...args: SignalConnection[]): void;
  connectSignal(...args: SignalConnection[]): void;
  connectAction(...args: SignalConnection[]): void;
}

export function WithSignals<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<ISignalContainer> {
  return class extends Base implements ISignalContainer {
    signalConnections: SignalConnections = new SignalConnections();

    /**
     * Add signal connections to the container.
     * @param args - The signal connections to add.
     */
    public addSignalConnection(...args: SignalConnection[]) {
      for (const connection of args) {
        this.signalConnections.add(connection);
      }
    }

    public connectSignal(...args: SignalConnection[]) {
      for (const connection of args) {
        this.signalConnections.add(connection);
      }
    }

    public connectAction(...args: SignalConnection[]) {
      for (const connection of args) {
        this.signalConnections.add(connection);
      }
    }

    destroy(options?: DestroyOptions): void {
      this.signalConnections.disconnectAll();
      super.destroy(options);
    }
  } as unknown as TBase & Constructor<ISignalContainer>;
}
