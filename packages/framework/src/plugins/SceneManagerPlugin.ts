import { Container } from 'pixi.js';
import { Application } from '../Application';
import type { IApplication } from '../core';
import type { IScene, ISceneTransition, SceneTransition } from '../display';
import { Signal } from '../signals';
import {
  bindAllMethods,
  Constructor,
  createQueue,
  getDynamicModuleFromImportListItem,
  isDev,
  Queue,
  SceneImportList,
  SceneImportListItem,
} from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

import { sceneList } from 'virtual:dill-pixel-scenes';

export interface ISceneManagerPlugin extends IPlugin {
  isFirstScene: boolean;
  onSceneChangeStart: Signal<(detail: { exiting: string | null; entering: string }) => void>;
  onSceneChangeComplete: Signal<(detail: { current: string }) => void>;

  view: Container;
  list: SceneImportList<IScene>;
  splash: { view: ISceneTransition | null; hideWhen: SplashHideWhen; zOrder: SplashZOrder };
  transition?: ISceneTransition;
  currentScene: IScene;
  readonly ids: string[];
  readonly defaultScene: string;

  setDefaultLoadMethod(method: LoadSceneMethod): void;

  loadDefaultScene(): Promise<void>;

  loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;

  getSceneFromHash(): string | null;
}

export type LoadSceneMethod =
  | 'immediate'
  | 'exitEnter'
  | 'enterExit'
  | 'enterBehind'
  | 'transitionExitEnter'
  | 'exitTransitionEnter';

export type SplashHideWhen = 'firstSceneEnter' | 'requiredAssetsLoaded';
export type SplashZOrder = 'top' | 'bottom';

export type SplashOptions = {
  view: ISceneTransition | typeof SceneTransition | null;
  zOrder: SplashZOrder;
  hideWhen: SplashHideWhen;
};

export type LoadSceneConfig = {
  id: string;
  method?: LoadSceneMethod;
};

const defaultSplashOptions: SplashOptions = {
  view: null,
  hideWhen: 'firstSceneEnter',
  zOrder: 'top',
};

export class SceneManagerPlugin extends Plugin implements ISceneManagerPlugin {
  public readonly id: string = 'scenes';
  public onSceneChangeStart: Signal<(detail: { exiting: string | null; entering: string }) => void> = new Signal<
    (detail: { exiting: string | null; entering: string }) => void
  >();
  public onSceneChangeComplete: Signal<(detail: { current: string }) => void> = new Signal<
    (detail: { current: string }) => void
  >();
  public splash: { view: ISceneTransition | null; hideWhen: SplashHideWhen; zOrder: SplashZOrder };
  public transition?: ISceneTransition;
  // view container - gets added to the stage
  public view: Container = new Container();
  // maybe the user wants the enter animation to be different for the first scene
  public isFirstScene: boolean = true;

  // scene management
  public list: SceneImportList<IScene> = [];
  public currentScene: IScene;
  public defaultScene: string;
  private _sceneModules: Map<string, Constructor<IScene>> = new Map();
  //
  private _lastScene: IScene | null = null;
  private _queue: Queue<any> | null;
  private _defaultLoadMethod: LoadSceneMethod = 'immediate';
  private _currentSceneId: string;
  // debug
  private _debugVisible: boolean = false;
  private _debugMenu: HTMLDivElement;
  private _useHash: boolean = false;

  // debug
  private _sceneSelect: HTMLSelectElement;

  constructor() {
    super();
    bindAllMethods(this);
  }

  get ids(): string[] {
    return this.list.map((s) => s.id);
  }

  public setDefaultLoadMethod(method: LoadSceneMethod) {
    this._defaultLoadMethod = method;
  }

  public destroy(): void {}

  public initialize(app: IApplication): Promise<void> {
    this._debugVisible =
      this.app.config?.showSceneDebugMenu === true || (isDev && this.app.config?.showSceneDebugMenu !== false);
    this._useHash = app.config?.useHash === true || this._debugVisible;
    this.view.sortableChildren = true;
    this.list = sceneList as unknown as SceneImportListItem<IScene>[];
    this.list = this.list.filter((scene) => scene.active !== false);

    if (this._debugVisible || this._useHash) {
      this.defaultScene = this.getSceneFromHash() || '';
    }
    if (!this.splash) {
      this.splash = { view: null, hideWhen: 'firstSceneEnter', zOrder: 'top' };
      const splash = { ...defaultSplashOptions, ...(app.config?.splash ?? {}) };
      if (splash.view) {
        this.splash.view =
          typeof splash.view === 'function' ? new (splash.view as Constructor<ISceneTransition>)() : splash.view;
      }
    }

    this.defaultScene = this.defaultScene || app.config?.defaultScene || this.list?.[0]?.id;
    if (!this.transition && app.config?.sceneTransition) {
      this.transition =
        typeof app.config.sceneTransition === 'function'
          ? new (app.config.sceneTransition as Constructor<ISceneTransition>)()
          : app.config.sceneTransition;
    }
    this._defaultLoadMethod = app.config.defaultSceneLoadMethod || 'immediate';

    if (this._debugVisible) {
      this._createDebugMenu();
    }
    if (this._useHash) {
      this._listenForHashChange();
    }
    return Promise.resolve(undefined);
  }

  public async loadDefaultScene(): Promise<void> {
    if (this.splash) {
      await this._showSplash();
    }
    await this.app.assets.loadRequired();
    if (this.splash.hideWhen === 'requiredAssetsLoaded') {
      await this._hideSplash();
    }
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
    const sceneItem = this.list.find((scene) => scene.id === newSceneId);
    if (!sceneItem) {
      throw new Error(`Scene item not found  for id ${newSceneId}`);
    }

    if (sceneItem?.plugins?.length) {
      for (const plugin of sceneItem.plugins) {
        const pluginListItem = this.app.getUnloadedPlugin(plugin);
        if (pluginListItem) {
          await this.app.loadPlugin(pluginListItem);
        }
      }
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
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
        );
        break;
      case 'enterExit':
        this._queue.add(
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._enterCurrentScene,
          this._startCurrentScene,
          this._destroyLastScene,
          this._unloadLastScene,
        );
        break;
      case 'enterBehind':
        this._queue.add(
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentSceneBehind,
          this._enterCurrentScene,
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._startCurrentScene,
        );
        break;
      case 'transitionExitEnter':
        this._queue.add(
          this._showTransition,
          this._exitLastScene,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._hideTransition,
          this._enterCurrentScene,
          this._startCurrentScene,
        );
        break;
      case 'exitTransitionEnter':
        this._queue.add(
          this._exitLastScene,
          this._showTransition,
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
          this._initializeCurrentScene,
          this._addCurrentScene,
          this._hideTransition,
          this._enterCurrentScene,
          this._startCurrentScene,
        );
        break;
      case 'immediate':
      default:
        this._queue.add(
          this._destroyLastScene,
          this._unloadLastScene,
          this._loadCurrentScene,
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

  public getSceneFromHash(): string | null {
    let hash = window?.location?.hash;
    if (hash) {
      hash = hash.replace('#', '');
      if (hash.length > 0) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i]?.id?.toLowerCase() === hash.toLowerCase()) {
            return this.list[i].id;
          }
        }
      }
    }
    return null;
  }

  protected getCoreSignals(): string[] {
    return ['onSceneChangeStart', 'onSceneChangeComplete'];
  }

  protected getCoreFunctions(): string[] {
    return ['loadScene'];
  }

  private _listenForHashChange() {
    window.addEventListener('hashchange', () => {
      const sceneId = this.getSceneFromHash();
      if (sceneId) {
        void this.loadScene(sceneId);
      }
    });
  }

  private async _createCurrentScene() {
    const sceneItem = this.list.find((scene) => scene.id === this._currentSceneId)!;
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
    if (sceneItem?.assets) {
      this.currentScene.assets = sceneItem.assets;
    }
    if (sceneItem.autoUnloadAssets !== undefined) {
      this.currentScene.autoUnloadAssets = sceneItem.autoUnloadAssets;
    }

    this.onSceneChangeStart.emit({ exiting: this._lastScene?.id || null, entering: this.currentScene.id });
  }

  private _queueComplete() {
    if (this.isFirstScene) {
      // background required assets
      this.app.assets.loadBackground();
    }
    this.isFirstScene = false;

    // load any background assets for the current scene
    void this.app.assets.loadSceneAssets(this.currentScene, true);

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

  private async _loadCurrentScene(): Promise<any> {
    await this.app.assets.loadSceneAssets(this.currentScene);
  }

  private async _unloadLastScene(): Promise<any> {
    if (this._lastScene && this._lastScene.autoUnloadAssets) {
      return this.app.assets.unloadSceneAssets(this._lastScene);
    }
    return Promise.resolve();
  }

  private async _initializeCurrentScene(): Promise<void> {
    await this.currentScene.initialize();
    // wait one tick so everything in the scene has had a chance to render before triggering the resize
    this.app.ticker.addOnce(() => {
      this.currentScene.resize(this.app.size);
    });

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
    if (this.isFirstScene && this.splash.hideWhen === 'firstSceneEnter') {
      await this._hideSplash();
    }
    return Promise.resolve();
  }

  private async _startCurrentScene(): Promise<void> {
    void this.currentScene.start();
    return Promise.resolve();
  }

  private async _showTransition(): Promise<void> {
    if (this.isFirstScene) {
      return Promise.resolve();
    }
    if (this.transition) {
      this.transition.active = true;
      this.transition.renderable = true;
      this.transition.visible = true;
      this.transition.progress = 0;
      await this.transition.enter();
    }
  }

  private async _hideTransition(): Promise<void> {
    if (this.isFirstScene) {
      return Promise.resolve();
    }
    if (this.transition) {
      await this.transition.exit();
      this.transition.progress = 0;
      this.transition.visible = false;
      this.transition.renderable = false;
      this.transition.active = false;
    }
  }

  private async _showSplash() {
    await this.splash.view?.enter();
  }

  private async _hideSplash(): Promise<void> {
    await this.splash.view?.exit();
    this.splash.view?.destroy();
    this.splash.view?.parent?.removeChild(this.splash.view);
    this.splash.view = null;
  }

  private _createDebugMenu() {
    this._debugMenu = document.createElement('div');
    this._debugMenu.id = 'scene-debug';
    this._debugMenu.style.cssText =
      'position: absolute; bottom: 0; left:0; width:48px; height:48px; z-index: 1000; background-color:rgba(0,0,0,0.8); color:white; border-top-right-radius:8px;';
    const icon = document.createElement('i');
    icon.style.cssText =
      'cursor:pointer; position:absolute;width:100%; font-style:normal; font-size:20px; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; pointer-events:none';
    icon.innerHTML = '🎬';
    this._debugMenu.appendChild(icon);

    (Application.containerElement || document.body).appendChild(this._debugMenu);

    this._sceneSelect = document.createElement('select');
    this._sceneSelect.style.cssText =
      'padding:0; border-radius:5px; opacity:0; width:48px; height:48px; cursor:pointer';
    this._sceneSelect.value = this.defaultScene || '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.innerHTML = 'Select a scene';
    defaultOption.setAttribute('disabled', 'disabled');
    this._sceneSelect.appendChild(defaultOption);

    // create option groups
    const groups = new Map<string, HTMLOptGroupElement>();

    this.list.forEach((item) => {
      if (item.debugGroup) {
        if (!groups.has(item.debugGroup)) {
          const group = document.createElement('optgroup');
          group.label = item.debugGroup;
          groups.set(item.debugGroup, group);
          this._sceneSelect.appendChild(group);
        }
      }
    });

    if (groups.size > 0) {
      const nogroups = this.list.filter((item) => !item.debugGroup);
      if (nogroups.length) {
        const group = document.createElement('optgroup');
        group.label = 'Other';
        groups.set('Other', group);
        this._sceneSelect.appendChild(group);
        nogroups.forEach((item) => {
          item.debugGroup = 'Other';
        });
      }
    }

    this.list.forEach((value) => {
      const option = document.createElement('option');
      option.value = value.id;
      option.innerHTML = value?.debugLabel || value.id;
      if (value.id === this.defaultScene) {
        option.selected = true;
      }
      if (value.debugGroup) {
        groups.get(value.debugGroup)?.appendChild(option);
      } else {
        this._sceneSelect.appendChild(option);
      }
    });

    this._debugMenu.appendChild(this._sceneSelect);

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

    this.onSceneChangeStart.connect(this._disableDebugMenu);
    this.onSceneChangeComplete.connect(this._enableDebugMenu);
  }

  private _enableDebugMenu() {
    this._debugMenu?.querySelector('select')?.removeAttribute('disabled');
  }

  private _disableDebugMenu() {
    this._debugMenu?.querySelector('select')?.setAttribute('disabled', 'disabled');
  }
}
