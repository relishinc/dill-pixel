import { FlexContainer, SceneTransition } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite, Text } from 'pixi.js';
import { FONT_KUMBH_SANS } from '../utils/Constants';

export class Splash extends SceneTransition {
  private _labelPercent: Text;
  private _textContainer: FlexContainer;
  private _bg: Sprite;
  private _percent: number = 0;

  constructor() {
    super(true);
  }

  initialize() {
    this._bg = this.addColoredBackground({
      color: 0x1f2937,
    });

    this._textContainer = this.add.flexContainer({
      bindToAppSize: true,
      layout: {
        gap: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    this._textContainer.add.text({
      text: 'Loading...',
      style: {
        fontFamily: FONT_KUMBH_SANS,
        dropShadow: {
          color: 0x000000,
          blur: 0,
          angle: 90,
          distance: 2,
          alpha: 0.8,
        },
      },
    });
    this._labelPercent = this._textContainer.add.text({
      text: '0%',
      anchor: 0.5,
      layout: {
        isLeaf: true,
      },
      style: {
        fontWeight: 'bold',
        fontSize: 72,
        align: 'center',
        dropShadow: {
          color: 0x000000,
          blur: 0,
          angle: 90,
          distance: 2,
          alpha: 0.8,
        },
      },
    });
  }

  async exit() {
    await gsap.to(this, { _percent: 100, duration: 1, ease: 'sine.out' });
    return gsap.to(this, { alpha: 0, duration: 1, ease: 'sine.in' });
  }

  update() {
    this._labelPercent.text = `${Math.round(this._percent)}%`;
    this._textContainer.updateLayout();
  }

  resize() {
    this._textContainer.position.set(-this.app.size.width / 2, -this.app.size.height / 2);
  }

  protected override handleLoadProgress(progress: number) {
    super.handleLoadProgress(progress);
    gsap.to(this, { _percent: Math.ceil(this.progress * 100), duration: 1, ease: 'sine.out' });
  }
}
