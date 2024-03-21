import { Button, Container } from 'dill-pixel';
import { Ticker } from 'pixi.js';
import { PopupConfig } from '../../../src/display/Popup.ts';
import { ExamplePopup } from '../popups/ExamplePopup.ts';
import { BaseScene } from './BaseScene';

export class PopupScene extends BaseScene {
  protected readonly title = 'Popups';
  protected buttons: Button[] = [];
  protected buttonContainer: Container;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();
    this.buttonContainer = this.add.container();
    this.app.focus.addFocusLayer(this.id);
  }

  public async start() {
    this.app.popups.add('one', ExamplePopup);
    this.app.popups.add('two', ExamplePopup);
    this.app.popups.add('three', ExamplePopup);

    this.addButton('Popup 1', () => this.showPopup('one'));
    this.addButton('Popup 2', () =>
      this.showPopup('two', {
        data: { title: "Won't close on ESC" },
        closeOnEscape: false,
      }),
    );
    this.addButton('Popup 3', () =>
      this.showPopup('three', {
        data: { title: "Won't close on click outside" },
        closeOnPointerDownOutside: false,
        backing: { color: 'red' },
      }),
    );

    this.resize();

    this.buttons.forEach((btn, idx) => {
      this.app.focus.add(btn, this.id, idx === 0);
    });
  }

  update(ticker: Ticker) {}

  resize() {
    this.buttons.forEach((btn, idx) => {
      btn.x = idx * (btn.width + 10);
    });
    this.buttonContainer.position.set(
      -this.buttonContainer.width * 0.5 + (this.buttonContainer.getChildAt(0)?.width * 0.5 || 0),
      0,
    );
  }

  addButton(label: string = 'Button', callback: () => void) {
    const btn = this.buttonContainer.add.button({
      scale: 0.5,
      config: {
        cursor: 'pointer',
        textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
        sheet: 'ui.json',
      },
    });

    btn.add.text({
      text: label,
      anchor: 0.5,
      style: { fill: 0xffffff, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    this.addSignalConnection(btn.onPress.connect(callback));
    this.addSignalConnection(btn.onFocus.connect(callback));

    this.buttons.push(btn);

    return btn;
  }

  showPopup(
    popupId: string,
    config: Partial<PopupConfig> = {
      backing: { color: 0x222222 },
      data: { title: `Example Popup ${popupId}` },
    },
  ) {
    void this.app.popups.show(popupId, config);
  }
}
