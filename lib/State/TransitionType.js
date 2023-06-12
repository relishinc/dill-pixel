"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSITION_ANIM_SIMULTANEOUSLY_NEW_IN_FRONT = exports.TRANSITION_ANIM_SIMULTANEOUSLY_NEW_BEHIND = exports.TRANSITION_ANIM_OLD_OUT_REVEAL = exports.TRANSITION_ANIM_NEW_IN_FRONT = exports.TRANSITION_ANIM_SEQUENTIAL_MID_ASSETS = exports.TRANSITION_ANIM_SEQUENTIAL_PRE_ASSETS = exports.TRANSITION_SIMPLE_INTERSTITIAL = exports.TRANSITION_FIRST_VIEW = void 0;
const TransitionStep_1 = require("./TransitionStep");
/**
 * A transition specifically for the splash screen.
 * @description Steps:
 * 1. LoadAssets
 * 2. AttachNewBehind
 * 3. HideLoadScreen
 * 4. AnimNewIn
 */
exports.TRANSITION_FIRST_VIEW = [
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AttachNewBehind,
    TransitionStep_1.TransitionStep.HideLoadScreen,
    TransitionStep_1.TransitionStep.AnimNewIn,
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
exports.TRANSITION_SIMPLE_INTERSTITIAL = [
    TransitionStep_1.TransitionStep.ShowLoadScreen,
    TransitionStep_1.TransitionStep.RemoveCurrent,
    TransitionStep_1.TransitionStep.UnloadAssets,
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AttachNewInFront,
    TransitionStep_1.TransitionStep.HideLoadScreen,
    TransitionStep_1.TransitionStep.AnimNewIn,
    TransitionStep_1.TransitionStep.UnloadUnusedAssets,
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
exports.TRANSITION_ANIM_SEQUENTIAL_PRE_ASSETS = [
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AnimCurrentOut,
    TransitionStep_1.TransitionStep.RemoveCurrent,
    TransitionStep_1.TransitionStep.UnloadAssets,
    TransitionStep_1.TransitionStep.AttachNewInFront,
    TransitionStep_1.TransitionStep.AnimNewIn,
    TransitionStep_1.TransitionStep.UnloadUnusedAssets,
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
exports.TRANSITION_ANIM_SEQUENTIAL_MID_ASSETS = [
    TransitionStep_1.TransitionStep.AnimCurrentOut,
    TransitionStep_1.TransitionStep.RemoveCurrent,
    TransitionStep_1.TransitionStep.UnloadAssets,
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AttachNewInFront,
    TransitionStep_1.TransitionStep.AnimNewIn,
    TransitionStep_1.TransitionStep.UnloadUnusedAssets,
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
exports.TRANSITION_ANIM_NEW_IN_FRONT = [
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AttachNewInFront,
    TransitionStep_1.TransitionStep.AnimNewIn,
    TransitionStep_1.TransitionStep.RemoveCurrent,
    TransitionStep_1.TransitionStep.UnloadAssets,
    TransitionStep_1.TransitionStep.UnloadUnusedAssets,
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
exports.TRANSITION_ANIM_OLD_OUT_REVEAL = [
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AttachNewBehind,
    TransitionStep_1.TransitionStep.AnimCurrentOut,
    TransitionStep_1.TransitionStep.RemoveCurrent,
    TransitionStep_1.TransitionStep.UnloadAssets,
    TransitionStep_1.TransitionStep.AnimNewIn,
    TransitionStep_1.TransitionStep.UnloadUnusedAssets,
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
exports.TRANSITION_ANIM_SIMULTANEOUSLY_NEW_BEHIND = [
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AttachNewBehind,
    TransitionStep_1.TransitionStep.AnimSimultaneously,
    TransitionStep_1.TransitionStep.RemoveCurrent,
    TransitionStep_1.TransitionStep.UnloadAssets,
    TransitionStep_1.TransitionStep.UnloadUnusedAssets,
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
exports.TRANSITION_ANIM_SIMULTANEOUSLY_NEW_IN_FRONT = [
    TransitionStep_1.TransitionStep.LoadAssets,
    TransitionStep_1.TransitionStep.AttachNewInFront,
    TransitionStep_1.TransitionStep.AnimSimultaneously,
    TransitionStep_1.TransitionStep.RemoveCurrent,
    TransitionStep_1.TransitionStep.UnloadAssets,
    TransitionStep_1.TransitionStep.UnloadUnusedAssets,
];
//# sourceMappingURL=TransitionType.js.map