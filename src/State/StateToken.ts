import { TransitionStep } from "./StateManager";

/**
 * State token
 */
export class StateToken {
    /**
     * A transition specifically for the splash screen.
     * @description Steps:
     * 1. LoadAssets
     * 2. AttachNewBehind
     * 3. HideLoadScreen
     * 4. AnimNewIn
     */
    public static readonly TRANSITION_FIRST_VIEW: TransitionStep[] = [
        TransitionStep.LoadAssets,
        TransitionStep.AttachNewBehind,
        TransitionStep.HideLoadScreen,
        TransitionStep.AnimNewIn,
    ];

    /**
     * A simple interstitial transition.
     * @description Steps:
     * 1. ShowLoadScreen
     * 2. RemoveCurrent
     * 3. UnloadAssets
     * 4. LoadAssets
     * 5. AttachNewInFront
     * 6. HideLoadScreen
     * 7. AnimNewIn
     * 8. UnloadUnusedAssets
     */
    public static readonly TRANSITION_SIMPLE_INTERSTITIAL: TransitionStep[] = [
        TransitionStep.ShowLoadScreen,
        TransitionStep.RemoveCurrent,
        TransitionStep.UnloadAssets,
        TransitionStep.LoadAssets,
        TransitionStep.AttachNewInFront,
        TransitionStep.HideLoadScreen,
        TransitionStep.AnimNewIn,
        TransitionStep.UnloadUnusedAssets,
    ];

    /**
     * Animate out old state and then animate in new state with assets loaded first.
     * @description Steps:
     * 1. LoadAssets
     * 2. AnimCurrentOut
     * 3. RemoveCurrent
     * 4. UnloadAssets
     * 5. AttachNewInFront
     * 6. AnimNewIn
     * 7. UnloadUnusedAssets
     */
    public static readonly TRANSITION_ANIM_SEQUENTIAL_PRE_ASSETS: TransitionStep[] = [
        TransitionStep.LoadAssets,
        TransitionStep.AnimCurrentOut,
        TransitionStep.RemoveCurrent,
        TransitionStep.UnloadAssets,
        TransitionStep.AttachNewInFront,
        TransitionStep.AnimNewIn,
        TransitionStep.UnloadUnusedAssets,
    ];

    /**
     * Animate out old state and then animate in new state with assets loaded in between.
     * @description Steps:
     * 1. AnimCurrentOut
     * 2. RemoveCurrent
     * 3. UnloadAssets
     * 4. LoadAssets
     * 5. AttachNewInFront
     * 6. AnimNewIn
     * 7. UnloadUnusedAssets
     */
    public static readonly TRANSITION_ANIM_SEQUENTIAL_MID_ASSETS: TransitionStep[] = [
        TransitionStep.AnimCurrentOut,
        TransitionStep.RemoveCurrent,
        TransitionStep.UnloadAssets,
        TransitionStep.LoadAssets,
        TransitionStep.AttachNewInFront,
        TransitionStep.AnimNewIn,
        TransitionStep.UnloadUnusedAssets,
    ];

    /**
     * Animates the new state in front of the old one.
     * @description Steps:
     * 1. LoadAssets
     * 2. AttachNewInFront
     * 3. AnimNewIn
     * 4. RemoveCurrent
     * 5. UnloadAssets
     * 6. UnloadUnusedAssets
     */
    public static readonly TRANSITION_ANIM_NEW_IN_FRONT: TransitionStep[] = [
        TransitionStep.LoadAssets,
        TransitionStep.AttachNewInFront,
        TransitionStep.AnimNewIn,
        TransitionStep.RemoveCurrent,
        TransitionStep.UnloadAssets,
        TransitionStep.UnloadUnusedAssets,
    ];

    /**
     * Creates the new state behind the current one and then animates out the current state.
     * @description Steps:
     * 1. LoadAssets
     * 2. AttachNewBehind
     * 3. AnimCurrentOut
     * 4. RemoveCurrent
     * 5. UnloadAssets
     * 6. AnimNewIn
     * 7. UnloadUnusedAssets
     */
    public static readonly TRANSITION_ANIM_OLD_OUT_REVEAL: TransitionStep[] = [
        TransitionStep.LoadAssets,
        TransitionStep.AttachNewBehind,
        TransitionStep.AnimCurrentOut,
        TransitionStep.RemoveCurrent,
        TransitionStep.UnloadAssets,
        TransitionStep.AnimNewIn,
        TransitionStep.UnloadUnusedAssets,
    ];

    /**
     * Animates in the new state and animates out the old state with the new state being behind the old one.
     * @description Steps:
     * 1. LoadAssets
     * 2. AttachNewBehind
     * 3. AnimSimultaneously
     * 4. RemoveCurrent
     * 5. UnloadAssets
     * 6. UnloadUnusedAssets
     */
    public static readonly TRANSITION_ANIM_SIMULTANEOUSLY_NEW_BEHIND: TransitionStep[] = [
        TransitionStep.LoadAssets,
        TransitionStep.AttachNewBehind,
        TransitionStep.AnimSimultaneously,
        TransitionStep.RemoveCurrent,
        TransitionStep.UnloadAssets,
        TransitionStep.UnloadUnusedAssets,
    ];

    /**
     * Animates in the new state and animates out the old state with the new state being in front of the old one.
     * @description Steps:
     * 1. LoadAssets
     * 2. AttachNewInFront
     * 3. AnimSimultaneously
     * 4. RemoveCurrent
     * 5. UnloadAssets
     * 6. UnloadUnusedAssets
     */
    public static readonly TRANSITION_ANIM_SIMULTANEOUSLY_NEW_IN_FRONT: TransitionStep[] = [
        TransitionStep.LoadAssets,
        TransitionStep.AttachNewInFront,
        TransitionStep.AnimSimultaneously,
        TransitionStep.RemoveCurrent,
        TransitionStep.UnloadAssets,
        TransitionStep.UnloadUnusedAssets,
    ];

    /**
     * The id of the state.
     */
    public readonly stateId: string;
    /**
     * The load screen to use to transition to this state. Only needed for transitions involving a load screen.
     */
    public readonly loadScreen: string | undefined;
    /**
     * The list of transition steps to perform.
     */
    public readonly transitionSteps: TransitionStep[];

    public readonly data: any;

    constructor(pStateIdAndData: {id: string, data: any}, pLoadScreen?: string, ...pTransitionSteps: TransitionStep[])
    // tslint:disable-next-line: unified-signatures
    constructor(pStateId: string, pLoadScreen?: string, ...pTransitionSteps: TransitionStep[])
    constructor(pParam1: string | {id: string, data: any}, pLoadScreen?: string, ...pTransitionSteps: TransitionStep[]) {
        if (pParam1 instanceof Object) {
            this.stateId = pParam1.id;
            this.data = pParam1.data;
        }
        else {
            this.stateId = pParam1;
        }
        this.loadScreen = pLoadScreen;
        this.transitionSteps = pTransitionSteps;
    }
}
