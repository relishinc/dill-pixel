import { IApplication, IPlugin, Logger, Plugin } from 'dill-pixel';
import Rive, { RiveCanvas } from '@rive-app/canvas-advanced-lite';
import { BrowserAdapter, checkExtension, extensions, ExtensionType, LoaderParserPriority } from 'pixi.js';

export type RivePluginOptions = {
  wasmPath: string;
};

export interface IRivePlugin extends IPlugin {}

const defaultOptions = {
  wasmPath: 'https://unpkg.com/@rive-app/canvas-advanced-lite@2.17.3/rive.wasm',
};

export class RivePlugin extends Plugin implements IRivePlugin {
  public static ID: string;
  public options: RivePluginOptions;
  public rive: RiveCanvas;

  async initialize(_app: IApplication, options: RivePluginOptions) {
    this.options = { ...defaultOptions, ...options };
    RivePlugin.ID = this.id;
    this._addLoaderExtensions();
    this.rive = await Rive({ locateFile: () => this.options.wasmPath });
    Logger.log(`Rive plugin initialized`);
  }

  private _addLoaderExtensions() {
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
        const response = await BrowserAdapter.fetch(url);
        return new Uint8Array(await response.arrayBuffer());
      },
    });
  }
}
