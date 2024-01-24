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
  Application as DillPixelApplication,
  AssetMapData,
  AssetType,
  SplashScreen as DillPixelSplashScreen,
  TextureAsset,
  TransitionType,
} from 'dill-pixel';
import { FocusablesExample } from './state/FocusablesExample';
import { SpineExample } from './state/SpineExample';
import { UICanvasExample } from './state/UICanvasExample';

export class Application extends DillPixelApplication {
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

  protected createSplashScreen(): DillPixelSplashScreen {
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
    this.state.register(SpriteExample);
    this.state.register(PopupExample);
    this.state.register(HTMLTextStyleExample);
    this.state.register(ContainerEditModeExample);
    this.state.register(FlexContainerExample);
    this.state.register(FocusablesExample);
    this.state.register(MatterPhysicsExample);
    this.state.register(RapierPhysicsExample);
    this.state.register(SpineExample);
    this.state.register(UICanvasExample);
  }

  protected createAssetMap(): void {
    this.addAssetGroup(DillPixelSplashScreen.NAME, SplashScreen.Assets);
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

  customFunction() {
    console.log('custom function');
  }
}
