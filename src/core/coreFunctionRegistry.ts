import { ICoreFunctions } from './CoreFunctions';

// @ts-expect-error - we don't know what the keys are, so we can't type them
export const coreFunctionRegistry: { [K in keyof ICoreFunctions]: ICoreFunctions[K] } = {};
