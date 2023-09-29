import { State } from '../state';
/**
 * Load screen
 */
export class LoadScreen extends State {
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
//# sourceMappingURL=LoadScreen.js.map