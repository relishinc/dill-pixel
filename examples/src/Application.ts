import { Interstitial } from '@/state/Interstitial';
import { MatterPhysicsExample } from '@/state/MatterPhysicsExample';
import PopupExample from '@/state/PopupExample';
import { RapierPhysicsExample } from '@/state/RapierPhysicsExample';
import { SplashScreen } from '@/state/SplashScreen';
import SpriteExample from '@/state/SpriteExample';
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

  protected getFontsList(): { family: string; data?: { weight?: number | string } }[] {
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
  }

  protected createAssetMap(): void {
    this.addAssetGroup(HLFSplashScreen.NAME, SplashScreen.Assets);
    this.addAssetGroup(MatterPhysicsExample);
    this.addAssetGroup(RapierPhysicsExample);
    this.addAssetGroup(PopupExample);
    this.addAssetGroup(SpriteExample);
    // this.addAssetGroup(SpriteDebugExample);
  }
}
