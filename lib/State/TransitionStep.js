/**
 * @enum The possible steps in a state transition.
 */
export var TransitionStep;
(function (TransitionStep) {
    /**
     * Animates the new state in.
     */
    TransitionStep[TransitionStep["AnimNewIn"] = 0] = "AnimNewIn";
    /**
     * Animates the current state out.
     */
    TransitionStep[TransitionStep["AnimCurrentOut"] = 1] = "AnimCurrentOut";
    /**
     * Animate in the new state and animate out the old state simultaneously.
     */
    TransitionStep[TransitionStep["AnimSimultaneously"] = 2] = "AnimSimultaneously";
    /**
     * Attach the new state in front of all other states.
     */
    TransitionStep[TransitionStep["AttachNewInFront"] = 3] = "AttachNewInFront";
    /**
     * Attach the new state behind all other states.
     */
    TransitionStep[TransitionStep["AttachNewBehind"] = 4] = "AttachNewBehind";
    /**
     * Removes and destroys the current state.
     */
    TransitionStep[TransitionStep["RemoveCurrent"] = 5] = "RemoveCurrent";
    /**
     * Loads assets required by the new state.
     */
    TransitionStep[TransitionStep["LoadAssets"] = 6] = "LoadAssets";
    /**
     * Unloads assets required by the old state and not required by the new state.
     */
    TransitionStep[TransitionStep["UnloadAssets"] = 7] = "UnloadAssets";
    /**
     * Copied from ULF and isn't currently used.
     */
    TransitionStep[TransitionStep["UnloadUnusedAssets"] = 8] = "UnloadUnusedAssets";
    /**
     * Show the current active load screen.
     */
    TransitionStep[TransitionStep["ShowLoadScreen"] = 9] = "ShowLoadScreen";
    /**
     * Hides the current active load screen.
     */
    TransitionStep[TransitionStep["HideLoadScreen"] = 10] = "HideLoadScreen";
    TransitionStep[TransitionStep["HideLoadScreenAndAnimnNewIn"] = 11] = "HideLoadScreenAndAnimnNewIn";
    /**
     * Halts the transition until further notice.
     */
    TransitionStep[TransitionStep["Halt"] = 12] = "Halt";
    /**
     * Pauses transition for 0.1 seconds and continues afterward.
     * @todo Relish GM => Figure out how to actually skip only one frame.
     */
    TransitionStep[TransitionStep["PauseAFrame"] = 13] = "PauseAFrame";
    /**
     * Pauses transition for 1 second and continues afterward.
     */
    TransitionStep[TransitionStep["Pause1Second"] = 14] = "Pause1Second";
    /**
     * Pauses transition for 5 seconds and continues afterward.
     */
    TransitionStep[TransitionStep["Pause5Seconds"] = 15] = "Pause5Seconds";
})(TransitionStep || (TransitionStep = {}));
//# sourceMappingURL=TransitionStep.js.map