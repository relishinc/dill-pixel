import { Logger, Plugin } from 'dill-pixel';

export type ~PluginName~PluginOptions = {
  //TODO: add plugin options here
  //E.G.
  //apiKey:string
};

export interface I~PluginName~Plugin extends IPlugin {
  initialize(app: IApplication, options?: Partial<~PluginName~PluginOptions>): void;
}

const defaultOptions = {};

export class ~PluginName~Plugin extends Plugin implements I~PluginName~Plugin {
  private _options: ~PluginName~PluginOptions;

  async initialize(_app: IApplication, options: Partial<~PluginName~PluginOptions>) {
    this._options = { ...defaultOptions, ...options };
    Logger.log(`~PluginName~ plugin initialized`);
  }
}
