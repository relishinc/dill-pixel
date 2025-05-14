declare const __DILL_PIXEL_APP_NAME: string;
declare const __DILL_PIXEL_APP_VERSION: string | number;

interface DillPixelGlobal {
  sceneList: any[];
  pluginsList: any[];
  storageAdaptersList: any[];
  pwaInfo: any;
  pwaNeedRefresh: boolean;
  pwaOfflineReady: boolean;
}

declare const globalThis: globalThis & {
  __DILL_PIXEL: DillPixelGlobal;
};
