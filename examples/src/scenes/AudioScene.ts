import { ActionDetail, FlexContainer } from '@relish-studios/dill-pixel';
import { BaseScene } from './BaseScene';

export class AudioScene extends BaseScene {
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
  protected sfxButtons: FlexContainer;

  constructor() {
    super();
    this.alpha = 0;
  }

  public async initialize() {
    await super.initialize();
    this.app.focus.addFocusLayer(this.id);

    this.app.audio.masterVolume = this.config.master;
    this.app.audio.muted = this.config.muted;

    this.app.audio.music.volume = this.config.music;
    this.app.audio.sfx.volume = this.config.sfx;

    this.buttonContainer = this.add.flexContainer({ gap: 20, justifyContent: 'center' });
    this.sfxButtons = this.buttonContainer.add.flexContainer({
      gap: 10,
      width: 256,
      flexDirection: 'column',
      alignItems: 'center',
    });

    this.sfxButtons.add.text({ text: 'SFX', style: { fill: 0xffffff, fontSize: 36, fontWeight: 'bold' } });

    this.addButton(this.sfxButtons, 'Bubble', () => {
      this.app.sendAction('sfx', {
        id: 'bubble-land-sfx',
      });
    });

    this.app.actions('sfx').connect(this._handleSfx);
  }

  public async start() {
    void this.app.audio.fadeIn('horizon', 'music', { volume: 1 });
  }

  public destroy() {
    void this.app.audio.fadeOut('horizon', 'music');
    super.destroy();
  }

  resize() {
    super.resize();
    this.buttonContainer.position.set(0, -this.buttonContainer.height / 2);
  }

  addButton(container: FlexContainer, label: string = 'Button', callback: () => void) {
    const btn = container.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui.json',
      accessibleTitle: label,
      accessibleHint: `Press me to play a sound`,
    });

    btn.add.text({
      text: label,
      anchor: 0.5,
      style: { fill: 0xffffff, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    this.addSignalConnection(btn.onClick.connect(callback));

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
}
