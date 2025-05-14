/// <reference types="vite/client" />
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
