import { BaseScene } from './BaseScene';
import { SpineAnimation } from 'dill-pixel';

export class SpineScene extends BaseScene {
  protected readonly title = 'Spine';
  protected readonly subtitle = 'Click to change the animation';
  protected hero: SpineAnimation;
  protected animIndex = 0;

  public async initialize() {
    await super.initialize();
    this.app.func.setActionContext('general');
    this.hero = this.add.spineAnimation({
      data: 'spine/spineboy-pro',
      animationName: 'idle',
      loop: true,
      x: 0,
      y: this.app.size.height * 0.35,
      scale: 0.7,
    });
    this.eventMode = 'static';
    this.on('pointerup', this._handleSelect);
    this.addSignalConnection(this.app.actions('select').connect(this._handleSelect));
  }

  resize() {
    super.resize();
    this.hero.y = this.app.size.height * 0.35;
  }

  private _handleSelect() {
    this.animIndex = (this.animIndex + 1) % this.hero.animationNames.length;
    this.hero.setAnimation(this.hero.animationNames[this.animIndex], true);
  }
}
