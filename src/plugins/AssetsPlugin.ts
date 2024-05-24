import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';
import { Assets } from 'pixi.js';
import type { IScene } from '../display';
import { Signal } from '../signals';
import { IApplication } from '../core';
import { Logger, SceneImportListItem } from '../utils';

export interface IAssetsPlugin extends IPlugin {
  onLoadStart: Signal<() => void>;
  onLoadProgress: Signal<(progress: number) => void>;
  onLoadComplete: Signal<() => void>;

  loadAssets(assets: string | string[]): Promise<void>;

  loadBundles(bundle: string | string[]): Promise<void>;

  loadSceneAssets(scene: IScene | SceneImportListItem<any>, background?: boolean): Promise<void>;

  unloadSceneAssets(scene: IScene | SceneImportListItem<any>): Promise<void>;

  loadRequired(): Promise<void>;

  loadBackground(): void;
}

export interface IAssetsPluginOptions {
  required?: { assets?: string | string[]; bundles?: string | string[] };
  background?: { assets?: string | string[]; bundles?: string | string[] };
}

export class AssetsPlugin extends Plugin implements IAssetsPlugin {
  public readonly id: string = 'assets';
  public onLoadStart: Signal<() => void> = new Signal();
  public onLoadProgress: Signal<(progress: number) => void> = new Signal();
  public onLoadComplete: Signal<() => void> = new Signal();

  private _required: { assets?: string | string[]; bundles?: string | string[] } = {};
  private _background: { assets?: string | string[]; bundles?: string | string[] } = {};

  public initialize(_app: IApplication, options?: Partial<IAssetsPluginOptions>): Promise<void> | void {
    if (options?.required) {
      this._required = options.required;
    }
    if (options?.background) {
      this._background = options.background;
    }
    Logger.log('AssetsPlugin initialized', _app, options, this._required);
  }

  public async loadRequired() {
    this._handleLoadStart();
    this._handleLoadProgress(0);
    if (this._required) {
      if (this._required.assets) {
        await Assets.load(this._required.assets, this._handleLoadProgress);
      }
      if (this._required.bundles) {
        await Assets.loadBundle(this._required.bundles, this._handleLoadProgress);
      }
    }
    this._handleLoadComplete();
    return Promise.resolve();
  }

  public loadBackground() {
    console.log('loadBackground', this._background, Assets);
    if (this._background) {
      if (this._background.assets) {
        void Assets.backgroundLoad(this._background.assets);
      }
      if (this._background.bundles) {
        void Assets.backgroundLoadBundle(this._background.bundles);
      }
    }
  }

  public async loadAssets(assets: string | string[]) {
    return Assets.load(assets, this._handleLoadProgress);
  }

  public async loadBundles(bundle: string | string[]) {
    return Assets.loadBundle(bundle, this._handleLoadProgress);
  }

  public async unloadSceneAssets(scene: IScene | SceneImportListItem<any>) {
    if (scene.assets) {
      void Assets.unload(scene.assets);
    }
    if (scene.bundles) {
      void Assets.unloadBundle(scene.bundles);
    }
    return Promise.resolve();
  }

  public async loadSceneAssets(scene: IScene | SceneImportListItem<any>, background = false) {
    if (background) {
      if (scene.backgroundAssets || scene.backgroundBundles) {
        if (scene.backgroundAssets) {
          void Assets.backgroundLoad(scene.backgroundAssets);
        }
        if (scene.backgroundBundles) {
          void Assets.backgroundLoadBundle(scene.backgroundBundles);
        }
      }
    } else {
      this._handleLoadStart();
      this._handleLoadProgress(0);
      if (scene.assets) {
        await Assets.load(scene.assets, this._handleLoadProgress);
      }
      if (scene.bundles) {
        await Assets.loadBundle(scene.bundles, this._handleLoadProgress);
      }
      this._handleLoadComplete();
    }
  }

  protected getCoreFunctions(): string[] {
    return ['loadSceneAssets', 'unloadSceneAssets', 'loadAssets', 'loadBundles', 'loadRequired'];
  }

  protected getCoreSignals(): string[] {
    return ['onLoadStart', 'onLoadProgress', 'onLoadComplete'];
  }

  private _handleLoadStart() {
    Logger.log('AssetsPlugin:: onLoadStart');
    this.onLoadStart.emit();
  }

  private _handleLoadProgress(progress: number) {
    Logger.log('AssetsPlugin:: onLoadProgress', progress);
    this.onLoadProgress.emit(progress);
  }

  private _handleLoadComplete() {
    this._handleLoadProgress(1);
    Logger.log('AssetsPlugin:: onLoadComplete');
    this.onLoadComplete.emit();
  }
}
