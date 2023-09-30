import { IPoint, Point } from "pixi.js";
export interface IFocusable {
    /** For debugging purposes */
    readonly name: string | undefined | null;
    /**
     * Called when this Focusable is focussed.
     */
    onFocusBegin(): void;
    /**
     * Called when this Focusable is no longer focussed.
     */
    onFocusEnd(): void;
    /**
     * Called when this Focusable is focussed and then activated.
     */
    onFocusActivated(): void;
    /**
     * Gets the position in global coordinate space that the focus should be centred around.
     * @returns The position that the focus should be centred around.
     */
    getFocusPosition(): Point;
    /**
     * Gets the size of the area in global coordinate space that the focus should surround.
     * @returns The size of the area that the focus should surround.
     */
    getFocusSize(): IPoint;
    /**
     * @return true if this focusable can be focused
     * Defaults to this.interactive && this.worldVisible
     */
    isFocusable?(): boolean;
}
//# sourceMappingURL=IFocusable.d.ts.map