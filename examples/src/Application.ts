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
import { AudioExample } from './state/AudioExample';
import { BitmapFontsExample } from './state/BitmapFontsExample';
import { ButtonExample } from './state/ButtonExample';
import { FocusablesExample } from './state/FocusablesExample';
import { SignalsExample } from './state/SignalsExample';
import { SpineExample } from './state/SpineExample';
import { UICanvasExample } from './state/UICanvasExample';

export class Application extends DillPixelApplication {
  public get requiredAssets(): AssetMapData[] {
    return [new TextureAsset('black2x2', AssetType.PNG)];
  }

  public get defaultState() {
    return this.state.getStateFromHash() || this.state.getRegisteredStateIds().sort((a, b) => a.localeCompare(b))[0]; // first one
  }

  async loadHTMLTextStyles(): Promise<void> {
    return Promise.resolve();
  }

  customFunction() {
    console.log('custom function');
  }

  protected getFontsList(): {
    family: string;
    data?: {
      weight?: number | string;
    };
  }[] {
    return [{ family: 'Kumbh Sans', data: { weight: 400 } }];
  }

  protected createSplashScreen(): DillPixelSplashScreen {
    return new SplashScreen();
  }

  protected setup() {
    this.registerDefaultLoadScreen(Interstitial);
    this.state.defaultTransitionType = TransitionType.TRANSITION_SIMPLE_INTERSTITIAL;
    this.state.excludeFromDebugList(Interstitial.NAME);
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
    this.state.register(AudioExample);
    this.state.register(SignalsExample);
    this.state.register(ButtonExample);
    this.state.register(BitmapFontsExample);
  }

  protected createAssetMap(): void {
    this.addAssetGroup(DillPixelSplashScreen.NAME, SplashScreen.Assets);
  }
}
