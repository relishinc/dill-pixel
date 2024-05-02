import { ICoreSignals } from './CoreSignals';

// @ts-expect-error - we don't know what the keys are, so we can't type them
export const coreSignalRegistry: { [K in keyof ICoreSignals]: ICoreSignals[K] } = {};
