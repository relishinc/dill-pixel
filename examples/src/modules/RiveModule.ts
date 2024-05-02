import { DOMAdapter, ExtensionType, LoaderParserPriority, checkExtension, extensions } from 'pixi.js';
import { IApplication, IPlugin, Plugin } from '@relish-studios/dill-pixel';

import type { V8Application } from '../V8Application';

export default class TestModule extends Plugin<V8Application> implements IPlugin {
  public destroy(): void { }

  public async initialize(app: IApplication, options?: any): Promise<void> {
    console.log('RiveModule initialized', this.id, app, options);
    /**
     * Register Pixi.js extension for loading Rive files (.riv)
     */
    extensions.add({
      name: 'loadRive',
      extension: {
        type: ExtensionType.LoadParser,
        priority: LoaderParserPriority.High,
      },
      test(url: string) {
        // checkDataUrl(url, 'mime/type');
        return checkExtension(url, '.riv');
      },
      async load(url: string) {
        const response = await DOMAdapter.get().fetch(url);
        return new Uint8Array(await response.arrayBuffer());
      },
    });
    return Promise.resolve();
  }
}
