

declare module 'virtual:dill-pixel-scenes' {
  import type { SceneListItem } from "./display";
  export const sceneList: SceneListItem[];
}

declare module 'virtual:dill-pixel-plugins' {
  import type { PluginListItem } from '../plugins/Plugin';
  export const pluginsList: PluginListItem[];
}

declare module 'virtual:dill-pixel-storage-adapters' {
  import type { StorageAdapterListItem } from "./store/adapters/StorageAdapter";
  export const storageAdaptersList: StorageAdapterListItem[];
}
