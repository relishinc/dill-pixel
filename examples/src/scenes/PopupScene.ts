import { ActionDetail, Button, Container, PopupConfig } from 'dill-pixel';
import { ExamplePopup } from '../popups/ExamplePopup';
import { BaseScene } from './BaseScene';

export class PopupScene extends BaseScene {
  protected readonly title = 'Popups';
  protected buttons: Button[] = [];
  protected buttonContainer: Container;

  public async initialize() {
    await super.initialize();
    this.app.focus.addFocusLayer(this.id);

    this.app.popups.addPopup('one', ExamplePopup);
    this.app.popups.addPopup('two', ExamplePopup);
    this.app.popups.addPopup('three', ExamplePopup);

    this.buttonContainer = this.add.container();

    this.addButton('Popup 1', () => {
      this.app.sendAction('showPopup', {
        id: 'one',
        data: { title: `Example Popup 1` },
      });
    });
    this.addButton('Popup 2', () =>
      this.app.sendAction('showPopup', {
        id: 'two',
        data: { title: `Example Popup 2:\nWon't close on ESC` },
        closeOnEscape: false,
      }),
    );
    this.addButton('Popup 3', () =>
      this.app.sendAction('showPopup', {
        id: 'one',
        data: { title: "Example Popup 3:\nWon't close on click outside" },
        closeOnPointerDownOutside: false,
        backing: { color: 'red' },
      }),
    );

    this.app.actions('showPopup').connect(this._handleShowPopup);
    this.app.signal.onHidePopup.connect(() => {
      this.app.func.setActionContext('game');
    });
  }

  public async start() {
    this.buttons.forEach((btn, idx) => {
      this.app.focus.add(btn, this.id, idx === 0);
    });
  }

  resize() {
    super.resize();
    this.buttons.forEach((btn, idx) => {
      btn.x = idx * (btn.width + 10);
    });
    this.buttonContainer.position.set(
      -this.buttonContainer.width * 0.5 + (this.buttonContainer.getChildAt(0)?.width * 0.5 || 0),
      0,
    );
  }

  _handleShowPopup(action: ActionDetail<PopupConfig<{ title: string }>>) {
    if (action.context === 'popup') {
      return;
    }
    this.app.func.setActionContext('popup');
    this.showPopup(action.data.id, action.data);
  }

  addButton(label: string = 'Button', callback: () => void) {
    const btn = this.buttonContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui.json',
      accessibleTitle: label,
      accessibleHint: `Press me to show a popup`,
    });

    btn.add.text({
      text: label,
      anchor: 0.5,
      style: { fill: 0xffffff, fontWeight: 'bold', fontSize: 48, align: 'center' },
    });

    this.addSignalConnection(btn.onClick.connect(callback));

    this.buttons.push(btn);

    btn.label = label;

    return btn;
  }

  showPopup(
    popupId: string | number,
    config: Partial<PopupConfig> = {
      backing: { color: 0x222222 },
      data: { title: `Example Popup ${popupId}` },
    },
  ) {
    void this.app.func.showPopup(popupId, config);
  }
}
