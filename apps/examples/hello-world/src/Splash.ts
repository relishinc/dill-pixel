import { FlexContainer, SceneTransition } from 'dill-pixel';
import { gsap } from 'gsap';
import { Sprite, Text, Texture } from 'pixi.js';

export default class Splash extends SceneTransition {
  private _labelPercent: Text;
  private _textContainer: FlexContainer;
  private _bg: Sprite;
  private _percent: number = 0;

  constructor() {
    super(true);
  }

  added() {
    this._bg = this.add.sprite({
      asset: Texture.WHITE,
      tint: 0x1f2937,
      width: this.app.size.width,
      height: this.app.size.height,
      anchor: 0.5,
    });
    this._textContainer = this.add.flexContainer({
      gap: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
    this._labelPercent.resolution = 2;
    this._textContainer.layout();
  }

  resize() {
    this._bg.setSize(this.app.size.width, this.app.size.height);
  }

  protected override handleLoadProgress(progress: number) {
    super.handleLoadProgress(progress);
    gsap.to(this, { _percent: Math.ceil(this.progress * 100), duration: 1, ease: 'sine.out' });
  }
}
