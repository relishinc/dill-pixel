/// <reference types="@pixi/spine-pixi" />
import { Container as PIXIContainer, Graphics, Sprite, Text } from 'pixi.js';
import { Button, ButtonConfigKeys } from '../../display/Button';
import { Container } from '../../display/Container';
import { FlexContainer, FlexContainerConfigKeys } from '../../display/FlexContainer';
import { UICanvas, UICanvasConfigKeys } from '../../display/UICanvas';
import { resolvePointLike } from '../../utils/functions';
import { omitKeys, pluck } from '../../utils/object';
import { resolveAnchor, resolvePivot, resolvePosition, resolveScale, resolveTexture, resolveUnknownKeys, } from './utils';
export const defaultFactoryMethods = {
    existing: (entity, props) => {
        if (!props)
            return entity;
        const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    texture: resolveTexture,
    container: (props) => {
        const entity = new Container();
        if (!props)
            return entity;
        const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    sprite: (props) => {
        const entity = new Sprite(props ? resolveTexture(props) : undefined);
        if (!props)
            return entity;
        const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolveAnchor(anchor, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    graphics: (props) => {
        const entity = new Graphics();
        if (!props)
            return entity;
        const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    text: (props) => {
        const options = props
            ? {
                text: props.text,
                roundPixels: props.roundPixels,
                resolution: props.resolution,
                style: props.style,
                anchor: props.anchor ? resolvePointLike(props.anchor, true) : undefined,
            }
            : {};
        const entity = new Text(options);
        if (!props)
            return entity;
        const { position, x, y, scale, scaleX, scaleY, pivot } = props;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolvePivot(pivot, entity);
        const unknowns = omitKeys(['x', 'y', 'position', 'text', 'roundPixels', 'resolution', 'style', 'anchor', 'pivot'], props);
        resolveUnknownKeys(unknowns, entity);
        return entity;
    },
    // dill pixel specific stuff
    button: (props) => {
        const config = pluck(props ?? {}, ButtonConfigKeys);
        const otherProps = omitKeys(ButtonConfigKeys, props ?? {});
        const entity = new Button(config);
        if (!otherProps)
            return entity;
        const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    flexContainer: (props) => {
        const config = pluck(props ?? {}, FlexContainerConfigKeys);
        const otherProps = omitKeys(FlexContainerConfigKeys, props ?? {});
        const entity = new FlexContainer(config);
        if (!otherProps)
            return entity;
        const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    uiCanvas: (props) => {
        const config = pluck(props ?? {}, UICanvasConfigKeys);
        const otherProps = omitKeys(UICanvasConfigKeys, props ?? {});
        const entity = new UICanvas(config);
        if (!otherProps)
            return entity;
        const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
    spine: (props) => {
        let data = props?.data;
        if (typeof data === 'string') {
            // get the spine data from cache
            // check if '.json' is the last part of the asset string, and add it if not
            if (data.slice(-5) !== '.json') {
                data = { skeleton: data + '.json', atlas: data + '.atlas' };
            }
        }
        const entity = globalThis.Spine.from(data);
        if (!props)
            return entity;
        if (props.autoUpdate !== undefined)
            entity.autoUpdate = props.autoUpdate;
        if (props.animationName)
            entity.state.setAnimation(props.trackIndex ?? 0, props.animationName, props.loop);
        const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
        resolvePosition({ position, x, y }, entity);
        resolveScale({ scale, scaleX, scaleY }, entity);
        resolveAnchor(anchor, entity);
        resolvePivot(pivot, entity);
        resolveUnknownKeys(rest, entity);
        return entity;
    },
};
function createFactoryMethods(methods, instance, addToStage) {
    const factoryMethods = {};
    for (const key in methods) {
        factoryMethods[key] = (...args) => {
            // @ts-ignore
            const obj = methods[key](...args);
            if (addToStage)
                instance.addChild(obj);
            return obj;
        };
    }
    return factoryMethods;
}
export function FactoryContainer(extensions) {
    return class ExtendedContainer extends PIXIContainer {
        constructor() {
            super();
            extensions = Object.assign(defaultFactoryMethods, extensions);
            this.make = createFactoryMethods(extensions, this, false);
            this.add = createFactoryMethods(extensions, this, true);
        }
    };
}
//# sourceMappingURL=index.js.map