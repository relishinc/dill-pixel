import { ActionDetail, Button, ButtonAction, ButtonConfig, FlexContainer, type SceneDebug } from 'dill-pixel';

import BaseScene from '@/scenes/BaseScene';

export const id = 'audio';
export const debug: SceneDebug = {
  group: 'Audio',
  label: 'Music & SFX',
};

export default class AudioScene extends BaseScene {
  protected readonly title = 'Audio';
  protected readonly subtitle = 'Demonstrates audio channels and volume control.';
  protected config = {
    master: 0.5,
    music: 0.25,
    sfx: 2,
    vo: 2,
    muted: false,
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

    this.app.audio.music.volume = this.config.music;
    this.app.audio.sfx.volume = this.config.sfx;

    this.buttonContainer = this.add.flexContainer({
      x: -this.app.size.width * 0.5,
      gap: 50,
      justifyContent: 'center',
      flexWrap: 'wrap',
      layout: { width: this.app.size.width * 0.5 },
      label: 'Audio Buttons',
    });

    this.musicButtons = this.buttonContainer.add.flexContainer({
      gap: 10,
      flexDirection: 'column',
      alignItems: 'center',
      layout: { width: 270 },
      label: 'Music Buttons',
    });

    this.sfxButtons = this.buttonContainer.add.flexContainer({
      gap: 10,
      flexDirection: 'column',
      alignItems: 'center',
      layout: { width: 270 },
      label: 'SFX Buttons',
    });

    this.musicButtons.add.text({
      text: 'MUSIC',
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontSize: 36, fontWeight: 'bold', align: 'center' },
      layout: { height: 70 },
    });

    this.addButton(this.musicButtons, 'Cheer', {
      sounds: { hover: 'hover' },
      actions: {
        click: { id: 'music', data: { id: 'Cheerful Annoyance' } },
      },
    });
    this.addButton(this.musicButtons, 'Drums', {
      sounds: { hover: 'hover' },
      actions: {
        click: { id: 'music', data: { id: 'Drumming Sticks' } },
      },
    });
    this.addButton(this.musicButtons, 'Mischief', {
      sounds: { hover: 'hover' },
      actions: {
        click: { id: 'music', data: { id: 'Mischief Stroll' } },
      },
    });
    this.addButton(this.musicButtons, 'Beach', {
      sounds: { hover: 'hover' },
      actions: {
        click: { id: 'music', data: { id: 'Night at the Beach' } },
      },
    });
    this.addButton(this.musicButtons, 'Game Over', {
      sounds: { hover: 'hover' },
      actions: {
        click: { id: 'music', data: { id: 'Game Over' } },
      },
    });

    this.sfxButtons.add.text({
      text: 'SFX',
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontSize: 36, fontWeight: 'bold' },
      layout: { height: 70 },
    });
    this.addButton(this.sfxButtons, 'Click', { sounds: { hover: 'hover', click: 'click' } });
    this.addSignalConnection(
      this.app.actions('sfx').connect(this._handleSfx),
      this.app.actions('music').connect(this._handleMusic),
    );
  }

  public async start() {}

  public destroy() {
    super.destroy();
    this.app.audio.stopAll(true, 0.5, { ease: 'sine.in' });
  }

  resize() {
    super.resize();
    this.buttonContainer.layoutWidth = this.app.size.width * 0.5;
    this.app.ticker.addOnce(() => {
      this.buttonContainer.position.set(-this.app.size.width * 0.25, -this.buttonContainer.height * 0.5);
    });
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
        hover: '',
        disabled: 'btn/grey',
        active: 'btn/red',
      },
      sheet: 'ui',
      accessibleTitle: label,
      accessibleHint: `Press me to play a sound`,
      layout: { height: 70, width: 256 },
      ...config,
    });

    btn.addLabel({
      text: label,
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
      layout: false,
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
    this.gui.add(this.config, 'sfx', 0, 5, 0.001).name('SFX Volume').onChange(this._handleSFXVolumeChanged);
    this.gui.add(this.config, 'muted').name('Mute').onChange(this._handleMuteChanged);
  }

  private _handleSfx(action: ActionDetail) {
    this.app.audio.play(action.data.id, 'sfx');
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
