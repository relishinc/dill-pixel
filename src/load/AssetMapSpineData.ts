import {AssetType, AssetUtils} from '../utils/AssetUtils';
import {AssetMapData} from './AssetMapData';

/**
 *
 */
export class AssetMapSpineData extends AssetMapData {
  public readonly atlas: string;

  /**
   * @deprecated use Load/Assets/SpineAsset
   * @param pName Spine skeleton filename, without the extension (e.g. `spineboy` if your file is `spineboy.json`)
   * @param pAtlasName Spine atlas filename. Defaults to the same as the skeleton (e.g. `spineboy` if your files are `spineboy@1x.atlas` and `spineboy@2x.atlas`)
   * @param pAssetType Json or binary (*.skel) format of spine skeleton data
   */
  constructor(
    pName: string,
    pAtlasName: string = pName,
    pAssetType: AssetType.SPINE_SKEL | AssetType.SPINE_JSON = AssetType.SPINE_JSON,
  ) {
    super(pName, pAssetType);
    this.atlas = pAtlasName;
  }

  public getLoaderOptions(): Partial<any & { metadata: any }> | undefined {
    return {
      metadata: {
        imageNamePrefix: 'spineAtlas_',
        spineAtlasFile: AssetUtils.getPathToAsset(this.atlas, AssetType.SPINE_ATLAS),
      },
    };
  }
}
