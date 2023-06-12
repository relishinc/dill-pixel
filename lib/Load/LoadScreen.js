"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadScreen = void 0;
const State_1 = require("../State");
/**
 * Load screen
 */
class LoadScreen extends State_1.State {
    constructor() {
        super();
        /**
         * onLoadComplete
         * @param pCallback
         */
        this.onLoadComplete = (pCallback) => {
            pCallback();
        };
        this._autoProgress = true;
    }
    /**
     * autoProgress
     */
    get autoProgress() {
        return this._autoProgress;
    }
    /**
     * onLoadProgress
     * @param progress
     */
    onLoadProgress(progress) {
        // do nothing
    }
}
exports.LoadScreen = LoadScreen;
//# sourceMappingURL=LoadScreen.js.map