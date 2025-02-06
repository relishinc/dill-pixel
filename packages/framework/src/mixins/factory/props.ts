import { GraphicsContext, HTMLTextStyleOptions, TextStyleOptions } from 'pixi.js';
import { ContainerConfig } from '../../display';
import { ParticleContainerConfig } from '../../display/ParticleContainer';
import { ButtonConfig, FlexContainerConfig, UICanvasProps } from '../../ui';
import type { PointLike, SpriteSheetLike, TextureLike, WithRequiredProps } from '../../utils';

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

export interface SvgProps extends GraphicsProps {
  ctx: string | GraphicsContext;
}

export interface SpriteProps extends AbstractProps, TextureProps, ScaleProps, PositionProps, VisibilityProps {
  anchor: PointLike;
}

export interface TilingSpriteProps extends SpriteProps {
  tilePosition?: PointLike;
  /**
   * Scaling of the image that is being tiled.
   * @default {x: 1, y: 1}
   */
  tileScale?: PointLike;
  /**
   * The rotation of the image that is being tiled.
   * @default 0
   */
  tileRotation?: number;
  /**
   * The texture to use for the sprite.
   * @default Texture.WHITE
   */
  /**
   * The width of the tiling sprite. #
   * @default 256
   */
  width?: number;
  /**
   * The height of the tiling sprite.
   * @default 256
   */
  height?: number;
  /**
   * @todo
   * @default false
   */
  applyAnchorToTexture?: boolean;
  /** Whether or not to round the x/y position. */
  roundPixels?: boolean;
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
  sheet: SpriteSheetLike;
  texturePrefix: string;
  zeroPad: number;
  animations: { [animationName: string]: Partial<AnimatedSpriteAnimationProps> };
  autoPlay: boolean;
  autoUpdate: boolean;
  defaultAnimation: string;
  reversible: boolean;
  animationSpeed: number;
  startIndex: number;
}

export interface TextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: Partial<TextStyleOptions>;
}

export interface HTMLTextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {
  text: string;
  anchor: PointLike;
  resolution: number;
  roundPixels: boolean;
  style: Partial<HTMLTextStyleOptions>;
}

export interface OmittedTextProps extends AbstractProps, PositionProps, ScaleProps, VisibilityProps {}

export const TextPropsKeys: (keyof TextProps)[] = ['text', 'anchor', 'roundPixels', 'style', 'pivot'];

export interface ContainerProps
  extends AbstractProps,
    PositionProps,
    ScaleProps,
    PivotProps,
    VisibilityProps,
    ContainerConfig {}

export interface ParticleContainerProps extends AbstractProps, ParticleContainerConfig {}

export interface FlexContainerProps extends ContainerProps, FlexContainerConfig {}

export interface UICanvasFactoryProps extends ContainerProps, UICanvasProps {}

// spine
type SpineData = {
  skeleton: string;
  atlas: string;
  skel?: boolean;
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
