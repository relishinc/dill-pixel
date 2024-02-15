import {
  Collector,
  CollectorArray,
  CollectorLast,
  CollectorUntil0,
  CollectorWhile0,
  Signal as TsSignal,
  SignalConnection,
  SignalConnections,
} from 'typed-signals';

class Signal<THandler extends (...args: any[]) => any> extends TsSignal<THandler> {
  // add a connectOnce method to the Signal class, that will connect a listener to the signal, and then remove it after the first time it is called
  public connectOnce(callback: THandler, order?: number): SignalConnection {
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

  public connectNTimes(callback: THandler, times: number, order?: number): SignalConnection {
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
}

// export anything useful from ts-signals, as well as the new Signal class
export { Signal, SignalConnections, Collector, CollectorLast, CollectorArray, CollectorUntil0, CollectorWhile0 };
