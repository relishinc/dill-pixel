import { Application } from './core';
import { sayHello } from './hello';
export * from './pixi';
export * from './core';
export * from './display';
export * from './modules';
export * from './store';
export * from './utils';
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
    if (!el) {
        // no element to use
        throw new Error('You passed in a DOM Element, but none was found. If you instead pass in a string, a container will be created for you, using the string for its id.');
    }
    config.resizeTo = el;
    const instance = new ApplicationClass();
    await instance.initialize(config);
    if (el) {
        el.appendChild(instance.canvas);
    }
    else {
        throw new Error('No element found to append the view to.');
    }
    return instance;
}
//# sourceMappingURL=index.js.map