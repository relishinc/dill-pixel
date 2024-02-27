import { IApplication } from '../../../core';
import { Container, IScene, Scene } from '../../../display';
import { Logger, SceneList } from '../../../utils';
import { IModule } from '../../IModule';

export interface ISceneManager extends IModule {
  loadScreen?: Scene;
  view: Container;
  scenes: SceneList;
  loadScene: (sceneId: string) => Promise<void>;
}

export type LoadSceneMethod = 'immediate' | 'exitInterstitialEnter';
export type LoadSceneConfig = {
  id: string;
  method?: LoadSceneMethod;
};

export class SceneManager implements IModule {
  public readonly id: string = 'SceneManager';

  // TODO: loadScreen is a special scene that can be used right after the application starts
  public loadScreen?: Scene;

  // view container - gets added to the stage
  public view: Container = new Container();

  // scene management
  public scenes: SceneList;
  public currentScene: IScene;
  public defaultScene: string;

  constructor() {}

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    this.scenes = app.config?.scenes || [];
    this.defaultScene = app.config?.defaultScene || this.scenes?.[0]?.id;
    Logger.log('SceneManager initialize::', this.scenes);
    return Promise.resolve(undefined);
  }

  public async loadScene(sceneIdOrLoadSceneConfig: string): Promise<void>;
  public async loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void> {
    const newSceneId =
      typeof sceneIdOrLoadSceneConfig === 'string' ? sceneIdOrLoadSceneConfig : sceneIdOrLoadSceneConfig.id;

    const method =
      typeof sceneIdOrLoadSceneConfig === 'string' ? 'immediate' : sceneIdOrLoadSceneConfig?.method || 'immediate';

    if (this.currentScene) {
      await this.currentScene.exit();
      this.view.removeChildren();
      // Consider resetting the PIXI.Loader here if you're using it for asset management
    }

    let newScene: IScene;

    // Dynamically import the scene, assuming the export name matches the identifier
    const sceneItem = this.scenes.find((scene) => scene.id === newSceneId);
    if (!sceneItem) {
      throw new Error(`Scene item not found in for id ${newSceneId}`);
    }
    const module = sceneItem.module;
    if (!module) {
      throw new Error(`Couldn't load ${newSceneId}"`);
    }
    if ((module as any)[newSceneId]) {
      newScene = new (module as any)[newSceneId]();
    } else {
      newScene = new (module as any)();
    }

    // Assume loadAssets and initialize are implemented on the scene
    // if (newScene.preload) {
    //   await newScene.loadAssets();
    // }

    // TODO: implement different scene changing berhaviors depending on 'method';

    this.currentScene = newScene;
    await this.currentScene.initialize();

    this.view.addChild(this.currentScene as any);

    await this.currentScene.enter();
    await this.currentScene.start();
  }
}
