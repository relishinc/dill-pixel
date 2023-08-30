import { AssetMapData } from "../Load";
export declare enum AssetType {
    TEXTURE_ATLAS = 0,
    PNG = 1,
    JPG = 2,
    FONT = 3,
    WEB_FONT = 4,
    /** @deprecated please use SPINE_JSON or AssetMapSpineData instead */
    SPINE = 5,
    SPINE_JSON = 6,
    SPINE_SKEL = 7,
    SPINE_ATLAS = 8,
    AUDIO = 9,
    JSON = 10,
    NONE = 11,
    NUM_ELEMENTS = 12
}
/**
 * Asset Utilities
 */
export declare class AssetUtils {
    /** Filepath to static images */
    static readonly FILEPATH_IMAGE: string;
    /** Filepath for spritesheets */
    static readonly FILEPATH_SPRITESHEET: string;
    /** Filepath for audio files */
    static readonly FILEPATH_AUDIO: string;
    /** Filepath for fonts */
    static readonly FILEPATH_FONT: string;
    /** Filepath for spine */
    static readonly FILEPATH_SPINE: string;
    /** Filepath for json */
    static readonly FILEPATH_JSON: string;
    static readonly FILE_EXTENSION_JSON: string;
    static readonly FILE_EXTENSION_PNG: string;
    static readonly FILE_EXTENSION_JPG: string;
    static readonly FILE_EXTENSION_FONT: string;
    static readonly FILE_EXTENSION_SPINE_ATLAS: string;
    static readonly FILE_EXTENSION_SPINE_SKEL: string;
    private static _resolutionSuffix;
    /**
     * Return an asset's path based on it's file extension.
     * @param pAssetName
     * @param pAssetType
     * @return The asset filepath, empty if no resolution
     */
    static getPathToAsset(pAssetName: string, pAssetType: AssetType): string;
    static getPathToAsset(pAssetData: AssetMapData): string;
    /**
     * Gets resolution suffix
     */
    static get resolutionSuffix(): string;
    /**
     * Sets resolution suffix
     * @param pValue
     */
    static set resolutionSuffix(pValue: string);
    static replaceResolutionToken(url: string, token?: string | RegExp): string;
}
//# sourceMappingURL=AssetUtils.d.ts.map