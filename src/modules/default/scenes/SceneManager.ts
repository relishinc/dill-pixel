import { IApplication } from '../../../core';
import { Container, IScene, Scene } from '../../../display';
import { Logger, SceneList } from '../../../utils';
import { IModule } from '../../IModule';

export interface ISceneManager extends IModule {
  loadScreen?: Scene;
  view: Container;
  scenes: Map<string, Scene>;
  changeScene: (sceneId: string) => Promise<void>;
}

export class SceneManager implements IModule {
  public readonly id: string = 'sceneManager';
  public loadScreen?: Scene;
  public view: Container = new Container();
  public scenes: SceneList;
  currentScene: IScene;

  constructor() {}

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    this.scenes = app.config?.scenes || [];
    Logger.log('SceneManager initialize::', this.scenes);
    return Promise.resolve(undefined);
  }

  public async changeScene(sceneId: string): Promise<void> {
    if (this.currentScene) {
      await this.currentScene.exit();
      this.view.removeChildren();
      // Consider resetting the PIXI.Loader here if you're using it for asset management
    }

    let newScene: IScene;

    // Dynamically import the scene, assuming the export name matches the identifier
    const sceneItem = this.scenes.find((scene) => scene.id === sceneId);
    if (!sceneItem) {
      throw new Error(`Scene item not found in for id ${sceneId}`);
    }
    const module = sceneItem.module;
    if (!module) {
      throw new Error(`Couldn't load ${sceneId}"`);
    }
    if ((module as any)[sceneId]) {
      newScene = new (module as any)[sceneId]();
    } else {
      newScene = new (module as any)();
    }

    // Assume loadAssets and initialize are implemented on the scene
    // if (newScene.preload) {
    //   await newScene.loadAssets();
    // }
    this.currentScene = newScene;
    await this.currentScene.initialize();

    this.view.addChild(this.currentScene as any);

    await this.currentScene.enter();
    await this.currentScene.start();
  }
}
