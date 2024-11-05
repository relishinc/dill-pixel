import { AnimatedSprite, Container, ContainerConfig, ContainerConfigKeys, SpineAnimation, Svg } from '../../display';
import type { ButtonConfig, FlexContainerConfig, UICanvasConfig } from '../../ui';
import {
  Button,
  ButtonConfigKeys,
  FlexContainer,
  FlexContainerConfigKeys,
  UICanvas,
  UICanvasConfigKeys,
} from '../../ui';
import { omitKeys, pluck, resolvePointLike, Spine, WithRequiredProps } from '../../utils';
import {
  AnimatedSpriteProps,
  ButtonProps,
  ContainerProps,
  ExistingProps,
  FlexContainerProps,
  GraphicsProps,
  ParticleContainerProps,
  SpineProps,
  SpriteProps,
  SvgProps,
  TextProps,
  TextPropsKeys,
  UICanvasFactoryProps,
} from './props';
import {
  resolveAnchor,
  resolvePivot,
  resolvePosition,
  resolveScale,
  resolveTexture,
  resolveUnknownKeys,
} from './utils';

import { BitmapText, Graphics, Sprite, Text } from 'pixi.js';
import {
  ParticleContainer,
  ParticleContainerConfig,
  ParticleContainerConfigKeys,
} from '../../display/ParticleContainer';

export const defaultFactoryMethods = {
  existing: <TEntity>(entity: TEntity, props?: Partial<ExistingProps>): TEntity => {
    if (!props) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  container: (props?: Partial<ContainerProps>) => {
    const config = pluck(props ?? {}, ContainerConfigKeys);
    const otherProps = omitKeys<ContainerProps, keyof ContainerConfig>(ContainerConfigKeys, props ?? {});
    const entity = new Container(config);
    if (!otherProps) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  particleContainer: (props?: Partial<ParticleContainerProps>) => {
    const config = pluck(props ?? {}, ParticleContainerConfigKeys);
    const otherProps = omitKeys<ParticleContainerProps, keyof ParticleContainerConfig>(
      ParticleContainerConfigKeys,
      props ?? {},
    );
    const entity = new ParticleContainer(config);
    if (!otherProps) return entity;
    const { position, x, y, pivot, scale, ...rest } = otherProps;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  texture: resolveTexture,
  sprite: (props?: Partial<SpriteProps>) => {
    const entity = new Sprite(props ? resolveTexture(props) : undefined);
    if (!props) return entity;
    const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolveAnchor(anchor, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  animatedSprite: (props?: Partial<AnimatedSpriteProps>): AnimatedSprite => {
    const entity = new AnimatedSprite(props);
    if (props?.position) {
      resolvePosition({ position: props.position, x: props.x, y: props.y }, entity);
    }
    if (props?.scale) {
      resolveScale({ scale: props.scale ?? 1, scaleX: props.scaleX, scaleY: props.scaleY }, entity);
    }
    if (props?.pivot) {
      resolvePivot(props.pivot, entity);
    }
    const unknowns = omitKeys(
      ['x', 'y', 'position', 'text', 'roundPixels', 'resolution', 'style', 'anchor', 'pivot'],
      props ?? {},
    );
    resolveUnknownKeys(unknowns, entity);
    return entity;
  },
  graphics: (props?: Partial<GraphicsProps>) => {
    const entity = new Graphics();
    if (!props) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  svg(props: WithRequiredProps<SvgProps, 'ctx'>) {
    const entity = new Svg(props.ctx);
    if (!props) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  text: (props?: Partial<TextProps>) => {
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
    if (!props) return entity;
    const { position, x, y, scale, scaleX, scaleY, pivot } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    const unknowns = omitKeys(
      ['x', 'y', 'position', 'text', 'roundPixels', 'resolution', 'style', 'anchor', 'pivot'],
      props,
    );
    resolveUnknownKeys(unknowns, entity);
    return entity;
  },
  bitmapText: (props?: Partial<TextProps>) => {
    const options = pluck(props ?? {}, TextPropsKeys);
    const entity = new BitmapText(options);
    if (props?.position) {
      resolvePosition({ position: props.position, x: props.x, y: props.y }, entity);
    }
    if (props?.scale) {
      resolveScale({ scale: props.scale ?? 1, scaleX: props.scaleX, scaleY: props.scaleY }, entity);
    }
    if (props?.pivot) {
      resolvePivot(props.pivot, entity);
    }
    const unknowns = omitKeys(
      ['x', 'y', 'position', 'text', 'roundPixels', 'resolution', 'style', 'anchor', 'pivot'],
      props ?? {},
    );
    resolveUnknownKeys(unknowns, entity);
    return entity;
  },
  // dill pixel specific stuff
  button: (props?: Partial<ButtonProps>) => {
    const config = pluck(props ?? {}, ButtonConfigKeys);
    const otherProps = omitKeys<ButtonProps, keyof ButtonConfig>(ButtonConfigKeys, props ?? {});
    const entity = new Button(config);
    if (!otherProps) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  flexContainer: (props?: Partial<FlexContainerProps>): FlexContainer => {
    const config = pluck(props ?? {}, FlexContainerConfigKeys);
    const otherProps = omitKeys<FlexContainerProps, keyof FlexContainerConfig>(FlexContainerConfigKeys, props ?? {});
    const entity = new FlexContainer(config);
    if (!otherProps) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  uiCanvas: (props?: Partial<UICanvasFactoryProps>): UICanvas => {
    const config = pluck(props ?? {}, UICanvasConfigKeys);
    const otherProps = omitKeys<FlexContainerProps, keyof UICanvasConfig>(UICanvasConfigKeys, props ?? {});
    const entity = new UICanvas(config);
    if (!otherProps) return entity;
    const { position, x, y, pivot, scale, scaleX, scaleY, ...rest } = otherProps;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  spine: (props?: Partial<SpineProps>): Spine => {
    let data = props?.data;

    if (typeof data === 'string') {
      // get the spine data from cache
      // check if '.json' is the last part of the asset string, and add it if not
      let ext = data.slice(-5);
      if (ext !== '.json' && ext !== '.skel') {
        ext = '.json';
      } else {
        data = data.substring(0, data.length - 5);
      }
      data = { skeleton: data + ext, atlas: data + '.atlas' };
    }
    const entity: Spine = (window as any).Spine.from(data);
    if (!props) return entity;
    if (props.autoUpdate !== undefined) entity.autoUpdate = props.autoUpdate;
    if (props.animationName) entity.state.setAnimation(props.trackIndex ?? 0, props.animationName, props.loop);
    const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolveAnchor(anchor, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  spineAnimation: (props?: Partial<SpineProps>): SpineAnimation => {
    const entity = new SpineAnimation(props);
    if (!props) return entity;
    const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolveAnchor(anchor, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
};
