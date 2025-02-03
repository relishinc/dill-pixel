import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { FlexContainer, ToastConfig, Toaster, ToastType, UICanvasEdge } from 'dill-pixel';
import { TextStyleOptions } from 'pixi.js';

export const id = 'ui-toaster';
export const debug = {
  group: 'UI',
  label: 'UI Toaster',
};

const whiteTextStyle = (size: number): Partial<TextStyleOptions> => ({
  fontFamily: FONT_KUMBH_SANS,
  fontWeight: 'bold',
  fill: 0xffffff,
  fontSize: size ?? 24,
  align: 'right',
});

export default class UIToasterScene extends BaseScene {
  protected readonly title = 'UI Toaster';
  protected readonly subtitle = "Demonstrates the UI Toaster's functionality.";
  protected toaster: Toaster;
  protected buttonContainer: FlexContainer;
  protected config = {
    toaster: {
      position: 'top right' as UICanvasEdge,
      maxToasts: 5,
      spacing: 10,
      offset: 20,
      stackDirection: 'down' as 'up' | 'down',
    },
    toast: {
      duration: 3000,
      width: 300,
      height: 80,
      backgroundColor: 0x000000,
      backgroundAlpha: 0.8,
      cornerRadius: 8,
      padding: 10,
      autoClose: true,
      fontSize: 16,
    },
  };

  configureGUI() {
    // Toaster settings
    const toasterFolder = this.gui.addFolder('Toaster Settings');
    toasterFolder
      .add(this.config.toaster, 'position', [
        'top right',
        'top left',
        'top center',
        'bottom right',
        'bottom left',
        'bottom center',
      ])
      .onChange(() => {
        this.toaster.config.position = this.config.toaster.position;
        this.toaster.positionToasts();
      });

    toasterFolder.add(this.config.toaster, 'maxToasts', 1, 10, 1).onChange(() => {
      this.toaster.config.maxToasts = this.config.toaster.maxToasts;
    });

    toasterFolder.add(this.config.toaster, 'spacing', 0, 50, 1).onChange(() => {
      this.toaster.config.spacing = this.config.toaster.spacing;
      this.toaster.positionToasts();
    });

    toasterFolder.add(this.config.toaster, 'offset', 0, 100, 1).onChange(() => {
      this.toaster.config.offset = this.config.toaster.offset;
      this.toaster.positionToasts();
    });

    toasterFolder.add(this.config.toaster, 'stackDirection', ['up', 'down']).onChange(() => {
      this.toaster.config.stackDirection = this.config.toaster.stackDirection;
      this.toaster.positionToasts();
    });

    toasterFolder.open();

    // Toast settings
    const toastFolder = this.gui.addFolder('Toast Settings');
    toastFolder.add(this.config.toast, 'duration', 500, 10000, 100).name('Duration (ms)');
    toastFolder.add(this.config.toast, 'width', 100, 800, 10);
    toastFolder.add(this.config.toast, 'height', 40, 200, 5);
    toastFolder.addColor({ color: this.config.toast.backgroundColor }, 'color').onChange((value: number) => {
      this.config.toast.backgroundColor = value;
    });
    toastFolder.add(this.config.toast, 'backgroundAlpha', 0, 1, 0.1);
    toastFolder.add(this.config.toast, 'cornerRadius', 0, 20, 1);
    toastFolder.add(this.config.toast, 'padding', 0, 30, 1);
    toastFolder.add(this.config.toast, 'autoClose');
    toastFolder.add(this.config.toast, 'fontSize', 8, 32, 1);
    toastFolder.open();
  }

  async initialize() {
    await super.initialize();

    // Create toaster with config
    this.toaster = this.add.existing(new Toaster(this.config.toaster));

    // Create button container
    this.buttonContainer = this.add.flexContainer({
      gap: 20,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: this.app.size.width,
      height: this.app.size.height,
      x: -this.app.size.width * 0.5,
      y: -this.app.size.height * 0.5,
    });

    // Add buttons for different toast types
    this.addToastButton('Show Info Toast', 'info');
    this.addToastButton('Show Success Toast', 'success');
    this.addToastButton('Show Warning Toast', 'warning');
    this.addToastButton('Show Error Toast', 'error');

    // Add button for custom toast
    this.addCustomToastButton();
  }

  protected addToastButton(label: string, type: ToastType): void {
    const button = this.buttonContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui',
      accessibleTitle: label,
      accessibleHint: `Click to show a ${type} toast notification`,
    });

    button.add.text({
      text: label,
      anchor: 0.5,
      resolution: 2,
      style: whiteTextStyle(48),
    });

    this.addSignalConnection(
      button.onClick.connect(() => {
        this.toaster.show({
          message: `This is a ${type} toast notification!`,
          type,
          duration: this.config.toast.duration,
          width: this.config.toast.width,
          height: this.config.toast.height,
          backgroundColor: this.config.toast.backgroundColor,
          backgroundAlpha: this.config.toast.backgroundAlpha,
          cornerRadius: this.config.toast.cornerRadius,
          padding: this.config.toast.padding,
          autoClose: this.config.toast.autoClose,
          style: {
            fontSize: this.config.toast.fontSize,
            fill: 0xffffff,
            fontFamily: FONT_KUMBH_SANS,
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: this.config.toast.width - this.config.toast.padding * 2,
          },
        });
      }),
    );
  }

  protected addCustomToastButton(): void {
    const button = this.buttonContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui',
      accessibleTitle: 'Show Custom Toast',
      accessibleHint: 'Click to show a custom toast notification',
    });

    button.add.text({
      text: 'Show Custom Toast',
      anchor: 0.5,
      resolution: 2,
      style: whiteTextStyle(48),
    });

    this.addSignalConnection(
      button.onClick.connect(() => {
        const config: ToastConfig = {
          message: 'This is a custom toast with different styling!',
          width: 400,
          height: 100,
          backgroundColor: 0x9b59b6,
          backgroundAlpha: 0.9,
          cornerRadius: 15,
          duration: 5000,
          style: {
            fontSize: 20,
            fill: 0xffffff,
            fontFamily: FONT_KUMBH_SANS,
            fontWeight: 'bold',
          },
        };
        this.toaster.show(config);
      }),
    );
  }

  resize() {
    super.resize();
    if (this.buttonContainer) {
      this.buttonContainer.size = [this.app.size.width, this.app.size.height];
      this.buttonContainer.position.set(-this.app.size.width * 0.5, -this.app.size.height * 0.5);
    }
  }
}
