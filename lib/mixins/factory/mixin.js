import { Container as PIXIContainer } from 'pixi.js';
function createFactoryMethods(methods, instance, addToStage) {
    const factoryMethods = {};
    for (const key in methods) {
        factoryMethods[key] = (config) => {
            // @ts-ignore
            const obj = methods[key](config);
            if (addToStage) {
                instance.addChild(obj);
            }
            return obj;
        };
    }
    return factoryMethods;
}
export function Factory(extensions) {
    return class ExtendedContainer extends PIXIContainer {
        constructor() {
            super();
            this.make = createFactoryMethods(extensions, this, false);
            this.add = createFactoryMethods(extensions, this, true);
        }
    };
}
//# sourceMappingURL=mixin.js.map