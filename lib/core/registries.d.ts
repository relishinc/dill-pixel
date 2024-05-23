import { ICoreFunctions, ICoreSignals } from './interfaces';

export declare const coreSignalRegistry: {
    [K in keyof ICoreSignals]: ICoreSignals[K];
};
export declare const coreFunctionRegistry: {
    [K in keyof ICoreFunctions]: ICoreFunctions[K];
};
//# sourceMappingURL=registries.d.ts.map