import { Actor } from '@/entities/Actor';
import BaseScene from '@/scenes/BaseScene';
import { FONT_KUMBH_SANS } from '@/utils/Constants';
import { Button, FlexContainer, Logger, scaleToWidth } from 'dill-pixel';
import { Text } from 'pixi.js';

export const id = 'focus';
export const debug = {
  group: 'Accessibility',
  label: 'Focus Management',
};

export default class FocusScene extends BaseScene {
  protected title = 'Focus Management';
  protected subtitle =
    'Tab to changed focus. Enter or space to make the circles move.\nF to change focus layer.\nNotice only one item is focusable on layer two?';
  private _focusLayerLabel: Text;
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
      resolution: 2,
      style: { fill: 'white', fontFamily: FONT_KUMBH_SANS },
      x: -this.app.center.x + 30,
      y: this.app.center.y - 100,
    });

    this.actorList = this.add.flexContainer({
      gap: 20,
      alignItems: 'center',
      justifyContent: 'center',
      y: -200,
      label: 'Actor List',
      layout: { width: this.app.size.width },
    });

    this.actor1 = this.actorList.add.existing<Actor>(new Actor(), {
      accessibleTitle: 'Actor  1',
      accessibleHint: 'one',
      layout: { isLeaf: true, width: 100, height: 100, transformOrigin: 'center center' },
    });

    this.actor2 = this.actorList.add.existing<Actor>(new Actor(0x00fff0), {
      accessibleTitle: 'Actor 2',
      accessibleHint: 'two',
      layout: { isLeaf: true, width: 100, height: 100 },
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
      layout: { width: this.app.size.width },
      label: 'List',
    });

    this.list.add.sprite({
      asset: 'required/jar.png',
      scale: 0.5,
      layout: {
        width: 295,
        height: 332,
        flexGrow: 0,
        flexShrink: 0,
        applySizeDirectly: true,
        transformOrigin: 'top left',
      },
    });

    this.list.add.sprite({
      asset: 'jar',
      sheet: 'game/sheet',
      scale: 0.5,
      layout: {
        width: 295,
        height: 332,
        flexGrow: 0,
        flexShrink: 0,
        applySizeDirectly: true,
        transformOrigin: 'top left',
      },
    });

    this.list.add.sprite({
      asset: 'jar2',
      sheet: 'game/sheet',
      scale: 0.5,
      layout: {
        width: 295,
        height: 332,
        flexGrow: 0,
        flexShrink: 0,
        applySizeDirectly: true,
        transformOrigin: 'top left',
      },
    });

    this.button = this.list.add.button({
      scale: 0.5,
      textures: { default: 'jar', hover: 'jar2' },
      sheet: 'game/sheet',
      cursor: 'pointer',
      accessible: true,
      accessibleTitle: 'Button',
      accessibleHint: 'HI!',
      layout: {
        flexGrow: 0,
        flexShrink: 0,
        width: 295,
        height: 332,
        transformOrigin: 'top left',
      },
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
    this.app.focus.addFocusLayer('two', false, this.actor2);
    this.app.focus.setFocusLayer('one');

    this.connectSignal(
      this.app.focus.onFocusManagerActivated.connect(this._updateFocusLayerLabel),
      this.app.focus.onFocusManagerDeactivated.connect(this._updateFocusLayerLabel),
      this.app.focus.onFocusLayerChange.connect(this._updateFocusLayerLabel),
      this.app.keyboard.onKeyUp('A').connect(() => {
        this.actor1.setTint(Math.random() * 0xffffff);
      }),
      this.app.keyboard.onKeyUp('F').connect(() => {
        this.app.focus.setFocusLayer(this.app.focus.currentLayerId === 'one' ? 'two' : 'one');
      }),
      this.app.keyboard.onKeyUp('S').connect(() => {
        void this.app.scenes.loadScene({ id: 'TestScene2' });
      }),
    );

    this.connectAction(
      this.app.actions('toggle_pause').connect(() => {
        if (this.app.paused) {
          this.actor1.pauseAnimations();
        } else {
          this.actor1.resumeAnimations();
        }
      }),
    );

    // load another scene
    this._updateFocusLayerLabel();
  }

  update() {
    if (this.button.isDown) {
      console.log('button is down!');
    }
  }

  resize() {
    super.resize();

    this.actorList.layoutWidth = this.app.size.width;
    this.list.layoutWidth = this.app.size.width;

    this.actorList.x = -this.app.size.width * 0.5;
    this.list.x = -this.app.size.width * 0.5;

    scaleToWidth(this.list, this.app.size.width);
    if (this.list.scale.x > 1) {
      this.list.scale.set(1, 1);
    }
  }

  private _updateFocusLayerLabel() {
    this._focusLayerLabel.text = `Focus layer: ${this.app.focus.currentLayerId}`;
  }
}
