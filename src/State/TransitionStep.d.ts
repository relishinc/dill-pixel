/**
 * @enum The possible steps in a state transition.
 */
export declare enum TransitionStep {
    /**
     * Animates the new state in.
     */
    AnimNewIn = 0,
    /**
     * Animates the current state out.
     */
    AnimCurrentOut = 1,
    /**
     * Animate in the new state and animate out the old state simultaneously.
     */
    AnimSimultaneously = 2,
    /**
     * Attach the new state in front of all other states.
     */
    AttachNewInFront = 3,
    /**
     * Attach the new state behind all other states.
     */
    AttachNewBehind = 4,
    /**
     * Removes and destroys the current state.
     */
    RemoveCurrent = 5,
    /**
     * Loads assets required by the new state.
     */
    LoadAssets = 6,
    /**
     * Unloads assets required by the old state and not required by the new state.
     */
    UnloadAssets = 7,
    /**
     * Copied from ULF and isn't currently used.
     */
    UnloadUnusedAssets = 8,
    /**
     * Show the current active load screen.
     */
    ShowLoadScreen = 9,
    /**
     * Hides the current active load screen.
     */
    HideLoadScreen = 10,
    /**
     * Halts the transition until further notice.
     */
    Halt = 11,
    /**
     * Pauses transition for 0.1 seconds and continues afterward.
     * @todo Relish GM => Figure out how to actually skip only one frame.
     */
    PauseAFrame = 12,
    /**
     * Pauses transition for 1 second and continues afterward.
     */
    Pause1Second = 13,
    /**
     * Pauses transition for 5 seconds and continues afterward.
     */
    Pause5Seconds = 14
}
//# sourceMappingURL=TransitionStep.d.ts.map