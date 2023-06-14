/**
 * @enum The possible steps in a state transition.
 */
export enum TransitionStep {
  /**
   * Animates the new state in.
   */
  AnimNewIn,
  /**
   * Animates the current state out.
   */
  AnimCurrentOut,
  /**
   * Animate in the new state and animate out the old state simultaneously.
   */
  AnimSimultaneously,
  /**
   * Attach the new state in front of all other states.
   */
  AttachNewInFront,
  /**
   * Attach the new state behind all other states.
   */
  AttachNewBehind,
  /**
   * Removes and destroys the current state.
   */
  RemoveCurrent,
  /**
   * Loads assets required by the new state.
   */
  LoadAssets,
  /**
   * Unloads assets required by the old state and not required by the new state.
   */
  UnloadAssets,
  /**
   * Copied from ULF and isn't currently used.
   */
  UnloadUnusedAssets,
  /**
   * Show the current active load screen.
   */
  ShowLoadScreen,
  /**
   * Hides the current active load screen.
   */
  HideLoadScreen,
  /**
   * Halts the transition until further notice.
   */
  Halt,
  /**
   * Pauses transition for 0.1 seconds and continues afterward.
   * @todo Relish GM => Figure out how to actually skip only one frame.
   */
  PauseAFrame,
  /**
   * Pauses transition for 1 second and continues afterward.
   */
  Pause1Second,
  /**
   * Pauses transition for 5 seconds and continues afterward.
   */
  Pause5Seconds,
}
