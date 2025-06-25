import { ActionDetail, Button, FlexContainer, PopupConfig, type SceneDebug } from 'dill-pixel';

import { ExamplePopup } from '@/popups/ExamplePopup';
import BaseScene from '@/scenes/BaseScene';

export const id = 'ui-popup';
export const debug: SceneDebug = {
  group: 'UI',
  label: 'Popups',
  order: 2,
};

export default class PopupScene extends BaseScene {
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

    this.app.popups.onPopupChanged.connect(() => {
      console.log(this.app.popups.hasActivePopups);
    });

    this.buttonContainer = this.add.flexContainer({
      gap: 10,
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      label: 'Popup Buttons',
      x: this.app.size.width,
    });

    this.addButton('Popup 1', () => {
      this.app.action('show_popup', {
        id: 'one',
        data: { title: `Example Popup 1` },
      });
    });
    this.addButton('Popup 2', () =>
      this.app.action('show_popup', {
        id: 'two',
        data: { title: `Example Popup 2:\nWon't close on ESC` },
        closeOnEscape: false,
      }),
    );
    this.addButton('Popup 3', () =>
      this.app.action('show_popup', {
        id: 'three',
        data: { title: "Example Popup 3:\nWon't close on click outside" },
        closeOnPointerDownOutside: false,
        backing: { color: 'red' },
      }),
    );
    this.addSignalConnection(this.app.actions('show_popup').connect(this._handleShowPopup));
  }

  public async start() {
    this.app.focus.add(this.buttons, this.id, true);
  }

  async _handleShowPopup(action: ActionDetail<PopupConfig<{ title: string }>>) {
    if (action.data?.id) {
      this.showPopup(action.data?.id, action.data);
    }
  }

  addButton(label: string = 'Button', callback: () => void) {
    const btn = this.buttonContainer.add.button({
      scale: 0.5,
      cursor: 'pointer',
      textures: { default: 'btn/blue', hover: 'btn/yellow', disabled: 'btn/grey', active: 'btn/red' },
      sheet: 'ui',
      accessibleTitle: label,
      accessibleHint: `Press me to show a popup`,
      layout: { width: 256, height: 70 },
      label,
    });

    btn.addLabel({
      text: label,
      anchor: 0.5,
      resolution: 2,
      style: { fill: 0xffffff, fontFamily: 'KumbhSans', fontWeight: 'bold', fontSize: 48, align: 'center' },
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
    this.app.func.showPopup(popupId, config);
  }

  resize() {
    super.resize();
    this.buttonContainer.layoutWidth = this.app.size.width;
    this.buttonContainer.x = -this.app.size.width * 0.5;
    this.buttonContainer.y = -this.buttonContainer.height * 0.5;
  }
}
