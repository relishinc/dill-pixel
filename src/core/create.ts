import {DillPixelApplicationOptions} from './AppConfig';
import {Application} from './Application';

/**
 * Utility function to create an instance of the Application class.
 * @param ApplicationClass - The class of the application.
 * @param config - The configuration options for the application.
 * @param domElement - The DOM element for the application.
 * @param resizeToDOMElement - Whether to resize to the DOM element.
 * @returns An instance of the Application class.
 * @example const app = await create(MyApplication, {
 *   useSpine: true,
 *   resizeOptions: {
 *     minSize: { width: 375, height: 700 },
 *   },
 * });
 */
export function create<T extends Application = Application>(
  ApplicationClass: typeof Application,
  config?: Partial<DillPixelApplicationOptions>,
  domElement?: string | HTMLElement,
  resizeToDOMElement?: boolean,
): Promise<T> | T;
export async function create<T extends Application = Application>(
  ApplicationClass: typeof Application,
  config: Partial<DillPixelApplicationOptions> = {},
  domElement: string | HTMLElement = ApplicationClass.containerID,
  resizeToDOMElement = false,
): Promise<T> {
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
  if (resizeToDOMElement) {
    config.resizeTo = el;
  }
  const instance = new ApplicationClass(config);

  if (el) {
    el.appendChild(instance.view as HTMLCanvasElement);
  } else {
    throw new Error('No element found to append the view to.');
  }

  await instance.initialize();
  if (isDev()) {
    console.log('Application initialized');
  }
  return instance as T;
}
