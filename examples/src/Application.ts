import {Interstitial} from "@/state/Interstitial.ts";
import {MatterPhysicsExample} from "@/state/MatterPhysicsExample";
import {RapierPhysicsExample} from "@/state/RapierPhysicsExample.ts";
import {SplashScreen} from "@/state/SplashScreen";
import {
	Application as HLFApplication,
	AssetMapData,
	AssetType,
	SplashScreen as HLFSplashScreen,
	TextureAsset,
	TransitionType
} from "html-living-framework";

export default class Application extends HLFApplication {

	constructor() {
		if (HLFApplication._instance !== undefined) {
			// display a singleton warning
			console.warn("Application is a singleton class and should not be instantiated directly. Use Application.instance instead.");
		}

		super({resizeTo: Application.containerElement});
	}

	static get instance(): Application {
		if (HLFApplication._instance === undefined) {
			HLFApplication._instance = new Application();
		}
		return HLFApplication._instance as Application;
	}

	public get requiredAssets(): AssetMapData[] {
		return [
			new TextureAsset("black2x2", AssetType.PNG),
		];
	}

	public get defaultState(): string {
		return window.location.hash === '#matter' ? MatterPhysicsExample.NAME : RapierPhysicsExample.NAME;
	}


	protected createSplashScreen(): HLFSplashScreen {
		return new SplashScreen();
	}

	protected setup() {
		this.registerDefaultLoadScreen(Interstitial);
		this.state.defaultTransitionType = TransitionType.TRANSITION_SIMPLE_INTERSTITIAL;
	}

	protected registerStates(): void {
		// alternate / old way : this.state.register(MatterPhysicsExample.NAME, ()=> new MatterPhysicsExample());
		this.state.register(MatterPhysicsExample);
		this.state.register(RapierPhysicsExample);
		// this.state.register(SpriteDebugExample);
	}

	protected createAssetMap(): void {
		this.addAssetGroup(HLFSplashScreen.NAME, SplashScreen.Assets);
		this.addAssetGroup(MatterPhysicsExample);
		this.addAssetGroup(RapierPhysicsExample);
		// this.addAssetGroup(SpriteDebugExample);
	}
}
