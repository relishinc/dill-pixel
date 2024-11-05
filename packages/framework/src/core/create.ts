import { Application } from '../Application';
import { sayHello } from '../hello';
import { IDataSchema } from '../store';
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

export async function create<T extends IApplication = Application, D extends IDataSchema = IDataSchema>(
  config: AppConfig<T, D> = { id: 'DillPixelApplication' },
  ApplicationClass: new () => IApplication = Application,
  domElement: string | Window | HTMLElement = DEFAULT_GAME_CONTAINER_ID,
  speak: boolean = true,
): Promise<T> {
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
    instance.setContainer(el);
  } else {
    throw new Error('No element found to append the view to.');
  }
  // ensure all plugins are initialized
  await delay(0.01);

  // call postInitialize on the instance
  await instance.postInitialize();

  // return the app instance
  return instance as T;
}
