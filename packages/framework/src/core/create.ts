import { type RegisterSWOptions } from 'vite-plugin-pwa/types';
import { sayHello } from '../hello';
import type { PluginListItem } from '../plugins';
import { type StorageAdapterListItem } from '../store';
import type { AppTypeOverrides, SceneImportListItem } from '../utils';
import { checkWebGL } from '../webgl-check';
import { Application } from './Application';
import { AppConfig } from './types';

type App = AppTypeOverrides['App'];

interface DillPixelPWA {
  readonly info: any;
  register: () => void;
  onRegisteredSW: (swScriptUrl: string) => void;
  offlineReady: () => void;
  onNeedRefresh?: () => void;
  onRegisterError?: (error: any) => void;
}
interface DillPixelGlobal {
  APP_NAME: string;
  APP_VERSION: string | number;

  readonly sceneList: SceneImportListItem<any>[];
  readonly pluginsList: PluginListItem[];
  readonly storageAdaptersList: StorageAdapterListItem[];

  get: (key?: string) => any;
  // pwa
  pwa: DillPixelPWA;
}

declare global {
  const __DILL_PIXEL_APP_NAME: string;
  const __DILL_PIXEL_APP_VERSION: string | number;

  const DillPixel: DillPixelGlobal;
  const registerSW: (options: RegisterSWOptions) => void;
  interface Window {
    DillPixel: DillPixelGlobal;
  }
}

export const DEFAULT_GAME_CONTAINER_ID = 'dill-pixel-game-container';

export function createContainer(id: string) {
  const container = document.createElement('div');
  container.setAttribute('id', id);
  document.body.appendChild(container);
  return container;
}

export async function documentReady() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      resolve(true);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        resolve(true);
      });
    }
  });
}

export async function create(
  config: Partial<AppConfig> = { id: 'DillPixelApplication' },
  domElement: string | Window | HTMLElement = DEFAULT_GAME_CONTAINER_ID,
  speak: boolean = true,
): Promise<App> {
  await documentReady();
  checkWebGL();
  if (speak) {
    sayHello();
  }
  let el: HTMLElement | null = null;
  if (typeof domElement === 'string') {
    el = document.getElementById(domElement);
    if (!el) {
      el = createContainer(domElement);
    }
  } else if (domElement instanceof HTMLElement) {
    el = domElement;
  } else if (domElement === window) {
    el = document.body;
  }
  if (!el) {
    // no element to use
    throw new Error(
      'You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id.',
    );
  }
  if (config.resizeToContainer) {
    config.resizeTo = el;
  }

  if (config.useLayout) {
    config.layout = {
      // @ts-expect-error some config stuff isn't typed right in @pixi/layout
      autoUpdate: false,
      enableDebug: false,
      debugModificationCount: 0,
      throttle: 100,
    };
  }

  config.container = el;
  const ApplicationClass = config.application || Application;
  const instance = new ApplicationClass();
  await instance.initialize(config, el);

  if (config.useLayout) {
    instance.stage.layout = {
      position: 'absolute',
      width: '100%',
      height: '100%',
    };
  }

  // ensure all plugins are initialized
  // call postInitialize on the instance
  await instance.postInitialize();
  // return the app instance
  return instance as App;
}
