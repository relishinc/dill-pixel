"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateToken = void 0;
/**
 * State token
 */
class StateToken {
    constructor(pParam1, pLoadScreen, ...pTransitionSteps) {
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
exports.StateToken = StateToken;
//# sourceMappingURL=StateToken.js.map