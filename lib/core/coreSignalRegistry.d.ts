import { ICoreSignals } from './CoreSignals';
export declare const coreSignalRegistry: {
    [K in keyof ICoreSignals]: ICoreSignals[K];
};
