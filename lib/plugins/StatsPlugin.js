var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { Application } from '../core/Application';
import { CorePlugin } from '../core/decorators';
import { Plugin } from './Plugin';
let StatsPlugin = class StatsPlugin extends Plugin {
    id = 'StatsPlugin';
    stats;
    async initialize() {
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
};
StatsPlugin = __decorate([
    CorePlugin
], StatsPlugin);
export { StatsPlugin };
