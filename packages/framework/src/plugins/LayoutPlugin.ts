import '@pixi/layout';
import { Layout } from '@pixi/layout';
import '@pixi/layout/devtools';
import { extensions } from 'pixi.js';

import { LayoutSystem } from '@pixi/layout';
import { Logger } from '../utils';
import { Plugin, type IPlugin } from './Plugin';

export interface ILayoutPlugin extends IPlugin {}

export class LayoutPlugin extends Plugin implements ILayoutPlugin {
  public readonly id = 'LayoutPlugin';

  async initialize() {
    extensions.add(LayoutSystem);
    Layout.defaultStyle = {
      container: {
        width: 'auto',
        height: 'auto',
        gap: 0,
      },
      leaf: {
        width: 'intrinsic',
        height: 'intrinsic',
        flexShrink: 1,
      },
      shared: {
        transformOrigin: '50%',
        objectPosition: 'center',
        flexShrink: 1,
        flexDirection: 'row',
        alignContent: 'stretch',
        flexWrap: 'nowrap',
        overflow: 'visible',
      },
    };
    Logger.log('LayoutPlugin initialized');
  }
}
