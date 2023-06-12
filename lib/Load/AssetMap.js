import { Dictionary } from "typescript-collections";
import { LogUtils } from "../Utils";
class AssetMap {
    /**
     * Add a group of assets under the id passed in.
     * @param pGroupId The id of the asset group - usually the id of the state.
     * @param pAssets A list of asset names.
     */
    static addAssetGroup(pGroupId, pAssets) {
        this._map.setValue(pGroupId, pAssets);
    }
    /**
     * Retrieves the assets in the specified group.
     * @param pGroupId The id of the asset group.
     * @returns The assets or and empty string array if map is empty or group not found.
     */
    static getAssetGroup(pGroupId) {
        if (this._map.size() === 0) {
            this.logW("Asset map is empty. Call addAssetGroup first. Returning empty array.");
            return [];
        }
        else {
            const assets = this._map.getValue(pGroupId);
            if (assets === undefined) {
                this.logW("%c%s%c asset group has not been added to the map. Call addAssetGroup first. Returning " +
                    "empty array.", LogUtils.STYLE_RED_BOLD, pGroupId, LogUtils.STYLE_WHITE);
                return new Array();
            }
            else {
                return assets;
            }
        }
    }
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    static log(pText, ...pParams) {
        if (this._debug) {
            LogUtils.log(pText, { className: "AssetMap", color: "green" }, ...pParams);
        }
    }
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    static logW(pText, ...pParams) {
        if (this._debug) {
            LogUtils.logWarning(pText, { className: "AssetMap", color: "green" }, ...pParams);
        }
    }
    /**
     * Logs an error message with class name and colour coding.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    static logE(pText, ...pParams) {
        LogUtils.logError(pText, { className: "AssetMap", color: "green" }, ...pParams);
    }
}
AssetMap._map = new Dictionary();
AssetMap._debug = process.env.NODE_ENV === "development";
export { AssetMap };
//# sourceMappingURL=AssetMap.js.map