import { ICoreFunctions } from './CoreFunctions';

// @ts-ignore
export const coreFunctionRegistry: { [K in keyof ICoreFunctions]: ICoreFunctions[K] } = {};
