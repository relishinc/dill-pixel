import { Ticker } from 'pixi.js';
import { BaseScene } from './BaseScene';

export class AudioScene extends BaseScene {
  protected readonly title = 'Audio';

  protected config = {
    master: 1,
    music: 0.005,
    sfx: 1,
    muted: false,
  };

  constructor() {
    super();
    this.alpha = 0;
  }

  public async start() {
    this.app.audio.masterVolume = this.config.master;
    this.app.audio.muted = this.config.muted;
    this.app.audio.channels.get('music').volume = this.config.music;
    this.app.audio.channels.get('sfx').volume = this.config.sfx;
    void this.app.audio.fadeIn('horizon.mp3', 'music', { volume: 1 });
  }

  public destroy() {
    void this.app.audio.fadeOut('horizon.mp3', 'music');
    super.destroy();
  }

  update(ticker: Ticker) {}

  resize() {}

  protected configureGUI() {
    this.gui.add(this.config, 'master', 0, 5, 0.001).name('Master Volume').onChange(this._handleMasterVolumeChanged);
    this.gui.add(this.config, 'music', 0, 5, 0.001).name('Music Volume').onChange(this._handleMusicVolumeChanged);
    this.gui.add(this.config, 'sfx', 0, 5, 0.001).name('SFX Volume').onChange(this._handleSFXVolumeChanged);
    this.gui.add(this.config, 'muted').name('Mute').onChange(this._handleMuteChanged);
  }

  _handleMasterVolumeChanged(value: number) {
    this.app.audio.masterVolume = value;
  }

  _handleMusicVolumeChanged(value: number) {
    this.app.audio.setChannelVolume('music', value);
  }

  _handleSFXVolumeChanged(value: number) {
    this.app.audio.setChannelVolume('sfx', value);
  }

  _handleMuteChanged(value: boolean) {
    this.app.audio.muted = value;
  }
}
