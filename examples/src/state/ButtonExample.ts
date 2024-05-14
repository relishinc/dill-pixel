import { BaseState } from '@/state/BaseState';
import {
  addKeyboardLayer,
  AssetMapData,
  Button,
  delay,
  FlexContainer,
  hideAllPopups,
  registerFocusables,
} from '@relish-studios/dill-pixel';
import { Point } from 'pixi.js';

export class ButtonExample extends BaseState {
  count: number = 0;
  flex: FlexContainer;
  buttons: Button[] = [];

  public static get NAME(): string {
    return 'ButtonExample';
  }

  public static get Assets(): AssetMapData[] {
    return [];
  }

  destroy() {
    hideAllPopups();
    super.destroy();
  }

  init(pSize: Point) {
    addKeyboardLayer();
    super.init(pSize);
    //
    this.setHeaderText('Button example');
    this.setMainText('');

    // create a button with some basic textures
    const flex = this.add.flexContainer({ gap: 20, justifyContent: 'center', alignItems: 'center' });
    for (let i = 0; i < 4; i++) {
      flex.add.existing(this.makeButton(`Button ${i + 1}`));
    }

    this.flex = flex;
    this.buttons = this.flex.flexChildren as Button[];
  }

  update() {
    this.buttons.forEach((button) => {
      if (button.isDown) {
        console.log(`${button.name} is down`);
      }
    });
  }

  makeButton(name: string = `Button`) {
    const button = this.add.existing(
      new Button({
        textures: {
          default: this.make.coloredSprite({
            color: 0x00ff00,
            size: [200, 60],
            shape: 'rounded_rectangle',
            radius: 10,
          }).texture,
          hover: this.make.coloredSprite({
            color: 0x99ff99,
            size: [200, 60],
            shape: 'rounded_rectangle',
            radius: 10,
          }).texture,
          active: this.make.coloredSprite({
            color: 0x009900,
            size: [200, 60],
            shape: 'rounded_rectangle',
            radius: 10,
          }).texture,
          disabled: this.make.coloredSprite({
            color: 0xcccccc,
            size: [200, 60],
            shape: 'rounded_rectangle',
            radius: 10,
          }).texture,
        },
      }),
    );
    button.name = name;
    const label = button.add.text({ value: name, anchor: 0.5 });
    button.eventMode = 'static';
    button.cursor = 'pointer';

    registerFocusables(button);

    button.onPress.connectOnce(async () => {
      console.log(`${name} pressed`);
      button.enabled = false;
      label.text = 'Disabled';
      await delay(3);
      button.enabled = true;
      label.text = name;
      button.onPress.connectOnce(() => {
        console.log(`${name} pressed`);
      });
    });

    button.onOver.connect(() => {
      console.log(`${name} over`);
    });

    button.onOut.connect(() => {
      console.log(`${name} out`);
    });

    button.onDown.connect(() => {
      console.log(`${name} down`);
    });

    button.onUp.connect(() => {
      console.log(`${name} up`);
    });

    return button;
  }
}
