import { initDevtools } from '@pixi/devtools';
import { Application } from 'pixi.js';
import { Logger } from '../utils';
import { Plugin, type IPlugin } from './Plugin';

export interface IDevToolsPlugin extends IPlugin {
  initializeDevTools(app: Application): void;
}

export class DevToolsPlugin extends Plugin implements IDevToolsPlugin {
  public readonly id = 'DevToolsPlugin';

  async initialize() {
    Logger.log('DevTools Plugin initialized');
  }

  public initializeDevTools(app: Application) {
    Logger.log('Initializing DevTools', app);
    initDevtools({ app });
  }
}
