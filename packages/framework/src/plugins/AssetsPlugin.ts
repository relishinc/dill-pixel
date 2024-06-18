import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';
import type { AssetsPreferences, ResolvedAsset, UnresolvedAsset } from 'pixi.js';
import { Assets } from 'pixi.js';
import type { IScene } from '../display';
import { Signal } from '../signals';
import { IApplication } from '../core';
import { AssetLike, AssetLoadingOptions, AssetTypes, BundleTypes, isDev, SceneImportListItem } from '../utils';

export interface IAssetsPlugin extends IPlugin {
  onLoadStart: Signal<() => void>;
  onLoadProgress: Signal<(progress: number) => void>;
  onLoadComplete: Signal<() => void>;

  loadAssets(assets: string | string[] | UnresolvedAsset | UnresolvedAsset[] | AssetLike | AssetLike[]): Promise<void>;

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

const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif', 'svg'];

function getAssetList(assets: AssetTypes): UnresolvedAsset[] | string[] {
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.map((asset: string | UnresolvedAsset | AssetLike) => {
    if (typeof asset === 'string') {
      return asset;
    } else if (typeof asset === 'object') {
      let alias: string | string[] = (asset?.src as string | string[]) || [];
      if (!Array.isArray(alias)) {
        alias = [alias];
      }
      if (asset.ext) {
        if (asset.src && !Array.isArray(asset.src)) {
          alias.push(asset.src as string);
          if (
            imageExtensions.includes(asset.ext) &&
            asset?.src?.indexOf('@1x') === -1 &&
            asset?.src?.indexOf('0.5x') === -1
          ) {
            asset.src = [`${asset.src}@0.5x`, `${asset.src}@1x`, asset.src];
          } else {
            asset.src = [asset.src];
          }
        }
        asset.src = (asset.src as string[]).map((src: string) => {
          return `${src}.${asset.ext}`;
        });
        asset.alias = [...alias, ...(asset.src as string[])].filter(Boolean);
      }
      return asset;
    }
  });
}

export class AssetsPlugin extends Plugin implements IAssetsPlugin {
  public readonly id: string = 'assets';
  public onLoadStart: Signal<() => void> = new Signal();
  public onLoadProgress: Signal<(progress: number) => void> = new Signal();
  public onLoadComplete: Signal<() => void> = new Signal();

  private _loadedBundles: Set<string> = new Set();
  private _loadedAssets: Set<string | UnresolvedAsset> = new Set();

  private _required: { assets?: AssetTypes; bundles?: BundleTypes } = {};
  private _background: { assets?: AssetTypes; bundles?: BundleTypes } = {};

  public initialize(_app: IApplication, options?: AssetLoadingOptions): Promise<void> | void {
    if (options?.preload) {
      this._required = options.preload;
    }
    if (options?.background) {
      this._background = options.background;
    }
    Assets.setPreferences({ ...detaultAssetPreferences, ...options?.assetPreferences });
  }

  public async loadRequired() {
    this._handleLoadStart();
    this._handleLoadProgress(0);
    if (this._required) {
      if (this._required.assets) {
        await Assets.load(getAssetList(this._required.assets), this._handleLoadProgress);
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
        getAssetList(this._background.assets).forEach((asset) => {
          if ((asset as UnresolvedAsset)?.src) {
            const src = (asset as UnresolvedAsset).src as string[];
            if (src) {
              return Assets.backgroundLoad(src);
            }
          }
          return Assets.backgroundLoad(asset as string);
        });
      }
      if (this._background.bundles) {
        void Assets.backgroundLoadBundle(this._background.bundles);
      }
    }
  }

  public async loadAssets(assets: AssetTypes) {
    assets = getAssetList(assets);
    await Assets.load(assets, this._handleLoadProgress);
    this._markAssetsLoaded(assets as UnresolvedAsset[] | string[]);
    return Promise.resolve();
  }

  public async loadBundles(bundles: string | string[]) {
    await Assets.loadBundle(bundles, this._handleLoadProgress);
    this._markBundlesLoaded(bundles);
    return Promise.resolve();
  }

  public async unloadSceneAssets(scene: IScene | SceneImportListItem<any>) {
    if (scene.assets?.preload?.assets) {
      const assets = getAssetList(scene.assets.preload.assets);
      void Assets.unload(assets as ResolvedAsset[] | string[]).then(() => {
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
          const assets = getAssetList(scene.assets.background.assets);
          const filteredAssets = assets.filter((asset: string | UnresolvedAsset) => !this._isAssetLoaded(asset));
          if (filteredAssets.length) {
            filteredAssets.forEach((asset) => {
              if ((asset as UnresolvedAsset)?.src) {
                const src = (asset as UnresolvedAsset).src as string[];
                if (src) {
                  return Assets.backgroundLoad(src);
                }
              }
              return Assets.backgroundLoad(asset as string);
            });
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
        const assets = getAssetList(scene.assets.preload.assets);
        const filteredAssets = assets.filter((asset) => !this._isAssetLoaded(asset));
        if (filteredAssets.length) {
          await Assets.load(filteredAssets, this._handleLoadProgress);
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

  private _isAssetLoaded(alias: string | UnresolvedAsset) {
    return this._loadedAssets.has(alias);
  }

  private _isBundleLoaded(alias: string) {
    return this._loadedBundles.has(alias);
  }

  private _markAssetsLoaded(urls: UnresolvedAsset[] | string[]) {
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

  private _markAssetsUnloaded(urls: string[] | string | UnresolvedAsset | UnresolvedAsset[]) {
    if (!Array.isArray(urls)) {
      urls = [urls];
    }
    urls.forEach((url: string | UnresolvedAsset) => {
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
    this.onLoadStart.emit();
  }

  private _handleLoadProgress(progress: number) {
    this.onLoadProgress.emit(progress);
  }

  private _handleLoadComplete() {
    this._handleLoadProgress(1);
    this.onLoadComplete.emit();
  }
}
