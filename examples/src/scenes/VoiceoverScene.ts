import { ActionDetail, FlexContainer } from '@relish-studios/dill-pixel';
import { Text } from 'pixi.js';
import { BaseScene } from './BaseScene';

export class VoiceoverScene extends BaseScene {
  protected readonly title = 'Voiceovers / Captions';
  protected readonly subtitle = 'Demonstrates VO / Captioning.';

  protected config = {
    volume: 2,
    muted: false,
    captions: {
      enabled: true,
      fontSizeMultiplier: 1,
      maxWidth: 0.4,
      floating: false,
      floatingSettings: {
        distance: 10,
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
      },
      position: 'top',
      backgroundColor: [255, 255, 255],
      textColor: [255, 255, 255],
      backgroundAlpha: 0.5,
    },
  };

  protected _captionsBgColorController: dat.GUIController;
  protected _captionsTextColorController: dat.GUIController;
  protected _captionsBgAlphaController: dat.GUIController;
  protected _floatingSettingsFolder: dat.GUI;

  protected buttonContainer: FlexContainer;
  protected voButtons: FlexContainer;
  protected captionsButtons: FlexContainer;

  constructor() {
    super();
    this.alpha = 0;
  }

  public async initialize() {
    await super.initialize();
    this.app.focus.addFocusLayer(this.id);

    this.app.audio.muted = this.config.muted;

    this.buttonContainer = this.add.flexContainer({ gap: 20, justifyContent: 'center' });
    this.voButtons = this.buttonContainer.add.flexContainer({ gap: 10, flexDirection: 'column', alignItems: 'center' });
    this.captionsButtons = this.buttonContainer.add.flexContainer({
      gap: 10,
      flexDirection: 'column',
      alignItems: 'center',
    });

    this.voButtons.add.text({ text: 'VO', style: { fill: 0xffffff, fontSize: 36, fontWeight: 'bold' } });
    this.captionsButtons.add.text({ text: 'Captions', style: { fill: 0xffffff, fontSize: 36, fontWeight: 'bold' } });

    const localeButton = this.addButton(this.voButtons, `Locale: ${this.app.i18n.locale}`, () => {
      this.app.i18n.setLocale(this.app.i18n.locale === 'en' ? 'fr' : 'en');
    });

    this.app.i18n.onLocaleChanged.connect((locale) => {
      (localeButton.getChildAt(1) as Text).text = `Locale: ${locale}`;
    });

    this.addButton(this.voButtons, 'Play', () => {
      this.app.sendAction('vo', {
        ids: ['vo_intro_0', 'vo_intro_1', 'vo_intro_2'],
      });
    });

    const voPauseButton = this.addButton(this.voButtons, 'Pause', () => {
      this.app.sendAction('pause_vo');
      if (this.app.voiceover.paused) {
        (voPauseButton.getChildAt(1) as Text).text = 'Resume';
      } else {
        (voPauseButton.getChildAt(1) as Text).text = 'Pause';
      }
    });

    this.addButton(this.voButtons, 'Stop', () => {
      this.app.sendAction('stop_vo');
    });

    this.addButton(this.captionsButtons, 'Light Mode', () => {
      this.app.sendAction('caption_theme', {
        backgroundColor: [255, 255, 255],
        backgroundAlpha: 0.5,
        textColor: [0, 0, 0],
      });
    });
    this.addButton(this.captionsButtons, 'Dark Mode', () => {
      this.app.sendAction('caption_theme', {
        backgroundColor: [0, 0, 0],
        backgroundAlpha: 0.5,
        textColor: [255, 255, 255],
      });
    });

    this.app.actions('vo').connect(this._handleVo);
    this.app.actions('pause_vo').connect(this._handlePauseVo);
    this.app.actions('stop_vo').connect(this._handleStopVo);
    this.app.actions('caption_theme').connect(this._handlCaptionThemeChanged);
  }

  public async start() {}

  public destroy() {
    super.destroy();
  }

  protected configureGUI() {
    this.gui.open();
    const voFolder = this.gui.addFolder('Voiceover');
    voFolder.open();
    voFolder.add(this.config, 'volume', 0, 5, 0.001).name('Volume').onChange(this._handleVOVolumeChanged);
    voFolder.add(this.config, 'muted').name('Mute').onChange(this._handleMuteChanged);

    const captionsFolder = this.gui.addFolder('Captions');
    captionsFolder.open();
    captionsFolder.add(this.config.captions, 'enabled').name('Enabled').onChange(this._handleCaptionsEnabledChanged);
    captionsFolder
      .add(this.config.captions, 'fontSizeMultiplier', 1, 3, 0.25)
      .name('Size')
      .onChange(this._handleCaptionsSizeChanged);
    captionsFolder
      .add(this.config.captions, 'maxWidth', 0.25, 1, 0.05)
      .name('Text Width')
      .onChange(this._handleMaxWidthChanged);

    this._captionsBgAlphaController = captionsFolder
      .add(this.config.captions, 'backgroundAlpha', 0.1, 1, 0.1)
      .name('BG Alpha')
      .onChange(this._handleBgAlphaChanged);

    this._captionsBgColorController = captionsFolder
      .addColor(this.config.captions, 'backgroundColor')
      .name('BG Color')
      .onChange(this._handleBgColorChanged);

    this._captionsTextColorController = captionsFolder
      .addColor(this.config.captions, 'textColor')
      .name('Text Color')
      .onChange(this._handleTextColorChanged);

    captionsFolder
      .add(this.config.captions, 'position', ['top', 'bottom'])
      .name('Position')
      .onChange(this._handleCaptionsPositionChanged);

    captionsFolder.add(this.config.captions, 'floating').name('Floating').onChange(this._handleCaptionsFloatingChanged);
    const floatingSettingsFolder = captionsFolder.addFolder('Float Settings');
    floatingSettingsFolder
      .add(this.config.captions.floatingSettings, 'distance', 0, 100, 1)
      .onChange(this._handleFloatingSettingsChanged);

    this._floatingSettingsFolder = floatingSettingsFolder;

    const padding = floatingSettingsFolder.addFolder('Padding');
    padding
      .add(this.config.captions.floatingSettings.padding, 'top', 0, 50, 1)
      .onChange(this._handleFloatingSettingsChanged);
    padding
      .add(this.config.captions.floatingSettings.padding, 'right', 0, 50, 1)
      .onChange(this._handleFloatingSettingsChanged);
    padding
      .add(this.config.captions.floatingSettings.padding, 'bottom', 0, 50, 1)
      .onChange(this._handleFloatingSettingsChanged);
    padding
      .add(this.config.captions.floatingSettings.padding, 'left', 0, 50, 1)
      .onChange(this._handleFloatingSettingsChanged);
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

  _handleVOVolumeChanged(value: number) {
    this.app.audio.setChannelVolume('voiceover', value);
  }

  _handleMuteChanged(value: boolean) {
    this.app.audio.muted = value;
  }

  _handleCaptionsEnabledChanged(value: boolean) {
    this.app.captions.enabled = value;
  }

  _handleCaptionsFloatingChanged(value: boolean) {
    this.app.captions.floating = value;
    this.app.captions.floatingSettings = this.config.captions.floatingSettings;
    if (value) {
      this._floatingSettingsFolder.open();
    } else {
      this._floatingSettingsFolder.close();
    }
  }

  _handleFloatingSettingsChanged() {
    this.app.captions.floatingSettings = this.config.captions.floatingSettings;
  }

  _handleCaptionsPositionChanged(value: 'top' | 'bottom') {
    this.app.captions.position = value;
  }

  _handleBgColorChanged(value: number[]) {
    // convert color array to number
    const color = (value[0] << 16) + (value[1] << 8) + value[2];
    this.app.captions.backgroundColor = color;
  }

  _handleCaptionsSizeChanged(value: number) {
    this.app.captions.fontSizeMultiplier = value;
  }

  _handleMaxWidthChanged(value: number) {
    this.app.captions.maxWidth = value;
  }

  _handleBgAlphaChanged(value: number) {
    this.app.captions.backgroundAlpha = value;
  }

  _handleTextColorChanged(value: number[]) {
    const color = (value[0] << 16) + (value[1] << 8) + value[2];
    this.app.captions.textColor = color;
  }

  private _handleVo(action: ActionDetail) {
    void this.app.voiceover.playVO(action.data.ids, { localized: true });
  }

  private _handlePauseVo() {
    if (this.app.voiceover.paused) {
      this.app.voiceover.resumeVO();
    } else {
      this.app.voiceover.pauseVO();
    }
  }

  private _handleStopVo() {
    void this.app.voiceover.stopVO();
  }

  private _handlCaptionThemeChanged(action: ActionDetail) {
    const { backgroundColor, backgroundAlpha, textColor } = action.data;
    this._captionsBgColorController.setValue(backgroundColor);
    this._captionsBgAlphaController.setValue(backgroundAlpha);
    this._captionsTextColorController.setValue(textColor);
  }
}
