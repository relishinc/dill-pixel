import type { IApplication, IPlugin } from 'dill-pixel';
import { Logger, omitKeys, Plugin } from 'dill-pixel';
import { version } from './version';

type ConfigParams = Gtag.ConfigParams & Gtag.ControlParams & Gtag.EventParams & Gtag.ConfigParams & Gtag.CustomParams;

export type GoogleAnalyticsPluginOptions = ConfigParams & {
  trackingId?: string | string[];
  dataLayerName?: string;
};

export type GAEvents = Record<string, unknown>;

export interface IGoogleAnalyticsPlugin<E extends GAEvents = GAEvents> extends IPlugin {
  initialize(app: IApplication, options?: Partial<GoogleAnalyticsPluginOptions>): void;
  gtag(...args: any[]): void;
  trackEvent<K extends keyof E>(eventName: K, eventData?: E[K]): void;
}

const trackingId = process.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID || process.env.GOOGLE_ANALYTICS_TRACKING_ID;

const defaultOptions: Partial<GoogleAnalyticsPluginOptions> = {
  trackingId,
};

export class GoogleAnalyticsPlugin<E extends GAEvents = GAEvents> extends Plugin implements IGoogleAnalyticsPlugin<E> {
  private _options: GoogleAnalyticsPluginOptions;
  private _dataLayer: { push: (args: any) => void };

  async initialize(_app: IApplication, options: Partial<GoogleAnalyticsPluginOptions>) {
    this._options = { ...defaultOptions, ...options };
    this.install();

    this.hello();

    if (!this._options.trackingId) {
      Logger.warn(
        '[Dill Pixel Google Analytics Plugin] Google Analytics tracking ID is not set, please set `VITE_GOOGLE_ANALYTICS_TRACKING_ID` or `GOOGLE_ANALYTICS_TRACKING_ID` environment variable.',
      );
      return;
    }
  }

  private hello() {
    const hello = `%c Dill Pixel Google Analytics Plugin v${version}`;
    console.log(hello, 'background: rgba(31, 41, 55, 1);color: #74b64c');
  }

  private initDataLayer() {
    const windowAsAny = window as any;
    const dlName = this._options.dataLayerName || 'dataLayer';
    windowAsAny[dlName] = windowAsAny[dlName] || [];
    this._dataLayer = windowAsAny[dlName];
  }

  private install() {
    if (!this._options.trackingId) {
      return;
    }

    const scriptId = 'ga-gtag';

    if (document.getElementById(scriptId)) return;

    const { head } = document;
    const script = document.createElement('script');
    let src = `https://www.googletagmanager.com/gtag/js?id=${this._options.trackingId}`;
    if (this._options.dataLayerName) src += `&l=${this._options.dataLayerName}`;
    script.id = scriptId;
    script.async = true;
    script.src = src;
    head.insertBefore(script, head.firstChild);

    this.initDataLayer();

    this.gtag('js', new Date());

    if (!Array.isArray(this._options.trackingId)) {
      this._options.trackingId = [this._options.trackingId];
    }

    this._options.trackingId.forEach((trackingId) => {
      this.gtag('config', trackingId, omitKeys(['trackingId'], this._options));
    });
  }

  public gtag(...args: any[]) {
    Logger.log(`gtag(${args.join(', ')})`);
    this._dataLayer.push(args);
  }

  public trackEvent<K extends keyof E>(eventName: K, eventData?: E[K]) {
    this.gtag('event', eventName as string, eventData || {});
  }
}
