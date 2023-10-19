import { State } from '../state';
/**
 * Load screen
 */
export declare class LoadScreen extends State {
    protected _autoProgress: boolean;
    constructor();
    /**
     * autoProgress
     */
    get autoProgress(): boolean;
    /**
     * onLoadProgress
     * @param _progress
     */
    onLoadProgress(_progress: number): void;
    /**
     * onLoadComplete
     * @param pCallback
     */
    onLoadComplete: (pCallback: () => void) => void;
}
export type LoadScreenProvider = LoadScreen | (() => LoadScreen);
//# sourceMappingURL=LoadScreen.d.ts.map