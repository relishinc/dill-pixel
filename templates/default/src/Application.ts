import { Interstitial, Landing, SplashScreen } from '@/state';
import { FONT_ARBORIA } from '@/utils/Constants';
import {
  Application as HLFApplication,
  AssetMapData,
  loadAndAddHTMLTextStyle,
  SplashScreen as HLFSplashScreen,
  TransitionType,
} from 'dill-pixel';

const isDev = process.env.NODE_ENV === 'development';

export default class Application extends HLFApplication {
  constructor() {
    if (HLFApplication._instance !== undefined) {
      // display a singleton warning
      console.warn(
        'Application is a singleton class and should not be instantiated directly. Use Application.instance instead.',
      );
    }

    super({ resizeTo: Application.containerElement });
  }

  static get instance(): Application {
    if (HLFApplication._instance === undefined) {
      HLFApplication._instance = new Application();
    }
    return HLFApplication._instance as Application;
  }

  public get requiredAssets(): AssetMapData[] {
    return [];
  }

  public get defaultState() {
    return this.state.getStateFromHash() || Landing.NAME;
  }

  protected createSplashScreen(): HLFSplashScreen {
    return new SplashScreen();
  }

  protected setup() {
    if (isDev) {
      (globalThis as any).__PIXI_APP__ = this;
    }
    this.state.useHash = isDev;
    this.registerDefaultLoadScreen(Interstitial);
    this.state.defaultTransitionType = TransitionType.TRANSITION_SIMPLE_INTERSTITIAL;
    this.state.excludeFromDebugList(Interstitial.NAME);
  }

  protected registerStates(): void {
    this.state.register(Landing);
  }

  protected createAssetMap(): void {
    this.addAssetGroup(HLFSplashScreen.NAME, SplashScreen.Assets);
  }

  protected getFontsList(): {
    family: string;
    data?: {
      weight?: number | string;
    };
  }[] {
    return [{ family: FONT_ARBORIA, data: { weight: 400 } }];
  }

  async loadHTMLTextStyles(): Promise<void> {
    // load a style for use later:
    await loadAndAddHTMLTextStyle(
      FONT_ARBORIA,
      FONT_ARBORIA,
      { fontFamily: FONT_ARBORIA, fontSize: 36, fill: 'white', fontWeight: 'normal', align: 'center' },
      {
        url: 'assets/fonts/arboria.woff2',
        weight: 'normal',
      },
    );
  }
}
