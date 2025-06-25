import Rive, { RiveCanvas } from '@rive-app/canvas-advanced-lite';
import { IPlugin, Plugin } from 'dill-pixel';
import { BrowserAdapter, checkExtension, extensions, ExtensionType, LoaderParserPriority } from 'pixi.js';
import { riveVersion, version } from './version';

export interface IRivePlugin extends IPlugin<RivePluginOptions> {
  rive: RiveCanvas;
  cleanup(): void;
}

/**
 * Defines the options for the Rive plugin.
 * @property {string} wasmPath - The URL path to the Rive WASM file.
 */
export type RivePluginOptions = {
  wasmPath: string;
};

const defaultOptions = {
  wasmPath: 'https://unpkg.com/@rive-app/canvas-advanced-lite@2.26.1/rive.wasm',
};

export class RivePlugin extends Plugin<RivePluginOptions> implements IRivePlugin {
  public static ID: string;
  public readonly id = 'rive';
  public rive: RiveCanvas;
  protected _options: RivePluginOptions = defaultOptions;

  private _addedExtensions: boolean = false;

  private hello() {
    const hello = `%c Dill Pixel Rive Plugin v${version} | %cRive v${riveVersion} (@rive-app/canvas-advanced-lite)`;
    console.log(
      hello,
      'background: rgba(31, 41, 55, 1);color: #74b64c',
      'background: rgba(31, 41, 55, 1);color: #e91e63',
    );
  }

  async initialize(options: RivePluginOptions): Promise<void> {
    this._options = { ...defaultOptions, ...options };
    this.hello();
    RivePlugin.ID = this.id;
    this._addLoaderExtensions();
    if (!this.rive) {
      this.rive = await Rive({ locateFile: () => this._options.wasmPath });
    }
  }

  cleanup() {
    // TODO investigate why this causes the browser to freeze
    // this.rive.cleanup();
  }

  destroy() {
    this.cleanup();
    super.destroy();
  }

  private _addLoaderExtensions() {
    if (!this._addedExtensions) {
      extensions.add({
        name: 'loadRive',
        extension: {
          type: ExtensionType.LoadParser,
          priority: LoaderParserPriority.High,
        },
        test(url: string) {
          return checkExtension(url, '.riv');
        },
        async load(url: string) {
          const response = await BrowserAdapter.fetch(url);
          return new Uint8Array(await response.arrayBuffer());
        },
      });
      this._addedExtensions = true;
    }
  }
}
