import { PointLike, SpriteSheetLike, TextureLike, WithRequiredProps } from '../../utils/types';

import { ButtonConfig } from '../../ui/Button';
import { ContainerConfig } from '../../display';
import { FlexContainerConfig } from '../../display/FlexContainer';
import { TextStyleOptions } from 'pixi.js';
import { UICanvasProps } from '../../display/UICanvas';

export interface AbstractProps {
  [key: string]: any;
}

export interface TextureProps {
  asset: TextureLike;
  sheet: SpriteSheetLike;
}

export interface PositionProps {
  x: number;
  y: number;
  position: PointLike;
}

export interface ScaleProps {
  scaleX: number;
  scaleY: number;
  scale: PointLike;
}

export interface PivotProps {
  pivot: PointLike;
}

export interface VisibilityProps {
  alpha: number;
  visible: boolean;
}

export interface ExistingProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {}

export interface GraphicsProps extends AbstractProps, PositionProps, ScaleProps, PivotProps, VisibilityProps {}

export interface SpriteProps extends AbstractProps, TextureProps, ScaleProps, PositionProps, VisibilityProps {
  anchor: PointLike;
}

export interface AnimatedSpriteAnimationProps extends AbstractProps, ScaleProps, PositionProps, VisibilityProps {
  texturePrefix: string;
  sheet: SpriteSheetLike;
  startIndex: number;
  numFrames: number;
  zeroPad: number;
  autoUpdate: boolean;
  updateAnchor: boolean;
  loop: boolean;
  animationSpeed: number;
}

export interface AnimatedSpriteProps extends AbstractProps, ScaleProps, PositionProps, VisibilityProps {
  animations: { [animationName: string]: Omit<AnimatedSpriteAnimationProps, 'sheet' | 'autoUpdate'> };
  autoPlay: boolean;
  autoUpdate: boolean;
  defaultAnimation: string;
  reversible: boolean;
  animationSpeed: number;
}

export interface TextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: Partial<TextStyleOptions>;
}

export interface OmittedTextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {}

export const TextPropsKeys: (keyof TextProps)[] = ['text', 'anchor', 'resolution', 'roundPixels', 'style'];

export interface ContainerProps
  extends AbstractProps,
    PositionProps,
    ScaleProps,
    PivotProps,
    VisibilityProps,
    ContainerConfig {}

export interface FlexContainerProps extends ContainerProps, FlexContainerConfig {}

export interface UICanvasFactoryProps extends ContainerProps, UICanvasProps {}

// spine
type SpineData = {
  skeleton: string;
  atlas: string;
};

export interface SpineProps extends AbstractProps, ScaleProps, PositionProps, VisibilityProps {
  data: string | SpineData;
  autoUpdate: boolean;
  animationName: string;
  trackIndex: number;
  loop: boolean;
  paused: boolean;
}

interface _ButtonProps extends AbstractProps, ScaleProps, PositionProps, PivotProps, VisibilityProps, ButtonConfig {}

export type ButtonProps = WithRequiredProps<_ButtonProps, 'textures'>;
