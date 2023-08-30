import {AssetMapData} from "../Load";

export enum AssetType {
	TEXTURE_ATLAS,
	PNG,
	JPG,
	FONT,
	WEB_FONT,
	/** @deprecated please use SPINE_JSON or AssetMapSpineData instead */
	SPINE,
	SPINE_JSON,
	SPINE_SKEL,
	SPINE_ATLAS,
	AUDIO,
	JSON,
	// Use None type for implementation of assets with specific assetPath
	NONE,
	NUM_ELEMENTS,
}

/**
 * Asset Utilities
 */
export class AssetUtils {

	/** Filepath to static images */
	public static readonly FILEPATH_IMAGE: string = "assets/images/static/";
	/** Filepath for spritesheets */
	public static readonly FILEPATH_SPRITESHEET: string = "assets/images/spritesheets/";
	/** Filepath for audio files */
	public static readonly FILEPATH_AUDIO: string = "assets/audio/";
	/** Filepath for fonts */
	public static readonly FILEPATH_FONT: string = "assets/fonts/";
	/** Filepath for spine */
	public static readonly FILEPATH_SPINE: string = "assets/spine/";
	/** Filepath for json */
	public static readonly FILEPATH_JSON: string = "assets/json/";

	public static readonly FILE_EXTENSION_JSON: string = ".json";
	public static readonly FILE_EXTENSION_PNG: string = ".png";
	public static readonly FILE_EXTENSION_JPG: string = ".jpg";
	public static readonly FILE_EXTENSION_FONT: string = ".fnt";
	public static readonly FILE_EXTENSION_SPINE_ATLAS: string = ".atlas";
	public static readonly FILE_EXTENSION_SPINE_SKEL: string = ".skel";

	// Initialized later, since we must wait for Application.instance to be instantiated
	private static _resolutionSuffix: string;

	/**
	 * Return an asset's path based on it's file extension.
	 * @param pAssetName
	 * @param pAssetType
	 * @return The asset filepath, empty if no resolution
	 */
	public static getPathToAsset(pAssetName: string, pAssetType: AssetType): string;
	public static getPathToAsset(pAssetData: AssetMapData): string;
	public static getPathToAsset(pAssetName: AssetMapData | string, pAssetType?: AssetType): string {
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
	public static get resolutionSuffix(): string {
		return this._resolutionSuffix;
	}

	/**
	 * Sets resolution suffix
	 * @param pValue
	 */
	public static set resolutionSuffix(pValue: string) {
		this._resolutionSuffix = pValue;
	}

	public static replaceResolutionToken(url: string, token: string | RegExp = "@x"): string {
		return url.replace(token, this._resolutionSuffix);
	}
}
