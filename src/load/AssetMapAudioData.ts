import { Application } from '../core/Application';
import { HowlerTrack, HowlerUtils } from '../audio';
import { AssetType } from '../utils';
import { AssetMapData } from './AssetMapData';

/**
 * Stores audio specific data used to load and unload assets.
 */
export class AssetMapAudioData extends AssetMapData {
  /**
   * The category to add this audio asset to.
   */
  public category: string;

  /**
   * @deprecated use Load/Assets/AudioAsset
   * @param pName
   * @param pAssetType
   * @param pCategory
   */
  constructor(pName: string, pAssetType: AssetType, pCategory: string) {
    super(pName, pAssetType);
    this.category = pCategory;
  }

  public isLoaded(): boolean {
    const track = Application.instance.audio.getAudioTrack(this.assetName, this.category) as HowlerTrack;
    if (track === undefined) {
      return false;
    }
    return track.getSource().state() !== HowlerUtils.State.UNLOADED;
  }
}
