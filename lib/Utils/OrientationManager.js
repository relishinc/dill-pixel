"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrientationManager = void 0;
const Data_1 = require("../Data");
const PixiUtils = __importStar(require("./PixiUtils"));
class OrientationManager {
    constructor(app) {
        this.app = app;
        this._isPortrait = undefined;
        this._enabled = false;
        this._showOnLandscape = false;
    }
    /**
     * Call this function to initialize the manager and enable it
     * @param pSprite String to create the sprite with
     * @param pShowOnLandscape If the image should be shown on lanscape
     * @NOTE Normally, this should be called in Application.onLoadRequiredAssetsComplete
     */
    init(pSprite, pShowOnLandscape = false) {
        this._enabled = true;
        this._promptImage = document.createElement("img");
        // @ts-ignore
        this._promptImage.src = PixiUtils.getTexture(pSprite).baseTexture.imageUrl;
        this._showOnLandscape = pShowOnLandscape;
        this.enablePromptImage(false);
        window.addEventListener("resize", () => this.onResize());
        window.addEventListener("orientationchange", () => this.onResize());
        this.onResize();
    }
    /**
     * Called when the screen resizes
     * @param pSize The new size
     */
    onResize(pSize) {
        if (!this._enabled) {
            return;
        }
        switch (window.orientation) {
            case -90:
            case 90:
                // Landscape
                this.enablePromptImage(this._showOnLandscape);
                if (this._isPortrait || this._isPortrait === undefined) {
                    this._isPortrait = false;
                    if (this.onLandscapeOrientation !== undefined) {
                        this.onLandscapeOrientation();
                    }
                    PubSub.publish(Data_1.LANDSCAPE_ORIENTATION, undefined);
                }
                break;
            default:
                // Portrait
                this.enablePromptImage(!this._showOnLandscape);
                if (!this._isPortrait) {
                    this._isPortrait = true;
                    if (this.onPortraitOrientation !== undefined) {
                        this.onPortraitOrientation();
                    }
                    PubSub.publish(Data_1.PORTRAIT_ORIENTATION, undefined);
                }
                break;
        }
    }
    /**
     * Call this to enable or disable the prompt image
     * @param pEnable Enable the image or not
     */
    enablePromptImage(pEnable) {
        if (this._promptImage) {
            if (pEnable) {
                document.body.append(this._promptImage);
                this._promptImage.id = "orientation-prompt-image";
                this._promptImage.style.position = "fixed";
                this._promptImage.style.width = "100vw";
                this._promptImage.style.height = "100vh";
                this._promptImage.style.top = "0";
                this._promptImage.style.left = "0";
                this._promptImage.style.objectFit = "cover";
                this._promptImage.style.objectPosition = "center";
                this._promptImage.style.cursor = "auto";
                this._promptImage.style.pointerEvents = "auto";
            }
            else {
                try {
                    this._promptImage.remove();
                }
                catch (e) {
                    // ignore errors
                }
            }
        }
    }
}
exports.OrientationManager = OrientationManager;
//# sourceMappingURL=OrientationManager.js.map