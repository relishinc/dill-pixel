import { Assets, Ticker } from 'pixi.js';
import { Boy } from '../entities/Boy.ts';
import { Dragon } from '../entities/Dragon.ts';
import { BaseScene } from './BaseScene';

export class SpineScene extends BaseScene {
  protected readonly title = 'Spine';
  protected dragon: Dragon;
  protected boy: Boy;

  constructor() {
    super();
  }

  public async initialize() {
    await Assets.loadBundle('spine');

    await super.initialize();

    this.dragon = new Dragon();
    this.add.existing(this.dragon, { x: 0, y: 200, scale: 0.5 });

    // this.boy = new Boy();
    // this.add.existing(this.boy);
  }

  public async start() {
    void this.dragon.show();
  }

  public async exit() {
    await this.dragon.hide();
    return super.exit();
  }

  update(ticker: Ticker) {}
}
