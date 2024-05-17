import { ICoreFunctions } from './CoreFunctions';
export declare const coreFunctionRegistry: {
    [K in keyof ICoreFunctions]: ICoreFunctions[K];
};
