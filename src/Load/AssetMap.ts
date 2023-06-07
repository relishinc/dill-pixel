import { Dictionary } from "typescript-collections";
import { LogUtils } from "../Utils";
import { AssetMapData } from "./AssetMapData";

export abstract class AssetMap {
  private static _map: Dictionary<string, AssetMapData[]> = new Dictionary<
    string,
    AssetMapData[]
  >();
  private static _debug: boolean = process.env.NODE_ENV === "development";

  /**
   * Add a group of assets under the id passed in.
   * @param pGroupId The id of the asset group - usually the id of the state.
   * @param pAssets A list of asset names.
   */
  public static addAssetGroup(pGroupId: string, pAssets: AssetMapData[]): void {
    this._map.setValue(pGroupId, pAssets);
  }

  /**
   * Retrieves the assets in the specified group.
   * @param pGroupId The id of the asset group.
   * @returns The assets or and empty string array if map is empty or group not found.
   */
  public static getAssetGroup(pGroupId: string): AssetMapData[] {
    if (this._map.size() === 0) {
      this.logW(
        "Asset map is empty. Call addAssetGroup first. Returning empty array."
      );
      return [];
    } else {
      const assets = this._map.getValue(pGroupId);

      if (assets === undefined) {
        this.logW(
          "%c%s%c asset group has not been added to the map. Call addAssetGroup first. Returning " +
            "empty array.",
          LogUtils.STYLE_RED_BOLD,
          pGroupId,
          LogUtils.STYLE_WHITE
        );
        return new Array<AssetMapData>();
      } else {
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
  private static log(pText: string, ...pParams: any[]): void {
    if (this._debug) {
      LogUtils.log(
        pText,
        { className: "AssetMap", color: "green" },
        ...pParams
      );
    }
  }

  /**
   * Logs a warning message with class name and colour coding if debug flag is true.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private static logW(pText: string, ...pParams: any[]): void {
    if (this._debug) {
      LogUtils.logWarning(
        pText,
        { className: "AssetMap", color: "green" },
        ...pParams
      );
    }
  }

  /**
   * Logs an error message with class name and colour coding.
   * @param pText The message to print.
   * @param [pParams] Optional data to be included in the message.
   * @todo Relish GM => Decide if this should live in its own class, be in an interface or within each manager.
   */
  private static logE(pText: string, ...pParams: any[]): void {
    LogUtils.logError(
      pText,
      { className: "AssetMap", color: "green" },
      ...pParams
    );
  }
}
