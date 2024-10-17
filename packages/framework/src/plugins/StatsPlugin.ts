import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import Stats from 'stats.js';
import { Application } from '../Application';
import { Plugin } from './Plugin';

export class StatsPlugin extends Plugin {
  public readonly id = 'StatsPlugin';
  public stats: Stats;

  public async initialize() {
    this.stats = new Stats();
    this.stats.dom.id = 'stats';

    Application.containerElement?.appendChild(this.stats.dom);

    this.stats.dom.style.position = 'absolute';
    this.stats.dom.style.top = 'auto';
    this.stats.dom.style.bottom = '0';
    this.stats.dom.style.right = '0';
    this.stats.dom.style.left = 'auto';

    Ticker.shared.add(this.stats.update, this.stats, UPDATE_PRIORITY.UTILITY);
  }
}
