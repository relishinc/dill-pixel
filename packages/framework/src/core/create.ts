import { sayHello } from '../hello';
import { DataSchema } from '../store';
import { checkWebGL } from '../webgl-check';
import { Application } from './Application';
import { IApplication } from './interfaces';
import { AppConfig } from './types';

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

export async function create<T extends IApplication = Application, D extends DataSchema = DataSchema>(
  config: AppConfig<D> = { id: 'DillPixelApplication' },
  ApplicationClass: new () => IApplication = Application,
  domElement: string | Window | HTMLElement = DEFAULT_GAME_CONTAINER_ID,
  speak: boolean = true,
): Promise<T> {
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
  config.container = el;
  const instance = new ApplicationClass();

  await instance.initialize(config as AppConfig<DataSchema>, el);
  // ensure all plugins are initialized
  // call postInitialize on the instance
  await instance.postInitialize();
  // return the app instance
  return instance as T;
}
