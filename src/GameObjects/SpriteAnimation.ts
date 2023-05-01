import * as PIXI from "pixi.js";
import { PixiUtils } from "../Utils";
import * as NumberUtils from "../Utils/NumberUtils";

/**
 * SpriteAnimation
 */
export class SpriteAnimation {
    private _frames: PIXI.Texture[];
    private _frameRate: number;
    private _isLooping: boolean;
    private _onComplete: ((pReversed?: boolean) => void) | undefined;
    private _onLoop: (() => void) | undefined;

    // TODO:SH: Find a better format for shortening long constructors
    /**
     * Creates an instance of sprite animation.
     * @todo SH: Find a better format for shortening long constructors
     * @param pName
     * @param pSheet
     * @param pFrames
     * @param pZeroPadding
     * @param pFramerate
     * @param [pLooping]
     * @param [pStartFrame=0]
     */
    constructor(
        pName: string, pSheet: string | string[], pFrames: number,
        pZeroPadding: number, pFramerate: number, pLooping: boolean = false,
        pStartFrame: number = 0,
    ) {
        this._frameRate = pFramerate;
        this._isLooping = pLooping;
        this._frames = new Array<PIXI.Texture>(pFrames);
        let textureName: string;
        for (let i = 0; i < pFrames; ++i) {
            textureName = pName + NumberUtils.addZeroPadding((i + pStartFrame).toString(), pZeroPadding);
            this._frames[i] = PixiUtils.getTexture(textureName, pSheet);
        }
    }

    /**
     * Gets a specific frame
     * @param pFrame
     * @returns frame
     */
    public getFrame(pFrame: number): PIXI.Texture {
        return this._frames[pFrame];
    }

    /**
     * Gets number of frames
     */
    public get frames(): number {
        return this._frames.length;
    }

    /**
     * Gets framerate
     */
    public get framerate(): number {
        return this._frameRate;
    }

    /**
     * Sets framerate
     */
    public set framerate(pValue: number) {
        this._frameRate = pValue;
    }

    /**
     * Gets duration (automatically calculated based on framerate)
     */
    public get duration(): number {
        return this._frames.length / this._frameRate;
    }

    /**
     * Gets whether is looping
     */
    public get isLooping(): boolean {
        return this._isLooping;
    }

    // TODO:SH: Optimize the adding of onComplete callbacks (constructor?)
    /**
     * onComplete
     * @todo SH: Optimize the adding of onComplete callbacks (constructor?)
     * @param pOnComplete
     */
    public onComplete(pOnComplete: (pReversed?: boolean) => void) {
        this._onComplete = pOnComplete;
    }

    /**
     * onLoop
     * @param pOnLoop
     */
    public onLoop(pOnLoop: () => void) {
        this._onLoop = pOnLoop;
    }

    /**
     * Fires on complete
     * @param [pReversed]
     */
    public fireOnComplete(pReversed?: boolean): void {
        if (this._onComplete !== undefined) {
            this._onComplete(pReversed);
        }
    }

    /**
     * Fires on loop
     */
    public fireOnLoop(): void {
        if (this._onLoop !== undefined) {
            this._onLoop();
        }
    }
}
