import config from 'virtual:dill-pixel-config';
import { pluginsList } from 'virtual:dill-pixel-plugins';
import { sceneList } from 'virtual:dill-pixel-scenes';
import { storageAdaptersList } from 'virtual:dill-pixel-storage-adapters';

import { create } from './core/create';
import type { AppConfig } from './core/types';
import type { AppTypeOverrides } from './utils';

(globalThis as any).DillPixel = (globalThis as any).DillPixel || {};

try {
  (globalThis as any).DillPixel.APP_NAME = __DILL_PIXEL_APP_NAME;
  (globalThis as any).DillPixel.APP_VERSION = __DILL_PIXEL_APP_VERSION;
} catch (e) {
  console.error('Failed to set app name and version', e);
}

(globalThis as any).DillPixel.sceneList = sceneList;
(globalThis as any).DillPixel.pluginsList = pluginsList;
(globalThis as any).DillPixel.storageAdaptersList = storageAdaptersList;

// Extract IDs for easier access
(globalThis as any).DillPixel.sceneIds = sceneList.map((scene: any) => scene.id);
(globalThis as any).DillPixel.pluginIds = pluginsList.map((plugin: any) => plugin.id);
(globalThis as any).DillPixel.storageAdapterIds = storageAdaptersList.map((adapter: any) => adapter.id);

(globalThis as any).DillPixel.get = function (key: string) {
  (globalThis as any).DillPixel = (globalThis as any).DillPixel || {};
  return key ? (globalThis as any).DillPixel[key] : (globalThis as any).DillPixel;
};

type App = AppTypeOverrides['App'];

async function bootstrap() {
  // 1. Create the application
  const app = await create(config as Partial<AppConfig>);

  // 2. Find and load src/main.ts
  const mains = import.meta.glob('/src/main.ts', {
    eager: true,
  });

  const mainPath = Object.keys(mains)[0];

  if (mainPath) {
    const mainModule = mains[mainPath] as { default?: unknown };

    if (mainModule && typeof mainModule.default === 'function') {
      const main = mainModule.default;
      await (main as (app: App) => Promise<void> | void)(app);
    }
  }
}

void bootstrap();
