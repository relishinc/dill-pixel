import { Spine } from '@pixi/spine-pixi';
import { Ticker } from 'pixi.js';
import { Cauldron } from '../entities/Cauldron.ts';
import { BaseScene } from './BaseScene';

export class SpineScene extends BaseScene {
  protected readonly title = 'Spine';
  public renderPipeId = 'SpineScene';
  protected spine: Spine;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();
  }

  public async start() {
    console.log(this.renderPipeId);
    try {
      this.add.existing(new Cauldron());
    } catch (e: any) {
      console.log(e.getStackTrace());
    }
  }

  update(ticker: Ticker) {}

  resize() {}
}
