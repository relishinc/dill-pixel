import { State } from "../State";
/**
 * Load screen
 */
export declare abstract class LoadScreen extends State {
    protected _autoProgress: boolean;
    constructor();
    /**
     * autoProgress
     */
    get autoProgress(): boolean;
    /**
     * onLoadProgress
     * @param progress
     */
    onLoadProgress(progress: number): void;
    /**
     * onLoadComplete
     * @param pCallback
     */
    onLoadComplete: (pCallback: () => void) => void;
}
export type LoadScreenProvider = LoadScreen | (() => LoadScreen);
//# sourceMappingURL=LoadScreen.d.ts.map