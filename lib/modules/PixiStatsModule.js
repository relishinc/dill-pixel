import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { Application } from '../core/Application';
import { isDev } from '../utils/env';
import { Module } from './Module';
export class PixiStatsModule extends Module {
    constructor() {
        super(...arguments);
        this.id = 'PixiStatsModule';
    }
    async initialize(app) {
        const showStats = app.config.showStats === true || (isDev && app.config.showStats !== false);
        if (!showStats) {
            return;
        }
        const { addStats } = await import('pixi-stats').then((m) => ({ Stats: m.Stats, addStats: m.addStats }));
        this.stats = addStats(document, app);
        const domElement = document.getElementById('stats');
        Application.containerElement?.appendChild(domElement);
        domElement.style.position = 'absolute';
        domElement.style.top = 'auto';
        domElement.style.bottom = '24px';
        domElement.style.right = '40px';
        domElement.style.left = 'auto';
        Ticker.shared.add(this.stats.update, this.stats, UPDATE_PRIORITY.UTILITY);
    }
}
//# sourceMappingURL=PixiStatsModule.js.map