import { ICoreSignals } from './CoreSignals';

// @ts-ignore
export const coreSignalRegistry: { [K in keyof ICoreSignals]: ICoreSignals[K] } = {};
