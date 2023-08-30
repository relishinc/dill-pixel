import { Point } from "pixi.js";
import { Application } from "../Application";
export declare class OrientationManager {
    private app;
    private _promptImage?;
    private _isPortrait?;
    private _enabled;
    private _showOnLandscape;
    constructor(app: Application);
    /**
     * Call this function to initialize the manager and enable it
     * @param pSprite String to create the sprite with
     * @param pShowOnLandscape If the image should be shown on lanscape
     * @NOTE Normally, this should be called in Application.onLoadRequiredAssetsComplete
     */
    init(pSprite: string, pShowOnLandscape?: boolean): void;
    /**
     * Called when the screen resizes
     * @param pSize The new size
     */
    onResize(pSize?: Point): void;
    /**
     * Call this to enable or disable the prompt image
     * @param pEnable Enable the image or not
     */
    private enablePromptImage;
}
//# sourceMappingURL=OrientationManager.d.ts.map