import { Assets } from 'pixi.js';
import { Boy } from '../entities/Boy.ts';
import { Dragon } from '../entities/Dragon.ts';
import { BaseScene } from './BaseScene';

export class SpineScene extends BaseScene {
  protected readonly title = 'Spine';
  protected dragon: Dragon;
  protected boy: Boy;

  public async initialize() {
    await Assets.loadBundle('spine');
    await super.initialize();
  }

  public async start() {
    this.dragon = new Dragon();
    this.add.existing(this.dragon, { x: 0, y: 200, scale: 0.5 });
    void this.dragon.show();

    const xavier = this.add.spineAnimation({
      data: 'spine/xavier',
      animationName: 'idle',
      loop: true,
      x: -200,
      y: 0,
    });
    xavier.scale.set(0.5);
  }

  public async exit() {
    await this.dragon.hide();
    return super.exit();
  }
}
