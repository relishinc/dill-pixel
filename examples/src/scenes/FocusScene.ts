import { Actor } from '@/entities/Actor';
import { BaseScene } from '@/scenes/BaseScene';
import { Button, FlexContainer, Logger, PIXIText } from 'dill-pixel';
import { AppSize } from '../../../src/utils/types.ts';

export class FocusScene extends BaseScene {
  protected title = 'Focus Management';
  private _focusLayerLabel: PIXIText;
  private actor1: Actor;
  private actor2: Actor;
  private button: Button;

  private actorList: FlexContainer;
  private list: FlexContainer;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    this._focusLayerLabel = this.add.text({
      text: 'Focus layer:',
      style: { fill: 'white' },
      x: -this.app.center.x + 100,
      y: -this.app.center.y + 100,
    });

    this.actorList = this.add.flexContainer({
      gap: 20,
      alignItems: 'center',
      justifyContent: 'center',
      y: -200,
    });

    this.actor1 = this.actorList.add.existing<Actor>(new Actor(), {
      accessibleTitle: 'Actor  1',
      accessibleHint: 'one',
    });
    this.actor2 = this.actorList.add.existing<Actor>(new Actor(0x00fff0), {
      accessibleTitle: 'Actor 2',
      accessibleHint: 'two',
    });

    this.actor1.onInteraction('pointerdown').connect(() => {
      Logger.log('actor 1 clicked');
    });
    this.actor2.onInteraction('pointerdown').connect(() => {
      Logger.log('actor 2 clicked');
    });

    this.list = this.add.flexContainer({
      gap: 20,
      alignItems: 'center',
      justifyContent: 'center',
      y: 100,
    });

    const spr = this.list.add.sprite({
      asset: 'required/jar.png',
      scale: 0.5,
    });
    const sheetSpr = this.list.add.sprite({
      asset: 'jar',
      sheet: 'sheet.json',
      scale: 0.5,
    });
    const sheetSpr2 = this.list.add.sprite({
      asset: 'jar2',
      sheet: 'sheet.json',
      scale: 0.5,
    });

    this.button = this.list.add.button({
      scale: 0.5,
      textures: { default: 'jar', hover: 'jar2' },
      sheet: 'sheet.json',
      cursor: 'pointer',
      accessible: true,
      accessibleTitle: 'Button',
      accessibleHint: 'HI!',
    });

    this.button.onClick.connect(() => {
      console.log('button pressed');
    });

    this.button.onDown.connect(() => {
      console.log('button down');
    });

    this.actor1.bob();

    this.app.focus.addFocusLayer('one');
    this.app.focus.addFocusable(this.actor1, 'one', true);
    this.app.focus.addFocusable(this.actor2, 'one');
    this.app.focus.addFocusable(this.button, 'one');
    this.app.focus.addFocusLayer('two', this.actor2);
    this.app.focus.setFocusLayer('one');

    this.addSignalConnection(this.app.focus.onFocusManagerActivated.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onFocusManagerDeactivated.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onFocusLayerChange.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(
      this.app.keyboard.onKeyUp('a').connect(() => {
        this.actor1.setTint(Math.random() * 0xffffff);
      }),
    );
    this.addSignalConnection(
      this.app.keyboard.onKeyUp('f').connect((detail) => {
        this.app.focus.setFocusLayer(this.app.focus.currentLayerId === 'one' ? 'two' : 'one');
      }),
    );
    this.addSignalConnection(
      this.app.keyboard.onKeyUp('s').connect((detail) => {
        void this.app.scenes.loadScene({ id: 'TestScene2' });
      }),
    );

    this._updateFocusLayerLabel();
  }

  async enter() {
    return this.app.scenes.isFirstScene
      ? this.animateFromTo(
          { alpha: 0 },
          {
            alpha: 1,
            duration: 1,
            ease: 'sine.out',
          },
        )
      : this.animateFrom({ y: -1000, duration: 2, ease: 'bounce.out' });
  }

  update() {
    if (this.button.isDown) {
      console.log('button is down!');
    }
  }

  resize(size: AppSize) {
    super.resize(size);
    console.log({ size });
  }

  private _updateFocusLayerLabel() {
    this._focusLayerLabel.text = `Focus layer: ${this.app.focus.currentLayerId}`;
  }
}
