import { Input } from 'dill-pixel/ui';
import { BaseScene } from '@/scenes/BaseScene';
import { FlexContainer } from 'dill-pixel';

export class UIScene extends BaseScene {
  public title = 'UI';
  public subtitle = 'UI components';

  protected list: FlexContainer;

  public constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    this.app.focus.addFocusLayer(this.id);

    this.list = this.add.flexContainer({
      flexDirection: 'column',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
    });

    const input = this.list.add.existing(
      new Input({
        input: { style: { align: 'left', fontSize: 30 } },
        placeholder: { text: 'I am  huge', alpha: 0.5, style: { fill: 0x666666 } },
        minWidth: 400,
        padding: [20, 30],
        bg: { radius: 200, stroke: { width: 6, color: 0x0 } },
        selectionColor: 0x00ff00,
      }),
      { label: 'input' },
    );

    const withOverlay = this.list.add.existing(
      new Input({
        minWidth: 400,
        placeholder: { text: 'Touch overlay', style: { fill: 0x666666 } },
        padding: [12, 15],
        overlayOnFocus: { mobile: true, touch: true, desktop: false, settings: { marginTop: 60, scale: 2.5 } },
        bg: {
          stroke: {
            width: 2,
            color: 0x0,
          },
        },
      }),
      { label: 'tel' },
    );

    const tel = this.list.add.existing(
      new Input({
        minWidth: 400,
        placeholder: { text: 'Valid phone number (regex)', style: { fill: 0x666666 } },
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
        input: { style: { align: 'center' } },
        placeholder: { text: 'Align center', style: { fill: 0x666666 } },
        padding: [12, 15],
      }),
      { label: 'input2' },
    );

    const input3 = this.list.add.existing(
      new Input({
        minWidth: 400,
        input: { style: { align: 'right' } },
        placeholder: { text: 'Align right', style: { fill: 0x666666 } },
        padding: [12, 15],
      }),
      { label: 'input3' },
    );

    const input4 = this.list.add.existing(
      new Input({
        minWidth: 400,
        input: { style: { align: 'left' } },
        placeholder: { text: 'Disallow numbers', style: { fill: 0x666666 } },
        padding: [12, 15],
        pattern: '[^a-z]*',
      }),
      { label: 'input4' },
    );

    const input5 = this.list.add.existing(
      new Input({
        minWidth: 400,
        input: { style: { align: 'left' } },
        placeholder: { text: 'Password', style: { fill: 0x666666 } },
        padding: [12, 15],
        type: 'password',
      }),
      { label: 'input5' },
    );

    this.app.focus.add([input, withOverlay, tel, input2, input3, input4, input5], this.id);
  }
}
