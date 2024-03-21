import { Assets, Ticker } from 'pixi.js';
import { Alignment, Fit, RiveEntity } from '../modules/rive/RiveEntity.ts';
import { BaseScene } from './BaseScene';

export class RiveScene extends BaseScene {
  protected readonly title = 'Rive';

  public rive: RiveEntity;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();
    // await Assets.load({ alias: 'vehicles', src: 'https://cdn.rive.app/animations/vehicles.riv' });
    await Assets.load({ alias: 'rive', src: '/rive/hero_use_case.riv' });
  }

  public async start() {
    this.rive = new RiveEntity({
      asset: 'rive',
      autoPlay: true,
      onReady: () => {
        this.rive.fit = Fit.Contain;
        this.rive.align = Alignment.Center;
      },
    });

    this.rive.fit = Fit.Contain;
    this.rive.align = Alignment.Center;

    this.rive.maxWidth = this.app.renderer.width;

    this.add.existing(this.rive);
  }

  update(ticker: Ticker) {
    if (this.rive) {
      // this.add.sprite({ asset: this.rive.texture, x: 400, y: 400 });
    }
  }

  resize() {}
}
