import {TransitionStep} from "./TransitionStep";

/**
 * State token
 */
export class StateToken {
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

  constructor(
    pParam1:
      | string
      | {
          id: string;
          data: any;
        },
    pLoadScreen?: string,
    ...pTransitionSteps: TransitionStep[]
  ) {
    if (pParam1 instanceof Object) {
      this.stateId = pParam1.id;
      this.data = pParam1.data;
    } else {
      this.stateId = pParam1;
    }
    this.loadScreen = pLoadScreen;
    this.transitionSteps = pTransitionSteps;
  }
}
