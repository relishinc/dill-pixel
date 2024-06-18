import type { ICoreFunctions, ICoreSignals } from './interfaces';

// @ts-expect-error - we don't know what the keys are, so we can't type them
export const coreSignalRegistry: { [K in keyof ICoreSignals]: ICoreSignals[K] } = {};

// @ts-expect-error - we don't know what the keys are, so we can't type them
export const coreFunctionRegistry: { [K in keyof ICoreFunctions]: ICoreFunctions[K] } = {};
