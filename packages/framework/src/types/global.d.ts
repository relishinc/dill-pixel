/// <reference types="vite/client" />
import type { SceneListItem } from '../display/Scene';
import type { PluginListItem } from '../plugins/Plugin';
import type { StorageAdapterListItem } from '../store/adapters/StorageAdapter';

declare const __DILL_PIXEL_APP_NAME: string;
declare const __DILL_PIXEL_APP_VERSION: string | number;

interface PWARegisterOptions {
  immediate?: boolean;
  onNeedRefresh?: () => void;
  onOfflineReady?: () => void;
}

interface PWAInfo {
  needRefresh: boolean;
  offlineReady: boolean;
}

interface DillPixelGlobal {
  readonly sceneList: SceneListItem[];
  readonly pluginsList: PluginListItem[];
  readonly storageAdaptersList: StorageAdapterListItem[];
  readonly pwaInfo: PWAInfo;
  pwaNeedRefresh: boolean;
  pwaOfflineReady: boolean;
  registerSW: (options?: PWARegisterOptions) => void;
}

declare global {
  interface Window {
    __DILL_PIXEL: DillPixelGlobal;
  }

  let __DILL_PIXEL: DillPixelGlobal;
}

interface RegisterSWOptions {
  immediate?: boolean;
  onNeedRefresh?: () => void;
  onOfflineReady?: () => void;
}
declare module 'virtual:dill-pixel-scenes' {
  export const sceneList: any[];
}

declare module 'virtual:dill-pixel-plugins' {
  export const pluginsList: any[];
}

declare module 'virtual:dill-pixel-storage-adapters' {
  export const storageAdaptersList: any[];
}

declare module 'virtual:pwa-info' {
  export const pwaInfo: any;
}

declare module 'virtual:pwa-register' {
  export function registerSW(options?: RegisterSWOptions): void;
}
