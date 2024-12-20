import { IApplicationOptions } from 'pixi.js';
import { isDev } from '../functions';
import { MathUtils, PlatformUtils } from '../utils';
import { LoggerMode } from '../utils/Logger';
import { ResizeManagerOptions } from '../utils/ResizeManagerNew';

const isDevEnv = isDev();

/**
 * Type for application options.
 */
export interface DillPixelApplicationOptions extends IApplicationOptions {
  logger: LoggerMode;
  resizeDebounce?: number;
  physics?: boolean;
  useSpine?: boolean;
  showStats?: boolean;
  useHashChange?: boolean;
  showStateDebugMenu?: boolean;
  useNewResizeManager?: boolean;
  resizeOptions?: Partial<ResizeManagerOptions>;
}

export class AppConfig {
  // index signature
  [key: string]: any;

  public autoStart?: boolean;
  public useSpine?: boolean;
  public width?: number;
  public height?: number;
  public view?: HTMLCanvasElement;
  public transparent?: boolean;
  public autoDensity?: boolean;
  public antialias?: boolean;
  public preserveDrawingBuffer?: boolean;
  public resolution?: number;
  public forceCanvas?: boolean;
  public backgroundColor?: number;
  public clearBeforeRender?: boolean;
  public forceFXAA?: boolean;
  public powerPreference?: 'default' | 'high-performance' | 'low-power';
  public sharedTicker?: boolean;
  public sharedLoader?: boolean;
  public resizeTo?: Window | HTMLElement;
  public useNewResizeManager?: boolean;
  public resizeOptions?: Partial<ResizeManagerOptions>;

  constructor(pConfig?: Partial<IApplicationOptions> & { [key: string]: any }) {
    // If no config is provided, create a default one
    // TODO: merge the given config with defaults
    if (pConfig === undefined) {
      pConfig = {
        antialias: false,
        autoStart: false,
        useSpine: false,
        background: undefined,
        backgroundAlpha: 0,
        backgroundColor: 'transparent',
        clearBeforeRender: false,
        context: null,
        eventFeatures: undefined,
        eventMode: undefined,
        forceCanvas: false,
        height: 0,
        hello: false,
        powerPreference: 'default',
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
        resizeTo: undefined,
        sharedTicker: false,
        useContextAlpha: undefined,
        view: undefined,
        width: 0,
        autoDensity: true,
        useNewResizeManager: true,
        resizeOptions: undefined,
        resolution: PlatformUtils.isMobile() ? (PlatformUtils.isRetina() ? 2 : 1) : 2,
        logger: undefined,
      };
    } else {
      // If a config is provided but particular properties are not set that need to be, do your sanity checks here.
      if (pConfig.autoDensity === undefined) {
        pConfig.autoDensity = false;
      }
      if (pConfig.powerPreference === undefined) {
        pConfig.powerPreference = 'default';
      }
    }

    if (pConfig.showStats === undefined) {
      pConfig.showStats = isDevEnv;
    }

    if (pConfig.showStateDebugMenu === undefined) {
      pConfig.showStateDebugMenu = isDevEnv;
    }

    // If the resolution is set to anything other than a number, determine the resolution from runtime check
    if (typeof pConfig?.resolution !== 'number') {
      this.resolution = PlatformUtils.isMobile() ? (PlatformUtils.isRetina() ? 2 : 1) : 2;
    } else {
      // Ensure that the resolution is either 1 or 2 only
      this.resolution = pConfig.resolution;
      this.resolution = Math.round(this.resolution!);
      this.resolution = MathUtils.clamp(this.resolution, 1, 2);
    }

    // Automatically enable the Amazon fix if we are on Amazon
    /**
     * This is used to handle a flicker that occurs when playing app on an Amazon OS device.
     * PIXI suggests enabling preserveDrawingBuffer on these devices so that was the initial course of action. PIXI
     * warned that this could cause performance issues.
     * Feedback from a client suggested that using transparent would yield the intended result with less side
     * effects.
     *  if (pConfig.preserveDrawingBuffer !== undefined) {
     *      this.preserveDrawingBuffer = pConfig.preserveDrawingBuffer;
     *  }
     *  else {
     *      this.preserveDrawingBuffer = PlatformUtils.isAmazonOS();
     *  }
     */
    if (pConfig?.transparent) {
      this.transparent = pConfig.transparent;
    } else {
      this.transparent = PlatformUtils.isAmazonOS();
    }

    // If properties exist in the json, set them in the config
    for (const key in pConfig) {
      // eslint-disable-next-line no-prototype-builtins
      if (pConfig.hasOwnProperty(key)) {
        if (
          key === 'resolution' ||
          /**
           * See the above comment block
           */
          // key === "preserveDrawingBuffer") {
          key === 'transparent'
        ) {
          //
        } else {
          this[key] = pConfig[key];
        }
      }
    }
  }
}
