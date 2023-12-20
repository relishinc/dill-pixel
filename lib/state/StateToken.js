/**
 * State token
 */
export class StateToken {
    constructor(idOrData, loadScreen, ...transitionSteps) {
        if (typeof idOrData === 'object') {
            this.stateId = idOrData.id;
            this.data = idOrData.data;
        }
        else {
            this.stateId = idOrData;
        }
        this.loadScreen = loadScreen;
        this.transitionSteps = transitionSteps;
    }
}
//# sourceMappingURL=StateToken.js.map