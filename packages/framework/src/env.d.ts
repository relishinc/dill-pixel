/// <reference types="vite/client" />

declare const __DILL_PIXEL_APP_NAME: string;
declare const __DILL_PIXEL_APP_VERSION: string;

declare module 'virtual:dill-pixel-config' {
  const config: any;
  export default config;
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
