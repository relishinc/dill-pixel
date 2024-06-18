import { ActionDetail, Button, FlexContainer, PopupConfig } from 'dill-pixel';

import { BaseScene } from './BaseScene';
import { ExamplePopup } from '@/popups/ExamplePopup';
import { FONT_KUMBH_SANS } from '@/utils/Constants';

export class PopupScene extends BaseScene {
  protected readonly title = 'Popups';
  protected readonly subtitle =
    'Open a popup by clicking a button.\nThe' + ' different popups have different behaviors.';
  protected buttons: Button[] = [];
  protected buttonContainer: FlexContainer;

  public async initialize() {
    await super.initialize();
    this.app.func.setActionContext('game');
    this.app.focus.addFocusLayer(this.id);

    this.app.popups.addPopup('one', ExamplePopup);
    this.app.popups.addPopup('two', ExamplePopup);
    this.app.popups.addPopup('three', ExamplePopup);

    this.buttonContainer = this.add.flexContainer({
      gap: 10,
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: this.app.size.width,
      x: -this.app.size.width * 0.5,
    });

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
    this.addSignalConnection(
      this.app.actions('showPopup').connect(this._handleShowPopup),
      this.app.signal.onHidePopup.connect(() => {
        this.app.func.setActionContext('game');
      }),
    );
  }

  public async start() {
    this.app.focus.add(this.buttons, this.id, true);
  }

  _handleShowPopup(action: ActionDetail<PopupConfig<{ title: string }>>) {
    if (action.context === 'popup') {
      return;
    }
    this.app.func.setActionContext('popup');
    if (action.data?.id) {
      this.showPopup(action.data?.id, action.data);
    }
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
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: FONT_KUMBH_SANS, fontWeight: 'bold', fontSize: 48, align: 'center' },
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

  resize() {
    super.resize();
    this.buttonContainer.containerWidth = this.app.size.width;
    this.buttonContainer.x = -this.app.size.width * 0.5;
  }
}
