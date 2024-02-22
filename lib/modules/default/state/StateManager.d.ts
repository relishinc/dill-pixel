import { IModule } from '../../IModule';
export interface IStateManager extends IModule {
}
export declare class StateManager implements IModule {
    readonly id: string;
    constructor();
    destroy(): void;
    initialize(): Promise<void>;
}
//# sourceMappingURL=StateManager.d.ts.map