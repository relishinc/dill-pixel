import { UPDATE_PRIORITY } from 'pixi.js';
import { Application, IApplication } from '../../core/Application';
import { isDev } from '../../utils/env';
import { Module } from '../Module';

export class StatsModule extends Module {
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
    this.stats.dom.style.bottom = '24px';
    this.stats.dom.style.right = '40px';
    this.stats.dom.style.left = 'auto';

    this.app.ticker.add(this.stats.update, this.stats, UPDATE_PRIORITY.UTILITY);
  }
}
