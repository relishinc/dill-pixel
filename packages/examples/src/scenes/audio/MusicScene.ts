import { ActionDetail, Button, ButtonAction, ButtonConfig, FlexContainer } from 'dill-pixel';

import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';

export const id = 'music';
export const debug = {
  group: 'Audio',
  label: 'Music - Mute toggling',
};

export default class AudioScene extends BaseScene {
  protected readonly title = 'Music';
  protected readonly subtitle = 'For testing music mute toggle.';
  protected config = {
    master: 0.5,
    music: 0.25,
    muted: false,
    musicMuted: false,
  };
  protected buttonContainer: FlexContainer;
  protected musicButtons: FlexContainer;
  protected sfxButtons: FlexContainer;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();
    this.app.focus.addFocusLayer(this.id);

    this.app.audio.masterVolume = this.config.master;
    this.app.audio.muted = this.config.muted;
    this.app.audio.music.muted = this.config.musicMuted;
    this.app.audio.music.volume = this.config.music;

    this.buttonContainer = this.add.flexContainer({
      x: -this.app.size.width * 0.5,
      gap: 50,
      justifyContent: 'center',
      flexWrap: 'wrap',
      width: this.app.size.width,
    });
    this.musicButtons = this.buttonContainer.add.flexContainer({
      gap: 10,
      width: 256,
      flexDirection: 'column',
      alignItems: 'center',
    });

    this.musicButtons.add.text({
      text: 'MUSIC',
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontSize: 36, fontWeight: 'bold' },
    });
    this.addButton(this.musicButtons, 'Beach', {
      sounds: { hover: 'hover' },
      actions: {
        click: { id: 'music', data: { id: 'Night at the Beach' } },
      },
    });

    this.addSignalConnection(this.app.actions('music').connect(this._handleMusic));
  }

  public async start() {}

  public destroy() {
    super.destroy();
    this.app.audio.stopAll(true, 0.5, { ease: 'sine.in' });
  }

  addButton(
    container: FlexContainer,
    label: string = 'Button',
    config: Partial<ButtonConfig> = {},
    callback?: () => void,
  ) {
    const btn = container.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: {
        default: this.app.audio.isPlaying((config?.actions?.click as ButtonAction)?.data?.id, 'music')
          ? 'btn/red'
          : 'btn/blue',
        hover: 'btn/yellow',
        disabled: 'btn/grey',
        active: 'btn/red',
      },
      sheet: 'required/ui',
      accessibleTitle: label,
      accessibleHint: `Press me to play a sound`,
      ...config,
    });

    btn.add.text({
      text: label,
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    if (callback) {
      this.addSignalConnection(btn.onClick.connect(callback));
    }

    btn.label = label;
    this.app.focus.add(btn, this.id, false);
    return btn;
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

  _handleVOVolumeChanged(value: number) {
    this.app.audio.setChannelVolume('voiceover', value);
  }

  _handleMuteChanged(value: boolean) {
    this.app.audio.muted = value;
  }

  protected configureGUI() {
    this.gui.add(this.config, 'master', 0, 5, 0.001).name('Master Volume').onChange(this._handleMasterVolumeChanged);
    this.gui.add(this.config, 'music', 0, 5, 0.001).name('Music Volume').onChange(this._handleMusicVolumeChanged);
    this.gui.add(this.config, 'muted').name('Mute Master').onChange(this._handleMuteChanged);
    this.gui.add(this.config, 'musicMuted').name('Mute Music').onChange(this._handleMuteMusicChanged);
  }

  private _handleMuteMusicChanged(value: boolean) {
    this.app.audio.music.muted = value;
  }

  private _handleMusic(action: ActionDetail) {
    const button = action.data.button as Button;

    if (this.app.audio.isPlaying(action.data.id, 'music')) {
      this.app.audio.stop(action.data.id, 'music');
      this.app.audio.play('click', 'sfx');
      button.setTexture('default', 'btn/blue');
      return;
    }
    this.app.audio.play(action.data.id, 'music', { singleInstance: true, loop: true });

    button.setTexture('default', 'btn/red');
  }
}
