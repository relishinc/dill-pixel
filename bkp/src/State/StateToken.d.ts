import { TransitionStep } from "./TransitionStep";
/**
 * State token
 */
export declare class StateToken {
    /**
     * The id of the state.
     */
    readonly stateId: string;
    /**
     * The load screen to use to transition to this state. Only needed for transitions involving a load screen.
     */
    readonly loadScreen: string | undefined;
    /**
     * The list of transition steps to perform.
     */
    readonly transitionSteps: TransitionStep[];
    readonly data: any;
    constructor(pParam1: string | {
        id: string;
        data: any;
    }, pLoadScreen?: string, ...pTransitionSteps: TransitionStep[]);
}
//# sourceMappingURL=StateToken.d.ts.map