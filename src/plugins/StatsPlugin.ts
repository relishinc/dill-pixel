import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { Application, IApplication } from '../core/Application';
import { CorePlugin } from '../core/decorators';
import { isDev } from '../utils/env';
import { Plugin } from './Plugin';

@CorePlugin
export class StatsPlugin extends Plugin {
  public readonly id = 'StatsModule';
  public stats: any;

  public async initialize(app: IApplication) {
    const showStats = app.config.showStats === true || (isDev && app.config.showStats !== false);

    if (!showStats) {
      return;
    }

    const Stats = await import('stats.js').then((m) => m.default);
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
