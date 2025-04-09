import type { AssetsPreferences, ResolvedAsset, UnresolvedAsset } from 'pixi.js';
import { Assets } from 'pixi.js';
import { Application } from '../core/Application';
import type { IScene } from '../display';
import { Signal } from '../signals';
import {
  AssetLike,
  AssetLoadingOptions,
  AssetTypes,
  BundleTypes,
  DillPixelEvent,
  isDev,
  Logger,
  SceneImportListItem,
} from '../utils';
import type { IPlugin } from './Plugin';
import { Plugin } from './Plugin';

export interface IAssetsPlugin extends IPlugin {
  onLoadStart: Signal<() => void>;
  onLoadProgress: Signal<(progress: number) => void>;
  onLoadComplete: Signal<() => void>;

  onLoadRequiredStart: Signal<() => void>;
  onLoadRequiredProgress: Signal<(progress: number) => void>;
  onLoadRequiredComplete: Signal<() => void>;

  webStartEvent: Event;
  webProgressEvent: CustomEvent<{ progress: number }>;
  webCompleteEvent: Event;

  webRequiredStartEvent: Event;
  webRequiredProgressEvent: CustomEvent<{ progress: number }>;
  webRequiredCompleteEvent: Event;

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

function addParseAsGraphicsContext(asset: string | UnresolvedAsset): string | UnresolvedAsset {
  if (typeof asset === 'string') {
    if (!asset?.includes('.svg')) {
      return asset;
    }
    asset = { src: asset };
  } else {
    if (Array.isArray(asset.src) || !asset.src?.includes('.svg')) {
      return asset;
    }
  }
  if (!asset.data) {
    asset.data = {};
  }
  asset.data.parseAsGraphicsContext = true;
  return asset;
}

function getAssetList(assets: AssetTypes): UnresolvedAsset[] | string[] {
  if (!Array.isArray(assets)) {
    assets = [assets];
  }
  return assets.map((asset: string | UnresolvedAsset | AssetLike) => {
    if (typeof asset === 'string') {
      return addParseAsGraphicsContext(asset);
    } else if (typeof asset === 'object') {
      let alias: string | string[] = (asset?.src as string | string[]) || [];
      if (!Array.isArray(alias)) {
        alias = [alias];
      }
      if (asset.ext) {
        if (asset.src && !Array.isArray(asset.src)) {
          alias.push(asset.src as string);
          asset.src = [asset.src];
        }
        asset.src = (asset.src as string[]).map((src: string) => {
          return `${src}.${asset.ext}`;
        });
        asset.alias = [...alias, ...(asset.src as string[])].filter(Boolean);
      } else {
        addParseAsGraphicsContext(asset);
      }
      return asset;
    }
  });
}

export class AssetsPlugin extends Plugin<Application, AssetLoadingOptions> implements IAssetsPlugin {
  public readonly id: string = 'assets';
  public onLoadStart: Signal<() => void> = new Signal();
  public onLoadProgress: Signal<(progress: number) => void> = new Signal();
  public onLoadComplete: Signal<() => void> = new Signal();
  // required loading signals
  public onLoadRequiredStart: Signal<() => void> = new Signal();
  public onLoadRequiredProgress: Signal<(progress: number) => void> = new Signal();
  public onLoadRequiredComplete: Signal<() => void> = new Signal();

  public onBackgroundLoadStart: Signal<() => void> = new Signal();
  public onBackgroundAssetLoaded: Signal<(asset: string) => void> = new Signal();
  public onBackgroundBundlesLoaded: Signal<() => void> = new Signal();

  private _loadedBundles: Set<string> = new Set();
  private _loadedAssets: Set<string | UnresolvedAsset> = new Set();

  private _required: { assets?: AssetTypes; bundles?: BundleTypes } = {};
  private _background: { assets?: AssetTypes; bundles?: BundleTypes } = {};

  private _isLoadingRequired: boolean = false;

  public webRequiredStartEvent: Event = new Event(DillPixelEvent.REQUIRED_ASSETS_START, {
    bubbles: true,
    cancelable: false,
  });
  public webRequiredProgressEvent: CustomEvent<{ progress: number }> = new CustomEvent<{ progress: number }>(
    DillPixelEvent.REQUIRED_ASSETS_PROGRESS,
    {
      bubbles: true,
      cancelable: false,
      detail: {
        progress: 0,
      },
    },
  );
  public webRequiredCompleteEvent: Event = new Event(DillPixelEvent.REQUIRED_ASSETS_COMPLETE, {
    bubbles: true,
    cancelable: false,
  });

  public webStartEvent: Event = new Event(DillPixelEvent.ASSETS_START, {
    bubbles: true,
    cancelable: false,
  });
  public webProgressEvent: CustomEvent<{ progress: number }> = new CustomEvent<{ progress: number }>(
    DillPixelEvent.ASSETS_PROGRESS,
    {
      bubbles: true,
      cancelable: false,
      detail: {
        progress: 0,
      },
    },
  );
  public webCompleteEvent: Event = new Event(DillPixelEvent.ASSETS_COMPLETE, {
    bubbles: true,
    cancelable: false,
  });

  public initialize(options?: AssetLoadingOptions): Promise<void> | void {
    if (options?.preload) {
      this._required = options.preload;
    }
    if (options?.background) {
      this._background = options.background;
    }
    Assets.setPreferences({ ...detaultAssetPreferences, ...options?.assetPreferences });
  }

  public async loadRequired() {
    this._isLoadingRequired = true;
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
    this._isLoadingRequired = false;
    return Promise.resolve();
  }

  public loadBackground() {
    this.onBackgroundLoadStart.emit();
    if (this._background) {
      if (this._background.assets) {
        const list = getAssetList(this._background.assets);
        list.forEach((asset) => {
          if ((asset as UnresolvedAsset)?.src) {
            const src = (asset as UnresolvedAsset).src as string[];
            if (src) {
              return Assets.backgroundLoad(src);
            }
          }
          return Assets.backgroundLoad(asset as string).then(() => {
            this.onBackgroundAssetLoaded.emit(asset as string);
          });
        });
      }
      if (this._background.bundles) {
        void Assets.backgroundLoadBundle(this._background.bundles).then(() => {
          this.onBackgroundBundlesLoaded.emit();
        });
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
      Assets.unload(assets as ResolvedAsset[] | string[]).then(() => {
        // Logger.log('assets unloaded');
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
          Logger.log('loading bundles', bundles);
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
    return [
      'onLoadStart',
      'onLoadProgress',
      'onLoadComplete',
      'onBackgroundLoadStart',
      'onBackgroundAssetLoaded',
      'onBackgroundBundlesLoaded',
    ];
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
    this.dispatchWebEvent(this.webStartEvent);
    if (this._isLoadingRequired) {
      this.onLoadRequiredStart.emit();
      this.dispatchWebEvent(this.webRequiredStartEvent);
    }
  }

  private _handleLoadProgress(progress: number) {
    this.onLoadProgress.emit(progress);
    this.dispatchWebEvent(this.webProgressEvent, { progress });
    if (this._isLoadingRequired) {
      this.onLoadRequiredProgress.emit(progress);
      this.dispatchWebEvent(this.webRequiredProgressEvent, { progress });
    }
  }

  private _handleLoadComplete() {
    this._handleLoadProgress(1);
    this.onLoadComplete.emit();
    this.dispatchWebEvent(this.webCompleteEvent);
    console.log('webCompleteEvent', this.webCompleteEvent);

    if (this._isLoadingRequired) {
      console.log('webRequiredCompleteEvent', this.webRequiredCompleteEvent);
      this.onLoadRequiredComplete.emit();
      this.dispatchWebEvent(this.webRequiredCompleteEvent);
    }
  }

  private dispatchWebEvent(event: Event | CustomEvent, detail?: any) {
    if (detail) {
      for (const key in detail) {
        const e = event as CustomEvent<any>;
        e.detail[key] = detail[key];
      }
    }
    try {
      this.app.canvas.dispatchEvent(event);
    } catch (error) {
      Logger.error('Error dispatching web event', error);
    }
  }
}
