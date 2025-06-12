import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { Application, Button, FlexContainer, Toast, ToastConfig, Toaster, ToastType, UICanvasEdge } from 'dill-pixel';
import { Graphics, TextStyleOptions, Texture } from 'pixi.js';
export const id = 'ui-toaster';
export const debug = {
  group: 'UI',
  label: 'UI Toaster',
  order: 5,
};

class ToastCloseButton extends Button {
  static _texture: Texture;

  static get texture() {
    if (!ToastCloseButton._texture) {
      ToastCloseButton._texture = ToastCloseButton.getTexture();
    }
    return ToastCloseButton._texture;
  }

  static getTexture() {
    const circle = new Graphics().circle(0, 0, 10).fill({ color: 0xffffff, alpha: 1 });

    const texture = Application.getInstance().renderer.generateTexture(circle);
    ToastCloseButton._texture = texture;

    return texture;
  }

  // Create circular background
  constructor() {
    super({
      cursor: 'pointer',
      textures: {
        default: ToastCloseButton.texture,
        hover: ToastCloseButton.texture,
        active: ToastCloseButton.texture,
        disabled: ToastCloseButton.texture,
      },
    });

    // Add X text
    this.add.text({
      text: '×',
      style: {
        fontFamily: FONT_KUMBH_SANS,
        fontSize: 20,
        fill: 0x0,
        fontWeight: 'bold',
        align: 'center',
        lineHeight: 20,
      },
      x: 0.5,
      y: -1.5,
      anchor: 0.5,
    });

    this.onOver.connect(() => {
      this.view.scale = 1.1;
    });

    this.onOut.connect(() => {
      this.view.scale = 1;
    });
  }
}

const whiteTextStyle = (size: number): Partial<TextStyleOptions> => ({
  fontFamily: FONT_KUMBH_SANS,
  fontWeight: 'bold',
  fill: 0xffffff,
  fontSize: size ?? 24,
  align: 'right',
});

/**
 * Custom toast class that positions the toast based on the toaster's position
 */
class CustomToast extends Toast {
  /**
   * Get the show animation for the toast
   * implements custom logic for animating the toast based on the toaster's position
   * @returns The show animation
   */
  public getShowAnimation(): gsap.core.Timeline {
    const isCenter = this.toaster.toastPosition.indexOf('center') >= 0;
    const isLeftSide = this.toaster.toastPosition.indexOf('left') >= 0;

    if (isCenter) {
      const isTop = this.toaster.toastPosition.indexOf('top') >= 0;
      this.pivot.set(0, isTop ? 10 : -10);
    } else {
      this.pivot.set(isLeftSide ? 50 : -50, 0);
    }

    const tl = super.getShowAnimation();
    tl.to(
      this.pivot,
      {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '<',
    );
    return tl;
  }

  /**
   * Get the hide animation for the toast
   * implements custom logic for closing the toast
   * scales the toast down to 0.5x its original size using this.view.scale
   * @returns The hide animation
   */
  public getHideAnimation(): gsap.core.Timeline {
    const tl = super.getHideAnimation();
    tl.to(this.view.scale, { x: 0.5, y: 0.5, duration: 0.25, ease: 'power2.in' }, '<');
    return tl;
  }
}

export default class UIToasterScene extends BaseScene {
  protected readonly title = 'UI Toaster';
  protected readonly subtitle = "Demonstrates the UI Toaster's functionality.";
  protected toaster: Toaster;
  protected buttonContainer: FlexContainer;
  protected config = {
    toaster: {
      position: 'bottom right' as UICanvasEdge,
      maxToasts: 5,
      spacing: 10,
      offset: { x: 20, y: 20 },
      stackDirection: 'up' as 'up' | 'down',
    },
    toast: {
      duration: 3000,
      width: 300,
      height: 100,
      backgroundColor: 0x000000,
      backgroundAlpha: 0.8,
      cornerRadius: 8,
      padding: 20,
      autoClose: true,
      fontSize: 16,
      textColor: 0xffffff,
    },
    shadow: {
      color: 0x000000,
      alpha: 0.2,
      offset: { x: 1, y: 3 },
    },
    closeButton: {
      size: 24,
      offset: 0,
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

    toasterFolder
      .add(this.config.toaster.offset, 'x', 0, 100, 1)
      .name('Offset X')
      .onChange(() => {
        this.toaster.config.offset = this.config.toaster.offset;
        this.toaster.positionToasts();
      });

    toasterFolder
      .add(this.config.toaster.offset, 'y', 0, 100, 1)
      .name('Offset Y')
      .onChange(() => {
        this.toaster.config.offset = this.config.toaster.offset;
        this.toaster.positionToasts();
      });

    toasterFolder.add(this.config.toaster, 'spacing', -50, 50, 1).onChange(() => {
      this.toaster.config.spacing = this.config.toaster.spacing;
      this.toaster.positionToasts();
    });

    toasterFolder.add(this.config.toaster, 'stackDirection', ['up', 'down']).onChange(() => {
      this.toaster.config.stackDirection = this.config.toaster.stackDirection;
      this.toaster.positionToasts();
    });

    toasterFolder.add({ hideAll: () => this.toaster.hideAll() }, 'hideAll').name('Hide All Toasts');

    toasterFolder.open();

    // Toast settings
    const toastFolder = this.gui.addFolder('Toast Settings');
    toastFolder.add(this.config.toast, 'duration', 500, 10000, 100).name('Duration (ms)');
    toastFolder.add(this.config.toast, 'width', 100, 800, 10);
    toastFolder.add(this.config.toast, 'height', 40, 200, 5);
    toastFolder
      .addColor({ color: this.config.toast.backgroundColor }, 'color')
      .name('BG Color')
      .onChange((value: number) => {
        this.config.toast.backgroundColor = value;
      });
    toastFolder
      .addColor({ color: this.config.toast.textColor }, 'color')
      .name('Text Color')
      .onChange((value: number) => {
        this.config.toast.textColor = value;
      });
    toastFolder.add(this.config.toast, 'backgroundAlpha', 0, 1, 0.1);
    toastFolder.add(this.config.toast, 'cornerRadius', 0, 20, 1);
    toastFolder.add(this.config.toast, 'padding', 0, 30, 1);
    toastFolder.add(this.config.toast, 'autoClose');
    toastFolder.add(this.config.toast, 'fontSize', 8, 32, 1);

    // Shadow settings
    const shadowFolder = this.gui.addFolder('Shadow Settings');
    shadowFolder
      .addColor({ color: this.config.shadow.color }, 'color')
      .name('Shadow Color')
      .onChange((value: number) => {
        this.config.shadow.color = value;
      });
    shadowFolder.add(this.config.shadow, 'alpha', 0, 1, 0.05).name('Shadow Alpha');
    shadowFolder.add(this.config.shadow.offset, 'x', -20, 20, 1).name('Shadow X');
    shadowFolder.add(this.config.shadow.offset, 'y', -20, 20, 1).name('Shadow Y');
    shadowFolder.open();

    toastFolder.open();
  }

  async initialize() {
    await super.initialize();

    this.app.focus.addFocusLayer(this.id);

    // Create button container
    this.buttonContainer = this.add.flexContainer({
      x: -128,
      layout: {
        flexDirection: 'column',
        gap: 20,
        width: 0,
      },
    });

    const toastConfig: ToastConfig = {
      class: CustomToast,
      message: `This is a toast notification!`,
      type: 'success',
      duration: this.config.toast.duration,
      width: this.config.toast.width,
      height: this.config.toast.height,
      backgroundColor: this.config.toast.backgroundColor,
      backgroundAlpha: this.config.toast.backgroundAlpha,
      cornerRadius: this.config.toast.cornerRadius,
      padding: this.config.toast.padding,
      autoClose: this.config.toast.autoClose,
      textAlign: 'left',
      shadow: {
        color: this.config.shadow.color,
        alpha: this.config.shadow.alpha,
        offset: { ...this.config.shadow.offset },
      },
      closeButton: {
        show: true,
        class: ToastCloseButton,
        position: 'top right',
        size: 12,
        offset: 8,
      },
      style: {
        fontSize: this.config.toast.fontSize,
        fill: this.config.toast.textColor,
        fontFamily: FONT_KUMBH_SANS,
        fontWeight: 'bold',
        wordWrap: true,
      },
    };

    // Create toaster with config
    this.toaster = this.add.toaster(this.config.toaster, toastConfig);

    // Add buttons for different toast types
    this.addToastButton('Info Toast', 'info');
    this.addToastButton('Success Toast', 'success');
    this.addToastButton('Warning Toast', 'warning');
    this.addToastButton('Error Toast', 'error');

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
      layout: { height: 70, width: 256 },
    });

    button.addLabel({
      text: label,
      anchor: 0.5,
      resolution: 2,
      style: whiteTextStyle(48),
    });

    this.app.focus.add(button, this.id);

    this.addSignalConnection(
      button.onClick.connect(() => {
        const shouldShowCloseButton = this.config.toast.autoClose === true ? false : true;
        const message = `Toast #${this.toaster.size + 1} - A ${type} toast notification!`;
        this.toaster.show({
          type,
          message,
          cornerRadius: 10,
          colorBarWidth: 8,
          autoClose: this.config.toast.autoClose,
          closeButton: { show: shouldShowCloseButton },
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
      accessibleTitle: 'Custom Toast',
      accessibleHint: 'Click to show a custom toast notification',
      layout: { height: 70, width: 256 },
    });

    button.addLabel({
      text: 'Custom Toast',
      anchor: 0.5,
      resolution: 2,
      style: whiteTextStyle(48),
    });

    this.app.focus.add(button, this.id);

    this.addSignalConnection(
      button.onClick.connect(() => {
        const showCloseButton = this.config.toast.autoClose === true ? false : true;
        const index = this.toaster.size;
        const config: ToastConfig = {
          message: `Toast #${index + 1} - This is a custom toast with different styling!`,
          width: 400,
          height: 100,
          backgroundColor: 0x9b59b6,
          backgroundAlpha: 1,
          cornerRadius: 0,
          colorBarWidth: 15,
          duration: 5000,
          padding: 18,
          autoClose: this.config.toast.autoClose,
          shadow: {
            color: 0x9b59b6,
            alpha: 0.3,
            offset: { x: 2, y: 6 },
          },
          closeButton: {
            show: showCloseButton,
            class: ToastCloseButton,
            position: 'top right',
            size: 24,
            offset: 12,
          },
          style: {
            fontSize: 24,
            fill: this.config.toast.textColor,
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
    this.buttonContainer.position.set(-128, -250);
  }
}
