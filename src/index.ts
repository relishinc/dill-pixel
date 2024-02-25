import { Application, IApplication, RequiredApplicationConfig } from './core';
import { sayHello } from './hello';

export * from './pixi';
export * from './core';
export * from './display';
export * from './modules';
export * from './store';
export * from './utils';
export * from './mixins';

export async function create<T extends IApplication = Application>(
  ApplicationClass: new () => T,
  config: RequiredApplicationConfig = { id: 'DillPixelApplication' },
  domElement: string | HTMLElement = Application.containerId,
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
  }
  if (!el) {
    // no element to use
    throw new Error(
      'You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id.',
    );
  }
  config.resizeTo = el;
  const instance = new ApplicationClass();

  await instance.initialize(config);

  if (el) {
    el.appendChild(instance.canvas as HTMLCanvasElement);
  } else {
    throw new Error('No element found to append the view to.');
  }

  return instance as unknown as T;
}
