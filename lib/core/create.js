import { isDev } from '../functions';
import { Application } from './Application';
const isDevEnv = isDev();
export async function create(ApplicationClass, config = {}, domElement = ApplicationClass.containerID, resizeToDOMElement = false) {
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
    if (resizeToDOMElement) {
        config.resizeTo = el;
    }
    const instance = new ApplicationClass(config);
    if (el) {
        el.appendChild(instance.view);
    }
    else {
        throw new Error('No element found to append the view to.');
    }
    await instance.initialize();
    if (isDevEnv) {
        console.log('Application initialized');
    }
    return instance;
}
//# sourceMappingURL=create.js.map