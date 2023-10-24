import {
  ContainerEditModeExample,
  FlexContainerExample,
  HTMLTextStyleExample,
  Interstitial,
  MatterPhysicsExample,
  PopupExample,
  RapierPhysicsExample,
  SplashScreen,
  SpriteExample,
} from '@/state';
import {
  Application as HLFApplication,
  AssetMapData,
  AssetType,
  SplashScreen as HLFSplashScreen,
  TextureAsset,
  TransitionType,
} from 'dill-pixel';

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
    return [new TextureAsset('black2x2', AssetType.PNG)];
  }

  public get defaultState() {
    return this.state.getStateFromHash() || PopupExample.NAME;
  }

  protected getFontsList(): {
    family: string;
    data?: {
      weight?: number | string;
    };
  }[] {
    return [{ family: 'arboria', data: { weight: 400 } }];
  }

  protected createSplashScreen(): HLFSplashScreen {
    return new SplashScreen();
  }

  protected setup() {
    (globalThis as any).__PIXI_APP__ = this;
    this.registerDefaultLoadScreen(Interstitial);
    this.state.defaultTransitionType = TransitionType.TRANSITION_SIMPLE_INTERSTITIAL;
    this.state.excludeFromDebugList(Interstitial.NAME);
    this.state.useHash = true;
  }

  protected registerStates(): void {
    this.state.register(MatterPhysicsExample);
    this.state.register(RapierPhysicsExample);
    this.state.register(PopupExample);
    this.state.register(SpriteExample);
    this.state.register(HTMLTextStyleExample);
    this.state.register(ContainerEditModeExample);
    this.state.register(FlexContainerExample);
  }

  protected createAssetMap(): void {
    this.addAssetGroup(HLFSplashScreen.NAME, SplashScreen.Assets);
  }

  async loadHTMLTextStyles(): Promise<void> {
    // load a style for use later:
    // await loadAndAddHTMLTextStyle(
    //   'arboria',
    //   FONT_ARBORIA,
    //   { fontFamily: FONT_ARBORIA, fontSize: 24, fill: 'white', fontWeight: 'normal', align: 'center' },
    //   {
    //     url: 'assets/fonts/arboria.woff2',
    //     weight: 'normal',
    //   },
    // );
    return Promise.resolve();
  }
}
