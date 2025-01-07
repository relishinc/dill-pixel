import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { UICanvas } from 'dill-pixel';
import { TextStyleOptions } from 'pixi.js';

export const id = 'ui-canvas';
export const debug = {
  group: 'UI',
  label: 'UI Canvas',
};

const whiteTextStyle = (size: number): Partial<TextStyleOptions> => ({
  fontFamily: FONT_KUMBH_SANS,
  fontWeight: 'bold',
  fill: 0xffffff,
  fontSize: size ?? 24,
  align: 'right',
});

export default class UICanvasScene extends BaseScene {
  protected readonly title = 'UI Canvas';
  protected readonly subtitle =
    "Demonstrates the UI Canvas's alignment options.\nInitially, size is bound to the size of the" +
    ' application.\nModify the size / padding to see the UI Canvas resize.';
  protected config = {
    size: {
      width: 200,
      height: 200,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  protected ui: UICanvas;
  protected _sizeChanged: boolean = false;
  protected _isResizing: boolean = false;

  async initialize() {
    await super.initialize();
    this.ui = this.add.uiCanvas({
      useAppSize: true,
      debug: true,
    });
  }

  configureGUI() {
    this.config.size.width = this.app.size.width;
    this.config.size.height = this.app.size.height;

    const size = this.gui.addFolder('Size');
    size.add(this.config.size, 'width', 0, 3000, 1).onChange(() => {
      if (!this._isResizing) {
        this._sizeChanged = true;
      }
      this.setSize();
    });
    size.add(this.config.size, 'height', 0, 3000, 1).onChange(() => {
      if (!this._isResizing) {
        this._sizeChanged = true;
      }
      this.setSize();
    });
    size.open();

    const padding = this.gui.addFolder('Padding');
    padding.add(this.config.padding, 'top', 0, 200, 1).onChange(() => {
      this.setPadding();
    });
    padding.add(this.config.padding, 'right', 0, 200, 1).onChange(() => {
      this.setPadding();
    });
    padding.add(this.config.padding, 'bottom', 0, 200, 1).onChange(() => {
      this.setPadding();
    });
    padding.add(this.config.padding, 'left', 0, 200, 1).onChange(() => {
      this.setPadding();
    });
    // padding.open();
  }

  async start() {
    // added using incorrect method - works, but will align the element to the top left
    this.ui.add.text({ text: 'top left', style: whiteTextStyle(24) });

    // adds elements the correct way
    this.ui.addElement(this.make.text({ text: 'top center', resolution: 2, style: whiteTextStyle(24) }), {
      align: 'top',
    });
    this.ui.addElement(this.make.text({ text: 'top right', resolution: 2, style: whiteTextStyle(24) }), {
      align: 'top right',
    });
    this.ui.addElement(
      this.make.text({
        text: 'right center',
        style: whiteTextStyle(24),
      }),
      { align: 'right' },
    );
    this.ui.addElement(
      this.make.text({
        text: 'bottom left',
        style: whiteTextStyle(24),
      }),
      { align: 'bottom left' },
    );
    this.ui.addElement(
      this.make.text({
        text: 'left center',
        resolution: 2,
        style: whiteTextStyle(24),
      }),
      { align: 'left' },
    );

    this.ui.addElement(
      this.make.text({
        text: 'bottom right',
        style: whiteTextStyle(24),
      }),
      { align: 'bottom right' },
    );

    // probably want to add width / height to flexContainer
    // when doing any flex lignment
    // as it adjusts the pivot of inner containers
    const flex = this.make.flexContainer({
      gap: 20,
      alignItems: 'center',
      height: 48,
    });
    flex.add.text({ text: 'bottom 1', style: whiteTextStyle(24) });
    flex.add.text({ text: 'bottom 2', style: whiteTextStyle(48) });
    flex.add.text({ text: 'bottom 3', style: whiteTextStyle(24) });
    this.ui.addElement(flex, { align: 'bottom' });

    this.ui.addElement(
      this.make.text({
        text: 'center',
        style: whiteTextStyle(24),
      }),
      { align: 'center' },
    );
  }

  setSize() {
    this.ui.size = [this.config.size.width, this.config.size.height];
    this.ui.position.set(-this.config.size.width * 0.5, -this.config.size.height * 0.5);
  }

  resize() {
    super.resize();
    if (!this._sizeChanged) {
      this._isResizing = true;
      this.gui.__folders.Size.__controllers[0].setValue(this.app.renderer.screen.width);
      this.gui.__folders.Size.__controllers[0].updateDisplay();
      this.gui.__folders.Size.__controllers[1].setValue(this.app.renderer.screen.height);
      this.gui.__folders.Size.__controllers[1].updateDisplay();
      this._isResizing = false;
    }
  }

  setPadding() {
    this.ui.padding = [
      this.config.padding.top,
      this.config.padding.right,
      this.config.padding.bottom,
      this.config.padding.left,
    ];
  }
}
