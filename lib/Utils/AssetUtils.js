import { AssetMapData } from "../Load";
export var AssetType;
(function (AssetType) {
    AssetType[AssetType["TEXTURE_ATLAS"] = 0] = "TEXTURE_ATLAS";
    AssetType[AssetType["PNG"] = 1] = "PNG";
    AssetType[AssetType["JPG"] = 2] = "JPG";
    AssetType[AssetType["FONT"] = 3] = "FONT";
    AssetType[AssetType["WEB_FONT"] = 4] = "WEB_FONT";
    /** @deprecated please use SPINE_JSON or AssetMapSpineData instead */
    AssetType[AssetType["SPINE"] = 5] = "SPINE";
    AssetType[AssetType["SPINE_JSON"] = 6] = "SPINE_JSON";
    AssetType[AssetType["SPINE_SKEL"] = 7] = "SPINE_SKEL";
    AssetType[AssetType["SPINE_ATLAS"] = 8] = "SPINE_ATLAS";
    AssetType[AssetType["AUDIO"] = 9] = "AUDIO";
    AssetType[AssetType["JSON"] = 10] = "JSON";
    // Use None type for implementation of assets with specific assetPath
    AssetType[AssetType["NONE"] = 11] = "NONE";
    AssetType[AssetType["NUM_ELEMENTS"] = 12] = "NUM_ELEMENTS";
})(AssetType || (AssetType = {}));
/**
 * Asset Utilities
 */
export class AssetUtils {
    static getPathToAsset(pAssetName, pAssetType) {
        if (pAssetName instanceof AssetMapData) {
            pAssetType = pAssetName.assetType;
            pAssetName = pAssetName.assetName;
        }
        switch (pAssetType) {
            case AssetType.TEXTURE_ATLAS:
                return this.FILEPATH_SPRITESHEET + pAssetName + this._resolutionSuffix + this.FILE_EXTENSION_JSON;
            case AssetType.JPG:
                return this.FILEPATH_IMAGE + pAssetName + this._resolutionSuffix + this.FILE_EXTENSION_JPG;
            case AssetType.PNG:
                return this.FILEPATH_IMAGE + pAssetName + this._resolutionSuffix + this.FILE_EXTENSION_PNG;
            case AssetType.FONT:
                return this.FILEPATH_FONT + pAssetName + this._resolutionSuffix + this.FILE_EXTENSION_FONT;
            case AssetType.WEB_FONT:
                return this.FILEPATH_FONT + pAssetName;
            case AssetType.SPINE:
                return this.FILEPATH_SPINE + pAssetName + this._resolutionSuffix + this.FILE_EXTENSION_JSON;
            case AssetType.SPINE_JSON:
                return this.FILEPATH_SPINE + pAssetName + this.FILE_EXTENSION_JSON;
            case AssetType.SPINE_SKEL:
                return this.FILEPATH_SPINE + pAssetName + this.FILE_EXTENSION_SPINE_SKEL;
            case AssetType.SPINE_ATLAS:
                return this.FILEPATH_SPINE + pAssetName + this._resolutionSuffix + this.FILE_EXTENSION_SPINE_ATLAS;
            case AssetType.JSON:
                return this.FILEPATH_JSON + pAssetName + this.FILE_EXTENSION_JSON;
            default:
                return "";
        }
    }
    /**
     * Gets resolution suffix
     */
    static get resolutionSuffix() {
        return this._resolutionSuffix;
    }
    /**
     * Sets resolution suffix
     * @param pValue
     */
    static set resolutionSuffix(pValue) {
        this._resolutionSuffix = pValue;
    }
    static replaceResolutionToken(url, token = "@x") {
        return url.replace(token, this._resolutionSuffix);
    }
}
/** Filepath to static images */
AssetUtils.FILEPATH_IMAGE = "assets/images/static/";
/** Filepath for spritesheets */
AssetUtils.FILEPATH_SPRITESHEET = "assets/images/spritesheets/";
/** Filepath for audio files */
AssetUtils.FILEPATH_AUDIO = "assets/audio/";
/** Filepath for fonts */
AssetUtils.FILEPATH_FONT = "assets/fonts/";
/** Filepath for spine */
AssetUtils.FILEPATH_SPINE = "assets/spine/";
/** Filepath for json */
AssetUtils.FILEPATH_JSON = "assets/json/";
AssetUtils.FILE_EXTENSION_JSON = ".json";
AssetUtils.FILE_EXTENSION_PNG = ".png";
AssetUtils.FILE_EXTENSION_JPG = ".jpg";
AssetUtils.FILE_EXTENSION_FONT = ".fnt";
AssetUtils.FILE_EXTENSION_SPINE_ATLAS = ".atlas";
AssetUtils.FILE_EXTENSION_SPINE_SKEL = ".skel";
//# sourceMappingURL=AssetUtils.js.map