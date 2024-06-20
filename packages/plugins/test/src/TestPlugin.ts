import { Logger, Plugin } from 'dill-pixel';
import type { IApplication, IPlugin } from 'dill-pixel';

export type TestPluginOptions = {
  //TODO: add plugin options here
  /**
   * E.G. use process.env.VITE_TEST_API_KEY or process.env.TEST_API_KEY as default.
   */
  //apiKey: process.env.VITE_TEST_API_KEY || process.env.TEST_API_KEY,
};

export interface ITestPlugin extends IPlugin {
  initialize(app: IApplication, options?: Partial<TestPluginOptions>): void;
}

const defaultOptions = {
};

export class TestPlugin extends Plugin implements ITestPlugin {
  private _options: TestPluginOptions;

  async initialize(_app: IApplication, options: Partial<TestPluginOptions>) {
    this._options = { ...defaultOptions, ...options };
    Logger.log(`Test plugin initialized`);
  }
}
