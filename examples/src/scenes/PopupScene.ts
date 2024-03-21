import { delay } from 'dill-pixel';
import { Ticker } from 'pixi.js';
import { ExamplePopup, SimpleButton } from '../popups/ExamplePopup.ts';
import { BaseScene } from './BaseScene';

export class PopupScene extends BaseScene {
  protected readonly title = 'Popups';

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();
    this.app.focus.addFocusLayer(this.id);
  }

  destroy() {
    this.app.focus.removeFocusLayer(this.id);
    super.destroy();
  }

  public async start() {
    this.app.popups.add('one', ExamplePopup);
    this.app.popups.add('two', ExamplePopup);
    this.app.popups.add('three', ExamplePopup);

    const btn = this.add.existing(new SimpleButton());

    btn.onInteraction('click').connect(this.showPopup);
    btn.onFocus.connect(this.showPopup);

    this.app.focus.add(btn, this.id, true);
  }

  update(ticker: Ticker) {}

  resize() {}

  showPopup() {
    void this.app.popups.show('one', {
      backing: { alpha: 0.5, color: 0x222222 },
      data: { title: 'Example Popup' },
    });

    void this.app.popups.show('two', {
      backing: { alpha: 0.2, color: 0xff0000 },
      data: { title: 'Example Popup 2' },
    });

    delay(1).then(() => {
      this.app.popups.show('three', {
        data: { title: 'Example Popup!!!' },
        backing: false,
        closeOnEscape: false,
        closeOnPointerDownOutside: false,
      });
    });
  }
}
