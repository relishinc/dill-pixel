import { IApplication } from '../../../core';
import { Container, IScene, Scene } from '../../../display';
import { Signal } from '../../../signals';
import { bindAllMethods, createQueue, Logger, Queue, SceneList } from '../../../utils';
import { Module } from '../../index';
import { IModule } from '../../Module';

export interface ISceneManager extends IModule {
  onSceneChangeStart: Signal<(detail: { exiting: string | null; entering: string }) => void>;
  onSceneChangeComplete: Signal<(detail: { current: string }) => void>;
  loadScreen?: Scene;
  view: Container;
  scenes: SceneList;

  loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;
}

export type LoadSceneMethod =
  | 'immediate'
  | 'exitEnter'
  | 'enterExit'
  | 'interStitialExitEnter'
  | 'exitInterstitialEnter';

export type LoadSceneConfig = {
  id: string;
  method?: LoadSceneMethod;
};

export class SceneManager extends Module implements ISceneManager {
  public readonly id: string = 'SceneManager';
  // signals
  public onSceneChangeStart = new Signal<(detail: { exiting: string | null; entering: string }) => void>();
  public onSceneChangeComplete = new Signal<(detail: { current: string }) => void>();

  // TODO: loadScreen is a special scene that can be used right after the application starts
  public loadScreen?: Scene;

  // view container - gets added to the stage
  public view: Container = new Container();

  // scene management
  public scenes: SceneList;
  public currentScene: IScene;
  public defaultScene: string;
  private _lastScene: IScene | null = null;
  private _queue: Queue<any> | null;

  constructor() {
    super();
    bindAllMethods(this);
  }

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    this.view.sortableChildren = true;
    this.scenes = app.config?.scenes || [];
    this.defaultScene = app.config?.defaultScene || this.scenes?.[0]?.id;
    Logger.log('SceneManager initialize::', this.scenes);
    return Promise.resolve(undefined);
  }

  public async loadScene(sceneIdOrLoadSceneConfig: string): Promise<void>;
  public async loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void> {
    if (this._queue) {
      // TODO: maybe allow halting the queue and starting a fresh scene load
      // for now, just ignore the request until the queue finishes
      return;
    }

    this._lastScene = null;
    const newSceneId =
      typeof sceneIdOrLoadSceneConfig === 'string' ? sceneIdOrLoadSceneConfig : sceneIdOrLoadSceneConfig.id;

    const method =
      typeof sceneIdOrLoadSceneConfig === 'string' ? 'immediate' : sceneIdOrLoadSceneConfig?.method || 'immediate';

    if (this.currentScene) {
      this._lastScene = this.currentScene;
    }

    let newScene: IScene;

    // Dynamically import the scene, assuming the export name matches the identifier
    const sceneItem = this.scenes.find((scene) => scene.id === newSceneId);
    if (!sceneItem) {
      throw new Error(`Scene item not found  for id ${newSceneId}`);
    }

    // found a scene item
    this._queue = createQueue();

    const module = sceneItem.module;
    if (!module) {
      throw new Error(`Couldn't load ${newSceneId}"`);
    }
    if ((module as any)[newSceneId]) {
      // await import
      newScene = new (module as any)[newSceneId]();
    } else {
      newScene = new (module as any)();
    }

    this.currentScene = newScene;

    this.onSceneChangeStart.emit({ exiting: this._lastScene?.id || null, entering: newScene.id });

    // TODO: implement different scene changing behaviours depending on 'method';
    switch (method) {
      case 'exitEnter':
        this._queue.add(
          this._exitLastScene,
          this._destroyLastScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
        );
        break;
      case 'enterExit':
        this._queue.add(
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
          this._destroyLastScene,
        );
        break;
      default:
        this._queue.add(
          this._destroyLastScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
        );
        break;
    }

    this._queue.add(this._queueComplete);
    this._queue.start();
  }

  private _queueComplete() {
    this._lastScene = null;
    this.onSceneChangeComplete.emit({ current: this.currentScene.id });
    this._queue = null;
    return Promise.resolve();
  }

  private async _destroyLastScene(): Promise<void> {
    if (!this._lastScene) {
      return Promise.resolve();
    }
    this.view.removeChild(this._lastScene as any);
    this._lastScene.destroy();
    return Promise.resolve();
  }

  private async _exitLastScene(): Promise<void> {
    if (!this._lastScene) {
      return Promise.resolve();
    }
    await this._lastScene.exit();
    return Promise.resolve();
  }

  private async _initializeCurrentScene(): Promise<void> {
    await this.currentScene.initialize();
    return Promise.resolve();
  }

  private _addCurrentScene(): Promise<void> {
    this.view.addChild(this.currentScene as any);
    return Promise.resolve();
  }

  private async _enterCurrentScene(): Promise<void> {
    await this.currentScene.enter();
    return Promise.resolve();
  }

  private async _startCurrentScene(): Promise<void> {
    await this.currentScene.start();
    return Promise.resolve();
  }
}
