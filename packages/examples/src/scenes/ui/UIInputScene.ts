import { FlexContainer, Input, wait } from 'dill-pixel';

import BaseScene from '@/scenes/BaseScene';

export const id = 'ui-input';
export const debug = {
  group: 'UI',
  label: 'UI Input',
  order: 6,
};

const overlaySettings = {
  activeFilter: ['mobile', 'touch'],
  marginTop: 60,
  scale: 2.5,
  backing: { active: true, color: 0x0 },
};

export default class UIScene extends BaseScene {
  public title = 'UI Input';
  public subtitle = 'UI Input components';

  protected list: FlexContainer;

  public async initialize() {
    await super.initialize();

    this.app.func.setActionContext('menu');
    this.app.focus.addFocusLayer(this.id);

    this.list = this.add.flexContainer({
      flexDirection: 'column',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
      visible: false,
    });

    const input = this.list.add.existing(
      new Input({
        style: { align: 'left', fontSize: 32 },
        placeholder: { text: 'I am  huge', alpha: 0.5, color: 0x666666 },
        minWidth: 400,
        padding: [20, 30],
        bg: { radius: 200, stroke: { width: 6, color: 0x0 } },
        selectionColor: 0x00ff00,
      }),
      { label: 'input' },
    );

    const tel = this.list.add.existing(
      new Input({
        minWidth: 400,
        placeholder: { text: 'Valid phone number (regex)' },
        padding: [12, 15],
        error: {
          input: { fill: 0xff0000 },
          bg: { fill: 0xf5e0df, stroke: { width: 2, color: 0xff0000 } },
        },
        type: 'tel',
        regex: /^1?-?\(?([2-9][0-9]{2})\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/,
        bg: {
          stroke: {
            width: 2,
            color: 0x0,
          },
        },
      }),
      { label: 'tel' },
    );

    const input2 = this.list.add.existing(
      new Input({
        minWidth: 400,
        style: { align: 'center' },
        placeholder: { text: 'Align center' },
        padding: [12, 15],
      }),
      { label: 'input2' },
    );

    const input3 = this.list.add.existing(
      new Input({
        minWidth: 400,
        style: { align: 'right' },
        placeholder: { text: 'Align right' },
        padding: [12, 15],
        focusOverlay: overlaySettings,
      }),
      { label: 'input3' },
    );

    const input4 = this.list.add.existing(
      new Input({
        minWidth: 400,
        style: { align: 'left' },
        placeholder: { text: 'Disallow numbers' },
        padding: [12, 15],
        pattern: '[^a-z]*',
        focusOverlay: overlaySettings,
      }),
      { label: 'input4' },
    );

    const input5 = this.list.add.existing(
      new Input({
        minWidth: 400,
        style: { align: 'left' },
        placeholder: { text: 'Password' },
        padding: [12, 15],
        focusOverlay: overlaySettings,
        type: 'password',
      }),
      { label: 'input5' },
    );

    const withOverlay = this.list.add.existing(
      new Input({
        minWidth: 400,
        placeholder: { text: 'Touch overlay' },
        padding: [12, 15],
        focusOverlay: overlaySettings,
        bg: {
          radius: 10,
          stroke: {
            width: 3,
            color: 0x0,
          },
        },
      }),
      { label: 'overlay' },
    );

    this.app.focus.add([input, tel, input2, input3, input4, input5, withOverlay], this.id);

    await wait(0.01);

    this.list.layout();
    this.list.visible = true;
  }
}
