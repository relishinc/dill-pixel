import { Container } from 'pixi.js';
import { Application, IApplication } from '../../core/Application';
import { CoreModule } from '../../core/decorators';
import { IScene, Scene } from '../../display/Scene';
import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { isDev } from '../../utils/env';
import { getDynamicModuleFromImportListItem } from '../../utils/framework';
import { bindAllMethods } from '../../utils/methodBinding';
import { createQueue, Queue } from '../../utils/promise/Queue';
import { Constructor, ImportList } from '../../utils/types';
import type { IModule } from '../Module';
import { Module } from '../Module';

export interface ISceneManager extends IModule {
  isFirstScene: boolean;
  onSceneChangeStart: Signal<(detail: { exiting: string | null; entering: string }) => void>;
  onSceneChangeComplete: Signal<(detail: { current: string }) => void>;
  loadScreen?: Scene;
  view: Container;
  scenes: ImportList<IScene>;

  setDefaultLoadMethod(method: LoadSceneMethod): void;

  loadDefaultScene(): Promise<void>;

  loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;
}

export type LoadSceneMethod =
  | 'immediate'
  | 'exitEnter'
  | 'enterExit'
  | 'enterBehind'
  | 'interStitialExitEnter'
  | 'exitInterstitialEnter';

export type LoadSceneConfig = {
  id: string;
  method?: LoadSceneMethod;
};

@CoreModule
export class SceneManager extends Module implements ISceneManager {
  public readonly id: string = 'SceneManager';
  public onSceneChangeStart = new Signal<(detail: { exiting: string | null; entering: string }) => void>();
  public onSceneChangeComplete = new Signal<(detail: { current: string }) => void>();
  // TODO: loadScreen is a special scene that can be used right after the application starts
  public loadScreen?: Scene;
  // view container - gets added to the stage
  public view: Container = new Container();
  // maybe the user wants the enter animation to be different for the first scene
  public isFirstScene: boolean = true;

  // scene management
  public scenes: ImportList<IScene> = [];
  public currentScene: IScene;
  public defaultScene: string;
  private _sceneModules: Map<string, Constructor<IScene>> = new Map();
  //
  private _lastScene: IScene | null = null;
  private _queue: Queue<any> | null;
  private _defaultLoadMethod: LoadSceneMethod = 'immediate';
  private _currentSceneId: string;
  // debug
  private _debugMenu: HTMLDivElement;

  constructor() {
    super();
    bindAllMethods(this);
  }

  public setDefaultLoadMethod(method: LoadSceneMethod) {
    this._defaultLoadMethod = method;
  }

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    this.view.sortableChildren = true;
    this.scenes = app.config?.scenes || [];
    if (isDev) {
      this.defaultScene = this._getSceneFromHash() || '';
    }
    this.defaultScene = this.defaultScene || app.config?.defaultScene || this.scenes?.[0]?.id;
    this._defaultLoadMethod = app.config.defaultSceneLoadMethod || 'immediate';
    Logger.log('SceneManager initialize::', this.scenes);
    if (this.app.config?.showSceneDebugMenu === true || (isDev && this.app.config?.showSceneDebugMenu !== false)) {
      this._createDebugMenu();
    }
    return Promise.resolve(undefined);
  }

  public async loadDefaultScene(): Promise<void> {
    return this.loadScene(this.defaultScene);
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
      typeof sceneIdOrLoadSceneConfig === 'string'
        ? this._defaultLoadMethod
        : sceneIdOrLoadSceneConfig?.method || this._defaultLoadMethod;

    if (this.currentScene) {
      this._lastScene = this.currentScene;
    }

    // check if the scene item exists
    const sceneItem = this.scenes.find((scene) => scene.id === newSceneId);
    if (!sceneItem) {
      throw new Error(`Scene item not found  for id ${newSceneId}`);
    }

    this._currentSceneId = newSceneId;

    // found a scene item
    this._queue = createQueue(this._createCurrentScene);

    // TODO: finish adding scene changing behaviours
    // TODO: add loading assets into this queue
    // TODO: add progress updates
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
      case 'enterBehind':
        this._queue.add(
          this._initializeCurrentScene,
          this._addCurrentSceneBehind,
          this._enterCurrentScene,
          this._exitLastScene,
          this._destroyLastScene,
          this._startCurrentScene,
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

  private async _createCurrentScene() {
    const sceneItem = this.scenes.find((scene) => scene.id === this._currentSceneId)!;
    let SceneClass: Constructor<IScene> | undefined = undefined;

    if (this._sceneModules.has(this._currentSceneId)) {
      SceneClass = this._sceneModules.get(this._currentSceneId);
    } else {
      const module = await getDynamicModuleFromImportListItem(sceneItem);
      if (!module) {
        throw new Error(`Couldn't load ${this._currentSceneId}"`);
      }

      if ((module as any)[this._currentSceneId]) {
        SceneClass = (module as any)[this._currentSceneId];
      } else {
        SceneClass = module;
      }

      if (SceneClass) {
        this._sceneModules.set(this._currentSceneId, SceneClass);
      }
    }

    if (!SceneClass) {
      throw new Error(`Couldn't load ${this._currentSceneId}"`);
    }

    this.currentScene = new SceneClass();
    this.currentScene.id = this._currentSceneId;
    this.onSceneChangeStart.emit({ exiting: this._lastScene?.id || null, entering: this.currentScene.id });
  }

  private _queueComplete() {
    this.isFirstScene = false;
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

  private _addCurrentSceneBehind(): Promise<void> {
    this.view.addChildAt(this.currentScene as any, 0);
    return Promise.resolve();
  }

  private async _enterCurrentScene(): Promise<void> {
    await this.currentScene.enter();
    return Promise.resolve();
  }

  private async _startCurrentScene(): Promise<void> {
    void this.currentScene.start();
    return Promise.resolve();
  }

  private _createDebugMenu() {
    this._debugMenu = document.createElement('div');
    this._debugMenu.style.cssText =
      'position: absolute; bottom: 0; left: 0; z-index: 1000; background-color: rgba(0,0,0,0.8); color: white; padding: 10px; border-top-right-radius:8px';

    (Application.containerElement || document.body).appendChild(this._debugMenu);

    const sceneSelect = document.createElement('select');
    sceneSelect.style.cssText = 'width: 100%; padding:4px; border-radius:5px;';
    sceneSelect.value = this.defaultScene || '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerHTML = 'Select a scene';

    sceneSelect.appendChild(defaultOption);

    this.scenes.forEach((value) => {
      const option = document.createElement('option');
      option.value = value.id;
      option.innerHTML = value.id;
      if (value.id === this.defaultScene) {
        option.selected = true;
      }
      sceneSelect.appendChild(option);
    });

    this._debugMenu.appendChild(sceneSelect);

    this._debugMenu.addEventListener('change', (e: Event) => {
      if (this._queue) {
        e.preventDefault();
        return;
      }
      const target = e.target as HTMLSelectElement;
      const sceneId = target.value;
      if (sceneId) {
        window.location.hash = sceneId.toLowerCase();
      }
    });

    window.addEventListener('hashchange', () => {
      const sceneId = this._getSceneFromHash();
      if (sceneId) {
        this.loadScene(sceneId);
      }
    });
  }

  private _getSceneFromHash(): string | null {
    let hash = window?.location?.hash;
    if (hash) {
      hash = hash.replace('#', '');
      if (hash.length > 0) {
        for (let i = 0; i < this.scenes.length; i++) {
          if (this.scenes[i]?.id?.toLowerCase() === hash.toLowerCase()) {
            return this.scenes[i].id;
          }
        }
      }
    }
    return null;
  }
}
