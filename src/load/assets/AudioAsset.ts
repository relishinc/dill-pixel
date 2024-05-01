import { IAudioTrack } from '../../audio/IAudioTrack';
import { Application } from '../../core/Application';
import { AssetType } from '../../utils/AssetUtils';
import { AssetMapAudioData } from '../AssetMapAudioData';
import { IAsset } from './IAsset';

export class AudioAsset extends AssetMapAudioData implements IAsset<IAudioTrack> {
  constructor(assetName: string, category: string) {
    super(assetName, AssetType.AUDIO, category);
  }

  public getAsset(): IAudioTrack {
    const track = Application.instance.audio.getAudioTrack(this.assetName, this.category);
    if (!track) {
      throw new Error(`Audio asset ${this.assetName} is not loaded.`);
    }
    return track;
  }
}
