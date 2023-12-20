import {TransitionStep} from './TransitionStep';

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
    idOrData:
      | string
      | {
          id: string;
          data: any;
        },
    loadScreen?: string,
    ...transitionSteps: TransitionStep[]
  ) {
    if (typeof idOrData === 'object') {
      this.stateId = idOrData.id;
      this.data = idOrData.data;
    } else {
      this.stateId = idOrData;
    }
    this.loadScreen = loadScreen;
    this.transitionSteps = transitionSteps;
  }
}
