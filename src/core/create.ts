import { sayHello } from '../hello';
import { delay } from '../utils';
import { IApplication } from './interfaces';
import { AppConfig } from './types';

export const DEFAULT_GAME_CONTAINER_ID = 'dill-pixel-game-container';

export function createContainer(id: string) {
  const container = document.createElement('div');
  container.setAttribute('id', id);
  document.body.appendChild(container);
  return container;
}

export async function create(
  ApplicationClass: new () => IApplication,
  config: AppConfig = { id: 'DillPixelApplication' },
  domElement: string | Window | HTMLElement = DEFAULT_GAME_CONTAINER_ID,
  speak: boolean = true,
): Promise<IApplication> {
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
  await instance.initialize(config);
  if (el) {
    el.appendChild(instance.canvas as HTMLCanvasElement);
  } else {
    throw new Error('No element found to append the view to.');
  }
  // ensure all plugins are initialized
  await delay(0.01);

  // call postInitialize on the instance
  await instance.postInitialize();

  // return th app instance
  return instance as unknown as IApplication;
}
