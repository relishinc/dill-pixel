import { IApplication, IPlugin, isDev, Logger, Plugin } from 'dill-pixel';
import Rollbar from 'rollbar';
import { rollbarVersion, version } from './version';

export interface RollbarPluginOptions extends Rollbar.Configuration {
  isDev?: boolean;
  debug?: boolean;
}

export interface IRollbarPlugin extends IPlugin {
  readonly rollbar: Rollbar;
}

const defaultOptions = {
  isDev: false,
  enabled: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
  debug: isDev,
};

export class RollbarPlugin extends Plugin implements IRollbarPlugin {
  private _options: RollbarPluginOptions;
  private _rollbar: Rollbar;

  get rollbar() {
    return this._rollbar;
  }

  private hello() {
    const hello = `%c Dill Pixel Rollbar Plugin v${version} | %cRollbar v${rollbarVersion}`;
    console.log(
      hello,
      'background: rgba(31, 41, 55, 1);color: #74b64c',
      'background: rgba(31, 41, 55, 1);color: #e91e63',
      'background: rgba(31, 41, 55, 1);color: #74b64c',
    );

    if (this._options.debug) {
      Logger.log(this._options);
    }
  }

  async initialize(_app: IApplication, options: RollbarPluginOptions) {
    this._options = {
      accessToken: _app.env.VITE_ROLLBAR_ACCESS_TOKEN || _app.env.ROLLBAR_ACCESS_TOKEN,
      ...defaultOptions,
      ...options,
    };

    // check if accessToken is set
    if (!this._options.accessToken) {
      throw new Error('Rollbar accessToken is required');
    }
    // TODO: should we even instantiate Rollbar here if isDev is true?
    this._rollbar = new Rollbar(this._options);
    this.hello();

    if (this._options.isDev) {
      Logger.warn('Rollbar is disabled in development mode');
      this._rollbar.configure({ enabled: false });
    } else {
      Logger.log('Rollbar is enabled');
    }
  }
}
