import { Input } from 'dill-pixel/ui';
import { BaseScene } from '@/scenes/BaseScene';
import { Texture } from 'pixi.js';
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
        placeholder: { text: 'Enter first name', style: { fill: 0x666666 } },
        bg: this.make.sprite({ asset: Texture.WHITE, width: 100, height: 50 }),
        padding: [10, 20],
        maxLength: 10,
      }),
      { label: 'input' },
    );
    const input2 = this.container.add.existing(
      new Input({
        placeholder: { text: 'Enter last name', style: { fill: 0x666666 } },
        bg: this.make.sprite({ asset: Texture.WHITE, width: 100, height: 50 }),
        padding: [10, 20],
      }),
      { label: 'input2' },
    );

    this.app.focus.add(input, this.id, true);
    this.app.focus.add(input2, this.id);
  }
}
