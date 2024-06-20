import { StorageAdapter, Logger } from 'dill-pixel';
import type {IStorageAdapter, IApplication } from 'dill-pixel';

export type TestAdapterOptions = {
  //TODO: add plugin options here
  /**
   * E.G. use process.env.VITE_TEST_API_KEY or process.env.TEST_API_KEY as default.
   */
  //apiKey: process.env.VITE_TEST_API_KEY || process.env.TEST_API_KEY,
};

export interface ITestAdapter extends IStorageAdapter {
  initialize(app: IApplication, options?: Partial<TestAdapterOptions>): void;
}

const defaultOptions = {
};

export class TestAdapter extends StorageAdapter implements ITestAdapter {
  private _options: TestAdapterOptions;

  async initialize(_app: IApplication, options: Partial<TestAdapterOptions>) {
    this._options = { ...defaultOptions, ...options };
    Logger.log(`Test initialized`);
  }
}
