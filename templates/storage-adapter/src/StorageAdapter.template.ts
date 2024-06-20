import { StorageAdapter, Logger } from 'dill-pixel';
import type {IStorageAdapter, IApplication } from 'dill-pixel';

export type ~PluginName~AdapterOptions = {
  //TODO: add plugin options here
  /**
   * E.G. use process.env.VITE_~PLUGIN_NAME~_API_KEY or process.env.~PLUGIN_NAME~_API_KEY as default.
   */
  //apiKey: process.env.VITE_~PLUGIN_NAME~_API_KEY || process.env.~PLUGIN_NAME~_API_KEY,
};

export interface I~PluginName~Adapter extends IStorageAdapter {
  initialize(app: IApplication, options?: Partial<~PluginName~AdapterOptions>): void;
}

const defaultOptions = {
};

export class ~PluginName~Adapter extends StorageAdapter implements I~PluginName~Adapter {
  private _options: ~PluginName~AdapterOptions;

  async initialize(_app: IApplication, options: Partial<~PluginName~AdapterOptions>) {
    this._options = { ...defaultOptions, ...options };
    Logger.log(`~PluginName~ initialized`);
  }
}
