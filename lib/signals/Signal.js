import { Collector, CollectorArray, CollectorLast, CollectorUntil0, CollectorWhile0, Signal as TsSignal, SignalConnections, } from 'typed-signals';
class Signal extends TsSignal {
    // add a connectOnce method to the Signal class, that will connect a listener to the signal, and then remove it after the first time it is called
    connectOnce(callback, order) {
        // Wrapper function to include logic for disconnecting
        const wrapper = ((...args) => {
            callback(...args);
            // Assuming you have a method to remove the connection, using it here to disconnect
            wrapperConnection.disconnect();
        });
        // Connect the wrapper with the same order, store the connection
        const wrapperConnection = this.connect(wrapper, order);
        return wrapperConnection;
    }
    connectNTimes(callback, times, order) {
        let numTimes = 0;
        // Wrapper function to include logic for disconnecting
        const wrapper = ((...args) => {
            callback(...args);
            numTimes++;
            if (numTimes >= times) {
                wrapperConnection.disconnect();
            }
        });
        // Connect the wrapper with the same order, store the connection
        const wrapperConnection = this.connect(wrapper, order);
        return wrapperConnection;
    }
}
// export anything useful from ts-signals, as well as the new Signal class
export { Signal, SignalConnections, Collector, CollectorLast, CollectorArray, CollectorUntil0, CollectorWhile0, };
//# sourceMappingURL=Signal.js.map