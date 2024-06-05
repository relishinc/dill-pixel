import { Input } from 'dill-pixel/ui';
import { BaseScene } from '@/scenes/BaseScene';
import { FlexContainer } from 'dill-pixel';

export class UIScene extends BaseScene {
  public title = 'UI';
  public subtitle = 'UI components';
  container: FlexContainer;

  public constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    this.app.exec.addFocusLayer(this.id);
    this.container = this.add.flexContainer({
      flexDirection: 'column',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
    });
    const input = this.container.add.existing(
      new Input({
        input: { style: { align: 'left', fontSize: 30 } },
        placeholder: { text: 'Align left', alpha: 0.5, style: { fill: 0x666666 } },
        minWidth: 300,
        padding: [12, 15],
      }),
      { label: 'input' },
    );

    const input2 = this.container.add.existing(
      new Input({
        input: { style: { align: 'center' } },
        placeholder: { text: 'Align center', style: { fill: 0x666666 } },

        padding: [12, 15],
      }),
      { label: 'input2' },
    );
    const input3 = this.container.add.existing(
      new Input({
        input: { style: { align: 'right' } },
        placeholder: { text: 'Align right', style: { fill: 0x666666 } },
        padding: [12, 15],
      }),
      { label: 'input3' },
    );

    const input4 = this.container.add.existing(
      new Input({
        input: { style: { align: 'left' } },
        placeholder: { text: 'Disallow numbers', style: { fill: 0x666666 } },
        padding: [12, 15],
        pattern: '[^a-z]*',
      }),
      { label: 'input4' },
    );
    const input5 = this.container.add.existing(
      new Input({
        input: { style: { align: 'left' } },
        placeholder: { text: 'Password', style: { fill: 0x666666 } },
        padding: [12, 15],
        type: 'password',
        debug: true,
      }),
      { label: 'input5' },
    );

    this.app.focus.add(input, this.id, true);
    this.app.focus.add([input2, input3, input4, input5], this.id);
  }
}
