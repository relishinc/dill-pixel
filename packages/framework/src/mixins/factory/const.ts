import { AnimatedSprite, Container, ContainerConfig, ContainerConfigKeys, SpineAnimation, Svg } from '../../display';
import type { ButtonConfig, FlexContainerConfig, ToastConfig, ToasterConfig, UICanvasConfig } from '../../ui';
import {
  Button,
  ButtonConfigKeys,
  FlexContainer,
  FlexContainerConfigKeys,
  Toaster,
  UICanvas,
  UICanvasConfigKeys,
} from '../../ui';
import { omitKeys, pluck, resolvePointLike, Spine, WithRequiredProps } from '../../utils';
import {
  AnimatedSpriteProps,
  BitmapTextProps,
  ButtonProps,
  ContainerProps,
  ExistingProps,
  FlexContainerProps,
  GraphicsProps,
  HTMLTextProps,
  ParticleContainerProps,
  SpineProps,
  SpriteProps,
  SvgProps,
  TextProps,
  TilingSpriteProps,
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

import { BitmapText, Graphics, HTMLText, Sprite, Text, TilingSprite } from 'pixi.js';
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
  tilingSprite: (props?: Partial<TilingSpriteProps>) => {
    const entity = new TilingSprite(props ? resolveTexture(props) : undefined);
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
    if (props?.position || props?.x || props?.y) {
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
          pivot: props.pivot ? resolvePointLike(props.pivot, true) : undefined,
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
  htmlText: (props?: Partial<HTMLTextProps>) => {
    const options = props
      ? {
          text: props.text,
          roundPixels: props.roundPixels,
          resolution: props.resolution,
          style: props.style,
          anchor: props.anchor ? resolvePointLike(props.anchor, true) : undefined,
          pivot: props.pivot ? resolvePointLike(props.pivot, true) : undefined,
        }
      : {};
    const entity = new HTMLText(options);
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
  bitmapText: (props?: Partial<BitmapTextProps>) => {
    const options = props
      ? {
          text: props.text,
          roundPixels: props.roundPixels,
          style: props.style,
          anchor: props.anchor ? resolvePointLike(props.anchor, true) : undefined,
          pivot: props.pivot ? resolvePointLike(props.pivot, true) : undefined,
        }
      : {};
    const entity = new BitmapText(options);
    if (props?.position || props?.x || props?.y) {
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
    const otherProps = omitKeys<FlexContainerProps, keyof FlexContainerConfig>(FlexContainerConfigKeys, props ?? {});
    const entity = new FlexContainer(props as Partial<FlexContainerConfig>);
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
    const otherProps = omitKeys<UICanvasFactoryProps, keyof UICanvasConfig>(UICanvasConfigKeys, props ?? {});
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
    const data = props?.data;
    let spineData: { skeleton: string; atlas: string } | string = '';

    if (typeof data === 'string') {
      // get the spine data from cache
      // check if '.json' is the last part of the asset string, and add it if not
      let ext = data.slice(-5);
      if (ext !== '.json' && ext !== '.skel') {
        ext = '.json';
      } else {
        spineData = data.substring(0, data.length - 5);
      }
      spineData = { skeleton: data + ext, atlas: data + '.atlas' };
    }

    const entity: Spine = (window as any).Spine.from(spineData);
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
  spineAnimation: <ANames extends string = string>(props?: Partial<SpineProps>): SpineAnimation<ANames> => {
    const entity = new SpineAnimation<ANames>(props);
    if (!props) return entity;
    const { position, x, y, anchor, pivot, scale, scaleX, scaleY, ...rest } = props;
    resolvePosition({ position, x, y }, entity);
    resolveScale({ scale, scaleX, scaleY }, entity);
    resolveAnchor(anchor, entity);
    resolvePivot(pivot, entity);
    resolveUnknownKeys(rest, entity);
    return entity;
  },
  toaster: (toasterConfig?: Partial<ToasterConfig>, defaultToastConfig: Partial<ToastConfig> = {}): Toaster => {
    const entity = new Toaster(toasterConfig, defaultToastConfig);
    return entity;
  },
};
