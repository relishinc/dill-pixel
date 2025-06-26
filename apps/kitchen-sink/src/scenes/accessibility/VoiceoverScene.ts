import BaseScene from '@/scenes/BaseScene';
import { ActionDetail, Button, FlexContainer, type SceneDebug } from 'dill-pixel';
import { Text } from 'pixi.js';

export const id = 'voiceover';
export const debug: SceneDebug = {
  group: 'Accessibility',
  label: 'Voiceovers & Captions',
};

function outputColor(value: number[]) {
  return (value[0] << 16) + (value[1] << 8) + value[2];
}

export default class VoiceoverScene extends BaseScene {
  protected readonly title = 'Voiceovers / Captions';
  protected readonly subtitle = 'Demonstrates VO / Captioning.';

  protected config = {
    volume: 2,
    muted: false,
    captions: {
      enabled: true,
      fontSizeMultiplier: 1,
      maxWidth: 0.6,
      floating: false,
      distance: 10,
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
      position: 'top',
      backgroundColor: [0, 0, 0],
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

  private _voPauseButton: Button;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();
    this.app.actionContext = 'default';
    this.app.focus.addFocusLayer(this.id);
    this.app.audio.muted = this.config.muted;

    this.buttonContainer = this.add.flexContainer({
      gap: 30,
      justifyContent: 'center',
      layout: { width: this.app.size.width, flexWrap: 'wrap' },
    });
    this.buttonContainer.label = 'ButtonContainer';

    this.voButtons = this.buttonContainer.add.flexContainer({
      gap: 10,
      flexDirection: 'column',
      alignItems: 'center',
      layout: { width: 256, flexGrow: 0, flexShrink: 0 },
    });

    this.captionsButtons = this.buttonContainer.add.flexContainer({
      gap: 10,
      flexDirection: 'column',
      alignItems: 'center',
      layout: { width: 256, flexGrow: 0, flexShrink: 0 },
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
      this.app.action('vo', {
        ids: ['vo_intro_0', 'vo_intro_1', 'vo_intro_2'],
      });
    });

    this._voPauseButton = this.addButton(this.voButtons, 'Pause', () => {
      this.app.action('pause_vo');
      this._updatePauseButton();
    });

    this.addButton(this.voButtons, 'Stop', () => {
      this.app.action('stop_vo');
    });

    this.addButton(this.captionsButtons, 'Light Mode', () => {
      this.app.action('caption_theme', {
        backgroundColor: [255, 255, 255],
        backgroundAlpha: 0.5,
        textColor: [0, 0, 0],
      });
    });
    this.addButton(this.captionsButtons, 'Dark Mode', () => {
      this.app.action('caption_theme', {
        backgroundColor: [0, 0, 0],
        backgroundAlpha: 0.5,
        textColor: [255, 255, 255],
      });
    });

    this.app.actions('vo').connect(this._handleVo);
    this.app.actions('pause_vo').connect(this._handlePauseVo);
    this.app.actions('stop_vo').connect(this._handleStopVo);
    this.app.actions('caption_theme').connect(this._handlCaptionThemeChanged);

    this._handleCaptionsFloatingChanged(this.config.captions.enabled);

    this.app.captions.options = {
      ...this.config.captions,
      maxWidth: this.config.captions.maxWidth * this.app.size.width,
      position: this.config.captions.position as 'top' | 'bottom',
      textColor: outputColor(this.config.captions.textColor),
      backgroundColor: outputColor(this.config.captions.backgroundColor),
    };
  }

  public async start() {
    this.app.captions.enabled = true;
  }

  public destroy() {
    super.destroy();
  }

  resize() {
    super.resize();
    this.buttonContainer.layoutWidth = this.app.size.width;
    this.buttonContainer.position.set(-this.app.size.width * 0.5, -this.buttonContainer.height / 2);
  }

  addButton(container: FlexContainer, label: string = 'Button', callback: () => void) {
    const btn = container.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui',
      accessibleTitle: label,
      accessibleHint: `Press me to play a sound`,
      layout: { width: 256, height: 70 },
    });

    btn.addLabel({
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
    if (value) {
      this._floatingSettingsFolder.open();
    } else {
      this._floatingSettingsFolder.close();
    }
  }

  _handlePaddingChanged() {
    this.app.captions.padding = this.config.captions.padding;
  }

  _handleDistanceChanged() {
    this.app.captions.distance = this.config.captions.distance;
  }

  _handleCaptionsPositionChanged(value: 'top' | 'bottom') {
    this.app.captions.position = value;
  }

  _handleBgColorChanged(value: number[]) {
    this.app.captions.backgroundColor = outputColor(value);
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
    this.app.captions.textColor = outputColor(value);
  }

  protected configureGUI() {
    // this.gui.open();
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

    const padding = captionsFolder.addFolder('Padding');
    padding.open();
    padding.add(this.config.captions.padding, 'top', 0, 50, 1).onChange(this._handlePaddingChanged);
    padding.add(this.config.captions.padding, 'right', 0, 50, 1).onChange(this._handlePaddingChanged);
    padding.add(this.config.captions.padding, 'bottom', 0, 50, 1).onChange(this._handlePaddingChanged);
    padding.add(this.config.captions.padding, 'left', 0, 50, 1).onChange(this._handlePaddingChanged);

    captionsFolder.add(this.config.captions, 'floating').name('Floating').onChange(this._handleCaptionsFloatingChanged);
    const floatingSettingsFolder = captionsFolder.addFolder('Float Settings');
    floatingSettingsFolder.add(this.config.captions, 'distance', 0, 100, 1).onChange(this._handleDistanceChanged);

    this._floatingSettingsFolder = floatingSettingsFolder;
  }

  private _updatePauseButton() {
    if (this.app.voiceover.paused) {
      (this._voPauseButton.getChildAt(1) as Text).text = 'Resume';
    } else {
      (this._voPauseButton.getChildAt(1) as Text).text = 'Pause';
    }
  }

  private _handleVo(action: ActionDetail) {
    void this.app.voiceover.playVO(action.data.ids, { localized: true });
    this._updatePauseButton();
  }

  private _handlePauseVo() {
    if (this.app.voiceover.paused) {
      this.app.voiceover.resumeVO();
    } else {
      this.app.voiceover.pauseVO();
    }
    this._updatePauseButton();
  }

  private _handleStopVo() {
    void this.app.voiceover.stopVO();
    this._updatePauseButton();
  }

  private _handlCaptionThemeChanged(action: ActionDetail) {
    const { backgroundColor, backgroundAlpha, textColor } = action.data;
    this._captionsBgColorController.setValue(backgroundColor);
    this._captionsBgAlphaController.setValue(backgroundAlpha);
    this._captionsTextColorController.setValue(textColor);
  }
}
