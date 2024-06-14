import { IApplication, IPlugin, Logger, Plugin } from 'dill-pixel';
import Rollbar from 'rollbar';

// extends Rollbar.Configuration but accessToken is required
export interface RollbarPluginOptions extends Rollbar.Configuration {
  isDev?: boolean;
}

export interface IRollbarPlugin extends IPlugin {}

const defaultOptions = {
  accessToken: process.env.VITE_ROLLBAR_ACCESS_TOKEN,
  isDev: false,
  enabled: true,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export class RollbarPlugin extends Plugin implements IRollbarPlugin {
  private _options: RollbarPluginOptions;
  private _rollbar: Rollbar;

  async initialize(_app: IApplication, options: RollbarPluginOptions) {
    this._options = { ...defaultOptions, ...options };

    // check if accessToken is set
    if (!this._options.accessToken) {
      throw new Error('Rollbar accessToken is required');
    }

    Logger.log(`Rollbar plugin initialized`);

    // TODO: should we even instantiate Rollbar here if isDev is true?
    this._rollbar = new Rollbar(this._options);
    this._rollbar.log('Rollbar plugin initialized');

    if (this._options.isDev) {
      Logger.warn('Rollbar is disabled in development mode');
      this._rollbar.configure({ enabled: false });
    } else {
      Logger.log('Rollbar is enabled');
    }
    Logger.log(this._rollbar);
  }

  get rollbar() {
    return this._rollbar;
  }
}
