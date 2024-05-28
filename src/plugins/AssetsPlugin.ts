import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';
import type { AssetsPreferences } from 'pixi.js';
import { Assets } from 'pixi.js';
import type { IScene } from '../display';
import { Signal } from '../signals';
import { IApplication } from '../core';
import { AssetLoadingOptions, isDev, Logger, SceneImportListItem } from '../utils';

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

const detaultAssetPreferences: Partial<AssetsPreferences> = {
  preferWorkers: !isDev,
  crossOrigin: 'anonymous',
};

export class AssetsPlugin extends Plugin implements IAssetsPlugin {
  public readonly id: string = 'assets';
  public onLoadStart: Signal<() => void> = new Signal();
  public onLoadProgress: Signal<(progress: number) => void> = new Signal();
  public onLoadComplete: Signal<() => void> = new Signal();

  private _loadedBundles: Set<string> = new Set();
  private _loadedAssets: Set<string> = new Set();

  private _required: { assets?: string | string[]; bundles?: string | string[] } = {};
  private _background: { assets?: string | string[]; bundles?: string | string[] } = {};

  public initialize(_app: IApplication, options?: AssetLoadingOptions): Promise<void> | void {
    if (options?.preload) {
      this._required = options.preload;
    }
    if (options?.background) {
      this._background = options.background;
    }
    Assets.setPreferences({ ...detaultAssetPreferences, ...options?.assetPreferences });
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
    await Assets.load(assets, this._handleLoadProgress);
    this._markAssetsLoaded(assets);
    return Promise.resolve();
  }

  public async loadBundles(bundles: string | string[]) {
    await Assets.loadBundle(bundles, this._handleLoadProgress);
    this._markBundlesLoaded(bundles);
    return Promise.resolve();
  }

  public async unloadSceneAssets(scene: IScene | SceneImportListItem<any>) {
    if (scene.assets?.preload?.assets) {
      const assets = scene.assets.preload.assets;
      void Assets.unload(assets).then(() => {
        this._markAssetsUnloaded(assets);
      });
    }
    if (scene.assets?.preload?.bundles) {
      const bundles = scene.assets.preload.bundles;
      void Assets.unloadBundle(bundles).then(() => {
        this._markBundlesUnloaded(bundles);
      });
    }
    return Promise.resolve();
  }

  public async loadSceneAssets(scene: IScene | SceneImportListItem<any>, background = false) {
    if (background) {
      if (scene.assets?.background) {
        if (scene.assets.background.assets) {
          let assets = Array.isArray(scene.assets.background.assets)
            ? scene.assets.background.assets
            : [scene.assets.background.assets];
          assets = assets.filter((asset) => !this._isAssetLoaded(asset));
          if (assets.length) {
            void Assets.backgroundLoad(assets);
          }
        }
        if (scene.assets.background.bundles) {
          let bundles = Array.isArray(scene.assets.background.bundles)
            ? scene.assets.background.bundles
            : [scene.assets.background.bundles];
          bundles = bundles.filter((bundle) => !this._isBundleLoaded(bundle));
          if (bundles.length) {
            void Assets.backgroundLoadBundle(bundles);
          }
        }
      }
    } else {
      this._handleLoadStart();
      this._handleLoadProgress(0);
      if (scene.assets?.preload?.assets) {
        let assets: string[] = Array.isArray(scene.assets.preload.assets)
          ? scene.assets.preload.assets
          : [scene.assets.preload.assets];
        assets = assets.filter((asset) => !this._isAssetLoaded(asset));
        if (assets.length) {
          await Assets.load(assets, this._handleLoadProgress);
          this._markAssetsLoaded(assets);
        }
      }
      if (scene.assets?.preload?.bundles) {
        let bundles: string[] = Array.isArray(scene.assets.preload.bundles)
          ? scene.assets.preload.bundles
          : [scene.assets.preload.bundles];
        bundles = bundles.filter((bundle) => !this._isBundleLoaded(bundle));
        if (bundles.length) {
          await Assets.loadBundle(bundles, this._handleLoadProgress);
          this._markBundlesLoaded(bundles);
        }
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

  private _isAssetLoaded(alias: string) {
    return this._loadedAssets.has(alias);
  }

  private _isBundleLoaded(alias: string) {
    return this._loadedBundles.has(alias);
  }

  private _markAssetsLoaded(urls: string[] | string) {
    if (!Array.isArray(urls)) {
      urls = [urls];
    }
    urls.forEach((url) => {
      this._loadedAssets.add(url);
    });
  }

  private _markBundlesLoaded(aliases: string[] | string) {
    if (!Array.isArray(aliases)) {
      aliases = [aliases];
    }
    aliases.forEach((alias) => {
      this._loadedBundles.add(alias);
    });
  }

  private _markAssetsUnloaded(urls: string[] | string) {
    if (!Array.isArray(urls)) {
      urls = [urls];
    }
    urls.forEach((url) => {
      this._loadedAssets.delete(url);
    });
  }

  private _markBundlesUnloaded(aliases: string[] | string) {
    if (!Array.isArray(aliases)) {
      aliases = [aliases];
    }
    aliases.forEach((alias) => {
      this._loadedBundles.delete(alias);
    });
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
