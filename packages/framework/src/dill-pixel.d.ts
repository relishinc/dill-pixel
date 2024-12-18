declare module 'virtual:dill-pixel-scenes' {
  import type { IScene } from '../core';

  export interface SceneListItem {
    id: string;
    path: string;
    scene: () => Promise<new () => IScene> | IScene;
    debug?: {
      label?: string;
      group?: string;
    };
    assets?: string[];
    plugins?: string[];
    autoUnloadAssets: boolean;
  }

  export const sceneList: SceneListItem[];
}

declare module 'virtual:dill-pixel-plugins' {
  import type { IPlugin } from '../plugins/Plugin';

  export interface PluginListItem {
    id: string;
    path: string;
    plugin: () => Promise<new () => IPlugin> | IPlugin;
    assets?: string[];
    plugins?: string[];
  }

  export const pluginsList: PluginListItem[];
}

declare module 'virtual:dill-pixel-storage-adapters' {
  export interface StorageAdapterListItem {
    id: string;
    path: string;
    storageAdapter: () => Promise<new () => IStorageAdapter> | IStorageAdapter;
  }

  export const storageAdaptersList: StorageAdapterListItem[];
}
