import { Logger, Plugin } from 'dill-pixel';
import type { IApplication, IPlugin } from 'dill-pixel';

export type ~PluginName~PluginOptions = {
  //TODO: add plugin options here
  /**
   * E.G. use process.env.VITE_~PLUGIN_NAME~_API_KEY or process.env.~PLUGIN_NAME~_API_KEY as default.
   */
  //apiKey: process.env.VITE_~PLUGIN_NAME~_API_KEY || process.env.~PLUGIN_NAME~_API_KEY,
};

export interface I~PluginName~Plugin extends IPlugin {
  initialize(app: IApplication, options?: Partial<~PluginName~PluginOptions>): void;
}

const defaultOptions = {
};

export class ~PluginName~Plugin extends Plugin implements I~PluginName~Plugin {
  private _options: ~PluginName~PluginOptions;

  async initialize(_app: IApplication, options: Partial<~PluginName~PluginOptions>) {
    this._options = { ...defaultOptions, ...options };
    Logger.log(`~PluginName~ plugin initialized`);
  }
}
