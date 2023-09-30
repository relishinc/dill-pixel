import { AssetMapData } from './AssetMapData';
export declare abstract class AssetMap {
    private static _map;
    private static _debug;
    /**
     * Add a group of assets under the id passed in.
     * @param pGroupId The id of the asset group - usually the id of the state.
     * @param pAssets A list of asset names.
     */
    static addAssetGroup(pGroupId: string, pAssets: AssetMapData[]): void;
    /**
     * Retrieves the assets in the specified group.
     * @param pGroupId The id of the asset group.
     * @returns The assets or and empty string array if map is empty or group not found.
     */
    static getAssetGroup(pGroupId: string): AssetMapData[];
    /**
     * Logs a message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    private static log;
    /**
     * Logs a warning message with class name and colour coding if debug flag is true.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    private static logW;
    /**
     * Logs an error message with class name and colour coding.
     * @param pText The message to print.
     * @param [pParams] Optional data to be included in the message.
     * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
     */
    private static logE;
}
//# sourceMappingURL=AssetMap.d.ts.map