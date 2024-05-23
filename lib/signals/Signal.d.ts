import { Collector, CollectorArray, CollectorLast, CollectorUntil0, CollectorWhile0, Signal as TsSignal, SignalConnection, SignalConnections } from 'typed-signals';

declare class Signal<THandler extends (...args: any[]) => any> extends TsSignal<THandler> {
    connectOnce(callback: THandler, order?: number): SignalConnection;
    connectNTimes(callback: THandler, times: number, order?: number): SignalConnection;
}
export { Signal, SignalConnections, Collector, CollectorLast, CollectorArray, CollectorUntil0, CollectorWhile0 };
export type { SignalConnection };
//# sourceMappingURL=Signal.d.ts.map