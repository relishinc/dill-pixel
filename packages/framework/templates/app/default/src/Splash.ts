import { FlexContainer, SceneTransition } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite, Text } from 'pixi.js';
import { COLOR_GREEN } from './utils/Constants';

export class Splash extends SceneTransition {
  private _labelPercent: Text;
  private _textContainer: FlexContainer;
  private _bg: Sprite;
  private _percent: number = 0;

  constructor() {
    super(true);
  }

  added() {
    this._bg = this.addColoredBackground({
      color: COLOR_GREEN,
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
        fontWeight: 'bold',
        fontSize: 36,
        fill: 'white',
        dropShadow: true,
      },
    });
    this._labelPercent = this._textContainer.add.text({
      style: {
        fontWeight: 'bold',
        fontSize: 72,
        fill: 'white',
        dropShadow: true,
      },
    });
  }

  async exit() {
    // ensure percentage completes
    await gsap.to(this, { _percent: 100, duration: 1, ease: 'sine.out' });
    return gsap.to(this, { alpha: 0, duration: 1, ease: 'sine.in' });
  }

  update() {
    this._labelPercent.text = `${Math.round(this._percent)}%`;
  }

  resize() {
    this._textContainer.position.set(-this.app.size.width / 2, -this.app.size.height / 2);
  }

  protected override handleLoadProgress(progress: number) {
    super.handleLoadProgress(progress);
    gsap.to(this, { _percent: Math.ceil(this.progress * 100), duration: 1, ease: 'sine.out' });
  }
}
