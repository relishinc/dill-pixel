import { DestroyOptions } from 'pixi.js';
import { SignalConnection, SignalConnections } from '../signals';
import { Constructor } from '../utils/types';
/**
 * Interface for animated entities.
 */
export interface ISignalContainer {
    signalConnections: SignalConnections;
    destroy(options?: DestroyOptions): void;
    addSignalConnection(...args: SignalConnection[]): void;
}
export declare function WithSignals<TBase extends Constructor<any>>(Base: TBase): TBase & Constructor<ISignalContainer>;
