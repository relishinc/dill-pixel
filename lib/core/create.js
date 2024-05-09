import { sayHello } from '../hello';
import { delay } from '../utils/async';
import { Application } from './Application';
export async function create(ApplicationClass, config = { id: 'DillPixelApplication' }, domElement = Application.containerId, speak = true) {
    if (speak) {
        sayHello();
    }
    let el = null;
    if (typeof domElement === 'string') {
        el = document.getElementById(domElement);
        if (!el) {
            el = Application.createContainer(domElement);
        }
    }
    else if (domElement instanceof HTMLElement) {
        el = domElement;
    }
    else if (domElement === window) {
        el = document.body;
    }
    if (!el) {
        // no element to use
        throw new Error('You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id.');
    }
    Application.containerElement = el;
    if (config.resizeToContainer) {
        config.resizeTo = el;
    }
    const instance = new ApplicationClass();
    await instance.initialize(config);
    if (el) {
        el.appendChild(instance.canvas);
    }
    else {
        throw new Error('No element found to append the view to.');
    }
    // ensure all plugins are initialized
    await delay(0.01);
    // call postInitialize on the instance
    await instance.postInitialize();
    // return th app instance
    return instance;
}
