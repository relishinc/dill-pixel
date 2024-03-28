import { UICanvas } from 'dill-pixel';
import { TextStyle } from 'pixi.js';
import { BaseScene } from './BaseScene';

const whiteTextStyle = (size: number) =>
  new TextStyle({
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
    fontSize: size ?? 24,
    align: 'right',
  });

export class UICanvasScene extends BaseScene {
  protected readonly title = 'UI Canvas';
  protected ui: UICanvas;

  async initialize() {
    await super.initialize();

    this.ui = this.add.uiCanvas({
      padding: [125, 100, 50],
      alignToStage: true,
      debug: true,
    });
  }

  async start() {
    // added using incorrect method - works, but will align the element to the top left
    this.ui.add.text({ text: 'top left', style: whiteTextStyle(24) });

    // adds elements the correct way
    this.ui.addElement(this.make.text({ text: 'top center', style: whiteTextStyle(24) }), {
      align: 'top',
    });
    this.ui.addElement(this.make.text({ text: 'too right', style: whiteTextStyle(24) }), { align: 'top right' });
    this.ui.addElement(this.make.text({ text: 'right center', style: whiteTextStyle(24) }), { align: 'right' });
    this.ui.addElement(this.make.text({ text: 'bottom left', style: whiteTextStyle(24) }), { align: 'bottom left' });
    this.ui.addElement(this.make.text({ text: 'left center', style: whiteTextStyle(24) }), { align: 'left' });
    this.ui.addElement(this.make.text({ text: 'bottom right', style: whiteTextStyle(24) }), { align: 'bottom right' });

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

    // set new padding
    // await delay(2);
    // this.ui.padding = [50, 50];

    // set size
    // await delay(2);
    // this.ui.size = [500, 500];
    // this.ui.position.set(-250, -250);
  }
}
