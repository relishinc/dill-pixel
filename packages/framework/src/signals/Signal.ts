import {
  Collector,
  CollectorArray,
  CollectorLast,
  CollectorUntil0,
  CollectorWhile0,
  SignalConnection,
  SignalConnections,
  Signal as TsSignal,
} from 'typed-signals';

const signalPriorities = {
  highest: Number.MIN_SAFE_INTEGER,
  high: -100,
  normal: 0,
  low: 100,
  lowest: Number.MAX_SAFE_INTEGER,
} as const;

export type SignalOrder = 'highest' | 'high' | 'normal' | 'low' | 'lowest' | number;

class Signal<THandler extends (...args: any[]) => any> extends TsSignal<THandler> {
  // add a connectOnce method to the Signal class, that will connect a listener to the signal, and then remove it after the first time it is called
  public connectOnce(callback: THandler, order?: SignalOrder): SignalConnection {
    // Wrapper function to include logic for disconnecting
    const wrapper: THandler = ((...args: any[]) => {
      callback(...args);
      // Assuming you have a method to remove the connection, using it here to disconnect
      wrapperConnection.disconnect();
    }) as THandler;

    // Connect the wrapper with the same order, store the connection
    const wrapperConnection = this.connect(wrapper, order);
    return wrapperConnection;
  }

  public connectNTimes(callback: THandler, times: number, order?: SignalOrder): SignalConnection {
    let numTimes = 0;
    // Wrapper function to include logic for disconnecting
    const wrapper: THandler = ((...args: any[]) => {
      callback(...args);
      numTimes++;
      if (numTimes >= times) {
        wrapperConnection.disconnect();
      }
    }) as THandler;
    // Connect the wrapper with the same order, store the connection
    const wrapperConnection = this.connect(wrapper, order);
    return wrapperConnection;
  }

  /**
   * Subscribe to this signal.
   *
   * @param callback This callback will be run when emit() is called.
   * @param order Handlers with a higher order value will be called later.
   */
  public connect(callback: THandler, order: SignalOrder = 'normal'): SignalConnection {
    const priority = signalPriorities[order as keyof typeof signalPriorities] ?? order;
    return super.connect(callback, priority);
  }
}

// export anything useful from ts-signals, as well as the new Signal class
export { Collector, CollectorArray, CollectorLast, CollectorUntil0, CollectorWhile0, Signal, SignalConnections };
export type { SignalConnection };
