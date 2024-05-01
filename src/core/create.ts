import { sayHello } from '../hello';
import { delay } from '../utils/async';
import { Application, IApplication, RequiredApplicationConfig } from './Application';

export async function create<T extends IApplication = Application>(
  ApplicationClass: new () => T,
  config: RequiredApplicationConfig = { id: 'DillPixelApplication' },
  domElement: string | Window | HTMLElement = Application.containerId,
  speak: boolean = true,
): Promise<T> {
  if (speak) {
    sayHello();
  }
  let el: HTMLElement | null = null;
  if (typeof domElement === 'string') {
    el = document.getElementById(domElement);
    if (!el) {
      el = Application.createContainer(domElement);
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
  Application.containerElement = el;
  if (config.resizeToContainer) {
    config.resizeTo = el;
  }
  const instance = new ApplicationClass();
  await instance.initialize(config);
  if (el) {
    el.appendChild(instance.canvas as HTMLCanvasElement);
  } else {
    throw new Error('No element found to append the view to.');
  }
  await delay(0.01);
  await instance.postInitialize();
  return instance as unknown as T;
}
